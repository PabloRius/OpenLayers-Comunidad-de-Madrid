import { useEffect, useState } from "react";
import axios from "axios";
import { useUrls } from "./useUrls";

export function useData({ municipality }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { api_url } = useUrls();

  useEffect(() => {
    if (!municipality) {
      setData(null);
      return;
    }
    const suffix = `?municipality=${municipality}`;
    console.debug(`Fetching data from: ${api_url}${suffix}`);
    const fetchData = async () => {
      try {
        setLoading(true);
        await axios.get(api_url + suffix).then((res) => {
          res = res.data;
          setData(res);
          setLoading(false);
        });
      } catch (error) {
        setError("Error fetching the data: ", error);
        setData(null);
        console.error("Error fetching the data: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [municipality, api_url]);

  return { data, loading, error };
}
