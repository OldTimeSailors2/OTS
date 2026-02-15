"use client";

import Link from "next/link";
import { FaCalendar, FaClock } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import Image from "next/image";
import { useRouter } from "next/navigation";

const ClickPixel = (typeClick) => {
  // ReactPixel.trackCustom('ClickPixel',{typeClick: typeClick});
  console.log("Pixel send " + typeClick);
};

const formatDate = (inputDate) => {
  const [day, month, year] = inputDate.split("/").map(Number);
  const date = new Date(year, month - 1, day);

  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  return `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
};

export const FamilyDesktopL = ({ data }) => {
  const { event, location, date, venueInfo, gigStartTime, gigFinishTime } = data ?? {};
  const formattedDate = date ? formatDate(date) : "";
  const router = useRouter();

  // ✅ ESTE es el que viene del JSON
  const buyUrl = data?.buyTickets;

  // ✅ Debug: confirma que viene y qué valor tiene
  console.log("[FamilyDesktopL] buyTickets:", buyUrl);
  console.log("[FamilyDesktopL] event:", event);

  return (
    <>
      <div className="relative top-[23em]">
        <div className="relative w-full h-full">
          <div className="relative border-[3px] border-darkBeige p-2 w-[1200px] h-[850px] -right-[130px] -top-[310px]">
            <div className="text-left px-10">
              <h1 className="leading-none lowercase font-titles">
                <span className="text-darkBlue text-[55px]">old time sailors </span>
                <span className="text-lightRed  text-[55px]"> at</span>
                <br />
                <span className="text-lightRed text-[55px]">{event}</span>
              </h1>
              <p className="text-darkBlue font-txt text-[30px] mt-4 upercase">{location}</p>
            </div>

            <div className="border-more-dashed my-4" />

            <div className="space-y-6 pl-[45px]">
              <div className="flex flex-row gap-5">
                <div className="space-y-3">
                  {[
                    { icon: FaLocationDot, text: `${event}` },
                    { icon: FaCalendar, text: `${formattedDate}` },
                    { icon: FaClock, text: `${gigStartTime} to ${gigFinishTime}` },
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-center gap-2 text-darkBlue font-txt">
                      <Icon className="text-[25px]" />
                      <span className="text-[25px] font-txt">{text}</span>
                    </div>
                  ))}
                </div>

                <div className="relative w-[400px] h-[120px]">
                  {/* ✅ Para URL externo: usa <a> */}
                  <a
                    className={`absolute left-4 inset-0 items-center justify-center text-beige ${
                      !buyUrl ? "pointer-events-none opacity-50" : ""
                    }`}
                    href={buyUrl || "#"}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => {
                      console.log("[FamilyDesktopL] CLICK buyTickets ->", buyUrl);
                      ClickPixel("BuyTicket");
                    }}
                    aria-disabled={!buyUrl}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 358.62 137.01"
                      preserveAspectRatio="none"
                      className="w-[100%] h-[120px] z-10"
                    >
                      <path
                        fill="#db3a57"
                        d="M25.61,0H333.01c0,14.15,11.47,25.61,25.61,25.61V111.4c-14.15,0-25.61,11.47-25.61,25.61H25.61c0-14.15-11.47-25.61-25.61-25.61V25.61C14.15,25.61,25.61,14.15,25.61,0Z"
                      />
                    </svg>

                    <h3 className="relative font-txt justify-center text-[55px] uppercase -top-[99px] z-20 w-[100%] text-center">
                      buy tickets
                    </h3>
                  </a>
                </div>
              </div>

              <p className="text-[15px] pr-[175px] text-darkBlue font-txt leading-10">
                You are invited to board the Sailorette and join the plentiful crew, 'The Old Time Sailors', for a night of footstomping, dancing and
                singing! You will be sailing back to the 19th century for an immersive experience of traditional seafaring music performed in a way
                you have never seen before. The Motley Crew and their plethora of traditional and eclectic instruments will take you back to the time
                of clashing tankards, and drunken debauchery. Sing and dance along like a drunken sailor as the band perform centuries old folk and
                shanty songs. Fancy dress is encouraged, so pull out your best seafaring garments me hearties and join the festivities.
              </p>
            </div>
          </div>

          {/* ... el resto igual ... */}

          <div className="relative top-[100px]" onClick={() => router.back()} role="button" tabIndex={0}>
            <Image
              src="/assets/arrow2.webp"
              alt="More gigs"
              width={470}
              height={150}
              className="absolute left-[10px] top-[25px] w-[470px] h-[150px]"
              loading="lazy"
            />
            <p className="absolute inset-0 font-titles text-beige left-[130px] top-[45px] text-[75px]">more gigs</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default FamilyDesktopL;
