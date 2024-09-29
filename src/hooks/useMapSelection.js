import { useCallback, useState } from "react";
import {
  defaultMunicipalityStyle,
  layer_1MunicipalityStyle,
  layer_2MunicipalityStyle,
  layer_3MunicipalityStyle,
  layer_MadridMunicipalityStyle,
  selectedMunicipalityStyle,
} from "../constants/mapStyles";
import { useMunicipalityData } from "./useMunicipalityData";

export function useMapSelection({ features, settings }) {
  const [selected, setSelected] = useState(null);
  const [selectedFeature, setSelectedFeature] = useState(null);

  const { municipalityData } = useMunicipalityData();

  const updateSelected = useCallback(
    (name) => {
      // Reset previously selected feature (if any)
      if (selectedFeature && settings.showGroupLayers) {
        const lau_id = selectedFeature.get("lau_id");
        const group = municipalityData[lau_id].grupo;
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
      const feature = features.find((feat) => feat.get("lau_id") === name);
      if (name && selected !== name && feature) {
        setSelectedFeature(feature);
        feature.setStyle(selectedMunicipalityStyle);
        setSelected(name);
      } else {
        setSelectedFeature(null);
        setSelected(null);
      }
    },
    [settings, selected, selectedFeature, features, municipalityData]
  );

  return { selected, selectedFeature, updateSelected };
}
