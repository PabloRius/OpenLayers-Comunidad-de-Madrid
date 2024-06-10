import { useEffect, useState } from "react";

export function useEnv() {
  const [environment, setEnvironment] = useState("dev");

  useEffect(() => {
    console.log(import.meta.env.PROD);
    const env = import.meta.env.VITE_ENV;
    if (env) {
      setEnvironment(env);
    }
  }, []);

  return { environment };
}
