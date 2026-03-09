"use client";
import PowerLaptop from "./PowerLaptop";
import { Power1360 } from "./Power1360";
import { PowerMobile } from "./PowerMobile";
import { PowerDesktop } from "./PowerDesktop";
import PowerDesktopL from "./PowerDesktopL";

const layouts = [
  {
    wrapperClass: "block min-[375px]:hidden",
    containerClass: "w-[320px] min-h-screen relative mx-auto pb-[30px]",
    Component: PowerMobile,
    variant: "s",
  },
  {
    wrapperClass: "hidden min-[375px]:block min-[425px]:hidden w-full",
    containerClass: "w-[375px] min-h-screen relative mx-auto pb-[85px]",
    Component: PowerMobile,
    variant: "m",
  },
  {
    wrapperClass: "hidden min-[425px]:block min-[768px]:hidden",
    containerClass: "w-[425px] min-h-screen relative mx-auto pb-[150px]",
    Component: PowerMobile,
    variant: "l",
  },
  {
    wrapperClass: "hidden min-[768px]:block min-[1024px]:hidden",
    containerClass: "w-[768px] min-h-screen relative mx-auto pb-[120px]",
    Component: PowerLaptop,
    variant: "tablet",
  },
  {
    wrapperClass: "hidden min-[1024px]:block min-[1360px]:hidden overflow-auto",
    containerClass: "w-[1024px] min-h-screen relative mx-auto",
    Component: PowerLaptop,
  },
  {
    wrapperClass: "hidden min-[1360px]:block min-[1440px]:hidden overflow-auto",
    containerClass: "w-[1360px] min-h-screen relative mx-auto",
    Component: Power1360,
  },
  {
    wrapperClass: "hidden min-[1440px]:block min-[1680px]:hidden overflow-auto",
    containerClass: "w-[1440px] min-h-screen relative mx-auto",
    Component: PowerLaptop,
    variant: "lg",
  },
  {
    wrapperClass: "hidden min-[1680px]:block min-[1920px]:hidden overflow-auto",
    containerClass: "w-[1680px] min-h-screen relative mx-auto",
    Component: PowerDesktop,
  },
  {
    wrapperClass: "hidden min-[1920px]:block overflow-auto",
    containerClass: "w-[1920px] min-h-screen relative mx-auto",
    Component: PowerDesktopL,
  },
];

export const PowerLanding = ({ data }) => {
  return (
    <div className="">
      {layouts.map(({ wrapperClass, containerClass, Component, variant }) => (
        <div key={wrapperClass} className={wrapperClass}>
          <div className={containerClass}>
            <Component data={data} {...(variant ? { variant } : {})} />
          </div>
        </div>
      ))}
    </div>
  );
};
export default PowerLanding;
