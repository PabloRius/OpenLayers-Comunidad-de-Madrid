import { useEnv } from "./useEnv";

export function useUrls() {
  const { environment } = useEnv();

  const api_url =
    environment === "dev"
      ? "http://localhost:5000/api/v0.0.1/mongodata"
      : `https://openlayers-comunidad-de-madrid-backend.onrender.com/api/v0.0.1/mongodata`;

  return { api_url };
}
