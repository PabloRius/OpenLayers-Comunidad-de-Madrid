/* eslint-disable react/prop-types */
import { LineChart } from "@mui/x-charts/LineChart";

import "./TableChart.css";
import "./TimeLine.css";

export function TimeLine({ indicator, data }) {
  if (!indicator || !data) return;

  let years = Object.keys(data);

  const values = years.map((year) => {
    if (data[year][indicator]) {
      return parseFloat(data[year][indicator]);
    } else return null;
  });
  console.log(values);

  years = Object.keys(data).map((year) => parseInt(year));

  return (
    <div
      style={{
        width: "100%",
        border: "1px solid black",
        height: "auto",
      }}
    >
      <LineChart
        tooltip={{
          trigger: "item",
          classes: {
            root: "custom-linechart-tootlip-root",
            cell: "custom-linechart-tootlip-cell",
          },
        }}
        height={150}
        grid={{ horizontal: true, vertical: true }}
        series={[
          {
            data: values,
          },
        ]}
        margin={{
          top: 10,
          bottom: 20,
        }}
        xAxis={[
          {
            data: years,
            valueFormatter: (value) => String(value),
            max: years[years.length - 1],
            min: years[0],
          },
        ]}
        yAxis={[
          {
            data: values,
            max: 1,
            min: 0.5,
          },
        ]}
      />
    </div>
  );
}
