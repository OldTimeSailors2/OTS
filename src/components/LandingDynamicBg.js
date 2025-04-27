"use client";

import { useState, useEffect } from "react";
import Head from "next/head";
import useBrowserDetection from "@/hooks/useBrowserDetection";

const LandingDynamicBg = () => {
  const { isSafari } = useBrowserDetection();
  const [isSafariLoaded, setIsSafariLoaded] = useState(false);
  const [preloadImage, setPreloadImage] = useState(
    "/assets/backgrounds/fondo-02.webp",
  );

  useEffect(() => {
    // Function to handle screen resizing and image selection
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      const newImage =
        screenWidth >= 1280
          ? "/assets/backgrounds/fondo-01.webp"
          : "/assets/backgrounds/fondo-02.webp";
      setPreloadImage(newImage);
    };

    // Call the function once to set the initial image
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <>
      {/* 1xl:-translate-y-[0] 1xxl:-translate-y-10 fullHD:-translate-y-0 4k:-translate-y-0 */}

      <Head>
        {/* Preload the selected background image */}
        <link rel="preload" as="image" href={preloadImage} />
      </Head>

      {!isSafariLoaded && <div className="absolute inset-0 bg-darkBlue" />}
      <div
        className={`absolute inset-0
          bg-cover
          md1:scale-150 lg:scale-[1.75] xl:scale-y-[1] xl:scale-x-[1] 1xl:scale-y-[1] 1xl:scale-x-[1] 1xxl:scale-[1]
          md1:-translate-y-60 lg:-translate-y-[30%] xl:-translate-y-12 2xl:max-fullHD:-translate-y-20 4xl:-translate-y-28 fullHD:-translate-y-16 4k:-translate-y-28
          md1:-translate-x-14 lg:-translate-x-24 xl:-translate-x-0 1xxl:-translate-x-0
          ${
            isSafari
              ? " -translate-y-[1.5%] iphone-1:translate-y-[0%]"
              : " translate-y-[0%] xs:-translate-y-[0.5%] xs2:-translate-y-[2.5%]"
          }`}
        style={{ backgroundImage: `url(${preloadImage})` }}
        onLoad={() => setIsSafariLoaded(true)}
      />
    </>
  );
};

export default LandingDynamicBg;
