import { Slider } from "@mui/material";

/* eslint-disable react/prop-types */
export function YearSelector({ selected, changeSelected }) {
  return (
    <div
      className="container"
      style={{
        position: "absolute",
        bottom: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "50%",
        background: "linear-gradient(rgb(230,230,230),rgb(255,255,255))",
        padding: "0 20px",
        borderRadius: "15px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Slider
        aria-label="Year"
        defaultValue={2021}
        valueLabelDisplay="auto"
        step={1}
        marks
        min={2015}
        max={2023}
        value={selected}
        onChange={(newValue) => {
          changeSelected(newValue.target.value);
        }}
        size="medium"
      />
    </div>
  );
}
