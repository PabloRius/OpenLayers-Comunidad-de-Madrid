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

// Constants
import {
  defaultMunicipalityStyle,
  selectedMunicipalityStyle,
} from "../constants/mapStyles";

// Data
import geoJSONData from "../data/map_municipalities.geojson";
import names from "../data/municipality_names.json";

export function useMap() {
  const [selected, setSelected] = useState(null);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const currentView = useRef(null);
  const originalExtent = useRef(null);
  const dataLayerRef = useRef(null);

  const searchMunicipality = ({ byName }) => {
    const results = names.filter((name) =>
      name.toLowerCase().includes(byName.toLowerCase())
    );
    setSearchResults(results);
  };

  const clearFeature = () => {
    setSelectedFeature((prev) => {
      prev?.setStyle(defaultMunicipalityStyle);
      return null;
    });
  };

  const updateSelected = (name) => {
    if (dataLayerRef.current) {
      const features = dataLayerRef.current.getSource().getFeatures();
      const feature = features.find((feat) => feat.get("NAMEUNIT") === name);
      if (feature) {
        setSelectedFeature((prev) => {
          prev?.setStyle(defaultMunicipalityStyle);
          return feature;
        });
      }
    }
    setSelected(name);
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
        clearFeature();
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
    clearFeature,
    searchResults,
  };
}
