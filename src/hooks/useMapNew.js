import { useEffect, useRef, useState } from "react";
import { useMapSelection } from "./useMapSelection";

import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import { fromLonLat } from "ol/proj";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { GeoJSON } from "ol/format";
import { TileWMS } from "ol/source";

import {
  defaultMunicipalityStyle,
  layer_1MunicipalityStyle,
  layer_2MunicipalityStyle,
  layer_3MunicipalityStyle,
  layer_MadridMunicipalityStyle,
  selectedMunicipalityStyle,
} from "../constants/mapStyles";

import geoJSONData from "../data/map_municipalities.geojson";
import layers from "../data/municipality_group.json";

export function useMapNew() {
  const [settings, updateSettings] = useState({ showGroupLayers: false });
  const [features, setFeatures] = useState([]);
  const mapRef = useRef(null);
  const currentView = useRef(null);
  const originalExtent = useRef(null);
  const dataLayerRef = useRef(null);

  const { selected, selectedFeature, updateSelected } = useMapSelection({
    features,
    settings,
  });

  const toggleShowGroupLayers = () => {
    const features = dataLayerRef.current?.getSource().getFeatures();
    if (!features) return;
    if (!settings.showGroupLayers) {
      features.forEach((feature) => {
        const munic_name = feature.get("NAMEUNIT");
        const group = layers[munic_name];
        let style;
        if (munic_name === selected) style = selectedMunicipalityStyle;
        else {
          style =
            group === 3
              ? defaultMunicipalityStyle
              : group === 0
              ? layer_1MunicipalityStyle
              : group === 1
              ? layer_2MunicipalityStyle
              : group === 2
              ? layer_3MunicipalityStyle
              : layer_MadridMunicipalityStyle;
        }
        feature.setStyle(style);
      });
    } else {
      features.forEach((feature) => {
        const munic_name = feature.get("NAMEUNIT");
        let style;
        if (munic_name === selected) style = selectedMunicipalityStyle;
        else style = defaultMunicipalityStyle;
        feature.setStyle(style);
      });
    }
    updateSettings((prev) => ({
      ...prev,
      showGroupLayers: !prev.showGroupLayers,
    }));
  };

  useEffect(() => {
    if (selectedFeature) {
      console.debug("Fitting view for the selected Municipality");
      currentView.current.fit(selectedFeature.getGeometry().getExtent(), {
        duration: 500,
        padding: [50, 50, 50, 400],
      });
    } else {
      console.debug("Fitting view for the whole map");
      if (!originalExtent.current) return;

      currentView.current.fit(originalExtent.current, {
        duration: 500,
        padding: [50, 50, 50, 50],
      });
    }
  }, [selectedFeature, updateSelected]);

  useEffect(() => {
    mapRef.current = new Map({
      target: "map",
    });

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
    mapRef.current.addLayer(layer);

    const madridCenter = fromLonLat([-3.862, 40.5432]);

    mapRef.current.setView(
      new View({
        center: madridCenter,
        zoom: 9,
        minZoom: 9,
        extent: fromLonLat([-5.8113, 39.5783]).concat(
          fromLonLat([-1.8779, 41.3421])
        ),
      })
    );

    currentView.current = mapRef.current.getView();

    originalExtent.current = mapRef.current
      .getView()
      .calculateExtent(mapRef.current.getSize());

    dataLayerRef.current = new VectorLayer({
      source: new VectorSource({
        url: geoJSONData,
        format: new GeoJSON(),
      }),
      style: defaultMunicipalityStyle,
    });

    dataLayerRef.current.getSource().on("addfeature", () => {
      const loadedFeatures = dataLayerRef.current.getSource().getFeatures();
      setFeatures(loadedFeatures);
    });
    mapRef.current.addLayer(dataLayerRef.current);

    mapRef.current.on("pointermove", function (event) {
      const pixel = mapRef.current.getEventPixel(event.originalEvent);
      const hit = mapRef.current.hasFeatureAtPixel(pixel);
      mapRef.current.getTargetElement().style.cursor = hit ? "pointer" : "";
    });

    return () => mapRef.current.setTarget(null);
  }, []);

  useEffect(() => {
    mapRef.current.on("singleclick", function (event) {
      const feature = mapRef.current.forEachFeatureAtPixel(
        event.pixel,
        function (feat) {
          return feat;
        }
      );

      if (feature) {
        updateSelected(feature.get("NAMEUNIT"));
      } else {
        updateSelected(null);
      }
    });
  }, [updateSelected]);

  return { toggleShowGroupLayers, settings, selected, updateSelected };
}
