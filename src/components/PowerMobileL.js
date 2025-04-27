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

const EventIcon = memo(({ Icon, text }) => (
  <div className="flex items-center gap-2 text-darkBlue ">
    <Icon className="text-[13px] text-lightRed" />
    <span className="text-[13px] text-beige font-txt">{text}</span>
  </div>
));

const EventDescription = memo(() => (
  <div className="text-sm pb-6 pt-2 text-beige font-txt text-left">
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

export const PowerMobileL = ({ data }) => {
  const { event, location, date, ticketsURL, venueInfo, gigStartTime, gigFinishTime } = data;
  const formattedDate = formatDate(date);
  const eventURL = "/eventURL";
  const router = useRouter();
  return (
    <>
      <div className="relative -bottom-[65px] px-[15px] z-0 transform translate-z-0 will-change-transform">
        <div className="relative w-full h-full my-[10px] ">
          {/* Contenedor principal con borde */}
          <div className="border-[3px] border-beige p-2 m-4 relative">
            <div className="text-left font-txt lowercase">
              <h1 className="font-titles ">
                <span className="text-lightRed text-2xl">old time sailors </span> <span className="text-beige text-2xl">at</span>
                <br />
                <span className="text-beige text-2xl">{event}</span>
              </h1>

              <p className="text-lightRed text-xl font-txt">{location}</p>
            </div>

            <div className="border-more-dashed-beige my-4" />

            <div className="absolute -right-[12px] top-[70px] w-[176px]">
              <div className="bg-beige p-3 py-4 rounded-2xl">
                <h3 className="text-lightRed text-lg font-bold  font-titles leading-none">
                  <p>more about</p>
                  <p>the venue</p>
                </h3>
                <div className="mt-0.5 ">
                  <p className="text-darkBlue text-[9px] leading-tight font-txt">
                    {venueInfo}A rural escape built by the community, for the community in the heart of Newquay. A venue for the whole family with
                    seating options.
                  </p>
                  <Link href={eventURL}>
                    <p className="text-darkBlue text-[9px] mt-1  underline font-titles">contact the venue for + info</p>
                  </Link>
                </div>
              </div>
            </div>

            {/* Event info */}
            <div className="space-y-6">
              <div className="space-y-2">
                {[
                  { icon: FaLocationDot, text: `${event}` },
                  { icon: FaCalendar, text: `${formattedDate}` },
                  {
                    icon: FaClock,
                    text: `${gigStartTime} to ${gigFinishTime}`,
                  },
                ].map(({ icon: Icon, text }) => (
                  <EventIcon key={text} Icon={Icon} text={text} />
                ))}

                <div className="relative h-[18px] pb-8">
                  <Link className="absolute inset-0 items-center justify-center text-beige w-[55%] left-4" href={ticketsURL} target="_blank">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 358.62 137.01" preserveAspectRatio="none" className="w-[80%] h-[35px] z-10">
                      <path
                        fill="#db3a57"
                        d="M25.61,0H333.01c0,14.15,11.47,25.61,25.61,25.61V111.4c-14.15,0-25.61,11.47-25.61,25.61H25.61c0-14.15-11.47-25.61-25.61-25.61V25.61C14.15,25.61,25.61,14.15,25.61,0Z"
                      />
                    </svg>
                    <h3 className="relative font-txt uppercase justify-center text-[20px] -top-[32px] z-20 w-[80%] text-center"> buy tickets</h3>
                  </Link>
                </div>
                <EventDescription />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Media section */}
      <div className="w-full h-[auto] relative top-[40px] -left-2 ">
        <div className="relative h-[200px]">
          {/* Video */}
          {/* Contenedor principal */}
          <div className="relative w-[295px] h-[130px] -left-[4px]">
            {/* Video primero en el DOM pero con z-index menor */}
            <div className="absolute inset-0  flex items-center justify-center z-20">
              <video
                controls
                preload="none"
                poster={"/assets/thumbnailVideoP.webp"}
                playsInline
                loading="lazy"
                className="w-[77%] h-[98%] absolute -top-[7px] left-[33px] object-cover rounded-sm] hover:opacity-100 [&::-webkit-media-controls]:opacity-0 hover:[&::-webkit-media-controls]:opacity-100 [&::-webkit-media-controls]:transition-opacity"
              >
                <source src="/assets/powerVideo.mp4" type="video/mp4" />
              </video>
            </div>

            {/* Recuadro después en el DOM y con z-index mayor */}
            <div className="absolute inset-0 z-10 -top-[58px] left-[5px]">
              <Image src="/assets/powerVideoBox2.svg" alt="Video frame" width={290} height={209} className="w-[285px] h-[209px]" priority={true} />
            </div>
          </div>

          {/* Photo 2 */}
          <div className="absolute -right-[10px] -top-[25px] w-[175px] h-[130px] z-9">
            <Image src="/assets/powerPhoto4.jpg" alt="Musicians" width={180} height={180} className="w-[170px] h-[180px] shadow-2xl" loading="lazy" />
          </div>
        </div>

        {/* Lower photos */}
        <div className="relative h-[200px]">
          <div className="absolute left-[25px] bottom-[78px] w-1/2 z-20">
            <Image src="/assets/powerPhoto1.webp" alt="Performance" width={185} height={185} className=" w-[195px] h-[195px] z-10" loading="lazy" />
            <div className="relative" onClick={() => router.back()} role="button" tabIndex={0}>
              <Image
                src="/assets/beigeArrow.webp"
                alt="More gigs"
                width={180}
                height={55}
                className="w-[180px] h-[55px] absolute right-[45px] -bottom-[65px]"
                loading="lazy"
              />

              <p className="absolute inset-0 font-titles text-darkBlue left-[50px] top-5 text-[24px]">more gigs</p>
            </div>
          </div>

          <div className="absolute -right-[6px] bottom-[32px] w-[225px] h-[200px] z-10">
            <Image src="/assets/powerPhoto3.webp" alt="Crowd" width={400} height={400} className="w-full h-auto " loading="lazy" />
          </div>
        </div>

        {/* Title */}
        <div className="absolute -bottom-[95px] left-[20px] z-30">
          <div className="flex flex-row items-center gap-3">
            <div className="flex flex-col leading-[45px]">
              <p className="text-lightRed text-[57px] font-titles">power</p>
              <p className="text-lightRed text-[57px] font-titles">show</p>
            </div>
            <div className="text-beige text-[9px] flex flex-col gap-4">
              <div className="-ml-[30px] mt-[62px] font-txt leading-none tracking-wider uppercase">
                <p>an upbeat, darker show. get ready to</p>
                <p>party below deck like a pirate!</p>
              </div>
            </div>
          </div>
        </div>

        <Image
          src="/assets/shipDrawing.webp"
          alt="Background drawing"
          width={180}
          height={145}
          className="w-[180px] h-[145px] absolute -bottom-[110px] -right-[5px] z-20 mix-blend-multiply brightness-[55%] opacity-[75%]"
          loading="lazy"
        />
      </div>
    </>
  );
};
