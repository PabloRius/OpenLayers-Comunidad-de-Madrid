import { Slider } from "@mui/material";

/* eslint-disable react/prop-types */
export function YearSelector({ selected, changeSelected }) {
  return (
    <div
      className="container"
      style={{
        position: "absolute",
        bottom: "10px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "50%",
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
