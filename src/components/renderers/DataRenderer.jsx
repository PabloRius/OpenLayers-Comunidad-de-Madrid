/* eslint-disable react/prop-types */
import { BarChart } from "./BarChart";

import "./DataRenderer.css";

export function DataRenderer({ data }) {
  return data && data.length > 0 ? (
    <section className="dataSection">
      {data[0]["municipio_nombre"] && data[0]["municipio_nombre"] !== "" && (
        <>
          <h3>{data[0]["municipio_nombre"]}</h3>
          {data[0]["Índice de Capital Humano"] && (
            <>
              <h4>Índice de Capital humano</h4>
              <BarChart
                pctg={parseFloat(data[0]["Índice de Capital Humano"]) || null}
              />
            </>
          )}
        </>
      )}
    </section>
  ) : !data ? (
    <>
      <p>Loading data...</p>
    </>
  ) : data.length === 0 ? (
    <>
      <p>No data found {}</p>
    </>
  ) : (
    <></>
  );
}
