import Link from "next/link";
import { FaCalendar, FaClock } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import Image from "next/image";
import { memo } from "react";
import { useRouter } from "next/navigation";
const formatDate = (inputDate) => {
  // Parse the input date
  const [day, month, year] = inputDate.split("/").map(Number);

  // Create a Date object
  // Note: months in JavaScript Date are 0-indexed, so we subtract 1 from the month
  const date = new Date(year, month - 1, day);

  // Array of day names
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  // Array of month names
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  // Format the date
  const formattedDate = `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;

  return formattedDate;
};
const EventDescription = memo(() => (
  <div className="text-[10px] pb-6 pt-11 text-beige font-txt text-left">
    <p className="leading-relaxed [&:not(:last-child)]:mb-0">
      Heave ho and up she rises! Cast aside your compass, throw your maps overboard and join the mutinous crew of The Old Time Sailor as they set sail
      for the wild uninhabited islands of Irish Punk, Shanty Punk, Polka Rock, Romani Punk, Dark Cabaret, and Twisted Circus!
    </p>
    <p className="leading-relaxed [&:not(:last-child)]:mb-0">
      'Rock and row' with our 21 strong crew of rebellious musicians as the navigate a voyage through the thrashing seas of Hevay Metal and Hard Rock
      on a genre bending adventure into uncharted waters, join in the Wall of Death and thrash it out with your shipmates.
    </p>
    <p className="leading-relaxed [&:not(:last-child)]:mb-0">
      Get ready for vigorous vocals, emphatic energy, mosh pits and head banging: we play it live and we play it loud, but as always with The Old Time
      Sailors... be prepared to expect the unexpected!
    </p>
  </div>
));
const VideoComponent = memo(() => (
  <div className="absolute left-[39.62px] -top-[42px] z-20">
    <Image
      src="/assets/powerVideoBox2.svg"
      alt="Video frame"
      width={239}
      height={148}
      quality={50}
      className="transform-gpu relative -left-[14.38px]"
      priority={true}
    />
    <div className="absolute inset-0 flex items-center justify-center">
      <video
        controls
        preload="none"
        poster={"/assets/thumbnailVideoP.webp"}
        className="w-[187.97px] h-[106.42px] absolute top-[41px] left-[11px] object-cover rounded-sm]
              hover:opacity-100 [&::-webkit-media-controls]:opacity-0 hover:[&::-webkit-media-controls]:opacity-100 [&::-webkit-media-controls]:transition-opacity"
      >
        <source src="/assets/powerVideo.mp4" type="video/mp4" />
      </video>
    </div>
  </div>
));
export const PowerMobileM = ({ data }) => {
  const { event, location, date, ticketsURL, venueInfo, gigStartTime, gigFinishTime } = data;
  const formattedDate = formatDate(date);
  const eventURL = "/eventURL";
  const router = useRouter();
  return (
    <>
      <div className="relative top-[18.67px]">
        <div className="relative -bottom-[50px]  z-0 transform translate-z-0 will-change-transform">
          <div className="relative w-full h-full my-[10px]">
            {/* Contenedor principal con borde */}
            <div className="border-[2px] border-beige relative mr-[32.72px] ml-[35.28px]">
              <div className="text-left lowercase pl-[11.61px] pt-[4.5px] w-[190px]">
                <h1 className="font-titles pt-1 leading-[20px] text-[21px]">
                  <p>
                    <span className="text-lightRed">old time sailors </span>
                    <span className="text-beige"> at</span>
                  </p>
                  <p className="text-beige">{event}</p>
                </h1>
                <p className="text-lightRed text-[10.6px] font-txt uppercase">{location}</p>
              </div>

              <div className="border-more-dashed-beige my-2" />

              <div className="absolute -right-[24.5px] top-[24px] w-[146.03px]">
                <div className="bg-beige p-[11.82px] rounded-2xl">
                  <h3 className="text-lightRed text-[18px]  font-bold font-titles leading-[16px]">
                    <p>more about</p>
                    <p>the venue</p>
                  </h3>
                  <div className="mt-0.5 ">
                    <p className="text-darkBlue text-[8.9px] leading-tight font-txt">
                      {venueInfo}A rural escape built by the community, for the community in the heart of Newquay. A venue for the whole family with
                      seating options.
                    </p>
                    <Link href={eventURL}>
                      <p className="text-darkBlue text-[8.9px] mt-1  underline font-titles">contact the venue for + info</p>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Event info */}
              <div className="space-y-6 ">
                <div className="ml-[11.61px] mr-[10px]">
                  {[
                    { icon: FaLocationDot, text: `${event}` },
                    { icon: FaCalendar, text: `${formattedDate}` },
                    {
                      icon: FaClock,
                      text: `${gigStartTime} to ${gigFinishTime}`,
                    },
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-center gap-1 text-darkBlue font-txt">
                      <Icon className="text-[9.5px] text-lightRed" />
                      <span className="text-[9.5px] text-beige">{text}</span>
                    </div>
                  ))}

                  <div className="relative -left-[1.05px]">
                    <Link className="absolute inset-0 text-beige pt-1" href={ticketsURL} target="_blank">
                      <Image src="/assets/buyTickets.png" width={161.56} height={26.44}></Image>
                      {/* <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 358.62 137.01"
                        preserveAspectRatio="none"
                        className="w-[85%] h-[35px] z-10"
                      >
                        <path
                          fill="#db3a57"
                          d="M25.61,0H333.01c0,14.15,11.47,25.61,25.61,25.61V111.4c-14.15,0-25.61,11.47-25.61,25.61H25.61c0-14.15-11.47-25.61-25.61-25.61V25.61C14.15,25.61,25.61,14.15,25.61,0Z"
                        />
                      </svg>

                      <h3 className=" relative font-txt uppercase text-center text-[16px] -top-[29px] z-20 w-[85%]"> buy tickets</h3> */}
                    </Link>
                  </div>
                  <EventDescription />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Media section */}
        <div className="w-full h-[auto] relative top-[33px] -left-5 mb-10">
          <div className="relative h-[200px]">
            {/* Video */}
            <VideoComponent />
            {/* Photo 2 */}
            <div className="absolute -right-[19.20px] -top-[20px] w-[160px] h-[130px] z-9">
              <Image
                src="/assets/powerPhoto4.jpg"
                alt="Musicians"
                width={150}
                height={150}
                className="w-[148.54px] h-[148.54px] shadow-black-500 shadow-[3px_3px_3px_rgba(0,0,0,0.3)]"
                loading="lazy"
              />
            </div>
          </div>

          {/* Lower photos */}
          <div className="relative h-[200px]">
            <div className="absolute left-[47.91px] -top-[88px] z-20">
              <Image
                src="/assets/powerPhoto1.webp"
                alt="Performance"
                width={170}
                height={170}
                className="w-[154.33px] h-[155.33px] z-10  shadow-black-500 shadow-[3px_3px_3px_rgba(0,0,0,0.3)]"
                loading="lazy"
              />
              <div className="relative" onClick={() => router.back()} role="button" tabIndex={0}>
                <Image
                  src="/assets/beigeArrow.png"
                  alt="More gigs"
                  width={160}
                  height={50}
                  className="w-[160px] h-[50px] absolute right-[20px] -bottom-[60px]"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="absolute -right-[4px] bottom-[80px] w-[187px] h-[187px] z-10">
              <Image src="/assets/powerPhoto3.webp" alt="Crowd" width={400} height={400} className="w-full h-auto" loading="lazy" />
            </div>
          </div>

          {/* Title */}
          <div className="absolute -bottom-[30px] left-[20px] z-30">
            <div className="flex flex-row items-center gap-3">
              <div className="flex flex-col leading-[43.7px]">
                <p className="text-lightRed text-[49px] font-titles ">power</p>
                <p className="text-lightRed text-[49px] font-titles">show</p>
              </div>
              <div className="text-beige text-[9.45px] flex flex-col">
                <div className="-ml-[35px] mt-[58px] font-txt font-bold leading-none tracking-widest uppercase truncate">
                  <p>an upbeat, darker show. get ready to</p>
                  <p>party below deck like a pirate!</p>
                </div>
              </div>
            </div>
          </div>

          <Image
            src="/assets/shipDrawing.webp"
            alt="Background drawing"
            width={170}
            height={140}
            className="w-[153.24px] h-[112.52px] absolute -bottom-[37px] -right-[2px] z-0 mix-blend-multiply brightness-[35%] contrast-[250%] opacity-[85%]"
            loading="lazy"
          />
        </div>
      </div>
    </>
  );
};
