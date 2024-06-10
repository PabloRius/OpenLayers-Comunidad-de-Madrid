import { useEffect, useState } from "react";
import axios from "axios";
import { data_api_url } from "../constants/urls";

export function useData({ municipality, year }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!municipality || !year) return;
    const request_url =
      data_api_url + `?year=${year}&municipality=${municipality}`;
    console.log(request_url);
    const fetchData = async () => {
      try {
        setLoading(true);
        await axios.get(request_url).then((res) => {
          res = res.data;
          setData(res);
          setLoading(false);
        });
      } catch (error) {
        setError("Error fetching the data: ", error);
        console.error("Error fetching the data: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [municipality, year]);

  return { data, loading, error };
}
