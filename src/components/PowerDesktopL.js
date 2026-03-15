"use client";

import { useEffect } from "react";
import Link from "next/link";
import { FaCalendar, FaClock } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { formatDate } from "@/utils/formatDate";

export const PowerDesktopL = ({ data }) => {
  const { event, location, date, venueInfo, gigStartTime, gigFinishTime } = data;
  const formattedDate = formatDate(date);
  const eventURL = "/eventURL";
  const router = useRouter();

  useEffect(() => {
    const html = document.documentElement;
    const previousBg = html.style.backgroundColor;

    html.style.backgroundColor = "#E9DFCB";

    return () => {
      html.style.backgroundColor = previousBg;
    };
  }, []);

  const rawBuyUrl = (data?.buyTickets ?? "").trim();
  const buyUrl =
    rawBuyUrl && /^https?:\/\//i.test(rawBuyUrl)
      ? rawBuyUrl
      : rawBuyUrl
        ? `https://${rawBuyUrl}`
        : "";

  return (
    <>
      <div className="relative -bottom-[100px]">
        <div className="relative w-full h-full my-[250px]">
          {/* Contenedor principal con borde */}
          <div className="relative border-[5px] border-beige p-2 w-[1200px] h-[850px] -right-[130px] -top-[310px]">
            <div className="text-left px-10">
              <h1 className="leading-none lowercase font-titles">
                <span className="text-lightRed text-[55px]">old time sailors </span>
                <span className="text-[55px]"> at</span>
                <br />
                <span className="text-[55px]">{event}</span>
              </h1>
              <p className="text-lightRed font-txt text-[30px] mt-4 lowercase">{location}</p>
            </div>

            {/* Venue card */}
            <div className="absolute w-[450px] top-[20px] -right-[260px] z-20">
              <div className="bg-darkBlue h-[250px] p-6 rounded-3xl">
                <h3 className="text-lightRed font-titles leading-none text-[38px]">
                  <p>more about</p>
                  <p>the venue</p>
                </h3>

                <div className="mt-2 tracking-wide pr-2">
                  <p className="text-white font-txt leading-tight text-[18px]">{venueInfo}</p>
                  <a
                    href={buyUrl || "#"}
                    target="_blank"
                    rel="noreferrer"
                    className={`${!buyUrl ? "opacity-50 pointer-events-none" : ""}`}
                  >
                    <p className="text-white mt-3 font-titles underline text-[18px]">
                      contact the venue for + info
                    </p>
                  </a>

                </div>
              </div>
            </div>

            <div className="border-t-2 border-dashed border-beige my-4" />

            {/* Event info */}
            <div className="space-y-6 pl-[45px]">
              <div className="flex flex-row gap-5">
                <div className="space-y-3">
                  {[
                    { icon: FaLocationDot, text: `${event}` },
                    { icon: FaCalendar, text: `${formattedDate}` },
                    {
                      icon: FaClock,
                      text: `${gigStartTime} to ${gigFinishTime}`,
                    },
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-center gap-2 font-txt">
                      <Icon className="text-[25px] text-lightRed" />
                      <span className="text-[25px] font-txt">{text}</span>
                    </div>
                  ))}
                </div>

                <div className="relative w-[400px] h-[120px] ml-4">
                  <a
                    href={buyUrl || "#"}
                    target="_blank"
                    rel="noreferrer"
                    aria-disabled={!buyUrl}
                    onClick={(e) => {
                      if (!buyUrl) {
                        e.preventDefault();
                        return;
                      }
                      if (typeof ClickPixel === "function") {
                        ClickPixel("BuyTicket");
                      }
                    }}
                    className={`inset-0 z-[9999] block ${!buyUrl ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                      }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 358.62 137.01"
                      preserveAspectRatio="none"
                      className="w-full h-full"
                      style={{ pointerEvents: "none" }}
                    >
                      <path
                        fill="#db3a57"
                        d="M25.61,0H333.01c0,14.15,11.47,25.61,25.61,25.61V111.4c-14.15,0-25.61,11.47-25.61,25.61H25.61c0-14.15-11.47-25.61-25.61-25.61V25.61C14.15,25.61,25.61,14.15,25.61,0Z"
                      />
                    </svg>

                    <span
                      className="absolute inset-0 flex items-center justify-center font-txt text-[55px] uppercase text-center"
                      style={{ pointerEvents: "none" }}
                    >
                      buy tickets
                    </span>
                  </a>
                </div>
              </div>

              <div className="text-[27px] pr-[175px] font-txt text-left leading-10">
                <p className="leading-relaxed [&:not(:last-child)]:mb-0">
                 You are invited to board the Sailorette and join the plentiful crew, ‘The Old Time Sailors’, for a night of footstomping, dancing and singing!
                  You will be sailing back to the 19th century for an immersive experience of traditional seafaring music performed in a way you have never seen before. The Motley Crew and their plethora of traditional and eclectic instruments will take you back to the time of clashing tankards, and drunken debauchery.
                Sing and dance along like a drunken sailor as the band perform centuries old folk and shanty songs. Fancy dress is encouraged, so pull out your best seafaring garments me hearties and join.
                
                </p>
                <p className="leading-relaxed [&:not(:last-child)]:mb-0">
                
                </p>
                <p className="leading-relaxed [&:not(:last-child)]:mb-0">
                 
                </p>
              </div>
            </div>
          </div>

          <div className="absolute right-[21px] -top-[230px] z-10">
            <Image
              src="/assets/powerPhoto1.webp"
              alt="Performance"
              width={470}
              height={470}
              className="w-[470px] h-[470px]"
              loading="lazy"
            />
          </div>

          {/* Photo 2 */}
          <div className="absolute right-[95px] top-[225px] z-20">
            <Image
              src="/assets/powerPhoto4.jpg"
              alt="Musicians"
              width={650}
              height={200}
              className="w-[650px]"
              loading="lazy"
            />
          </div>

          {/* Photo 3 */}
          <div className="absolute left-[500px] top-[550px] z-30">
            <Image
              src="/assets/powerPhoto3.webp"
              alt="Crowd"
              width={750}
              height={600}
              className="w-[750px]"
              loading="lazy"
            />
          </div>

          <div className="absolute -right-[40px] top-[810px]">
            <Image
              src="/assets/shipDrawing.webp"
              alt="Background drawing"
              width={800}
              height={800}
              className="w-[800px] h-[800px] mix-blend-multiply brightness-[55%] opacity-[75%]"
              loading="lazy"
            />
          </div>

          <div className="relative bottom-[550px] w-full">
            <div className="absolute top-[85px] left-[0px] z-30">
              <Image
                src="/assets/powerVideoBox2.svg"
                alt="Video frame"
                width={650}
                height={550}
                className="w-[650px] h-[550px]"
                priority={true}
              />
            </div>

            <div className="absolute inset-0 top-[240px] left-[75px] z-50">
              <video
                controls
                preload="none"
                poster="/assets/thumbnailVideoP.webp"
                className="object-cover w-[500px] h-[280px] rounded-sm hover:opacity-100 [&::-webkit-media-controls]:opacity-0 hover:[&::-webkit-media-controls]:opacity-100 [&::-webkit-media-controls]:transition-opacity"
              >
                <source src="/assets/powerVideo.mp4" type="video/mp4" />
              </video>
            </div>
          </div>

          <div className="relative top-[100px]" onClick={() => router.back()} role="button" tabIndex={0}>
            <Image
              src="/assets/beigeArrow.webp"
              alt="More gigs"
              width={470}
              height={150}
              className="absolute left-[10px] top-[25px] w-[470px] h-[150px]"
              loading="lazy"
            />

            <p className="absolute inset-0 font-titles text-darkBlue left-[130px] top-[45px] text-[75px]">more gigs</p>
          </div>

          {/* Title */}
          <div className="absolute -bottom-[800px] left-[15px] z-10">
            <div className="flex flex-row items-center gap-3 mb-5">
              <div className="leading-tight">
                <p className="text-lightRed text-[190px] font-titles">family</p>
                <p className="text-lightRed text-[190px] font-titles">show</p>
              </div>
              <div className="text-[40px] -mb-[280px] -ml-[105px]">
                <div className="font-txt leading-tight tracking-widest">
                  <p>A TRADITIONAL SAILOR SHOW,</p>
                  <p>SING ALONG AND DANCE WITH US!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PowerDesktopL;