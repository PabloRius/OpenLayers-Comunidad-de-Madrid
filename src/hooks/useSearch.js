import { useState, useRef, useEffect } from "react";

import { parseSearch } from "../services/search";

export function useSearch() {
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
