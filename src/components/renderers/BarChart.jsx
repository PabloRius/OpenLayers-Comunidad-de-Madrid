/* eslint-disable react/prop-types */
export function BarChart({ pctg }) {
  if (!pctg) return;
  return (
    <div style={{ width: "100%", border: "1px solid black", height: "50px" }}>
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
  );
}
