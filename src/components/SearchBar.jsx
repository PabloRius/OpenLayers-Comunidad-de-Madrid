import { useEffect, useRef, useState } from "react";
import { IconButton, Tooltip } from "@mui/material";

import TravelExploreIcon from "@mui/icons-material/TravelExplore";

import "./SearchBar.css";

function useSearch() {
  const [search, updateSearch] = useState("");
  const [error, setError] = useState(null);
  const isFirstInput = useRef(true);

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === "";
      return;
    }

    if (search === "") {
      setError("Search can't be empty");
      return;
    }

    if (search.length < 3) {
      setError("Search must have at least 3 characters");
      return;
    }

    setError(null);
  }, [search]);

  return { search, updateSearch, error };
}

export function SearchBar() {
  const { search, updateSearch, error } = useSearch();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(search);
  };

  const handleChange = (event) => {
    const newSearch = event.target.value;
    updateSearch(newSearch);

    // Operate with the search
  };

  return (
    <Tooltip title={error} placement="right">
      <form onSubmit={handleSubmit} className={error ? "error" : ""}>
        <input required type="text" name="search" onChange={handleChange} />
        <IconButton
          size="large"
          disabled={error ? true : false}
          color={error ? "error" : "default"}
        >
          <TravelExploreIcon />
        </IconButton>
      </form>
    </Tooltip>
  );
}
