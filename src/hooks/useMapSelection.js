import { useCallback, useState } from "react";
import {
  defaultMunicipalityStyle,
  layer_1MunicipalityStyle,
  layer_2MunicipalityStyle,
  layer_3MunicipalityStyle,
  layer_MadridMunicipalityStyle,
  selectedMunicipalityStyle,
} from "../constants/mapStyles";

import layers from "../data/municipality_group.json";

export function useMapSelection({ features, settings }) {
  const [selected, setSelected] = useState(null);
  const [selectedFeature, setSelectedFeature] = useState(null);

  const updateSelected = useCallback(
    (name) => {
      // Reset previously selected feature (if any)
      if (selectedFeature && settings.showGroupLayers) {
        const munic_name = selectedFeature.get("NAMEUNIT");
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
        selectedFeature.setStyle(style);
      } else selectedFeature?.setStyle(defaultMunicipalityStyle);
      // Set new selected feature (if exists and is different from the previous)
      if (!features || features.length === 0) return;
      const feature = features.find((feat) => feat.get("NAMEUNIT") === name);
      if (name && selected !== name && feature) {
        setSelectedFeature(feature);
        feature.setStyle(selectedMunicipalityStyle);
        setSelected(name);
      } else {
        setSelectedFeature(null);
        setSelected(null);
      }
    },
    [settings, selected, selectedFeature, features]
  );

  return { selected, selectedFeature, updateSelected };
}
