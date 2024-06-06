// React Hooks
import { useEffect } from "react";

// OpenLayer components
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import { fromLonLat } from "ol/proj";

// OpenLayer Sources
import { TileWMS } from "ol/source";

export function useMap() {
  useEffect(() => {
    const map = new Map({
      target: "map",
    });
    // const source = new OSM();
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

    return () => map.setTarget(null);
  }, []);
}
