/* eslint-disable react/prop-types */

import "./Loader.css";

export function Loader({ loading }) {
  return (
    <>
      {loading ? (
        <div className="Loader">
          <p>Loading data...</p>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
