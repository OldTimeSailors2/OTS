"use client";

import { createContext, useContext, useEffect, useRef } from "react";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

const LoaderContext = createContext({});

export const LoaderProvider = ({ children }) => {
  const loaderAPI = process.env.NEXT_PUBLIC_LOADER_API;
  const warm = 180000;
  const interval = 172800000;
  const warmTimer = useRef(null);
  let a = 0;
  const maxA = 3;

  const setWarm = () => {
    fetch(loaderAPI)
      .then((response) => {
        if (!response.ok) {
          console.error(`Warm error ${response.status}`);
          if (a < maxA) {
            setTimeout(setWarm, 60000);
            a++;
          }
        } else {
          console.log("Warm");
        }
      })
      .catch((error) => {
        console.error("Warm error:", error);
      });
  };

  const enhancedFetcher = async (url) => {
    if (warmTimer.current) {
      clearTimeout(warmTimer.current);
    }
    warmTimer.current = setTimeout(setWarm, interval - warm);

    return fetcher(url);
  };

  const { data, error } = useSWR(loaderAPI, enhancedFetcher, {
    refreshInterval: interval,
  });

  useEffect(() => {
    if (error) console.error("Failed to fetch settings:", error);
  }, [error]);

  return (
    <LoaderContext.Provider value={data}>{children}</LoaderContext.Provider>
  );
};

export const useLoader = () => useContext(LoaderContext);
