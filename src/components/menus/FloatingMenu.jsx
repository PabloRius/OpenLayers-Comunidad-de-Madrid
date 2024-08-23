/* eslint-disable react/prop-types */
import { DataRenderer } from "../renderers/DataRenderer";
import "./FloatingMenu.css";

export function FloatingMenu({ selected, data, year }) {
  return (
    <>
      <section className="FloatingMenu">
        <header>
          <h2>Data records</h2>
        </header>
        {selected ? (
          <main>
            <DataRenderer data={data} year={year} />
          </main>
        ) : (
          <></>
        )}
      </section>
    </>
  );
}
