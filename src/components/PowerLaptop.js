"use client";

import { useEffect } from "react";
import Link from "next/link";
import { FaCalendar, FaClock } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { formatDate } from "@/utils/formatDate";

const SIZES = {
  md: {
    outerWrapper: "relative top-[330px] right-[5px]",
    innerWrapper: "relative w-full my-[50px]",
    mainBox: "border-[5px] border-beige p-2 relative w-[650px] -right-[95px] -top-[310px]",
    titleText: "text-[40px]",
    locationMt: "",
    venueCard: "absolute w-[250px] top-[27px] -right-[200px] z-20",
    venueCardInner: "bg-darkBlue p-4 rounded-3xl",
    venueTitleText: "text-[25px]",
    venueInfoText: "text-[12px]",
    venueLinkText: "text-[12px]",
    eventSpaceY: "space-y-2 p-4",
    eventInfoItem: "flex items-center gap-2 font-txt px-4",
    eventIconSize: "text-[18px]",
    eventTextSize: "text-[18px]",

    ticketsWrapper: "relative w-[240px] h-[95px] mt-[10px] ml-1 shrink-0",
    ticketsText: "text-[32px]",

    descText: "text-[15px] pt-5 font-txt text-left leading-7 px-4",
    photo1: { wrapper: "absolute right-[15px] -top-[230px] z-10", w: 200, h: 200, cls: "w-[200px] h-[200px]" },
    photo2: { wrapper: "absolute right-[25px] -top-[35px] z-30", w: 290, h: 200, cls: "w-[290px]" },
    photo3: { wrapper: "absolute right-[275px] top-[255px] w-[380px] z-40", w: 400, h: 400, cls: "h-[360px]" },
    ship: { wrapper: "absolute -right-[18px] bottom-[0px]", w: 300, h: 300, cls: "w-[330px] h-[300px] mix-blend-multiply brightness-[55%] opacity-[75%]" },
    videoBox: {
      wrapper: "absolute top-[195px] left-[38px] w-[410px] h-[280px] z-50",
      svgW: 430,
      svgH: 100,
      svgCls: "",
      innerCls: "absolute inset-0 top-[41px] -left-[10px] -right-[10px] flex items-center justify-center",
      videoCls:
        "object-cover w-[75%] h-[75%] rounded-sm z-20 hover:opacity-100 [&::-webkit-media-controls]:opacity-0 hover:[&::-webkit-media-controls]:opacity-100 [&::-webkit-media-controls]:transition-opacity",
    },
    arrowImg: { wrapper: "relative", imgCls: "absolute left-[25px] -top-[100px] w-[310px] h-[110px]", w: 310, h: 110 },
    moreGigsText: "absolute inset-0 font-titles text-darkBlue left-[130px] -top-[72px] text-[40px]",
    titleSection: "absolute -bottom-[190px] left-[45px] z-10 pb-8",
    titleLeading: "leading-[63px]",
    titleTextSize: "text-lightRed text-[80px] font-titles",
    subtitleWrapper: "text-[20px] -mb-[75px] -ml-[35px]",
  },

  lg: {
    outerWrapper: "relative -bottom-[100px]",
    innerWrapper: "relative w-full h-full my-[250px]",
    mainBox: "border-2 border-beige p-2 relative w-[950px] -right-[95px] -top-[310px]",
    titleText: "text-[55px]",
    locationMt: "mt-4",
    venueCard: "absolute w-[350px] top-[20px] -right-[100px] z-20",
    venueCardInner: "bg-darkBlue h-[220px] p-6 rounded-3xl",
    venueTitleText: "text-[30px]",
    venueInfoText: "text-[17px]",
    venueLinkText: "text-[15px]",
    eventSpaceY: "space-y-6 p-4",
    eventInfoItem: "flex items-center gap-2 font-txt",
    eventIconSize: "text-[21px]",
    eventTextSize: "text-[21px]",

    ticketsWrapper: "relative w-[300px] h-[100px] mt-[6px] ml-[90px] shrink-0",
    ticketsText: "text-[40px]",

    descText: "text-[19px] pb-5 font-txt text-left leading-8",
    photo1: { wrapper: "absolute right-[15px] -top-[230px] z-10", w: 290, h: 290, cls: "w-[290px] h-[290px]" },
    photo2: { wrapper: "absolute right-[25px] top-[53px] z-20", w: 390, h: 200, cls: "w-[390px]" },
    photo3: { wrapper: "absolute left-[520px] top-[288px] z-30", w: 550, h: 400, cls: "w-[550px]" },
    ship: { wrapper: "absolute -right-[0px] -bottom-[350px]", w: 420, h: 420, cls: "w-[420px] h-[420px] mix-blend-multiply brightness-[55%] opacity-[75%]" },
    videoBox: {
      wrapper: "absolute top-[205px] left-[10px] z-30",
      svgW: 590,
      svgH: 300,
      svgCls: "h-[450px]",
      innerCls: "absolute inset-0 top-[315px] left-[74px] z-50",
      videoCls:
        "object-cover w-[460px] h-[270px] rounded-sm hover:opacity-100 [&::-webkit-media-controls]:opacity-0 hover:[&::-webkit-media-controls]:opacity-100 [&::-webkit-media-controls]:transition-opacity",
    },
    arrowImg: { wrapper: "relative", imgCls: "absolute left-[10px] top-[25px] w-[430px] h-[120px]", w: 430, h: 120 },
    moreGigsText: "absolute inset-0 font-titles text-darkBlue left-[170px] top-[45px] text-[50px]",
    titleSection: "absolute -bottom-[420px] left-[35px] z-10",
    titleLeading: "leading-[100px]",
    titleTextSize: "text-lightRed text-[125px] font-titles",
    subtitleWrapper: "text-[30px] -mb-[150px] -ml-[65px]",
  },

  tablet: {
    outerWrapper: "relative",
    innerWrapper: "relative w-full min-h-[1400px]",
    mainBox: "border-[3px] border-beige p-4 relative mx-6",
    titleText: "text-[40px]",
    locationMt: "",
    venueCard: "absolute w-56 top-9 -right-6 z-20",
    venueCardInner: "bg-darkBlue p-6 rounded-3xl",
    venueTitleText: "text-[25px]",
    venueInfoText: "text-[15px]",
    venueLinkText: "text-[16px]",
    eventSpaceY: "space-y-6",
    eventInfoItem: "flex items-center gap-2 font-txt",
    eventIconSize: "text-[18px]",
    eventTextSize: "text-[18px]",

    ticketsWrapper: "relative w-[220px] h-[65px] mt-4 ml-4 shrink-0",
    ticketsText: "text-[27px]",

    descText: "text-[20px] pb-9 pt-5 font-txt text-left",
    photo1: { wrapper: "absolute left-[0px] top-[860px] z-20", w: 300, h: 280, cls: "h-[320px] ml-7 mt-4" },
    photo2: { wrapper: "absolute right-[20px] top-[620px] z-10", w: 320, h: 320, cls: "w-full" },
    photo3: { wrapper: "absolute right-[15px] top-[870px] w-[450px] z-10", w: 400, h: 400, cls: "w-full h-auto" },
    ship: { wrapper: "absolute bottom-[80px] right-[5px] z-20", w: 300, h: 300, cls: "mix-blend-multiply brightness-[55%] opacity-[75%]" },
    videoBox: {
      wrapper: "absolute top-[620px] left-[11px] z-30 w-[550px] h-[230px]",
      svgW: 480,
      svgH: 370,
      svgCls: "absolute -top-[110px] -left-[15px] w-[480px] h-[372px] z-10",
      innerCls: "absolute inset-0 z-40 flex items-center justify-center",
      videoCls:
        "w-[70%] h-[98%] absolute -top-[19px] left-[31px] object-cover rounded-sm hover:opacity-100 [&::-webkit-media-controls]:opacity-0 hover:[&::-webkit-media-controls]:opacity-100 [&::-webkit-media-controls]:transition-opacity",
    },
    arrowImg: { wrapper: "absolute top-[1100px] left-[5px] w-[290px] h-[110px]", imgCls: "w-[290px] h-[110px]", w: 290, h: 110 },
    moreGigsText: "absolute font-titles text-darkBlue left-[70px] top-[52px] text-[45px]",
    titleSection: "absolute bottom-[0px] left-[15px] z-30",
    titleLeading: "leading-[75px] mb-6",
    titleTextSize: "text-lightRed text-[90px] font-titles",
    subtitleWrapper: "text-[20px] -ml-[45px] mt-[70px]",
  },
};

export const PowerLaptop = ({ data, variant = "md" }) => {
  const { event, location, date, venueInfo, gigStartTime, gigFinishTime } = data;
  const formattedDate = formatDate(date);
  const eventURL = "/eventURL";
  const router = useRouter();
  const s = SIZES[variant];

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
    <div className={s.outerWrapper}>
      <div className={s.innerWrapper}>
        {/* Main bordered box */}
        <div className={s.mainBox}>
          <div className="text-left px-10">
            <h1 className="font-titles leading-none lowercase">
              <span className={`text-lightRed ${s.titleText}`}>old time sailors </span>
              <span className={s.titleText}>at</span>
              <br />
              <span className={s.titleText}>{event}</span>
            </h1>
            <p className={`text-lightRed font-txt text-[30px] lowercase ${s.locationMt}`}>{location}</p>
          </div>

          {/* Venue card */}
          <div className={s.venueCard}>
            <div className={s.venueCardInner}>
              <h3 className={`text-lightRed font-titles leading-none ${s.venueTitleText}`}>
                <p>more about</p>
                <p>the venue</p>
              </h3>
              <div className="mt-0.5 tracking-wide">
                <p className={`text-white font-txt leading-tight ${s.venueInfoText}`}>{venueInfo}</p>
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

          <div className="border-more-dashed-beige my-4" />

          {/* Event info */}
          <div className={s.eventSpaceY}>
            <div className="flex flex-row gap-5">
              <div className="space-y-3">
                {[
                  { icon: FaLocationDot, text: event },
                  { icon: FaCalendar, text: formattedDate },
                  { icon: FaClock, text: `${gigStartTime} to ${gigFinishTime}` },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className={s.eventInfoItem}>
                    <Icon className={`${s.eventIconSize} text-lightRed`} />
                    <span className={`${s.eventTextSize} font-txt`}>{text}</span>
                  </div>
                ))}
              </div>

              {/* Tickets button */}
              <div className={s.ticketsWrapper}>
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
                    className={`absolute inset-0 flex items-center justify-center font-txt uppercase text-center ${s.ticketsText}`}
                    style={{ pointerEvents: "none" }}
                  >
                    buy tickets
                  </span>
                </a>
              </div>
            </div>

            {/* Description */}
            <div className={s.descText}>
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

        {/* Photos */}
        <div className={s.photo1.wrapper}>
          <Image
            src="/assets/powerPhoto1.webp"
            alt="Performance"
            width={s.photo1.w}
            height={s.photo1.h}
            className={s.photo1.cls}
            loading="lazy"
          />
        </div>

        <div className={s.photo2.wrapper}>
          <Image
            src="/assets/powerPhoto4.jpg"
            alt="Musicians"
            width={s.photo2.w}
            height={s.photo2.h}
            className={s.photo2.cls}
            loading="lazy"
          />
        </div>

        <div className={s.photo3.wrapper}>
          <Image
            src="/assets/powerPhoto3.webp"
            alt="Crowd"
            width={s.photo3.w}
            height={s.photo3.h}
            className={s.photo3.cls}
            loading="lazy"
          />
        </div>

        {/* Ship drawing */}
        <div className={s.ship.wrapper}>
          <Image
            src="/assets/shipDrawing.webp"
            alt="Background drawing"
            width={s.ship.w}
            height={s.ship.h}
            className={s.ship.cls}
            loading="lazy"
          />
        </div>

        {/* Video box */}
        <div className={s.videoBox.wrapper}>
          <Image
            src="/assets/powerVideoBox2.svg"
            alt="Video frame"
            width={s.videoBox.svgW}
            height={s.videoBox.svgH}
            className={s.videoBox.svgCls}
            priority={true}
          />
          <div className={s.videoBox.innerCls}>
            <video controls preload="none" poster="/assets/thumbnailVideoP.webp" className={s.videoBox.videoCls}>
              <source src="/assets/powerVideo.mp4" type="video/mp4" />
            </video>
          </div>
        </div>

        {/* Back arrow / more gigs */}
        <div className={s.arrowImg.wrapper} onClick={() => router.back()} role="button" tabIndex={0}>
          <Image
            src="/assets/beigeArrow.webp"
            alt="More gigs"
            width={s.arrowImg.w}
            height={s.arrowImg.h}
            className={s.arrowImg.imgCls}
            loading="lazy"
          />
          <Link href="/tickets/calendar-view">
            <p className={s.moreGigsText}>more gigs</p>
          </Link>
        </div>

        {/* Title section */}
        <div className={s.titleSection}>
          <div className="flex flex-row items-center gap-3 mb-5">
            <div className={s.titleLeading}>
              <p className={s.titleTextSize}>family</p>
              <p className={s.titleTextSize}>show</p>
            </div>
            <div className={s.subtitleWrapper}>
              <div className="font-txt leading-tight tracking-widest uppercase">
                <p>A TRADITIONAL SAILOR SHOW,</p>
                <p>SING ALONG AND DANCE WITH US!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PowerLaptop;