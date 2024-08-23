/* eslint-disable react/prop-types */
import { useIndex } from "../../hooks/useIndex";
import { useMunicipalityData } from "../../hooks/useMunicipalityData";
import { BarChart } from "./BarChart";
import VisibilityIcon from "@mui/icons-material/Visibility";

import "./DataRenderer.css";
import { IconButton, Tooltip } from "@mui/material";
import { ExtraData } from "./ExtraData";

export function DataRenderer({ data, year }) {
  const { indexInfo } = useIndex();
  const { municipalityData } = useMunicipalityData();

  if (!data) {
    return (
      <section className="dataSection">
        <h3>Select a municipality to start reading data</h3>
      </section>
    );
  }

  let label = Object.keys(data)[0];
  let values = data[label][year];

  return (
    <section className="dataSection">
      {municipalityData &&
      municipalityData[label] &&
      municipalityData[label].name ? (
        <h3>{municipalityData[label].name}</h3>
      ) : (
        <h3>Error fetching the municipality name</h3>
      )}
      {values ? (
        Object.keys(values).map((indicator) => {
          return (
            <>
              {indexInfo &&
              indexInfo[indicator] &&
              indexInfo[indicator].Nombre_Variable ? (
                <div
                  className="MunicipalityTitle"
                  style={{
                    display: "flex",
                    flexDirection: "horizontal",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <h4>{indexInfo[indicator].Nombre_Variable}</h4>
                  <Tooltip title="Compare stat within group">
                    <IconButton
                      style={{
                        height: "25px",
                        marginBottom: "12px",
                        marginTop: "24px",
                      }}
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </Tooltip>
                </div>
              ) : null}

              {indexInfo &&
              indexInfo[indicator] &&
              indexInfo[indicator].Tipo &&
              indexInfo[indicator].Tipo === "Indice" ? (
                <div
                  className="DataColumn"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    rowGap: "5px",
                  }}
                >
                  <BarChart pctg={parseFloat(values[indicator]) || null} />
                  <ExtraData
                    indexes={indexInfo[indicator].Subindex}
                    values={values}
                    fullData={data[label]}
                  />
                </div>
              ) : null}
            </>
          );
        })
      ) : (
        <p>No data recorded for year {year}</p>
      )}
    </section>
  );
}
