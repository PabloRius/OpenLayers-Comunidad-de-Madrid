/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  Tooltip,
  debounce,
} from "@mui/material";

import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import CloseIcon from "@mui/icons-material/Close";

import { parseSearch } from "../../services/search";
import { useSearch } from "../../hooks/useSearch";
import "./SearchBar.css";
import { useMapSearch } from "../../hooks/useMapSearch";
import { useMunicipalityData } from "../../hooks/useMunicipalityData";

export function SearchBar({ selected, updateSelected }) {
  const [showResults, setShowResults] = useState(false);
  const { search, updateSearch, error } = useSearch();
  const { searchMunicipality, searchResults } = useMapSearch();
  const { municipalityData } = useMunicipalityData();
  const inputRef = useRef(null);

  const debouncedSearchMunicipalities = debounce((search) => {
    searchMunicipality({ byName: search });
  }, 300);

  const handleSelect = (name) => {
    console.log(selected, name);
    const id = Object.keys(municipalityData).find(
      (lau_id) => municipalityData[lau_id].name === name
    );
    if (selected !== id) {
      updateSelected(id);
      setShowResults(false);
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
    setShowResults(true);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      setShowResults(false);
      inputRef.current.blur();
    }
  };

  const handleReset = () => {
    updateSearch("");
    searchMunicipality({ byName: null });
  };

  return (
    <search
      className="searchBar-container"
      onKeyDown={handleKeyDown}
      tabIndex="0"
    >
      <Tooltip title={error} placement="right">
        <form
          onSubmit={handleSubmit}
          className={error ? "error" : ""}
          onReset={handleReset}
        >
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
            disabled={search !== "" ? false : true}
            type="reset"
          >
            <CloseIcon />
          </IconButton>
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
