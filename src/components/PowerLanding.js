"use client";
import { useState, useEffect } from "react";
import PowerLaptop from "./PowerLaptop";
import { Power1360 } from "./Power1360";
import { PowerMobile } from "./PowerMobile";
import { PowerDesktop } from "./PowerDesktop";
import PowerDesktopL from "./PowerDesktopL";

const BREAKPOINTS = [
  { minWidth: 0,    maxWidth: 374,  Component: PowerMobile,   variant: "s"      },
  { minWidth: 375,  maxWidth: 424,  Component: PowerMobile,   variant: "m"      },
  { minWidth: 425,  maxWidth: 767,  Component: PowerMobile,   variant: "l"      },
  { minWidth: 768,  maxWidth: 1023, Component: PowerLaptop,   variant: "tablet" },
  { minWidth: 1024, maxWidth: 1359, Component: PowerLaptop,   variant: null     },
  { minWidth: 1360, maxWidth: 1439, Component: Power1360,     variant: null     },
  { minWidth: 1440, maxWidth: 1679, Component: PowerLaptop,   variant: "lg"     },
  { minWidth: 1680, maxWidth: 1919, Component: PowerDesktop,  variant: null     },
  { minWidth: 1920, maxWidth: Infinity, Component: PowerDesktopL, variant: null },
];

function useBreakpoint() {
  const [width, setWidth] = useState(null);
  useEffect(() => {
    const update = () => setWidth(window.innerWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return width;
}

export const PowerLanding = ({ data }) => {
  const width = useBreakpoint();
  if (width === null) return null;

  const match = BREAKPOINTS.find(({ minWidth, maxWidth }) => width >= minWidth && width <= maxWidth);
  if (!match) return null;

  const { Component, variant } = match;
  return <Component data={data} {...(variant ? { variant } : {})} />;
};
export default PowerLanding;
