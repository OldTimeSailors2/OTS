"use client";
import MainDiv from "@/components/MainDiv";
import ViewSelector from "@/components/ViewSelector";
import { useNavbarColor } from "@/context/NavbarColorProvider";
import { useEffect } from "react";

const TicketsComponent = () => {
  const { setNavbarColor } = useNavbarColor();
  useEffect(() => {
    setNavbarColor("dark");
  }, []);
  return (
    <MainDiv className="w-screen h-dvh bg-beigePatternMobile md1:bg-beigePatternTablet xl:bg-beigePattern bg-contain pt-[40px] xs:pt-[35px] sm:pt-[140px] fullHD:pt-[172px] 2k:pt-[204px] 4k:pt-[268px] pb-[18px] md1:pb-[44px] xl:pb-[40px] 2k:pb-[52px] 4k:pb-[64px]">
      <ViewSelector></ViewSelector>
    </MainDiv>
  );
};

export default TicketsComponent;
