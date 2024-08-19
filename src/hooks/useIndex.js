import { useEffect, useState } from "react";
import Papa from "papaparse";

export function useIndex() {
  const [indexInfo, setIndexInfo] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const file1path = "src/data/index_definition.csv";
        const file2path = "src/data/index_representation.csv";

        const response1 = await fetch(file1path);
        const csv1 = await response1.text();
        const data1 = Papa.parse(csv1, { header: true }).data;

        const response2 = await fetch(file2path);
        const csv2 = await response2.text();
        const data2 = Papa.parse(csv2, { header: true }).data;

        const joinedData = data1.map((item1) => {
          const match = data2.find(
            (item2) => item2.Variable === item1.Variable
          );
          return match ? { ...item1, Tipo: match.Tipo } : item1;
        });

        const hashMap = joinedData.reduce((acc, item) => {
          acc[item.Variable] = item;
          return acc;
        }, {});

        setIndexInfo(hashMap);
      } catch (error) {
        console.error(
          `Error fetch the data from the index definition csv: ${error}`
        );
      }
    }
    fetchData();
  }, []);

  return { indexInfo };
}
