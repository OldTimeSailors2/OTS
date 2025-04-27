"use client";

import { usePathname } from "next/navigation";
import { useLoader } from "@/context/LoaderContext";
import { useState, useEffect } from "react";
import { useNavbarColor } from "@/context/NavbarColorProvider";

const Footer = () => {
  const [isFooterBlack, setIsFooterBlack] = useState(true);
  const pathname = usePathname();
  const defaultSettings = { loader: 1, photos: true };
  const settings = useLoader() || defaultSettings;
  const { navbarColor } = useNavbarColor();

  useEffect(() => {
    if (pathname === "/" || pathname === "/media" || pathname === "/reviews" || pathname === "/our-clients" || navbarColor === "light") {
      setIsFooterBlack(false);
    } else setIsFooterBlack(true);
  }, [pathname, navbarColor]);
  return (
    <footer
      className={`bottom-0 w-screen flex justify-center items-center  ${pathname === "/" ? "py-0.5 xl:p-0.5 2k:py-2" : "py-0.5 md1:py-1.5"} ${
        navbarColor === "dark" || pathname === "/tickets" ? "bg-beigePatternMobile bg-cover z-50" : ""
      }${navbarColor === "light" ? "bg-darkBlue bg-cover z-50" : ""}
      `}
      style={{
        opacity: settings?.loader,
        pointerEvents: settings?.photos ? "auto" : "none",
      }}
    >
      <p
        className={`${isFooterBlack ? "text-darkBlue" : "text-beige"} ${pathname === "/tickets/map-view" ? " backdrop-blur-[4px] z-50" : ""}
          font-txt text-[9px] md1:text-lg md:text-xl xl:text-base 2k:text-3xl 4k:text-5xl uppercase `}
      >
        OLD TIME SAILORS LTD.®
      </p>
    </footer>
  );
};

export default Footer;
