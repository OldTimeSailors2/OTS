"use client";

import { MediaProvider } from "@/context/MediaContext";
import { MusicPlayerProvider } from "@/context/MusicPlayerContext";

const MediaWrapper = ({ children, songs, videos, photos }) => {
  return (
    <MediaProvider playlist={songs} videoList={videos} photoList={photos}>
      <MusicPlayerProvider>{children}</MusicPlayerProvider>
    </MediaProvider>
  );
};

export default MediaWrapper;
