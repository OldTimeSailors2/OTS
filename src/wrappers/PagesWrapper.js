"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { NextUIProvider } from "@nextui-org/system";
import { LoaderProvider } from "@/context/LoaderContext";
import { NavbarColorProvider } from "@/context/NavbarColorProvider";

const PagesWrapper = ({ children }) => {
  return (
    <NextUIProvider>
      <LoaderProvider>
        <NavbarColorProvider>
          <Navbar/>
          {children}
          <Footer />
        </NavbarColorProvider>
      </LoaderProvider>
    </NextUIProvider>
  );
};

export default PagesWrapper;
