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
  laptop: {
    outer: "relative top-[24em]",
    inner: "relative left-[5em] w-full",
    panel: "border-[3px] border-darkBeige p-2 relative w-[70%] left-[0px] bottom-[22em]",
    headingWrap: "text-left px-[5em] border-b-[3px] border-darkBeige border-dashed",
    venueWrap: "absolute w-[25em] top-[20px] left-[50em] z-20",
    eventInfo: "mt-[5em] px-[5em] space-y-6",
    eventListWrap: "",
    iconSize: "text-[25px]",
    eventText: "text-[25px] font-txt",
    ctaWrap: "relative w-[400px] h-[100px]",
    ctaLink: "absolute left-[70px] top-[5px] inset-0 items-center justify-center ",
    ctaSvg: "w-[100%] h-[100px] z-10",
    ctaText: "relative font-txt justify-center text-[47px] uppercase -top-[85px] z-20 w-[100%] text-center",
    descriptionWrap: "text-[22px] pb-5 pr-[150px] text-darkBlue font-txt",
    showAnchor: false,
    photo1Wrap: "absolute left-[75em] bottom-[45em] z-10",
    photo1Class: "w-[250px] h-[250px]",
    photo2Wrap: "absolute left-[60em] top-[2.3em] z-20",
    photo2Class: "w-[450px]",
    photo3Wrap: "absolute left-[32em] top-[28em] z-30",
    photo3Class: "w-[500px]",
    drawingWrap: "absolute right-[5em] top-[40em]",
    drawingClass: "w-[400px] h-[350px] brightness-[78%] contrast-[91%]",
    frameWrap: "absolute top-[25em] left-[0px]",
    frameClass: "w-[600px] h-[310px]",
    videoWrap: "absolute inset-0 top-[27em] left-[2em] z-40",
    videoClass:
      "object-cover w-[540px] h-[240px] border-darkBlue border-[10px] rounded-sm shadow-gray-500 shadow-[2px_-2px_5px_rgba(0,0,0,0.3)] hover:opacity-100 [&::-webkit-media-controls]:opacity-0 hover:[&::-webkit-media-controls]:opacity-100 [&::-webkit-media-controls]:transition-opacity",
    backWrap: "relative -top-[6em]",
    backImgClass: "absolute left-[10px] top-[25px] w-[450px] h-[110px]",
    backTextClass: "absolute inset-0 font-titles  left-[150px] top-[35px] text-[65px]",
    titleWrap: "absolute top-[55em] left-[15px] z-10",
    titleBlockClass: "leading-[140px]",
    familyTextClass: "text-darkBlue text-[180px] font-titles",
    showTextClass: "text-darkBlue text-[180px] font-titles",
    subtitleWrap: "text-lightRed text-[30px] -mb-[205px] -ml-[105px]",
    subtitleInner: "font-txt font-bold leading-tight tracking-widest uppercase",
  },
  laptopL: {
    outer: "relative top-[15vh]",
    inner: "relative w-full my-[75vh]",
    panel: "border-4 border-solid border-darkBeige p-2 relative h-[100vh] w-[63vw] -right-[4vw] -top-[85vh]",
    headingWrap: "text-left px-[5vw] border-dashed border-b-4 border-darkBeige",
    venueWrap: "absolute w-[23vw] top-[2vh] -right-[5vw] z-20",
    eventInfo: "space-y-6 px-[6vw]",
    eventListWrap: "space-y-3",
    iconSize: "text-[19px]",
    eventText: "text-[19px] font-bold",
    ctaWrap: "relative w-[20vw]",
    ctaLink: "absolute inset-0 items-center justify-center ",
    ctaSvg: "w-[100%] h-[15vh] z-10",
    ctaText: "relative font-txt uppercase justify-center text-[40px] -top-[11.5vh] z-20 w-[100%] text-center",
    descriptionWrap: "text-[19px] text-left text-darkBlue leading-8 font-txt",
    showAnchor: true,
    photo1Wrap: "absolute right-[65px] -top-[450px] z-10",
    photo1Class: "w-[290px] h-[290px] shadow-gray-500 shadow-[0px_3px_20px_rgba(0,0,0,0.3)]",
    photo2Wrap: "absolute right-[100px] top-[-175px] z-20",
    photo2Class: "w-[390px] shadow-gray-500 shadow-[3px_3px_3px_rgba(0,0,0,0.3)]",
    photo3Wrap: "absolute left-[450px] top-[80px] z-30",
    photo3Class: "w-[550px]",
    drawingWrap: "absolute -right-[0px] -bottom-[-150px]",
    drawingClass: "w-[380px] h-[330px] brightness-[78%] contrast-[91%]",
    frameWrap: "absolute top-[-25px] left-[10px]",
    frameClass: "",
    videoWrap: "absolute inset-0 top-[10px] left-[47px] z-40",
    videoClass:
      "object-cover w-[540px] h-[300px] border-darkBlue border-[10px] rounded-sm shadow-gray-500 shadow-[2px_-2px_5px_rgba(0,0,0,0.3)] hover:opacity-100 [&::-webkit-media-controls]:opacity-0 hover:[&::-webkit-media-controls]:opacity-100 [&::-webkit-media-controls]:transition-opacity",
    backWrap: "relative",
    backImgClass: "absolute left-[10px] top-[-48vh] w-[430px] h-[120px] cursor-pointer",
    backTextClass: "absolute inset-0 font-titles  left-[150px] top-[-45vh] text-[50px]",
    titleWrap: "absolute -bottom-[15vh] left-[15px] z-10",
    titleBlockClass: "leading-[110px]",
    familyTextClass: "text-darkBlue text-[125px] font-titles",
    showTextClass: "text-darkBlue text-[145px] font-titles",
    subtitleWrap: "text-lightRed text-[30px] -mb-[150px] -ml-[35px]",
    subtitleInner: "font-txt uppercase leading-tight tracking-widest",
  },
  "1360": {
    outer: "relative -bottom-[100px]",
    inner: "relative w-full h-full my-[250px]",
    panel: "border-[3px] border-darkBeige p-2 relative w-[850px] -right-[104px] -top-[310px]",
    headingWrap: "text-left px-10",
    venueWrap: "absolute w-[350px] top-[20px] -right-[103px] z-20",
    eventInfo: "space-y-6 p-4 px-10",
    eventListWrap: "space-y-3",
    iconSize: "text-[18px] text-darkBlue",
    eventText: "text-[18px] font-txt",
    ctaWrap: "relative w-[330px] h-[100px]",
    ctaLink: "absolute left-12 inset-0 items-center justify-center ",
    ctaSvg: "w-[100%] h-[100px] z-10",
    ctaText: "relative font-txt justify-center text-[37px] uppercase -top-[79px] z-20 w-[100%] text-center",
    descriptionWrap: "text-[17px] text-left text-darkBlue font-txt leading-7",
    showAnchor: false,
    photo1Wrap: "absolute right-[18px] -top-[230px] z-10",
    photo1Class: "w-[290px] h-[290px]",
    photo2Wrap: "absolute right-[45px] top-[53px] z-20",
    photo2Class: "w-[390px]",
    photo3Wrap: "absolute left-[510px] top-[300px] z-30",
    photo3Class: "w-[450px] h-[450px]",
    drawingWrap: "absolute right-[35px] -bottom-[300px]",
    drawingClass: "w-[350px] h-[350px] brightness-[78%] contrast-[91%]",
    frameWrap: "absolute top-[225px] left-[10px]",
    frameClass: "",
    videoWrap: "absolute inset-0 top-[257px] left-[47px] z-40",
    videoClass:
      "object-cover w-[540px] h-[300px] border-darkBlue border-[10px] rounded-sm shadow-gray-500 shadow-[2px_-2px_5px_rgba(0,0,0,0.3)] hover:opacity-100 [&::-webkit-media-controls]:opacity-0 hover:[&::-webkit-media-controls]:opacity-100 [&::-webkit-media-controls]:transition-opacity",
    backWrap: "relative -top-[150px]",
    backImgClass: "absolute left-[10px] top-[145px] w-[360px] h-[100px]",
    backTextClass: "absolute inset-0 font-titles  left-[130px] top-[156px] text-[50px]",
    titleWrap: "absolute -bottom-[320px] left-[90px] z-10",
    titleBlockClass: "leading-[90px]",
    familyTextClass: "text-darkBlue text-[110px] font-titles m-0",
    showTextClass: "text-darkBlue text-[110px] font-titles m-0",
    subtitleWrap: "text-lightRed text-[25px] -mb-[130px] -ml-[65px] leading-none font-txt",
    subtitleInner: "font-txt leading-none tracking-widest uppercase",
  },
  desktop: {
    outer: "relative top-[25em]",
    inner: "relative w-full h-full",
    panel: "border-[3px] border-darkBeige p-2 relative w-[1100px] -right-[100px] -top-[310px]",
    headingWrap: "text-left px-10",
    venueWrap: "absolute w-[350px] top-[20px] -right-[100px] z-20",
    eventInfo: "space-y-6 pl-[45px]",
    eventListWrap: "space-y-3",
    iconSize: "text-[25px]",
    eventText: "text-[25px] font-txt",
    ctaWrap: "relative w-[400px] h-[100px]",
    ctaLink: "absolute left-[70px] top-[5px] inset-0 items-center justify-center ",
    ctaSvg: "w-[100%] h-[100px] z-10",
    ctaText: "relative font-txt justify-center text-[47px] uppercase -top-[85px] z-20 w-[100%] text-center",
    descriptionWrap: "text-[22px] pb-5 pr-[150px] text-darkBlue font-txt",
    showAnchor: true,
    photo1Wrap: "absolute right-[15px] -top-[230px] z-10",
    photo1Class: "w-[370px] h-[370px]",
    photo2Wrap: "absolute right-[25px] top-[130px] z-20",
    photo2Class: "w-[600px]",
    photo3Wrap: "absolute left-[515px] top-[460px] z-30",
    photo3Class: "w-[600px] h-[600px]",
    drawingWrap: "absolute right-[5px] -bottom-[500px]",
    drawingClass: "w-[600px] h-[450px] brightness-[78%] contrast-[91%]",
    frameWrap: "absolute top-[340px] left-[20px]",
    frameClass: "w-[600px] h-[425px]",
    videoWrap: "absolute inset-0 top-[375px] left-[55px] z-40",
    videoClass:
      "object-cover w-[540px] h-[340px] border-darkBlue border-[10px] rounded-sm shadow-gray-500 shadow-[2px_-2px_5px_rgba(0,0,0,0.3)] hover:opacity-100 [&::-webkit-media-controls]:opacity-0 hover:[&::-webkit-media-controls]:opacity-100 [&::-webkit-media-controls]:transition-opacity",
    backWrap: "relative top-[15px]",
    backImgClass: "absolute left-[10px] top-[25px] w-[450px] h-[110px]",
    backTextClass: "absolute inset-0 font-titles  left-[150px] top-[35px] text-[65px]",
    titleWrap: "absolute -bottom-[470px] left-[15px] z-10",
    titleBlockClass: "leading-[140px]",
    familyTextClass: "text-darkBlue text-[180px] font-titles",
    showTextClass: "text-darkBlue text-[180px] font-titles",
    subtitleWrap: "text-lightRed text-[30px] -mb-[205px] -ml-[105px]",
    subtitleInner: "font-txt font-bold leading-tight tracking-widest uppercase",
  },
};

export const FamilyLaptop = ({ data, variant = "laptop" }) => {
  const { event, location, date, ticketsURL, venueInfo, gigStartTime, gigFinishTime } = data;
  const formattedDate = formatDate(date);
  const eventURL = "/eventURL";
  const router = useRouter();
  const styles = stylesByVariant[variant] || stylesByVariant.laptop;
  const isLaptopL = variant === "laptopL";

  return (
    <>
      <div className={styles.outer}>
        <div className={styles.inner}>
          <div className={styles.panel}>
            <div className={styles.headingWrap}>
              <h1 className="leading-none font-titles lowercase pt-2">
                <span className="text-darkBlue text-[55px]">old time sailors </span>
                <span className="text-lightRed text-[55px]">{isLaptopL ? "at" : " at"}</span>
                <br />
                <span className="text-lightRed text-[55px]">{event}</span>
              </h1>
              <p className="text-darkBlue font-txt text-[30px] lowercase">{location}</p>
            </div>
            <div className={styles.venueWrap}>
              <div className="bg-darkBlue h-[220px] p-6 rounded-3xl">
                <h3 className="text-lightRed text-[30px] font-titles leading-none">
                  {isLaptopL ? (
                    <>
                      <p>more about </p>
                      <p>the venue</p>
                    </>
                  ) : (
                    <>
                      more about
                      <br />
                      the venue
                    </>
                  )}
                </h3>
                <div className="mt-0.5 tracking-wide">
                  <p className=" text-[15px] font-txt leading-tight">{venueInfo}</p>
                  <Link href={eventURL}>
                    <p className="text-white text-[15px] mt-1 font-titles underline">contact the venue for + info</p>
                  </Link>
                </div>
              </div>
            </div>
            <div className="border-more-dashed my-4" />

            <div className={styles.eventInfo}>
              <div className="flex flex-row gap-5">
                <div className={styles.eventListWrap}>
                  {[
                    { icon: FaLocationDot, text: `${event}` },
                    { icon: FaCalendar, text: `${formattedDate}` },
                    { icon: FaClock, text: `${gigStartTime} to ${gigFinishTime}` },
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-center gap-2 text-darkBlue font-txt leading-tight">
                      <Icon className={styles.iconSize} />
                      <span className={styles.eventText}>{text}</span>
                    </div>
                  ))}
                </div>

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
              </div>

              {isLaptopL ? (
                <p className={styles.descriptionWrap}>
                  You are invited to board the Sailorette and join the plentiful crew, 'The Old Time Sailors', for a night of footstomping, dancing and
                  singing! You will be sailing back to the 19th century for an immersive experience of traditional seafaring music performed in a way
                  you have never seen before. The Motley Crew and their plethora of traditional and eclectic instruments will take you back to the time
                  of clashing tankards, and drunken debauchery. Sing and dance along like a drunken sailor as the band perform centuries old folk and
                  shanty songs. Fancy dress is encouraged, so pull out your best seafaring garments me hearties and join the festivities.
                </p>
              ) : (
                <div className={styles.descriptionWrap}>
                  <p className="leading-relaxed [&:not(:last-child)]:mb-0">
                    You are invited to board the Sailorette and join the plentiful crew, 'The Old Time Sailors', for a night of footstomping, dancing and
                    singing!
                  </p>
                  <p className="leading-relaxed [&:not(:last-child)]:mb-0">
                    You will be sailing back to the 19th century for an immersive experience of traditional seafaring music performed in a way you have
                    never seen before.
                  </p>
                  <p className="leading-relaxed [&:not(:last-child)]:mb-0">
                    The Motley Crew and their plethora of traditional and eclectic instruments will take you back to the time of clashing tankards, and
                    drunken debauchery. Sing and dance along like a drunken sailor as the band perform centuries old folk and shanty songs.
                  </p>
                  <p className="leading-relaxed">
                    Fancy dress is encouraged, so pull out your best seafaring garments me hearties and join the festivities.
                  </p>
                </div>
              )}
            </div>
          </div>

          {styles.showAnchor && (
            <div className="absolute right-[365px] -top-[280px]">
              <Image src="/assets/anchor.webp" alt="Anchor" width={100} height={100} className="w-[50px] h-[60px]" loading="lazy" />
            </div>
          )}

          <div className={styles.photo1Wrap}>
            <Image src="/assets/familyPhoto1.webp" alt="Performance" width={370} height={370} className={styles.photo1Class} loading="lazy" />
          </div>
          <div className={styles.photo2Wrap}>
            <Image src="/assets/familyPhoto2.webp" alt="Musicians" width={600} height={200} className={styles.photo2Class} loading="lazy" />
          </div>
          <div className={styles.photo3Wrap}>
            <Image src="/assets/familyPhoto3.webp" alt="Crowd" width={600} height={600} className={styles.photo3Class} loading="lazy" />
          </div>
          <div className={styles.drawingWrap}>
            <Image src="/assets/drawing2.webp" alt="Background drawing" width={600} height={500} className={styles.drawingClass} loading="lazy" />
          </div>
          <div className={styles.frameWrap}>
            <Image src="/assets/videoBox.webp" alt="Video frame" width={590} height={280} priority={true} className={styles.frameClass} />
          </div>

          <div className={styles.videoWrap}>
            <video controls preload="none" poster={"/assets/thumbnailvideo.webp"} className={styles.videoClass}>
              <source src="/assets/familyVideo.mp4" type="video/mp4" />
            </video>
          </div>

          <div className={styles.backWrap} onClick={() => router.back()} role="button" tabIndex={0}>
            <Image src="/assets/arrow2.webp" alt="More gigs" width={470} height={110} className={styles.backImgClass} loading="lazy" />
            <p className={styles.backTextClass}>more gigs</p>
          </div>

          <div className={styles.titleWrap}>
            <div className="flex flex-row items-center gap-3 mb-5">
              <div className={styles.titleBlockClass}>
                <p className={styles.familyTextClass}>family</p>
                <p className={styles.showTextClass}>show</p>
              </div>
              <div className={styles.subtitleWrap}>
                <div className={styles.subtitleInner}>
                  <p>a traditional sailor show,</p>
                  <p>sing along and dance with us!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FamilyLaptop;
