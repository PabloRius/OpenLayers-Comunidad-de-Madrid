// React Hooks
import { useEffect, useRef, useState } from "react";

// OpenLayer components
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import { fromLonLat } from "ol/proj";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { GeoJSON } from "ol/format";
import { TileWMS } from "ol/source";
// import { Fill, Stroke, Style } from "ol/style";

// Constants
import {
  defaultMunicipalityStyle,
  layer_1MunicipalityStyle,
  layer_2MunicipalityStyle,
  layer_3MunicipalityStyle,
  layer_MadridMunicipalityStyle,
  selectedMunicipalityStyle,
} from "../constants/mapStyles";

// Data
import geoJSONData from "../data/map_municipalities.geojson";
import names from "../data/municipality_names.json";
import layers from "../data/municipality_group.json";

export function useMap() {
  const [selected, setSelected] = useState(null);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [settings, updateSettings] = useState({ showGroupLayers: false });
  const currentView = useRef(null);
  const originalExtent = useRef(null);
  const dataLayerRef = useRef(null);

  const searchMunicipality = ({ byName }) => {
    if (byName) {
      const results = names.filter((name) =>
        name.toLowerCase().includes(byName.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const updateSelected = (name) => {
    if (name) {
      if (dataLayerRef.current) {
        const features = dataLayerRef.current.getSource().getFeatures();
        const feature = features.find((feat) => feat.get("NAMEUNIT") === name);
        if (feature) {
          setSelectedFeature((prev) => {
            if (prev && settings.showGroupLayers) {
              const munic_name = prev.get("NAMEUNIT");
              const group = layers[munic_name];
              const style =
                group === 3
                  ? defaultMunicipalityStyle
                  : group === 0
                  ? layer_1MunicipalityStyle
                  : group === 1
                  ? layer_2MunicipalityStyle
                  : group === 2
                  ? layer_3MunicipalityStyle
                  : layer_MadridMunicipalityStyle;
              prev.setStyle(style);
            } else prev?.setStyle(defaultMunicipalityStyle);
            return feature;
          });
        }
      }
      setSelected(name);
    } else {
      setSelectedFeature((prev) => {
        if (prev && settings.showGroupLayers) {
          const munic_name = prev.get("NAMEUNIT");
          const group = layers[munic_name];
          const style =
            group === 3
              ? defaultMunicipalityStyle
              : group === 0
              ? layer_1MunicipalityStyle
              : group === 1
              ? layer_2MunicipalityStyle
              : group === 2
              ? layer_3MunicipalityStyle
              : layer_MadridMunicipalityStyle;
          prev.setStyle(style);
        } else prev?.setStyle(defaultMunicipalityStyle);
        return null;
      });
    }
  };

  const toggleShowGroupLayers = () => {
    updateSettings((prev) => {
      const features = dataLayerRef.current?.getSource().getFeatures();
      if (prev.showGroupLayers === false && features) {
        features.forEach((feature) => {
          const munic_name = feature.get("NAMEUNIT");
          const group = layers[munic_name];
          const style =
            group === 3
              ? defaultMunicipalityStyle
              : group === 0
              ? layer_1MunicipalityStyle
              : group === 1
              ? layer_2MunicipalityStyle
              : group === 2
              ? layer_3MunicipalityStyle
              : layer_MadridMunicipalityStyle;
          feature.setStyle(style);
        });
      } else if (prev.showGroupLayers === true && features) {
        features.forEach((feature) => {
          if (feature.get("NAMEUNIT") === selected)
            feature.setStyle(selectedMunicipalityStyle);
          else feature.setStyle(defaultMunicipalityStyle);
        });
      }
      return {
        ...prev,
        showGroupLayers: !prev.showGroupLayers,
      };
    });
    console.log("Toggling show layers");
  };

  useEffect(() => {
    if (selectedFeature) {
      selectedFeature.setStyle(selectedMunicipalityStyle);
      const muncipalityName = selectedFeature.get("NAMEUNIT");
      setSelected(muncipalityName);

      if (!currentView) return;

      currentView.current.fit(selectedFeature.getGeometry().getExtent(), {
        duration: 500,
        padding: [50, 50, 50, 400],
      });
    } else {
      setSelected(null);

      if (currentView.current && originalExtent.current) {
        currentView.current.fit(originalExtent.current, {
          duration: 500,
          padding: [50, 50, 50, 50],
        });
      }
    }
  }, [selectedFeature, currentView]);

  useEffect(() => {
    const map = new Map({
      target: "map",
    });

    // Load the official Madrid map source from ign-base
    const source = new TileWMS({
      url: "https://www.ign.es/wms-inspire/ign-base",
      params: { LAYERS: "IGNBaseTodo", Tiled: true },
      serverType: "geoserver",
      transition: 150,
    });

    const layer = new TileLayer({
      source,
      preload: 2,
    });
    map.addLayer(layer);

    const madridCenter = fromLonLat([-3.862, 40.5432]);

    map.setView(
      new View({
        center: madridCenter,
        zoom: 9,
        minZoom: 9,
        extent: fromLonLat([-5.8113, 39.5783]).concat(
          fromLonLat([-1.8779, 41.3421])
        ),
      })
    );

    currentView.current = map.getView();
    originalExtent.current = map.getView().calculateExtent(map.getSize());

    // Load the GeoJSON layer with the border vectors
    dataLayerRef.current = new VectorLayer({
      source: new VectorSource({
        url: geoJSONData,
        format: new GeoJSON(),
      }),
      style: defaultMunicipalityStyle,
    });
    map.addLayer(dataLayerRef.current);

    // Add tooltip interaction
    map.on("singleclick", function (event) {
      const feature = map.forEachFeatureAtPixel(event.pixel, function (feat) {
        return feat;
      });

      if (feature) {
        setSelectedFeature((prev) => {
          prev?.setStyle(defaultMunicipalityStyle);
          return feature;
        });
      } else {
        updateSelected(null);
      }
    });

    // Change cursor style on hover over a feature
    map.on("pointermove", function (event) {
      const pixel = map.getEventPixel(event.originalEvent);
      const hit = map.hasFeatureAtPixel(pixel);
      map.getTargetElement().style.cursor = hit ? "pointer" : "";
    });

    return () => map.setTarget(null);
  }, []);

  return {
    selected,
    updateSelected,
    searchMunicipality,
    searchResults,
    toggleShowGroupLayers,
    settings,
  };
}
