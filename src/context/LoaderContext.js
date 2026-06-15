"use client";

import { createContext, useContext, useEffect, useRef } from "react";
import useSWR from "swr";

const fetcher = async (url) => {
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Loader fetch failed: ${res.status} ${res.statusText}`);
  }
  return res.json();
};

const LoaderContext = createContext({});

export const LoaderProvider = ({ children }) => {
  const loaderAPI = process.env.NEXT_PUBLIC_LOADER_API || "";
  const warm = 180000; // 3 min
  const interval = 172800000; // 48h
  const warmTimer = useRef(null);

  // ✅ IMPORTANTE: aunque exista NEXT_PUBLIC_LOADER_API (porque prod la usa),
  // en Preview de Vercel NO debemos llamarla (CORS).
  const isVercelPreview =
    typeof window !== "undefined" &&
    (window.location.hostname.endsWith(".vercel.app") ||
      window.location.hostname.includes("vercel"));

  const isLoaderEnabled = Boolean(loaderAPI) && !isVercelPreview;

  // ✅ reintentos controlados
  const attemptsRef = useRef(0);
  const maxA = 3;

  const setWarm = () => {
    if (!isLoaderEnabled) return;

    fetch(loaderAPI, { cache: "no-store" })
      .then((response) => {
        if (!response.ok) {
          console.warn(`Warm error ${response.status}`);
          if (attemptsRef.current < maxA) {
            attemptsRef.current += 1;
            setTimeout(setWarm, 60000);
          }
          return;
        }
        attemptsRef.current = 0;
      })
      .catch((error) => {
        console.warn("Warm error:", error?.message || error);
      });
  };

  const enhancedFetcher = async (url) => {
    if (!url) return {};

    if (warmTimer.current) clearTimeout(warmTimer.current);
    warmTimer.current = setTimeout(setWarm, Math.max(0, interval - warm));

    return fetcher(url);
  };

  const { data, error } = useSWR(
    isLoaderEnabled ? loaderAPI : null,
    enhancedFetcher,
    {
      refreshInterval: isLoaderEnabled ? interval : 0,
      revalidateOnFocus: false,
      shouldRetryOnError: false, // ✅ para que no se quede spameando
    }
  );

  useEffect(() => {
    if (error) {
      console.warn(
        "Loader settings fetch failed:",
        error?.message || error
      );
    }
  }, [error]);

  return (
    <LoaderContext.Provider value={data || {}}>
      {children}
    </LoaderContext.Provider>
  );
};

export const useLoader = () => useContext(LoaderContext);
