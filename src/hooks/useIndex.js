import { useEffect, useState } from "react";
import Papa from "papaparse";

export function useIndex() {
  const [indexInfo, setIndexInfo] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const file1path = "src/data/index_definition.csv";
      const file2path = "src/data/index_representation.csv";

      const response1 = await fetch(file1path);
      const csv1 = await response1.text();
      const data1 = Papa.parse(csv1, { header: true }).data;

      const response2 = await fetch(file2path);
      const csv2 = await response2.text();
      const data2 = Papa.parse(csv2, { header: true }).data;

      const joinedData = data2.map((item1) => {
        const match = data1.find((item2) => item2.Variable === item1.Variable);
        return { ...match, Tipo: item1.Tipo, Depende: item1.Depende };
      });

      const hashMap = joinedData.reduce((acc, item) => {
        if (item.Depende) {
          if (!acc[item.Depende]) acc[item.Depende] = {};
          if (!acc[item.Depende].Subindex) acc[item.Depende].Subindex = {};
          acc[item.Depende].Subindex[item.Variable] = item;
        } else {
          acc[item.Variable] = item;
        }
        return acc;
      }, {});

      setIndexInfo(hashMap);
    }
    fetchData();
  }, []);

  return { indexInfo };
}
