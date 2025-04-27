"use client";

import { useEffect, useState } from "react";

const useBrowserDetection = () => {
  const [isSafari, setIsSafari] = useState(false);

  useEffect(() => {
    const userAgent = window.navigator.userAgent;
    const safari =
      /Safari/.test(userAgent) &&
      !/Chrome/.test(userAgent) &&
      !/Chromium/.test(userAgent);
    setIsSafari(safari);
  }, []);

  return { isSafari };
};

export default useBrowserDetection;
