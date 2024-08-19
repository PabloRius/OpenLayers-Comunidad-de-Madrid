/* eslint-disable react/prop-types */
import { useIndex } from "../../hooks/useIndex";
import { useMunicipalityData } from "../../hooks/useMunicipalityData";
import { BarChart } from "./BarChart";

import "./DataRenderer.css";

export function DataRenderer({ data }) {
  const { indexInfo } = useIndex();
  const { municipalityData } = useMunicipalityData();
  let label = Object.keys(data)[0];
  if (!label) return <p>Loading data...</p>;

  let municipality = label.split("_")[0];

  let values = data[label];
  if (values.length <= 0) return <p>No data found {}</p>;

  return (
    <section className="dataSection">
      {municipalityData &&
      municipalityData[municipality] &&
      municipalityData[municipality].name ? (
        <h3>{municipalityData[municipality].name}</h3>
      ) : (
        <h3>Error fetching the municipality name</h3>
      )}
      {Object.keys(values).map((indicator) => {
        return (
          <>
            {indexInfo &&
            indexInfo[indicator] &&
            indexInfo[indicator].Nombre_Variable ? (
              <h4>{indexInfo[indicator].Nombre_Variable}</h4>
            ) : null}

            {indexInfo &&
            indexInfo[indicator] &&
            indexInfo[indicator].Tipo &&
            indexInfo[indicator].Tipo === "Indice" ? (
              <BarChart pctg={parseFloat(values[indicator]) || null} />
            ) : null}
          </>
        );
      })}
    </section>
  );
}
