/* eslint-disable react/prop-types */
import CloseIcon from "@mui/icons-material/Close";

import "./FloatingMenu.css";
import { IconButton } from "@mui/material";
import { DataRenderer } from "../renderers/DataRenderer";

export function FloatingMenu({ enabled, toggleEnabled, selected, data }) {
  return (
    <>
      {enabled && (
        <section className="FloatingMenu">
          <header>
            <h2>Floating Menu</h2>
            <IconButton
              size="large"
              className="CloseButton"
              onClick={toggleEnabled}
            >
              <CloseIcon />
            </IconButton>
          </header>
          {selected ? (
            <main>
              <DataRenderer data={data} />
            </main>
          ) : (
            <></>
          )}
        </section>
      )}
    </>
  );
}
