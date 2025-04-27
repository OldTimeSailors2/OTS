import Link from "next/link";
// import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const ViewSwitch = () => {
  const pathname = usePathname();

  return (
    <div className="flex flex-row w-full justify-end pr-3">
      <div
        className={`octagon-tickets ${
          pathname === "/tickets/map-view" ? "bg-darkBlue" : "bg-darkBeige"
        } flex items-center justify-center px-3 max-w-fit max-h-[31px]`}
      >
        <Link href="/tickets/map-view">
          <div>
            <p
              className={`text-center text-l md:text-xl font-txt font-bold uppercase ${
                pathname === "/tickets/map-view" ? "text-lightRed" : "text-beige"
              }  `}
            >
              Map
            </p>
          </div>
        </Link>
      </div>
      <div
        className={`octagon-tickets ${
          pathname === "/tickets/calendar-view" ? "bg-darkBlue" : "bg-darkBeige"
        } flex items-center justify-center px-3 max-w-fit max-h-[31px]`}
      >
        <Link href="/tickets/calendar-view">
          <div>
            <p
              className={`text-center text-l md:text-xl font-txt font-bold uppercase  ${
                pathname === "/tickets/calendar-view" ? "text-lightRed" : "text-beige"
              }`}
            >
              Calendar
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ViewSwitch;
