// React Hooks
import { useEffect, useMemo, useRef, useState } from "react";

// OpenLayer components
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import { fromLonLat } from "ol/proj";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Fill, Stroke, Style } from "ol/style";
import { GeoJSON } from "ol/format";

// OpenLayer Sources
import { TileWMS } from "ol/source";

import geoJSONData from "../data/map_municipalities.geojson";

export function useMap() {
  const [toolTip, setToolTip] = useState(null);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const currentView = useRef(null);
  const originalExtent = useRef(null);

  const searchMunicipality = ({ byName }) => {
    console.log(byName);
  };

  const clearFeature = () => {
    setSelectedFeature((prev) => {
      prev?.setStyle(defaultMunicipalityStyle);
      return null;
    });
  };

  const selectedMunicipalityStyle = useMemo(() => {
    return new Style({
      stroke: new Stroke({
        color: "grey",
        width: 2,
      }),
      fill: new Fill({
        color: "rgba(0, 0, 255, 0.2)",
      }),
    });
  }, []);

  const defaultMunicipalityStyle = useMemo(() => {
    return new Style({
      stroke: new Stroke({
        color: "grey",
        width: 2,
      }),
      fill: new Fill({
        color: "rgba(0, 0, 0, 0.2)",
      }),
    });
  }, []);

  useEffect(() => {
    if (selectedFeature) {
      selectedFeature.setStyle(selectedMunicipalityStyle);
      const muncipalityName = selectedFeature.get("NAMEUNIT");
      setToolTip(muncipalityName);

      if (!currentView) return;

      currentView.current.fit(selectedFeature.getGeometry().getExtent(), {
        duration: 500,
        padding: [50, 50, 50, 400],
      });
    } else {
      setToolTip(null);

      if (currentView.current && originalExtent.current) {
        currentView.current.fit(originalExtent.current, {
          duration: 500,
          padding: [50, 50, 50, 50],
        });
      }
    }
  }, [
    selectedFeature,
    defaultMunicipalityStyle,
    selectedMunicipalityStyle,
    currentView,
  ]);

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
    const muncipalityLayer = new VectorLayer({
      source: new VectorSource({
        url: geoJSONData,
        format: new GeoJSON(),
      }),
      style: defaultMunicipalityStyle,
    });
    map.addLayer(muncipalityLayer);

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
  }, [defaultMunicipalityStyle]);

  return { toolTip, searchMunicipality, clearFeature };
}
