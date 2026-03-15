"use client";

import { useEffect } from "react";
import Link from "next/link";
import { FaCalendar, FaClock } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { formatDate } from "@/utils/formatDate";

const SIZES = {
  s: {
    outerWrapper: "relative -bottom-[50px] px-[15px]",
    innerWrapper: "relative w-full my-[10px]",
    mainBox: "border-[3px] border-beige p-2 m-4 relative",
    titleText: "text-xl",
    locationCls: "text-lightRed text-sm font-txt",
    dashedBorder: null,
    venueCard: "absolute -right-[28px] top-[70px] w-[145px]",
    venueCardInner: "bg-darkBlue p-3 py-4 rounded-2xl",
    venueTitleText: "text-[15px]",
    venueInfoText: "text-[8px]",
    venueLinkText: "text-[8px]",
    eventSpaceY: "space-y-6",
    eventInner: "space-y-3",
    eventInfoItem: "flex items-center gap-2 text-darkBlue font-bold",
    eventIconSize: "text-[10px] text-lightRed",
    eventTextSize: "text-[8px] font-txt",

    ticketsWrapper: "relative w-[45%] h-[35px]",
    ticketsTextSize: "text-[16px]",
    ticketsImgSrc: null,

    descText: "text-[12px] pb-5 pt-5 font-txt text-left",
    mediaWrap: "w-full h-[400px] relative top-5 -left-3",
    mediaTopWrap: "relative h-[200px]",
    videoContainer: "relative w-[210px] h-[120px] left-[5px]",
    videoInner: "absolute inset-0 flex items-center justify-center z-20",
    videoCls:
      "w-[76%] h-[74%] absolute top-[1px] left-[27px] object-cover rounded-sm hover:opacity-100 [&::-webkit-media-controls]:opacity-0 hover:[&::-webkit-media-controls]:opacity-100 [&::-webkit-media-controls]:transition-opacity",
    videoFrameOuter: "absolute inset-0 z-10 -top-[45px] left-[5px]",
    videoFrameW: 215,
    videoFrameH: 166,
    videoFrameCls: "w-[215px] h-[166px]",
    photo2Wrap: "absolute -right-2 -top-4 w-[130px] h-[130px]",
    photo2Cls: "w-[130px] h-[130px]",
    photo2W: 120,
    photo2H: 120,
    mediaBottomWrap: "relative h-[200px] bottom-8",
    photo1Container: "absolute left-[34px] -top-[71.5px] w-1/2 z-20",
    photo1Cls: "w-[143px] h-[145px] z-10",
    photo1W: 145,
    photo1H: 145,
    arrowSrc: "/assets/beigeArrow.webp",
    arrowWrap: "relative",
    arrowImgCls: "absolute right-8 -bottom-12 w-[145px] h-[40px]",
    arrowW: 145,
    arrowH: 40,
    moreGigsText: "absolute inset-0 font-times font-titles text-darkBlue left-[35px] top-[13px] text-[20px]",
    showMoreGigs: true,
    photo3Wrap: "absolute -right-1 -top-[54px] w-[156px] h-[156px] z-10",
    photo3Cls: "w-[156px] h-[156px]",
    photo3W: 156,
    photo3H: 154,
    titleSection: "absolute bottom-6 left-4 z-20",
    titleLeading: "flex flex-col leading-none",
    titleTextSize: "text-lightRed text-[35px] font-titles",
    subtitleWrapper: "text-[8px] flex flex-col",
    subtitleInner: "-ml-[30px] mt-[40px] leading-none tracking-widest font-txt uppercase",
    shipCls: "w-[150px] h-[130px] absolute bottom-[10px] -right-2 z-10 mix-blend-multiply brightness-[55%] opacity-[75%]",
    shipW: 150,
    shipH: 130,
  },

  m: {
    outerWrapper: "relative top-[18.67px] -bottom-[50px] z-0 transform translate-z-0 will-change-transform",
    innerWrapper: "relative w-full h-full my-[10px]",
    mainBox: "border-[2px] border-beige relative mr-[32.72px] ml-[35.28px]",
    titleText: "text-[21px]",
    locationCls: "text-lightRed text-[10.6px] font-txt uppercase",
    dashedBorder: "border-more-dashed-beige my-2",
    venueCard: "absolute -right-[24.5px] top-[24px] w-[146.03px]",
    venueCardInner: "bg-darkBlue p-[11.82px] rounded-2xl",
    venueTitleText: "text-[18px]",
    venueInfoText: "text-[8.9px]",
    venueLinkText: "text-[8.9px]",
    eventSpaceY: "space-y-6",
    eventInner: "ml-[11.61px] mr-[10px]",
    eventInfoItem: "flex items-center gap-1 text-darkBlue font-txt",
    eventIconSize: "text-[9.5px] text-lightRed",
    eventTextSize: "text-[9.5px]",

    ticketsWrapper: "relative w-[161.56px] h-[26.44px] -left-[1.05px] mt-1",
    ticketsTextSize: null,
    ticketsImgSrc: "/assets/buyTickets.png",
    ticketsImgW: 161.56,
    ticketsImgH: 26.44,

    descText: "text-[10px] pb-6 pt-11 font-txt text-left",
    mediaWrap: "w-full h-[auto] relative top-[33px] -left-5 mb-10",
    mediaTopWrap: "relative h-[200px]",
    videoContainer: "absolute left-[39.62px] -top-[42px] z-20 w-[239px] h-[148px]",
    videoInner: "absolute inset-0 flex items-center justify-center z-20",
    videoCls:
      "w-[187.97px] h-[106.42px] absolute top-[41px] left-[11px] object-cover rounded-sm hover:opacity-100 [&::-webkit-media-controls]:opacity-0 hover:[&::-webkit-media-controls]:opacity-100 [&::-webkit-media-controls]:transition-opacity",
    videoFrameOuter: "absolute inset-0 z-10",
    videoFrameW: 239,
    videoFrameH: 148,
    videoFrameCls: "transform-gpu w-[239px] h-[148px]",
    photo2Wrap: "absolute -right-[19.20px] -top-[20px] w-[160px] h-[130px]",
    photo2Cls: "w-[148.54px] h-[148.54px] shadow-[3px_3px_3px_rgba(0,0,0,0.3)]",
    photo2W: 150,
    photo2H: 150,
    mediaBottomWrap: "relative h-[200px]",
    photo1Container: "absolute left-[47.91px] -top-[88px] z-20",
    photo1Cls: "w-[154.33px] h-[155.33px] z-10 shadow-[3px_3px_3px_rgba(0,0,0,0.3)]",
    photo1W: 170,
    photo1H: 170,
    arrowSrc: "/assets/beigeArrow.png",
    arrowWrap: "relative",
    arrowImgCls: "w-[160px] h-[50px] absolute right-[20px] -bottom-[60px]",
    arrowW: 160,
    arrowH: 50,
    moreGigsText: null,
    showMoreGigs: false,
    photo3Wrap: "absolute -right-[4px] bottom-[80px] w-[187px] h-[187px] z-10",
    photo3Cls: "w-full h-auto",
    photo3W: 400,
    photo3H: 400,
    titleSection: "absolute -bottom-[30px] left-[20px] z-30",
    titleLeading: "flex flex-col leading-[43.7px]",
    titleTextSize: "text-lightRed text-[49px] font-titles",
    subtitleWrapper: "text-[9.45px] flex flex-col",
    subtitleInner: "-ml-[35px] mt-[58px] font-txt font-bold leading-none tracking-widest uppercase truncate",
    shipCls: "w-[153.24px] h-[112.52px] absolute -bottom-[37px] -right-[2px] z-0 mix-blend-multiply brightness-[35%] contrast-[250%] opacity-[85%]",
    shipW: 170,
    shipH: 140,
  },

  l: {
    outerWrapper: "relative -bottom-[65px] px-[15px] z-0 transform translate-z-0 will-change-transform",
    innerWrapper: "relative w-full h-full my-[10px]",
    mainBox: "border-[3px] border-beige p-2 m-4 relative",
    titleText: "text-2xl",
    locationCls: "text-lightRed text-xl font-txt",
    dashedBorder: "border-more-dashed-beige my-4",
    venueCard: "absolute -right-[12px] top-[70px] w-[176px]",
    venueCardInner: "bg-darkBlue p-3 py-4 rounded-2xl",
    venueTitleText: "text-lg",
    venueInfoText: "text-[9px]",
    venueLinkText: "text-[9px]",
    eventSpaceY: "space-y-6",
    eventInner: "space-y-2",
    eventInfoItem: "flex items-center gap-2 text-darkBlue",
    eventIconSize: "text-[13px] text-lightRed",
    eventTextSize: "text-[13px] font-txt",

    ticketsWrapper: "relative w-[55%] h-[35px] left-4",
    ticketsTextSize: "text-[20px]",
    ticketsImgSrc: null,

    descText: "text-sm pb-6 pt-2 font-txt text-left",
    mediaWrap: "w-full h-[auto] relative top-[40px] -left-2",
    mediaTopWrap: "relative h-[200px]",
    videoContainer: "relative w-[295px] h-[130px] -left-[4px]",
    videoInner: "absolute inset-0 flex items-center justify-center z-20",
    videoCls:
      "w-[77%] h-[98%] absolute -top-[7px] left-[33px] object-cover rounded-sm hover:opacity-100 [&::-webkit-media-controls]:opacity-0 hover:[&::-webkit-media-controls]:opacity-100 [&::-webkit-media-controls]:transition-opacity",
    videoFrameOuter: "absolute inset-0 z-10 -top-[58px] left-[5px]",
    videoFrameW: 290,
    videoFrameH: 209,
    videoFrameCls: "w-[285px] h-[209px]",
    photo2Wrap: "absolute -right-[10px] -top-[25px] w-[175px] h-[130px]",
    photo2Cls: "w-[170px] h-[180px] shadow-2xl",
    photo2W: 180,
    photo2H: 180,
    mediaBottomWrap: "relative h-[200px]",
    photo1Container: "absolute left-[25px] bottom-[78px] w-1/2 z-20",
    photo1Cls: "w-[195px] h-[195px] z-10",
    photo1W: 185,
    photo1H: 185,
    arrowSrc: "/assets/beigeArrow.webp",
    arrowWrap: "relative",
    arrowImgCls: "w-[180px] h-[55px] absolute right-[45px] -bottom-[65px]",
    arrowW: 180,
    arrowH: 55,
    moreGigsText: "absolute inset-0 font-titles text-darkBlue left-[50px] top-5 text-[24px]",
    showMoreGigs: true,
    photo3Wrap: "absolute -right-[6px] bottom-[32px] w-[225px] h-[200px] z-10",
    photo3Cls: "w-full h-auto",
    photo3W: 400,
    photo3H: 400,
    titleSection: "absolute -bottom-[95px] left-[20px] z-30",
    titleLeading: "flex flex-col leading-[45px]",
    titleTextSize: "text-lightRed text-[57px] font-titles",
    subtitleWrapper: "text-[9px] flex flex-col gap-4",
    subtitleInner: "-ml-[30px] mt-[62px] font-txt leading-none tracking-wider uppercase",
    shipCls: "w-[180px] h-[145px] absolute -bottom-[110px] -right-[5px] z-20 mix-blend-multiply brightness-[55%] opacity-[75%]",
    shipW: 180,
    shipH: 145,
  },
};

export const PowerMobile = ({ data, variant = "s" }) => {
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
    <>
      <div className={s.outerWrapper}>
        <div className={s.innerWrapper}>
          <div className={s.mainBox}>
            <div className="text-left lowercase">
              <h1 className="font-titles leading-none">
                <span className={`text-lightRed ${s.titleText}`}>old time sailors </span>
                <span className={s.titleText}> at</span>
                <br />
                <span className={s.titleText}>{event}</span>
              </h1>
              <p className={s.locationCls}>{location}</p>
            </div>

            {s.dashedBorder && <div className={s.dashedBorder} />}

            {/* Venue card */}
            <div className={s.venueCard}>
              <div className={s.venueCardInner}>
                <h3 className={`text-lightRed font-titles leading-none ${s.venueTitleText}`}>
                  <p>more about</p>
                  <p>the venue</p>
                </h3>
                <div className="mt-0.5">
                  <p className={`text-white leading-tight font-txt ${s.venueInfoText}`}>{venueInfo}</p>
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

            {/* Event info */}
            <div className={s.eventSpaceY}>
              <div className={s.eventInner}>
                {[
                  { icon: FaLocationDot, text: event },
                  { icon: FaCalendar, text: formattedDate },
                  { icon: FaClock, text: `${gigStartTime} to ${gigFinishTime}` },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className={s.eventInfoItem}>
                    <Icon className={s.eventIconSize} />
                    <span className={s.eventTextSize}>{text}</span>
                  </div>
                ))}

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
                        return;
                      }
                      if (typeof ClickPixel === "function") {
                        ClickPixel("BuyTicket");
                      }
                    }}
                    className={` inset-0 z-[9999] block ${!buyUrl ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                      }`}
                  >
                    {s.ticketsImgSrc ? (
                      <Image
                        src={s.ticketsImgSrc}
                        width={s.ticketsImgW}
                        height={s.ticketsImgH}
                        alt="buy tickets"
                        style={{ pointerEvents: "none" }}
                      />
                    ) : (
                      <>
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
                          className={`absolute inset-0 flex items-center justify-center font-txt uppercase text-center ${s.ticketsTextSize}`}
                          style={{ pointerEvents: "none" }}
                        >
                          buy tickets
                        </span>
                      </>
                    )}
                  </a>
                </div>

                {/* Description */}
                <div className={s.descText}>
                  <p className="leading-relaxed [&:not(:last-child)]:mb-0">
                    Heave ho and up she rises! Cast aside your compass, throw your maps overboard and join the mutinous crew of The Old Time Sailor as they set sail
                    for the wild uninhabited islands of Irish Punk, Shanty Punk, Polka Rock, Romani Punk, Dark Cabaret, and Twisted Circus!
                  </p>
                  <p className="leading-relaxed [&:not(:last-child)]:mb-0">
                    &apos;Rock and row&apos; with our 21 strong crew of rebellious musicians as they navigate a voyage through the thrashing seas of Heavy Metal and Hard Rock
                    on a genre bending adventure into uncharted waters, join in the Wall of Death and thrash it out with your shipmates.
                  </p>
                  <p className="leading-relaxed [&:not(:last-child)]:mb-0">
                    Get ready for vigorous vocals, emphatic energy, mosh pits and head banging: we play it live and we play it loud, but as always with The Old Time
                    Sailors... be prepared to expect the unexpected!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Media section */}
      <div className={s.mediaWrap}>
        <div className={s.mediaTopWrap}>
          {/* Video */}
          <div className={s.videoContainer}>
            <div className={s.videoInner}>
              <video
                controls
                preload="none"
                playsInline
                poster="/assets/thumbnailVideoP.webp"
                className={s.videoCls}
              >
                <source src="/assets/powerVideo.mp4" type="video/mp4" />
              </video>
            </div>
            <div className={s.videoFrameOuter}>
              <Image
                src="/assets/powerVideoBox2.svg"
                alt="Video frame"
                width={s.videoFrameW}
                height={s.videoFrameH}
                className={s.videoFrameCls}
                priority={true}
              />
            </div>
          </div>

          {/* Photo 2 */}
          <div className={s.photo2Wrap}>
            <Image
              src="/assets/powerPhoto4.jpg"
              alt="Musicians"
              width={s.photo2W}
              height={s.photo2H}
              className={s.photo2Cls}
              loading="lazy"
            />
          </div>
        </div>

        {/* Lower photos */}
        <div className={s.mediaBottomWrap}>
          <div className={s.photo1Container}>
            <Image
              src="/assets/powerPhoto1.webp"
              alt="Performance"
              width={s.photo1W}
              height={s.photo1H}
              className={s.photo1Cls}
              loading="lazy"
            />
            <div className={s.arrowWrap} onClick={() => router.back()} role="button" tabIndex={0}>
              <Image
                src={s.arrowSrc}
                alt="More gigs"
                width={s.arrowW}
                height={s.arrowH}
                className={s.arrowImgCls}
                loading="lazy"
              />
              {s.showMoreGigs && <p className={s.moreGigsText}>more gigs</p>}
            </div>
          </div>

          <div className={s.photo3Wrap}>
            <Image
              src="/assets/powerPhoto3.webp"
              alt="Crowd"
              width={s.photo3W}
              height={s.photo3H}
              className={s.photo3Cls}
              loading="lazy"
            />
          </div>
        </div>

        {/* Title */}
        <div className={s.titleSection}>
          <div className="flex flex-row items-center gap-3">
            <div className={s.titleLeading}>
              <p className={s.titleTextSize}>family</p>
              <p className={s.titleTextSize}>show</p>
            </div>
            <div className={s.subtitleWrapper}>
              <div className={s.subtitleInner}>
                <p>A TRADITIONAL SAILOR SHOW,</p>
                <p>SING ALONG AND DANCE WITH US!</p>
              </div>
            </div>
          </div>
        </div>

        <Image
          src="/assets/shipDrawing.webp"
          alt="Background drawing"
          width={s.shipW}
          height={s.shipH}
          className={s.shipCls}
          loading="lazy"
        />
      </div>
    </>
  );
};

export default PowerMobile;