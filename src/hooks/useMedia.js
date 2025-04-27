"use client";

import { useContext } from "react";
import { MediaContext } from "@/context/MediaContext";

const useMedia = () => {
  const context = useContext(MediaContext);

  if (context === undefined) {
    throw new Error("useMedia must be used within a MediaProvider");
  }

  return context;
};

export default useMedia;
