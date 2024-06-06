/* eslint-disable react/prop-types */
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";

import "./FloatingMenu.css";
import { IconButton } from "@mui/material";

export function FloatingMenu({ enabled, toggleEnabled }) {
  return (
    <>
      {enabled ? (
        <section className="FloatingMenu">
          <header>
            <h2>Floating Menu</h2>
            <IconButton
              size="large"
              className="CloseButton"
              onClick={toggleEnabled}
            >
              <CloseFullscreenIcon />
            </IconButton>
          </header>
          <main>Cuerpo</main>
        </section>
      ) : (
        <section className="FloatingMenuOpen">
          <IconButton
            size="large"
            className="OpenButton"
            onClick={toggleEnabled}
          >
            <OpenInFullIcon />
          </IconButton>
        </section>
      )}
    </>
  );
}
