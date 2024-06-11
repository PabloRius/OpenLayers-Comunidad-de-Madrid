import { Tooltip } from "@mui/material";

/* eslint-disable react/prop-types */
export function BarChart({ pctg }) {
  if (!pctg) return;
  return (
    <Tooltip title={`Value: ${pctg * 100}`}>
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
            width: `${pctg * 100}%`,
            backgroundColor:
              pctg < 0.2
                ? "red"
                : pctg >= 0.2 && pctg < 0.55
                ? "orange"
                : "green",
            height: "100%",
          }}
        ></div>
      </div>
    </Tooltip>
  );
}
