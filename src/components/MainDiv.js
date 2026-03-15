"use client";

import { useLoader } from "@/context/LoaderContext";

const MainDiv = ({ children, className }) => {
  const defaultSettings = { loader: 1, photos: true };
  const settings = useLoader() || defaultSettings;

  return (
    <main
      className={className}
      style={{
        opacity: settings?.loader,
        pointerEvents: "auto",
      }}
    >
      {children}
    </main>
  );
};

export default MainDiv;