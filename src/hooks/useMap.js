// React Hooks
import { useEffect, useState } from "react";

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
  useEffect(() => {
    const map = new Map({
      target: "map",
    });

    // Load the official Madrid map source from ign-base
    const source = new TileWMS({
      url: "https://www.ign.es/wms-inspire/ign-base",
      params: { LAYERS: "IGNBaseTodo", Tiled: true },
      serverType: "geoserver",
      transition: 0,
    });

    const layer = new TileLayer({
      source,
      preload: Infinity,
    });
    map.addLayer(layer);

    const madridCenter = fromLonLat([-3.70379, 40.41678]);

    map.setView(
      new View({
        center: madridCenter,
        zoom: 9,
        minZoom: 9,
      })
    );

    const muncipalityStyle = new Style({
      stroke: new Stroke({
        color: "blue",
        width: 2,
      }),
      fill: new Fill({
        color: "rgba(0, 0, 255, 0.1)",
      }),
    });

    // Load the GeoJSON layer with the border vectors
    const muncipalityLayer = new VectorLayer({
      source: new VectorSource({
        url: geoJSONData,
        format: new GeoJSON(),
      }),
      style: muncipalityStyle,
    });
    map.addLayer(muncipalityLayer);

    // Add tooltip interaction
    map.on("singleclick", function (event) {
      const feature = map.forEachFeatureAtPixel(event.pixel, function (feat) {
        return feat;
      });

      if (feature) {
        const muncipalityName = feature.get("NAMEUNIT");
        setToolTip(muncipalityName);
      } else {
        setToolTip(null);
      }
    });

    return () => map.setTarget(null);
  }, []);

  return { toolTip };
}
