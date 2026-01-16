"use client";

import { useContext } from "react";
import { MediaContext } from "@/context/MediaContext";

const useMedia = () => {
  const context = useContext(MediaContext);

  if (context === undefined) {
    throw new Error("useMedia must be used within a MediaProvider");
  }

  // ✅ Blindaje: playlist/videoList/photoList siempre como arrays
  return {
    ...context,
    playlist: Array.isArray(context?.playlist) ? context.playlist : [],
    videoList: Array.isArray(context?.videoList) ? context.videoList : [],
    photoList: Array.isArray(context?.photoList) ? context.photoList : [],
  };
};

export default useMedia;
