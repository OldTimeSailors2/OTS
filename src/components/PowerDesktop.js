"use client";

import { useEffect } from "react";
import Link from "next/link";
import { FaCalendar, FaClock } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { formatDate } from "@/utils/formatDate";

export const PowerDesktop = ({ data }) => {
  const router = useRouter();

  useEffect(() => {
    const html = document.documentElement;
    const previousBg = html.style.backgroundColor;

    html.style.backgroundColor = "#E9DFCB";

    return () => {
      html.style.backgroundColor = previousBg;
    };
  }, []);

  const title = data?.eventName ?? data?.event ?? "";
  const venue = data?.venueName ?? data?.location ?? "";
  const date = data?.date ?? "";
  const formattedDate = formatDate(date);

  const start = data?.gigStartTime ?? data?.from ?? "";
  const end = data?.gigFinishTime ?? data?.to ?? "";
  const timeText = start && end ? `${start} to ${end}` : start ? start : end ? end : "";

  const rawBuyUrl = (data?.buyTickets ?? "").trim();
  const buyUrl =
    rawBuyUrl && /^https?:\/\//i.test(rawBuyUrl)
      ? rawBuyUrl
      : rawBuyUrl
        ? `https://${rawBuyUrl}`
        : "";

  const venueInfo = data?.venueInfo ?? "";
  const eventURL = "/eventURL";

  return (
    <>
      <div className="relative -bottom-[170px]">
        <div className="relative w-full h-full my-[250px]">
          <div className="border-[5px] border-beige p-2 relative w-[1100px] -right-[100px] -top-[310px]">
            <div className="text-left px-10">
              <h1 className="leading-none font-titles lowercase pt-2">
                <span className="text-lightRed text-[55px]">old time sailors </span>
                <span className="text-[55px]"> at</span>
                <br />
                <span className="text-[55px]">{title}</span>
              </h1>

              <p className="text-lightRed font-txt text-[30px] lowercase">{venue}</p>
            </div>

            <div className="absolute w-[350px] top-[20px] -right-[100px] z-20">
              <div className="bg-darkBlue h-[220px] p-6 rounded-3xl">
                <h3 className="text-lightRed text-[30px] font-titles leading-none">
                  more about
                  <br />
                  the venue
                </h3>
                <div className="mt-0.5 tracking-wide">
                  <p className="text-white text-[16px] font-txt leading-tight">{venueInfo}</p>
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
                    { icon: FaLocationDot, text: venue || "—" },
                    { icon: FaCalendar, text: formattedDate || "—" },
                    { icon: FaClock, text: timeText || "—" },
                  ].map(({ icon: Icon, text }, idx) => (
                    <div
                      key={`${idx}-${text}`}
                      className="flex items-center gap-2 font-txt leading-tight"
                    >
                      <Icon className="text-[25px] text-lightRed" />
                      <span className="text-[25px] font-txt">{text}</span>
                    </div>
                  ))}
                </div>

                <div className="relative w-[400px] h-[100px] ml-[70px] mt-[5px]">
                  <a
                    href={buyUrl || "#"}
                    target="_blank"
                    rel="noreferrer"
                    aria-disabled={!buyUrl}
                    onClick={(e) => {
                      if (!buyUrl) {
                        e.preventDefault();
                      }
                    }}
                    className={` inset-0 z-[9999] block ${!buyUrl ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
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
                      className="absolute inset-0 flex items-center justify-center font-txt text-[47px] uppercase text-center"
                      style={{ pointerEvents: "none" }}
                    >
                      buy tickets
                    </span>
                  </a>
                </div>
              </div>

              <div className="text-xl pr-[150px] pb-7 font-txt text-left leading-10">
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

          <div className="absolute right-[15px] -top-[230px] z-10">
            <Image
              src="/assets/familyPhoto1.webp"
              alt="Performance"
              width={290}
              height={290}
              className="w-[370px] h-[370px]"
              loading="lazy"
            />
          </div>

          <div className="absolute right-[25px] top-[130px] z-20">
            <Image
              src="/assets/familyPhoto2.webp"
              alt="Musicians"
              width={500}
              height={200}
              className="w-[600px]"
              loading="lazy"
            />
          </div>

          <div className="absolute left-[515px] top-[460px] z-20">
            <Image
              src="/assets/familyPhoto3.webp"
              alt="Crowd"
              width={600}
              height={600}
              className="w-[600px] h-[600px]"
              loading="lazy"
            />
          </div>

          <div className="absolute -right-[15px] -bottom-[530px]">
            <Image
               src="/assets/drawing2.webp"
              alt="Background drawing"
              width={600}
              height={500}
              className="w-[600px] h-[500px] mix-blend-multiply brightness-[55%] contrast-[250%] opacity-[75%]"
              loading="lazy"
            />
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center -top-[320px] right-[1040px] z-30">
              <video
                controls
                preload="none"
                poster="/assets/thumbnailVideoP.webp"
                style={{ maxWidth: "100%" }}
                className="object-cover w-[520px] h-[300px] rounded-sm hover:opacity-100 [&::-webkit-media-controls]:opacity-0 hover:[&::-webkit-media-controls]:opacity-100 [&::-webkit-media-controls]:transition-opacity"
              >
                <source src="/assets/powerVideo.mp4" type="video/mp4" />
              </video>
            </div>

            <div className="absolute -top-[418px] left-[1px] z-20">
              <Image
                src="/assets/powerVideoBox2.svg"
                alt="Video frame"
                width={650}
                height={550}
                className="w-[640px] h-[470px]"
                priority={true}
              />
            </div>
          </div>

          <div
            className="relative top-[15px]"
            onClick={() => router.back()}
            role="button"
            tabIndex={0}
          >
            <Image
              src="/assets/arrow2.png"
              alt="More gigs"
              width={470}
              height={150}
              className="absolute left-[10px] top-[25px] w-[450px] h-[110px]"
              loading="lazy"
            />
          </div>

          {/* Title */}
          <div className="absolute -bottom-[500px] left-[15px] z-10">
            <div className="flex flex-row items-center gap-3 mb-5">
              <div className="leading-[140px]">
                <p className="text-lightRed text-[180px] font-titles">family</p>
                <p className="text-lightRed text-[180px] font-titles">show</p>
              </div>
              <div className="text-[30px] -mb-[205px] -ml-[105px]">
                <div className="font-txt font-bold leading-tight tracking-widest uppercase">
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

export default PowerDesktop;