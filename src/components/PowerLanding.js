"use client";
import { useEffect, useRef } from "react";
import PowerTablet from "./PowerTablet";
import PowerLaptop from "./PowerLaptop";
import { Power1360 } from "./Power1360";
import { PowerMobileS } from "./PowerMobileS";
import { PowerMobileM } from "./PowerMobileM";
import { PowerMobileL } from "./PowerMobileL";
import { PowerLaptopL } from "./PowerLaptopL";
import { PowerDesktop } from "./PowerDesktop";
import PowerDesktopL from "./PowerDesktopL";

export const PowerLanding = ({ data }) => {
  return (
    <div className="">
      {/* Mobile S - 320px */}
      <div className="block min-[375px]:hidden">
        <div className="w-[320px] min-h-screen relative mx-auto pb-[30px]">
          <PowerMobileS data={data} />
        </div>
      </div>

      {/* Mobile M - 375px */}
      <div className="hidden min-[375px]:block min-[425px]:hidden w-full">
        <div className="w-[375px] min-h-screen relative mx-auto pb-[85px]">
          <PowerMobileM data={data} />
        </div>
      </div>
      {/* Mobile L - 425px */}
      <div className="hidden min-[425px]:block min-[768px]:hidden">
        <div className="w-[425px] min-h-screen relative mx-auto pb-[150px]">
          <PowerMobileL data={data} />
        </div>
      </div>
      <div className="hidden min-[768px]:block min-[1024px]:hidden">
        <div className="w-[768px] min-h-screen relative mx-auto pb-[120px]">
          <PowerTablet data={data} />
        </div>
      </div>

      {/* Laptop - 1024px */}
      <div className="hidden min-[1024px]:block min-[1360px]:hidden overflow-auto">
        <div className="w-[1024px] min-h-screen relative mx-auto">
          <PowerLaptop data={data} />
        </div>
      </div>
      {/* Laptop - 1360px */}
      <div className="hidden min-[1360px]:block min-[1440px]:hidden overflow-auto">
        <div className="w-[1360px] min-h-screen relative mx-auto">
          <Power1360 data={data} />
        </div>
      </div>
      {/* Laptop L - 1440px */}
      <div className="hidden min-[1440px]:block min-[1680px]:hidden overflow-auto">
        <div className="w-[1440px] min-h-screen relative mx-auto">
          <PowerLaptopL data={data} />
        </div>
      </div>
      {/* Desktop - 1600px */}
      <div className="hidden min-[1680px]:block min-[1920px]:hidden overflow-auto">
        <div className="w-[1680px] min-h-screen relative mx-auto">
          <PowerDesktop data={data} />
        </div>
      </div>
      {/* Desktop - 1920px */}
      <div className="hidden min-[1920px]:block overflow-auto">
        <div className="w-[1920px] min-h-screen relative mx-auto">
          <PowerDesktopL data={data} />
        </div>
      </div>
    </div>
  );
};
export default PowerLanding;
