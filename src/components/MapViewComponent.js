"use client";
import { useEffect } from "react";
import Maps from "@/components/Maps";
import MapsWrapper from "@/wrappers/MapsWrapper";
import { useNavbarColor } from "@/context/NavbarColorProvider";

const MapViewComponent = ({ markersList }) => {
  const { setNavbarColor } = useNavbarColor();

  useEffect(() => {
    setNavbarColor("dark");
  }, []);

  return (
    <MapsWrapper>
      <Maps markersList={markersList} />
    </MapsWrapper>
  );
};

export default MapViewComponent;
