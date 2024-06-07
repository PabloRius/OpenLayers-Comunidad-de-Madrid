/* eslint-disable react/prop-types */
import { useCallback, useEffect, useRef, useState } from "react";
import { IconButton, Tooltip, debounce } from "@mui/material";

import TravelExploreIcon from "@mui/icons-material/TravelExplore";

import "./SearchBar.css";
import { parseSearch } from "../services/search";

function useSearch() {
  const [search, updateSearch] = useState("");
  const [error, setError] = useState(null);
  const isFirstInput = useRef(true);

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === "";
      return;
    }

    setError(parseSearch(search));
  }, [search]);

  return { search, updateSearch, error };
}

export function SearchBar({ searchMunicipality }) {
  const { search, updateSearch, error } = useSearch();

  const debouncedSearchMunicipalities = useCallback(
    debounce((search) => {
      searchMunicipality({ byName: search });
    }, 300),
    [searchMunicipality]
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    searchMunicipality({ byName: search });
  };

  const handleChange = (event) => {
    const newSearch = event.target.value;
    updateSearch(newSearch);

    // Operate with the search
    if (parseSearch(newSearch)) return;
    debouncedSearchMunicipalities(newSearch);
  };

  return (
    <Tooltip title={error} placement="right">
      <form onSubmit={handleSubmit} className={error ? "error" : ""}>
        <input required type="text" name="search" onChange={handleChange} />
        <IconButton
          size="large"
          disabled={error ? true : false}
          color={error ? "error" : "default"}
          type="submit"
        >
          <TravelExploreIcon />
        </IconButton>
      </form>
    </Tooltip>
  );
}
