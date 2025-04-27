"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const DynamicDecoMedia = () => {
  const [windowWidth, setWindowWidth] = useState(undefined);

  useEffect(() => {
    setWindowWidth(window.innerWidth);

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    let debounceTimer;
    const debouncedHandleResize = () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(handleResize, 100);
    };

    window.addEventListener("resize", debouncedHandleResize);
    return () => window.removeEventListener("resize", debouncedHandleResize);
  }, []);

  const imageSrc =
    windowWidth >= 1280
      ? "/assets/media-deco-2-hor.svg"
      : "/assets/media-deco-2-ver.svg";

  return (
    <>
      <Image
        src={imageSrc}
        width={35}
        height={35}
        alt="Decoration 2"
        className="grow"
      />
    </>
  );
};

export default DynamicDecoMedia;
