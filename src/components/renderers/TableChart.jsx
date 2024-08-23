import { Tooltip } from "@mui/material";

import "./TableChart.css";

/* eslint-disable react/prop-types */
export function Tablechart({ indexes, values }) {
  if (!values || !indexes) return;

  return (
    <div
      style={{
        width: "100%",
        border: "1px solid black",
        height: "auto",
      }}
    >
      <div className="tableRow">
        <div className="cell">
          <strong>Indicator</strong>
        </div>
        <div className="cell">
          <strong>Value</strong>
        </div>
        <div className="cell">
          <strong>Measurement</strong>
        </div>
      </div>
      {Object.keys(indexes).map((subindex) => {
        return (
          <div key={subindex} className="tableRow">
            <Tooltip title={indexes[subindex].Descripción_Variable}>
              <div className="cell">{indexes[subindex].Nombre_Variable}</div>
            </Tooltip>
            <div className="cell">
              {indexes[subindex].Unidad === "Porcentaje"
                ? parseInt(values[subindex] * 100) + "%"
                : values[subindex]}
            </div>
            <div className="cell">{indexes[subindex].Unidad}</div>
          </div>
        );
      })}
    </div>
  );
}
