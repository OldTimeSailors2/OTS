"use client";
import { useState, useEffect } from "react";
import FamilyMobile from "./FamilyMobile";
import FamilyLaptop from "./FamilyLaptop";

const BREAKPOINTS = [
  { minWidth: 0,    maxWidth: 374,      Component: FamilyMobile,  variant: "s"       },
  { minWidth: 375,  maxWidth: 424,      Component: FamilyMobile,  variant: "m"       },
  { minWidth: 425,  maxWidth: 767,      Component: FamilyMobile,  variant: "l"       },
  { minWidth: 768,  maxWidth: 1023,     Component: FamilyMobile,  variant: "tablet"  },
  { minWidth: 1024, maxWidth: 1439,     Component: FamilyLaptop,  variant: null      },
  { minWidth: 1440, maxWidth: Infinity, Component: FamilyLaptop,  variant: "laptopL" },
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

export const FamilyLanding = ({ data }) => {
  const width = useBreakpoint();
  if (width === null) return null;

  const match = BREAKPOINTS.find(({ minWidth, maxWidth }) => width >= minWidth && width <= maxWidth);
  if (!match) return null;

  const { Component, variant } = match;
  return <Component data={data} {...(variant ? { variant } : {})} />;
};
export default FamilyLanding;
