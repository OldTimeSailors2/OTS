"use client";

import { createContext, useContext, useEffect, useRef } from "react";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

const LoaderContext = createContext({});

export const LoaderProvider = ({ children }) => {
  const loaderAPI = process.env.NEXT_PUBLIC_LOADER_API || ""; // ✅ fallback
  const warm = 180000;
  const interval = 172800000;
  const warmTimer = useRef(null);

  // ✅ Si no hay loaderAPI, no hacemos nada
  const isLoaderEnabled = Boolean(loaderAPI);

  // ✅ Reintentos controlados
  const attemptsRef = useRef(0);
  const maxA = 3;

  const setWarm = () => {
    if (!isLoaderEnabled) return;

    fetch(loaderAPI)
      .then((response) => {
        if (!response.ok) {
          console.warn(`Warm error ${response.status}`);
          if (attemptsRef.current < maxA) {
            attemptsRef.current += 1;
            setTimeout(setWarm, 60000);
          }
        } else {
          // console.log("Warm");
          attemptsRef.current = 0;
        }
      })
      .catch((error) => {
        console.warn("Warm error:", error?.message || error);
      });
  };

  const enhancedFetcher = async (url) => {
    // ✅ si no hay url (loader deshabilitado), devolvemos settings vacíos
    if (!url) return {};

    if (warmTimer.current) clearTimeout(warmTimer.current);
    warmTimer.current = setTimeout(setWarm, interval - warm);

    return fetcher(url);
  };

  // ✅ Si loader no está habilitado, SWR no debe ejecutarse
  const { data, error } = useSWR(isLoaderEnabled ? loaderAPI : null, enhancedFetcher, {
    refreshInterval: isLoaderEnabled ? interval : 0,
    revalidateOnFocus: false,
  });

  useEffect(() => {
    if (error) console.warn("Loader settings fetch failed:", error?.message || error);
  }, [error]);

  return (
    <LoaderContext.Provider value={data || {}}>
      {children}
    </LoaderContext.Provider>
  );
};

export const useLoader = () => useContext(LoaderContext);
