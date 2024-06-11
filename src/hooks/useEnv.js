import { useEffect, useState } from "react";

export function useEnv() {
  const [environment, setEnvironment] = useState("dev");

  useEffect(() => {
    const prod = import.meta.env.PROD;
    if (prod) {
      setEnvironment("prod");
    }
  }, []);

  return { environment };
}
