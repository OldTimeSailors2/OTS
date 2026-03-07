import FamilyMobile from "./FamilyMobile";
import FamilyLaptop from "./FamilyLaptop";

const layouts = [
  {
    wrapperClass: "block min-[375px]:hidden",
    containerClass: "w-full min-h-screen relative mx-auto pb-[25px] overflow-x-auto",
    Component: FamilyMobile,
    variant: "s",
  },
  {
    wrapperClass: "hidden min-[375px]:block min-[425px]:hidden",
    containerClass: "w-[375px] relative mx-auto pb-[60px]",
    Component: FamilyMobile,
    variant: "m",
  },
  {
    wrapperClass: "hidden min-[425px]:block min-[768px]:hidden",
    containerClass: "w-[425px] min-h-screen relative mx-auto pb-[45px]",
    Component: FamilyMobile,
    variant: "l",
  },
  {
    wrapperClass: "hidden min-[768px]:block min-[1024px]:hidden",
    containerClass: "w-[768px] min-h-screen relative mx-auto",
    Component: FamilyMobile,
    variant: "tablet",
  },
  {
    wrapperClass: "hidden min-[1024px]:block min-[1440px]:hidden overflow-auto",
    containerClass: "w-full min-h-screen relative mx-auto",
    Component: FamilyLaptop,
  },
  {
    wrapperClass: "hidden min-[1440px]:block overflow-auto",
    containerClass: "w-full min-h-screen relative mx-auto",
    Component: FamilyLaptop,
    variant: "laptopL",
  },
];

export const FamilyLanding = ({ data }) => {
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
export default FamilyLanding;
