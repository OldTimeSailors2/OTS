"use client";

import dynamic from "next/dynamic";

// Next 15 disallows `ssr: false` in Server Components, so the media page's
// client-only lazy components live in this client module instead.
export const PhotosDisplay = dynamic(() => import("@/components/PhotosDisplay"), {
  ssr: false,
});
export const VideoPlayer = dynamic(() => import("@/components/VideoPlayer"), {
  ssr: false,
});
export const MusicPlayer = dynamic(() => import("@/components/MusicPlayer"), {
  ssr: false,
});
export const SplideCarousel = dynamic(() => import("@/components/SplideCarousel"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[12dvh] gap-2 flex ">
      <div className="bg-transparent flex-shrink-0 w-1/4 h-full rounded-lg"></div>
      <div className="bg-transparent flex-shrink-0 w-1/4 h-full rounded-lg"></div>
      <div className="bg-transparent flex-shrink-0 w-1/4 h-full rounded-lg"></div>
      <div className="bg-transparent flex-shrink-0 w-1/4 h-full rounded-lg"></div>
      <div className="bg-transparent flex-shrink-0 w-1/4 h-full rounded-lg"></div>
    </div>
  ),
});
