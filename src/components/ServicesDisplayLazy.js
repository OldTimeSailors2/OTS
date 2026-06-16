"use client";

import dynamic from "next/dynamic";

// ---------------------------------------------------------------------------
// ServicesLoadingSkeleton — SRP: isolated loading UI (no data logic here)
// ---------------------------------------------------------------------------

/**
 * Skeleton shown by the dynamic import while ServicesDisplay hydrates.
 * Renders six hexagon placeholders and one octagon placeholder to match
 * the shape of the real ServicesDisplay layout.
 */
const ServicesLoadingSkeleton = () => (
  <div className="w-full px-0.5 min-[600px]:px-3 xl:px-4 flex max-xl:justify-center xl:flex-col xl:items-center">
    <div className="flex flex-col justify-between xl:w-full xl:flex-row xl:justify-evenly xl:px-3 2xl:px-4 fullHD:px-6 2k:px-9 4k:px-16">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="services-hexagon !bg-transparent !before:!bg-transparent"
        />
      ))}
    </div>
    <div className="services-octagon !bg-transparent !before:!bg-transparent" />
  </div>
);

// ---------------------------------------------------------------------------
// ServicesDisplay — loaded client-side only (ssr: false) to avoid SSR issues
// with browser-specific layout calculations inside the component. Lives in
// this client module because Next 15 disallows `ssr: false` in Server
// Components.
// ---------------------------------------------------------------------------

const ServicesDisplay = dynamic(() => import("@/components/ServicesDisplay"), {
  ssr: false,
  loading: ServicesLoadingSkeleton,
});

export default ServicesDisplay;
