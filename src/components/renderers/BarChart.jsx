import { Tooltip } from "@mui/material";

/* eslint-disable react/prop-types */
export function BarChart({ pctg }) {
  if (!pctg) return;
  const full = (pctg - 0.5) / 0.5;
  return (
    <Tooltip title={`Value: ${Math.round(full * 100)}`}>
      <div
        style={{
          width: "100%",
          border: "1px solid black",
          height: "30px",
          cursor: "pointer",
        }}
      >
        <div
          style={{
            width: `${full * 100}%`,
            backgroundColor:
              full < 0.5
                ? "red"
                : full >= 0.5 && full < 0.7
                ? "orange"
                : "green",
            height: "100%",
          }}
        ></div>
      </div>
    </Tooltip>
  );
}
