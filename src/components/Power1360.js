"use client";

import { useEffect } from "react";
import Link from "next/link";
import { FaCalendar, FaClock } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { formatDate } from "@/utils/formatDate";

export const Power1360 = ({ data }) => {
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
  const dateStr = data?.date ?? "";
  const formattedDate = formatDate(dateStr);

  const buyUrl = (data?.buyTickets ?? "").trim();

  console.log("✅ Power1360 buyTickets:", buyUrl);

  const start = data?.gigStartTime ?? data?.from ?? "";
  const end = data?.gigFinishTime ?? data?.to ?? "";

  const timeText = start && end ? `${start} to ${end}` : start ? start : end ? end : "";

  const venueInfo = data?.venueInfo ?? "";
  const eventURL = "/eventURL";

  return (
    <>
      <div className="relative -bottom-[100px]">
        <div className="relative w-full h-full my-[250px]">
          <div className="border-[5px] border-beige p-2 relative w-[850px] -right-[104px] -top-[310px]">
            <div className="text-left px-10">
              <h1 className="font-titles leading-none lowercase">
                <span className="text-lightRed text-[55px]">old time sailors </span>
                <span className="text-[55px]"> at</span>
                <br />
                <span className="text-[55px]">{title}</span>
              </h1>

              <p className="text-lightRed font-txt text-[30px] mt-4 lowercase">{venue}</p>
            </div>

            <div className="absolute w-[310px] top-[20px] -right-[100px] z-20"></div>

            <div className="border-t-2 border-dashed border-beige my-4" />

            <div className="space-y-6 p-4 px-10">
              <div className="flex flex-row gap-5">
                <div className="space-y-3">
                  {[
                    { icon: FaLocationDot, text: venue || "—" },
                    { icon: FaCalendar, text: formattedDate || "—" },
                    { icon: FaClock, text: timeText || "—" },
                  ].map(({ icon: Icon, text }, idx) => (
                    <div key={`${idx}-${text}`} className="flex items-center gap-2 font-txt">
                      <Icon className="text-[18px] text-lightRed" />
                      <span className="text-[18px] font-txt">{text}</span>
                    </div>
                  ))}
                </div>

                <div className="relative w-[330px] h-[100px]">
                  <a
                    href={buyUrl || "#"}
                    target="_blank"
                    rel="noreferrer"
                    aria-disabled={!buyUrl}
                    onClick={(e) => {
                      console.log("✅ CLICK Power1360 buyTickets ->", buyUrl);
                      if (!buyUrl) e.preventDefault();
                    }}
                    className={` left-12 inset-0 z-[9999] block ${
                      !buyUrl ? "pointer-events-none opacity-50 cursor-not-allowed" : "cursor-pointer"
                    }`}
                    style={{ pointerEvents: "auto" }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 358.62 137.01"
                      preserveAspectRatio="none"
                      className="w-[100%] h-[100px] z-10"
                      style={{ pointerEvents: "none" }}
                    >
                      <path
                        fill="#db3a57"
                        d="M25.61,0H333.01c0,14.15,11.47,25.61,25.61,25.61V111.4c-14.15,0-25.61,11.47-25.61,25.61H25.61c0-14.15-11.47-25.61-25.61-25.61V25.61C14.15,25.61,25.61,14.15,25.61,0Z"
                      />
                    </svg>

                    <h3
                      className="relative font-txt justify-center text-[37px] uppercase -top-[79px] z-20 w-[100%] text-center"
                      style={{ pointerEvents: "none" }}
                    >
                      buy tickets 1360
                    </h3>
                  </a>
                </div>
              </div>

              <div className="text-[17px] pb-5 font-txt text-left leading-7">
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

          <div className="absolute right-[18px] -top-[230px] z-10">
            <Image src="/assets/familyPhoto1.webp" alt="Performance" width={290} height={290} className="w-[290px] h-[290px]" loading="lazy" />
          </div>

          <div className="absolute right-[45px] top-[53px] z-20">
            <Image src="/assets/familyPhoto2.webp" alt="Musicians" width={390} height={200} className="w-[390px]" loading="lazy" />
          </div>

          <div className="absolute left-[510px] top-[300px] z-30">
            <Image  src="/assets/familyPhoto3.webp" alt="Crowd" width={450} height={450} className="w-[450px] h-[450px]" loading="lazy" />
          </div>

          <div className="absolute right-[5px] -bottom-[300px]">
            <Image
              src="/assets/drawing2.webp"
              alt="Background drawing"
              width={450}
              height={450}
              className="w-[450px] h-[450px] mix-blend-multiply brightness-[55%] opacity-[75%]"
              loading="lazy"
            />
          </div>

          <div className="absolute w-full h-full top-[190px] -left-[10px] z-30 ">
            <Image src="/assets/powerVideoBox2.svg" alt="Video frame" width={650} height={420} className="w-[650px] h-[420px]" priority={true} />
          </div>

          <div className="absolute inset-0 top-[285px] left-[80px] z-50">
            <video
              controls
              preload="none"
              poster={"/assets/thumbnailVideoP.webp"}
              className="object-cover w-[470px] h-[270px] rounded-sm hover:opacity-100 [&::-webkit-media-controls]:opacity-0 hover:[&::-webkit-media-controls]:opacity-100 [&::-webkit-media-controls]:transition-opacity"
            >
              <source src="/assets/powerVideo.mp4" type="video/mp4" />
            </video>
          </div>

          <div className="relative -top-[150px]" onClick={() => router.back()} role="button" tabIndex={0}>
            <Image
              src="/assets/arrow2.png"
              alt="More gigs"
              width={360}
              height={100}
              className="absolute left-[10px] top-[145px] w-[360px] h-[100px]"
              loading="lazy"
            />
          </div>

          <div className="absolute -bottom-[320px] left-[90px] z-10 ">
            <div className="flex flex-row items-center gap-3 mb-5">
              <div className="leading-[90px]">
                <p className="text-lightRed text-[110px] font-titles m-0">family</p>
                <p className="text-lightRed text-[110px] font-titles m-0">show</p>
              </div>
              <div className="text-[25px] -mb-[150px] -ml-[65px] leading-none">
                <div className="font-txt leading-none tracking-widest">
                  <p className="m-0">A TRADITIONAL SAILOR SHOW,</p>
                  <p className="m-0">SING ALONG AND DANCE WITH US!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Power1360;