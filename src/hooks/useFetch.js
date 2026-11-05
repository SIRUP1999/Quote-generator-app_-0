import { useState, useEffect, useCallback } from "react";

export function useFetch(url) {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("loading");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`);
        }

        const data = await res.json();
        setData(data);
        setStatus("success");
      } catch (err) {
        if (err.name === "AbortError") return;
        setStatus("error");
      }
    }

    load();

    return () => controller.abort();
  }, [url, reloadKey]);

  const refetch = useCallback(() => {
    setStatus("loading");
    setReloadKey((key) => key + 1);
  }, []);

  return { data, status, refetch };
}
