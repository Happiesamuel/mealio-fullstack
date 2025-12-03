import { useCallback, useEffect, useRef, useState } from "react";

interface FetchOptions<T> {
  /** API URL to fetch from */
  url: string;

  /** Optional transform fn (e.g., data.results → just recipes) */
  select?: (raw: any) => T;

  /** Automatically run on mount */
  auto?: boolean;

  /** Optional dependencies for auto-refetch */
  deps?: any[];
}

export function useFetch<T = any>({
  url,
  select,
  auto = true,
  deps = [],
}: FetchOptions<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Abort controller to avoid updates on unmounted component
  const abortRef = useRef<AbortController | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      abortRef.current?.abort(); // cancel previous request
      abortRef.current = new AbortController();

      const res = await fetch(url, {
        signal: abortRef.current.signal,
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const raw = await res.json();
      setData(select ? select(raw) : raw);
    } catch (err: any) {
      if (err.name !== "AbortError") {
        setError(err.message || "Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  }, [url, select]);

  // auto-fetch on mount or when dependencies change
  useEffect(() => {
    if (auto) fetchData();
    return () => abortRef.current?.abort();
  }, [...deps]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
}
