import { Fill, Stroke, Style } from "ol/style";

export const selectedMunicipalityStyle = new Style({
  stroke: new Stroke({
    color: "black",
    width: 1,
  }),
  fill: new Fill({
    color: "rgba(0, 0, 255, 0.75)",
  }),
});

export const defaultMunicipalityStyle = new Style({
  stroke: new Stroke({
    color: "black",
    width: 1,
  }),
  fill: new Fill({
    color: "rgba(80, 80, 80, 0.75)",
  }),
});

export const layer_1MunicipalityStyle = new Style({
  stroke: new Stroke({
    color: "black",
    width: 1,
  }),
  fill: new Fill({
    color: "rgba(120, 120, 120, 0.75)",
  }),
});

export const layer_2MunicipalityStyle = new Style({
  stroke: new Stroke({
    color: "black",
    width: 1,
  }),
  fill: new Fill({
    color: "rgba(165, 165, 165, 0.75)",
  }),
});

export const layer_3MunicipalityStyle = new Style({
  stroke: new Stroke({
    color: "black",
    width: 1,
  }),
  fill: new Fill({
    color: "rgba(210, 210, 210, 0.75)",
  }),
});

export const layer_MadridMunicipalityStyle = new Style({
  stroke: new Stroke({
    color: "black",
    width: 1,
  }),
  fill: new Fill({
    color: "rgba(255, 255, 255, 0.75)",
  }),
});

export const highValueStyle = new Style({
  stroke: new Stroke({
    color: "black",
    width: 1,
  }),
  fill: new Fill({
    color: "rgba(85, 139, 47, 0.75)",
  }),
});

export const midValueStyle = new Style({
  stroke: new Stroke({
    color: "black",
    width: 1,
  }),
  fill: new Fill({
    color: "rgba(205, 155, 29, 0.75)",
  }),
});

export const lowValueStyle = new Style({
  stroke: new Stroke({
    color: "black",
    width: 1,
  }),
  fill: new Fill({
    color: "rgba(183, 28, 28, 0.75)",
  }),
});

export const noValueStyle = new Style({
  stroke: new Stroke({
    color: "black",
    width: 1,
  }),
  fill: new Fill({
    color: "rgba(255, 255, 255, 0.75)",
  }),
});
