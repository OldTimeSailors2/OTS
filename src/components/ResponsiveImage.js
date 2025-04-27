"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const ResponsiveImage = ({ images }) => {
  const [isDesktopOrLaptop, setIsDesktopOrLaptop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktopOrLaptop(window.innerWidth >= 1280);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative w-auto h-full">
      {isDesktopOrLaptop ? (
        <Image
          src={images.desktop.url}
          quality={100}
          priority={true}
          alt="our clients"
          sizes="70vw"
          fill
          className="object-contain flex items-center justify-center py-3"
        />
      ) : (
        <Image
          src={images.mobile.url}
          quality={100}
          priority={true}
          alt="our clients"
          sizes="90vw"
          fill
          className="object-contain flex items-center justify-center p-2"
        />
      )}
    </div>
  );
};

export default ResponsiveImage;
