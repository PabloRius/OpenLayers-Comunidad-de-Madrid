/* eslint-disable react/prop-types */
import { SearchBar } from "../forms/SearchBar";
import { FloatingMenu } from "./FloatingMenu";

import "./NavMenu.css";

export function NavMenu({ selected, updateSelected, data, year }) {
  return (
    <nav className="NavMenu">
      <FloatingMenu selected={selected} data={data} year={year} />
      <SearchBar selected={selected} updateSelected={updateSelected} />
    </nav>
  );
}
