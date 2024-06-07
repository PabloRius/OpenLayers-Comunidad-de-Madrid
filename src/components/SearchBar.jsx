/* eslint-disable react/prop-types */
import { useCallback, useEffect, useRef, useState } from "react";
import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  Tooltip,
  debounce,
} from "@mui/material";

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

export function SearchBar({
  searchMunicipality,
  searchResults,
  selected,
  updateSelected,
}) {
  const { search, updateSearch, error } = useSearch();
  const [showResults, setShowResults] = useState(false);
  const inputRef = useRef(null);

  const debouncedSearchMunicipalities = useCallback(
    debounce((search) => {
      searchMunicipality({ byName: search });
    }, 300),
    [searchMunicipality]
  );

  const handleSelect = (name) => {
    if (selected !== name) {
      updateSelected(name);
    }
  };

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

  const handleFocus = () => {
    if (searchResults.length > 0) {
      setShowResults(true);
    }
  };

  const handleBlur = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setShowResults(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      setShowResults(false);
      inputRef.current.blur();
    }
  };

  return (
    <search
      className="searchBar-container"
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      tabIndex="0"
    >
      <Tooltip title={error} placement="right">
        <form onSubmit={handleSubmit} className={error ? "error" : ""}>
          <input
            ref={inputRef}
            required
            value={search}
            type="text"
            name="search"
            onChange={handleChange}
            onFocus={handleFocus}
          />
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
      {searchResults.length > 0 && showResults && (
        <List
          className="results"
          sx={{
            width: "100%",
            maxHeight: 300,
            overflowY: "auto",
            bgcolor: "background.paper",
          }}
        >
          {searchResults.map((find) => (
            <ListItem
              key={find}
              button={true}
              selected={selected === find}
              onClick={() => {
                handleSelect(find);
              }}
            >
              <ListItemText primary={find} />
            </ListItem>
          ))}
        </List>
      )}
    </search>
  );
}
