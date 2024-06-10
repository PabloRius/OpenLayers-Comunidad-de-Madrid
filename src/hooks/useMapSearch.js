import { useCallback, useState } from "react";

import names from "../data/municipality_names.json";

export function useMapSearch() {
  const [searchResults, setSearchResults] = useState([]);

  const searchMunicipality = useCallback(({ byName }) => {
    if (byName) {
      const results = names.filter((name) =>
        name.toLowerCase().includes(byName.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, []);

  return { searchResults, searchMunicipality };
}
