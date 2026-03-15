import Link from "next/link";
import { FaCalendar, FaClock } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { formatDate } from "@/utils/formatDate";

const ClickPixel = (typeClick) => {
  // ReactPixel.trackCustom('ClickPixel', { typeClick: typeClick });
  console.log("Pixel send", typeClick);
};


const stylesByVariant = {
  s: {
    outer: "relative top-[5em] m-3",
    panel: "relative border-2 border-darkBeige w-full",
    headingWrap: "text-left lowercase border-b-[2px] border-dashed border-darkBeige pl-2",
    venueWrap: "absolute -right-[1.5em] top-[1.5em] w-[146.03px]",
    venueBox: "bg-darkBlue p-3 py-4 rounded-2xl",
    venueTitle: "text-lightRed text-[15px] font-bold font-titles leading-none",
    venueText: " text-[7px] leading-tight font-txt",
    venueLink: " text-[8px] mt-1 underline font-titles",
    infoWrap: "pt-2",
    infoRow: "flex items-center gap-2 text-darkBlue font-bold pl-2",
    iconClass: "text-[10px]",
    infoText: "text-[10px] font-txt",
    ctaWrap: "relative pt-2 pb-2",
    ctaLink: "absolute items-center justify-center  pl-2",
    ctaSvg: "w-[10em] h-[35px] z-10",
    ctaText: "relative font-txt justify-center text-center text-[16px] -top-[29px] z-20 uppercase",
    headingSize: "text-xl",
    locationSize: "text-md font-txt",
    descriptionClass: "text-[12px] pb-5 pt-[5vh] text-darkBlue font-txt",
    descriptionMode: "split4",
    dividerClass: "",
    mediaWrap: "relative w-full h-[400px] -top-5 -left-2",
    mediaTopWrap: "relative h-[200px]",
    videoWrap: "absolute top-1 right-[3.5em] w-[250px] h-[110px]",
    videoFrameWidth: 228,
    videoFrameHeight: 125,
    videoFrameClass: "transform-gpu w-[228px] h-[125px]",
    videoFrameSizes: "(max-width: 375px) 228px",
    videoInnerClass: "absolute inset-0 flex items-center justify-center",
    videoClass:
      "w-[80%] h-[90%] mt-3 -ml-5 object-cover border-darkBlue border-[6px] rounded-sm z-20 shadow-gray-500 shadow-[2px_-2px_5px_rgba(0,0,0,0.3)] hover:opacity-100 [&::-webkit-media-controls]:opacity-0 hover:[&::-webkit-media-controls]:opacity-100 [&::-webkit-media-controls]:transition-opacity",
    photo2Wrap: "absolute left-[11.5em] top-0 w-[10em] h-[13em] z-10",
    photo2Class: "w-[130px] h-[130px] shadow-gray-500 shadow-[3px_3px_3px_rgba(0,0,0,0.3)]",
    mediaBottomWrap: "relative h-[200px] bottom-8",
    photo1Wrap: "absolute left-[22px] -top-16 w-1/2 z-10",
    photo1Class: "w-[153px] h-[155px] z-10 shadow-gray-500 shadow-[0px_3px_3px_rgba(0,0,0,0.3)]",
    backWrap: "relative",
    backImage: "absolute right-8 -bottom-12 w-[145px] h-[40px] cursor-pointer",
    backText: "absolute inset-0 font-times font-titles  left-[25px] top-[13px] text-[20px]",
    photo3Wrap: "absolute -right-5 -top-11 w-[156px] h-[156px] z-10",
    photo3Class: "w-[156px] h-[156px]",
    titleWrap: "absolute bottom-4 left-4 z-20",
    titleLeading: "flex flex-col leading-[37px]",
    titleSize: "text-darkBlue text-[46px] font-titles",
    subtitleWrap: "text-lightRed text-[8px] flex flex-col",
    showAnchor: true,
    anchorClass: "w-[22px] h-[26px] -ml-[5px] rotate-12",
    subtitleTextWrap: "-ml-[35px] mt-[35px] leading-none tracking-widest font-txt uppercase",
    showDrawing: true,
    drawingClass: "w-[150px] h-[110px] absolute bottom-[18px] -right-2 z-10 brightness-[78%] contrast-[91%] opacity-[70%]",
  },
  m: {
    outer: "relative top-[5em] mr-2 ml-2",
    panel: "relative border-2 border-darkBeige w-[90vw]",
    headingWrap: "text-left lowercase border-b-[2px] border-dashed border-darkBeige pl-5",
    venueWrap: "absolute -right-[1em] top-[1.5em] w-[146.03px]",
    venueBox: "bg-darkBlue p-3 py-4 rounded-2xl",
    venueTitle: "text-lightRed text-[15px] font-bold font-titles leading-none",
    venueText: " text-[7px] leading-tight font-txt",
    venueLink: " text-[8px] mt-1 underline font-titles",
    infoWrap: "pt-2",
    infoRow: "flex items-center gap-2 text-darkBlue font-bold pr-5 pl-5",
    iconClass: "text-[10px]",
    infoText: "text-[10px] font-txt",
    ctaWrap: "relative pt-2 pb-2",
    ctaLink: "absolute items-center justify-center  pl-5",
    ctaSvg: "w-[10em] h-[35px] z-10",
    ctaText: "relative font-txt justify-center text-center text-[16px] -top-[29px] z-20 uppercase",
    headingSize: "text-xl",
    locationSize: "text-md font-txt",
    descriptionClass: "text-[10px] pb-6 pt-11 text-darkBlue font-txt text-left",
    descriptionMode: "split2",
    dividerClass: "",
    mediaWrap: "relative w-full h-[400px] -top-5 -left-2",
    mediaTopWrap: "relative h-[200px]",
    videoWrap: "absolute left-3 top-1.5 w-[200.79px] h-[118.43px]",
    videoFrameWidth: 250,
    videoFrameHeight: 118.43,
    videoFrameClass: "transform-gpu relative -left-[14px] h-[135px]",
    videoFrameSizes: undefined,
    videoInnerClass: "absolute inset-0 flex items-center justify-center",
    videoClass:
      "w-[187.97px] h-[106.42px] mt-3 -ml-5 object-cover border-darkBlue border-[6px] rounded-sm z-20 shadow-gray-500 shadow-[2px_-2px_5px_rgba(0,0,0,0.3)] hover:opacity-100 [&::-webkit-media-controls]:opacity-0 hover:[&::-webkit-media-controls]:opacity-100 [&::-webkit-media-controls]:transition-opacity",
    photo2Wrap: "absolute left-[12em] top-0 w-[10em] h-[10em] z-10",
    photo2Class: "w-full h-full shadow-gray-500 shadow-[3px_3px_3px_rgba(0,0,0,0.3)]",
    mediaBottomWrap: "relative h-[200px] bottom-8",
    photo1Wrap: "absolute left-[22px] -top-16 w-1/2 z-10",
    photo1Class: "w-[153px] h-[155px] z-10 shadow-gray-500 shadow-[0px_3px_3px_rgba(0,0,0,0.3)]",
    backWrap: "relative",
    backImage: "absolute right-[3em] -bottom-12 w-[145px] h-[40px] cursor-pointer",
    backText: "absolute inset-0 font-times font-titles  left-[25px] top-[13px] text-[20px]",
    photo3Wrap: "absolute left-[10em] bottom-[1em] w-[12em] h-[12em] z-10",
    photo3Class: "w-full h-full",
    titleWrap: "absolute bottom-4 left-4 z-20",
    titleLeading: "flex flex-col leading-[37px]",
    titleSize: "text-darkBlue text-[46px] font-titles",
    subtitleWrap: "text-lightRed text-[8px] flex flex-col",
    showAnchor: false,
    anchorClass: "",
    subtitleTextWrap: "-ml-[35px] mt-[6.5em] leading-none tracking-widest font-txt uppercase",
    showDrawing: false,
    drawingClass: "",
  },
  l: {
    outer: "relative -bottom-[75px] pb-[35px]",
    panel: "border-[3px] border-darkBeige p-4 mx-4 relative",
    headingWrap: "text-left font-txt lowercase border-b-[2px] border-dashed border-darkBeige",
    venueWrap: "absolute -right-[3vw] top-[8vh] w-[50%]",
    venueBox: "bg-darkBlue p-3 rounded-2xl",
    venueTitle: "text-lightRed text-lg font-bold font-titles leading-none",
    venueText: " text-[9px] leading-tight font-txt",
    venueLink: " text-[9px] mt-1 font-titles underline",
    infoWrap: "",
    infoRow: "flex items-center gap-2 text-darkBlue font-txt",
    iconClass: "text-[13px]",
    infoText: "text-[12px]",
    ctaWrap: "relative h-[5vh] mt-2 -left-[2.5vw]",
    ctaLink: "absolute inset-0 items-center justify-center  w-[70%] left-4",
    ctaSvg: "w-[80%] h-[35px] z-10",
    ctaText: "relative font-txt uppercase justify-center text-[20px] -top-[32px] z-20 w-[80%] text-center",
    headingSize: "text-2xl",
    locationSize: "text-xl font-txt upercase",
    descriptionClass: "text-[14px] pb-6 pt-5 text-darkBlue font-txt",
    descriptionMode: "split4",
    dividerClass: "border-more-dashed pb-2",
    mediaWrap: "w-full h-[auto] relative -top-5 -left-2 mb-[70px]",
    mediaTopWrap: "relative h-[200px]",
    videoWrap: "absolute -left-0 -top-2.5 w-[298px] h-[140px]",
    videoFrameWidth: 250,
    videoFrameHeight: 100,
    videoFrameClass: "transform-gpu",
    videoFrameSizes: undefined,
    videoInnerClass: "absolute inset-0 flex items-center justify-center",
    videoClass:
      "w-[82%] h-[90%] mt-3 -ml-6 object-cover border-darkBlue border-[6px] rounded-sm z-20 shadow-gray-500 shadow-[2px_-2px_5px_rgba(0,0,0,0.3)] hover:opacity-100 [&::-webkit-media-controls]:opacity-0 hover:[&::-webkit-media-controls]:opacity-100 [&::-webkit-media-controls]:transition-opacity",
    photo2Wrap: "absolute -right-[2px] -top-4 w-[175px] z-10",
    photo2Class: "w-[180px] h-[170px] shadow-gray-500 shadow-[3px_3px_3px_rgba(0,0,0,0.3)]",
    mediaBottomWrap: "relative h-[200px]",
    photo1Wrap: "absolute left-[19px] bottom-[73px] w-1/2 z-20",
    photo1Class: "w-[197px] h-[197px] z-10 shadow-gray-500 shadow-[0px_3px_3px_rgba(0,0,0,0.3)]",
    backWrap: "relative",
    backImage: "w-[180px] h-[55px] absolute right-[45px] -bottom-[65px] cursor-pointer",
    backText: "absolute inset-0 font-titles  left-[50px] top-5 text-[24px]",
    photo3Wrap: "absolute -right-[6px] bottom-[3em] w-[225px] h-[200px] z-10",
    photo3Class: "w-full h-auto",
    titleWrap: "absolute -bottom-[85px] left-[20px] z-10",
    titleLeading: "flex flex-col leading-[45px]",
    titleSize: "text-darkBlue text-[57px] font-titles",
    subtitleWrap: "text-lightRed text-[9px] flex flex-col gap-4",
    showAnchor: true,
    anchorClass: "w-[45px] h-[50px] rotate-12 ml-[15px]",
    subtitleTextWrap: "-ml-[40px] -mb-[8px] font-txt uppercase leading-none tracking-widest",
    showDrawing: true,
    drawingClass: "w-[170px] h-[125px] absolute -bottom-[110px] -right-[4px] z-20 brightness-[78%] contrast-[91%] opacity-[70%]",
  },
  tablet: {
    outer: "relative top-[12vh] p-10",
    panel: "border-[3px] border-darkBeige p-16 relative",
    headingWrap: "text-left border-b-[3px] border-darkBeige border-dashed",
    venueWrap: "absolute w-[50%] top-[18vh] right-[-3vw]",
    venueBox: "bg-darkBlue p-6 rounded-3xl",
    venueTitle: "text-lightRed text-[25px] font-titles leading-none",
    venueText: " font-txt leading-tight text-[15px]",
    venueLink: " mt-1 font-titles underline text-[16px]",
    infoWrap: "",
    infoRow: "flex items-center gap-2 text-darkBlue font-txt",
    iconClass: "text-[13px]",
    infoText: "text-[12px] font-bold",
    ctaWrap: "relative h-[8vh] mt-2 -left-[2.5vw]",
    ctaLink: "absolute inset-0 items-center justify-center  w-[65%] left-4",
    ctaSvg: "w-[80%] h-[45px] z-10",
    ctaText: "relative font-txt uppercase justify-center text-[26px] -top-[42px] z-20 w-[80%] text-center",
    headingSize: "text-[40px]",
    locationSize: "text-[25px] font-txt lowercase",
    descriptionClass: "text-[14px] pb-6 pt-5 text-darkBlue font-txt",
    descriptionMode: "split4",
    dividerClass: "border-more-dashed my-2",
    mediaWrap: "w-full h-[auto] relative",
    mediaTopWrap: "relative h-[220px]",
    videoWrap: "absolute -top-[6em] w-[660px] h-[380px]",
    videoFrameWidth: 460,
    videoFrameHeight: 300,
    videoFrameClass: "h-[300px]",
    videoFrameSizes: undefined,
    videoInnerClass: "absolute inset-0 flex items-center justify-center right-[10em] bottom-[5.3em]",
    videoClass:
      "w-[28em] h-[15em] object-cover border-darkBlue border-[10px] rounder-sm z-20 shadow-gray-500 shadow-[2px_-2px_5px_rgba(0,0,0,0.3)] hover:opacity-100 [&::-webkit-media-controls]:opacity-0 hover:[&::-webkit-media-controls]:opacity-100 [&::-webkit-media-controls]:transition-opacity",
    photo2Wrap: "absolute left-[26.5em] bottom-[2em] w-[18em] z-10",
    photo2Class: "w-full shadow-gray-500 shadow-[3px_3px_3px_rgba(0,0,0,0.3)]",
    mediaBottomWrap: "relative h-[750px] mx-5 mb-4",
    photo1Wrap: "absolute left-[2em] -top-[4em] z-10 w-1/2",
    photo1Class: "z-10 h-[320px] shadow-gray-500 shadow-[0px_3px_3px_rgba(0,0,0,0.3)]",
    backWrap: "relative",
    backImage: "absolute -left-[18px] top-[20px] w-[290px] h-[110px] cursor-pointer",
    backText: "absolute inset-0 font-titles  w-3/4 text-center mx-auto top-[40px] text-[50px]",
    photo3Wrap: "absolute left-[21.5em] bottom-[30em] w-[350px] h-[300px]",
    photo3Class: "w-full h-auto",
    titleWrap: "absolute bottom-[10em] left-[15px] z-10",
    titleLeading: "flex flex-col leading-[75px] mb-10",
    titleSize: "text-darkBlue font-titles text-[90px]",
    subtitleWrap: "text-lightRed text-[15px] flex flex-col",
    showAnchor: true,
    anchorClass: "ml-[25px] rotate-12 mb-4",
    subtitleTextWrap: "-ml-[50px] mb-[30px] leading-none tracking-widest font-txt uppercase text-[20px]",
    showDrawing: true,
    drawingClass: "absolute bottom-[12em] right-[0px] z-20 brightness-[78%] contrast-[91%] opacity-[70%] w-[300px] h-[300px]",
  },
};

export const FamilyMobile = ({ data, variant = "s" }) => {
  const { event, location, date, ticketsURL, venueInfo, gigStartTime, gigFinishTime } = data;
  const formattedDate = formatDate(date);
  const eventURL = "/eventURL";
  const router = useRouter();
  const styles = stylesByVariant[variant] || stylesByVariant.s;

  return (
    <div className={styles.outer}>
      <div className={styles.panel}>
        <div className={styles.headingWrap}>
          <h1 className="font-titles leading-none">
            <span className={`text-darkBlue ${styles.headingSize}`}>old time sailors </span>
            <span className={`text-lightRed ${styles.headingSize}`}> at</span>
            <br />
            <span className={`text-lightRed ${styles.headingSize}`}>{event}</span>
          </h1>
          <p className={`text-darkBlue ${styles.locationSize}`}>{location}</p>
        </div>

        {styles.dividerClass && <div className={styles.dividerClass} />}

        <div className={styles.venueWrap}>
          <div className={styles.venueBox}>
            <h3 className={styles.venueTitle}>
              <p>more about</p>
              <p>the venue</p>
            </h3>
            <div className="mt-0.5">
              <p className={styles.venueText}>{venueInfo}</p>
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

        <div className={styles.infoWrap}>
          {[
            { icon: FaLocationDot, text: `${event}` },
            { icon: FaCalendar, text: `${formattedDate}` },
            { icon: FaClock, text: `${gigStartTime} to ${gigFinishTime}` },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className={styles.infoRow}>
              <Icon className={styles.iconClass} />
              <span className={styles.infoText}>{text}</span>
            </div>
          ))}

          <div className={styles.ctaWrap}>
            <a className={styles.ctaa}
              href={ticketsURL || "#"}
              target="_blank"
              rel="noreferrer"
              aria-disabled={!ticketsURL}
              onClick={() => ClickPixel("BuyTicket")}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 358.62 137.01" preserveAspectRatio="none" className={styles.ctaSvg}>
                <path
                  fill="#db3a57"
                  d="M25.61,0H333.01c0,14.15,11.47,25.61,25.61,25.61V111.4c-14.15,0-25.61,11.47-25.61,25.61H25.61c0-14.15-11.47-25.61-25.61-25.61V25.61C14.15,25.61,25.61,14.15,25.61,0Z"
                />
              </svg>
              <h3 className={styles.ctaText}>buy tickets</h3>
            </a>
          </div>

          {styles.descriptionMode === "split2" ? (
            <div className={styles.descriptionClass}>
              <p className="leading-[12.5px] [&:not(:last-child)]:mb-0">
                You are invited to board the Sailorette and join the plentiful crew, 'The Old Time Sailors', for a night of footstomping, dancing and
                singing! You will be sailing back to the 19th century for an immersive experience of traditional seafaring music performed in a way you
                have never seen before. The Motley Crew and their plethora of traditional and eclectic instruments will take you back to the time of
                clashing tankards, and drunken debauchery.
              </p>
              <p className="leading-[12.5px] [&:not(:last-child)]:mb-0">
                Sing and dance along like a drunken sailor as the band perform centuries old folk and shanty songs. Fancy dress is encouraged, so pull out
                your best seafaring garments me hearties and join the festivities.
              </p>
            </div>
          ) : (
            <div className={styles.descriptionClass}>
              <p className="leading-relaxed [&:not(:last-child)]:mb-0">
                You are invited to board the Sailorette and join the plentiful crew, 'The Old Time Sailors', for a night of footstomping, dancing and
                singing!
              </p>
              <p className="leading-relaxed [&:not(:last-child)]:mb-0">
                You will be sailing back to the 19th century for an immersive experience of traditional seafaring music performed in a way you have never
                seen before.
              </p>
              <p className="leading-relaxed [&:not(:last-child)]:mb-0">
                The Motley Crew and their plethora of traditional and eclectic instruments will take you back to the time of clashing tankards, and drunken
                debauchery. Sing and dance along like a drunken sailor as the band perform centuries old folk and shanty songs.
              </p>
              <p className="leading-relaxed">Fancy dress is encouraged, so pull out your best seafaring garments me hearties and join the festivities.</p>
            </div>
          )}
        </div>
      </div>

      <div className={styles.mediaWrap}>
        <div className={styles.mediaTopWrap}>
          <div className={styles.videoWrap}>
            <Image
              src="/assets/videoBox.webp"
              alt="Video frame"
              width={styles.videoFrameWidth}
              height={styles.videoFrameHeight}
              quality={50}
              className={styles.videoFrameClass}
              priority={true}
              sizes={styles.videoFrameSizes}
            />
            <div className={styles.videoInnerClass}>
              <video controls preload="none" poster={"/assets/thumbnailvideo.webp"} className={styles.videoClass}>
                <source src="/assets/familyVideo.mp4" type="video/mp4" />
              </video>
            </div>
          </div>

          <div className={styles.photo2Wrap}>
            <Image src="/assets/familyPhoto2.webp" alt="Musicians" width={180} height={170} quality={75} className={styles.photo2Class} loading="lazy" />
          </div>
        </div>

        <div className={styles.mediaBottomWrap}>
          <div className={styles.photo1Wrap}>
            <Image src="/assets/familyPhoto1.webp" alt="Performance" width={200} height={200} quality={75} className={styles.photo1Class} loading="lazy" />
            <div className={styles.backWrap} onClick={() => router.back()} role="button" tabIndex={0}>
              <Image src="/assets/arrow2.webp" alt="More gigs" width={180} height={55} quality={75} className={styles.backImage} loading="lazy" />
              <p className={styles.backText}>more gigs</p>
            </div>
          </div>

          <div className={styles.photo3Wrap}>
            <Image src="/assets/familyPhoto3.webp" alt="Crowd" width={400} height={400} quality={75} className={styles.photo3Class} loading="lazy" />
          </div>
        </div>

        <div className={styles.titleWrap}>
          <div className="flex flex-row items-center gap-3">
            <div className={styles.titleLeading}>
              <p className={styles.titleSize}>family</p>
              <p className={styles.titleSize}>show</p>
            </div>
            <div className={styles.subtitleWrap}>
              {styles.showAnchor && (
                <Image src="/assets/anchor.webp" alt="Anchor" width={45} height={50} quality={75} className={styles.anchorClass} loading="lazy" />
              )}
              <div className={styles.subtitleTextWrap}>
                <p>a traditional sailor show,</p>
                <p>sing along and dance with us!</p>
              </div>
            </div>
          </div>
        </div>

        {styles.showDrawing && (
          <Image src="/assets/drawing2.webp" alt="Background drawing" width={170} height={125} quality={75} className={styles.drawingClass} loading="lazy" />
        )}
      </div>
    </div>
  );
};

export default FamilyMobile;
