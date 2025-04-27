"use client";

import { NextUIProvider } from "@nextui-org/system";
import { LoaderProvider } from "@/context/LoaderContext";

const LandingWrapper = ({ children }) => {
  return (
    <NextUIProvider>
      <LoaderProvider>{children}</LoaderProvider>
    </NextUIProvider>
  );
};

export default LandingWrapper;
