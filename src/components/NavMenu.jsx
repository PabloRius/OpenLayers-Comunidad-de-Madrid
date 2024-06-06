/* eslint-disable react/prop-types */
import { SearchBar } from "./SearchBar";
import { FloatingMenu } from "./FloatingMenu";

import "./NavMenu.css";
import { useState } from "react";

export function NavMenu({ toolTip }) {
  const [enableMenu, setEnableMenu] = useState(false);

  const handleMenuToggle = () => {
    setEnableMenu((prev) => !prev);
  };

  return (
    <nav className="NavMenu">
      <FloatingMenu
        enabled={enableMenu}
        toggleEnabled={handleMenuToggle}
        toolTip={toolTip}
      />
      <SearchBar />
    </nav>
  );
}
