/* eslint-disable react/prop-types */
import { SearchBar } from "../forms/SearchBar";
import { FloatingMenu } from "./FloatingMenu";

import "./NavMenu.css";
import { useState } from "react";

export function NavMenu({ selected, updateSelected }) {
  const [enableMenu, setEnableMenu] = useState(false);

  const handleMenuToggle = () => {
    setEnableMenu((prev) => {
      if (prev === true) {
        updateSelected(null);
      }
      return !prev;
    });
  };

  return (
    <nav className="NavMenu">
      <FloatingMenu
        enabled={enableMenu}
        toggleEnabled={handleMenuToggle}
        selected={selected}
      />
      <SearchBar selected={selected} updateSelected={updateSelected} />
    </nav>
  );
}
