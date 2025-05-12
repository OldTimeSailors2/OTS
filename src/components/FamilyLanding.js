import { FamilyMobileS } from "./FamilyMobileS"; //ok
import { FamilyMobileM } from "./FamilyMobileM"; //ok
import { FamilyMobileL } from "./FamilyMobileL"; // ok
import FamilyTablet from "./FamilyTablet"; // ok
import FamilyLaptop from "./FamilyLaptop"; //
import FamilyLaptopL from "./FamilyLaptopL"; //
import FamilyDesktop from "./FamilyDesktop"; // 
import FamilyDesktopL from "./FamilyDesktopL"; // 
export const FamilyLanding = ({ data }) => {
  return (
    <div className="">

      {/* Mobile S - 320px ok*/}
      <div className="block min-[375px]:hidden">
        <div className="w-full min-h-screen relative mx-auto pb-[25px] overflow-x-auto">
          <FamilyMobileS data={data} />
        </div>
      </div>

      {/* Mobile M - 375px ok*/}
      <div className="hidden min-[375px]:block min-[425px]:hidden">
        <div className="w-[375px] relative mx-auto pb-[60px]">
          <FamilyMobileM data={data} />
        </div>
      </div>

      {/* Mobile L - 425px ok*/}
      <div className="hidden min-[425px]:block min-[768px]:hidden">
        <div className="w-[425px] min-h-screen relative mx-auto pb-[45px]">
          <FamilyMobileL data={data} />
        </div>
      </div>
      {/* FamiliTablet - 768px ok*/}
      <div className="hidden min-[768px]:block min-[1024px]:hidden">
        <div className="w-[768px] min-h-screen relative mx-auto">
          <FamilyTablet data={data} />
        </div>
      </div>
      {/* Laptop - 1024px */}
      <div className="hidden min-[1024px]:block overflow-auto">
        <div className="w-full min-h-screen relative mx-auto ">
          <FamilyLaptop data={data} />
        </div>
      </div>
 
    </div>
  );
};
export default FamilyLanding;