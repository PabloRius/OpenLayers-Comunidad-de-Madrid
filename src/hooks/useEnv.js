import { useEffect, useState } from "react";

export function useEnv() {
  const [environment, setEnvironment] = useState("dev");

  useEffect(() => {
    console.log(import.meta.env.SSR);
    const env = import.meta.env.VITE_ENV;
    if (env) {
      setEnvironment(env);
    }
  }, []);

  return { environment };
}
