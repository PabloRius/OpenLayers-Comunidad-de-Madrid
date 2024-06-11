/* eslint-disable react/prop-types */
import { SearchBar } from "../forms/SearchBar";
import { FloatingMenu } from "./FloatingMenu";

import "./NavMenu.css";
import { useCallback, useEffect, useState } from "react";

export function NavMenu({ selected, updateSelected, data }) {
  const [enableMenu, setEnableMenu] = useState(false);

  const handleMenuToggle = useCallback(() => {
    setEnableMenu((prev) => {
      if (prev === true) {
        updateSelected(null);
      }
      return !prev;
    });
  }, [updateSelected]);

  useEffect(() => {
    if (selected && !enableMenu) {
      handleMenuToggle();
    } else if (!selected && enableMenu) {
      handleMenuToggle();
    }
  }, [selected, enableMenu, handleMenuToggle]);

  return (
    <nav className="NavMenu">
      <FloatingMenu
        enabled={enableMenu}
        toggleEnabled={handleMenuToggle}
        selected={selected}
        data={data}
      />
      <SearchBar selected={selected} updateSelected={updateSelected} />
    </nav>
  );
}
