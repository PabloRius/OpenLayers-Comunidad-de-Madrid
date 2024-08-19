import { useEffect, useState } from "react";
import Papa from "papaparse";

export function useMunicipalityData() {
  const [municipalityData, setMunicipalityData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const file1path = "src/data/municipality_group.json";
        const file2path = "src/data/MadridLAUGeometries (1).csv";

        const response1 = await fetch(file1path);
        const groupData = await response1.json();

        const response2 = await fetch(file2path);
        const csvData = await response2.text();
        const parsedCsvData = Papa.parse(csvData, { header: true }).data;

        const normalizeName = (name) => {
          const words = name.split(" ");
          if (
            words.length > 1 &&
            ["La", "El", "Los", "Las"].includes(words[0])
          ) {
            return `${words.slice(1).join(" ")}, ${words[0]}`;
          }
          return name;
        };

        const normalizedGroupData = {};
        for (const key in groupData) {
          const normalizedKey = normalizeName(key);
          normalizedGroupData[normalizedKey] = groupData[key];
        }

        console.log(`Normalized: ${normalizedGroupData}`);

        const hashMap = parsedCsvData.reduce((acc, item) => {
          const name = item.lau_name;
          const lau_id = item.lau_id;

          if (normalizedGroupData[name] !== undefined) {
            acc[lau_id] = {
              name,
              grupo: normalizedGroupData[name],
            };
          } else {
            console.error(`Name not found: ${name}`);
          }

          return acc;
        }, {});

        setMunicipalityData(hashMap);
      } catch (error) {
        console.error(
          `Error fetch the data from the municipalities definition csv: ${error}`
        );
      }
    }
    fetchData();
  }, []);

  return { municipalityData };
}
