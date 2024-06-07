import { Fill, Stroke, Style } from "ol/style";

export const selectedMunicipalityStyle = new Style({
  stroke: new Stroke({
    color: "grey",
    width: 2,
  }),
  fill: new Fill({
    color: "rgba(0, 0, 255, 0.2)",
  }),
});

export const defaultMunicipalityStyle = new Style({
  stroke: new Stroke({
    color: "grey",
    width: 2,
  }),
  fill: new Fill({
    color: "rgba(0, 0, 0, 0.2)",
  }),
});
