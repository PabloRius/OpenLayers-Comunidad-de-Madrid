/* eslint-disable react/prop-types */
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";

import "./FloatingMenu.css";
import { IconButton } from "@mui/material";
import { useEffect } from "react";

function useMenuData({ toolTip, enabled, toggleEnabled }) {
  useEffect(() => {
    if (toolTip && !enabled) {
      toggleEnabled();
    } else if (!toolTip && enabled) {
      toggleEnabled();
    }
  }, [toolTip]);
}

export function FloatingMenu({ enabled, toggleEnabled, toolTip }) {
  useMenuData({ toolTip, enabled, toggleEnabled });
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
          {toolTip ? <p>{toolTip}</p> : <></>}
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
