"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const ResponsiveImage = ({ images }) => {
  const [isDesktopOrLaptop, setIsDesktopOrLaptop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const isDesk = window.innerWidth >= 1280;
      setIsDesktopOrLaptop(isDesk);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const desktopSrc = images?.desktop?.url ? String(images.desktop.url).trim() : "";
  const mobileSrc = images?.mobile?.url ? String(images.mobile.url).trim() : "";

  const src = isDesktopOrLaptop ? desktopSrc : mobileSrc;

  // ✅ Debug rápido (puedes quitarlo luego)
  useEffect(() => {
    console.log("[ResponsiveImage] mode:", isDesktopOrLaptop ? "desktop" : "mobile");
    console.log("[ResponsiveImage] src:", src);
  }, [isDesktopOrLaptop, src]);

  if (!src) {
    console.warn("[ResponsiveImage] Missing src. images =", images);
    return (
      <div className="relative w-auto h-full bg-white/10 rounded-md" />
    );
  }

  return (
    <div className="relative w-auto h-full">
      <Image
        src={src}
        quality={100}
        priority={true}
        alt="our clients"
        sizes={isDesktopOrLaptop ? "70vw" : "90vw"}
        fill
        className={
          isDesktopOrLaptop
            ? "object-contain flex items-center justify-center py-3"
            : "object-contain flex items-center justify-center p-2"
        }
        // ✅ CLAVE: evita /_next/image (y por ende el 402 en Vercel Preview)
        unoptimized
        // ✅ Debug si falla carga
        onError={(e) => console.error("[ResponsiveImage] Image error:", src, e)}
        onLoad={() => console.log("[ResponsiveImage] Loaded:", src)}
      />
    </div>
  );
};

export default ResponsiveImage;
