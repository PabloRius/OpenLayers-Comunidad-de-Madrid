/* eslint-disable react/prop-types */
import { SearchBar } from "./SearchBar";
import { FloatingMenu } from "./FloatingMenu";

import "./NavMenu.css";
import { useState } from "react";

export function NavMenu({ toolTip, searchMunicipality, clearFeature }) {
  const [enableMenu, setEnableMenu] = useState(false);

  const handleMenuToggle = () => {
    setEnableMenu((prev) => {
      if (prev === true) {
        clearFeature();
      }
      return !prev;
    });
  };

  return (
    <nav className="NavMenu">
      <FloatingMenu
        enabled={enableMenu}
        toggleEnabled={handleMenuToggle}
        toolTip={toolTip}
      />
      <SearchBar searchMunicipality={searchMunicipality} />
    </nav>
  );
}
