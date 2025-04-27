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
  <div className="text-[12px] pb-5 pt-5 text-beige font-txt text-left">
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

export const PowerMobileS = ({ data }) => {
  const { event, location, date, ticketsURL, venueInfo, gigStartTime, gigFinishTime } = data;
  const formattedDate = formatDate(date);
  const eventURL = "/eventURL";
  const router = useRouter();
  return (
    <>
      <div className="relative -bottom-[50px] px-[15px]">
        <div className="relative w-full my-[10px]">
          {/* Contenedor principal con borde */}
          <div className="border-[3px] border-beige p-2 m-4 relative">
            <div className="text-left lowercase">
              <h1 className="font-titles leading-none">
                <span className="text-lightRed text-xl">old time sailors </span> <span className="text-beige text-xl"> at</span>
                <br />
                <span className="text-beige text-xl">{event}</span>
              </h1>
              <p className="text-lightRed text-sm font-txt">{location}</p>
            </div>

            <div className="border-more-dashed-beige my-4" />

            <div className="absolute -right-[28px] top-[70px] w-[145px]">
              <div className="bg-beige p-3 py-4 rounded-2xl">
                <h3 className="text-lightRed text-[15px]  font-titles leading-none">
                  <p>more about</p>
                  <p>the venue</p>
                </h3>
                <div className="mt-0.5 ">
                  <p className="text-darkBlue text-[8px] leading-tight font-txt">
                    {venueInfo}A rural escape built by the community, for the community in the heart of Newquay. A venue for the whole family with
                    seating options.
                  </p>
                  <Link href={eventURL}>
                    <p className="text-darkBlue text-[8px] mt-1  underline font-titles">contact the venue for + info</p>
                  </Link>
                </div>
              </div>
            </div>

            {/* Event info */}
            <div className="space-y-6">
              <div className="space-y-3">
                {[
                  { icon: FaLocationDot, text: `${event}` },
                  { icon: FaCalendar, text: `${formattedDate}` },
                  {
                    icon: FaClock,
                    text: `${gigStartTime} to ${gigFinishTime}`,
                  },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2 text-darkBlue font-bold">
                    <Icon className="text-[10px] text-lightRed" />
                    <span className="text-[8px] text-beige font-txt">{text}</span>
                  </div>
                ))}

                <div className="relative h-[18px]">
                  <Link className="absolute inset-0 items-center justify-center text-beige w-[45%] " href={`${ticketsURL}`} target="_blank">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 358.62 137.01" preserveAspectRatio="none" className="w-full h-[35px] z-10">
                      <path
                        fill="#db3a57"
                        d="M25.61,0H333.01c0,14.15,11.47,25.61,25.61,25.61V111.4c-14.15,0-25.61,11.47-25.61,25.61H25.61c0-14.15-11.47-25.61-25.61-25.61V25.61C14.15,25.61,25.61,14.15,25.61,0Z"
                      />
                    </svg>
                    <h3 className="relative font-txt justify-center text-center text-[16px] -top-[29px] z-20 uppercase"> buy tickets</h3>
                  </Link>
                </div>
                <EventDescription />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Media section */}
      <div className="w-full h-[400px] relative top-5 -left-3">
        <div className="relative h-[200px]">
          {/* Video */}
          {/* Contenedor principal */}
          <div className="relative w-[210px] h-[120px] left-[5px]">
            {/* Video primero en el DOM pero con z-index menor */}
            <div className="absolute inset-0  flex items-center justify-center z-20">
              <video
                controls
                preload="none"
                poster={"/assets/thumbnailVideoP.webp"}
                className="w-[76%] h-[74%] absolute top-[1px] left-[27px] object-cover rounded-sm]
                    hover:opacity-100 [&::-webkit-media-controls]:opacity-0 hover:[&::-webkit-media-controls]:opacity-100 [&::-webkit-media-controls]:transition-opacity"
              >
                <source src="/assets/powerVideo.mp4" type="video/mp4" />
              </video>
            </div>

            {/* Recuadro después en el DOM y con z-index mayor */}
            <div className="absolute inset-0 z-10 -top-[45px] left-[5px]">
              <Image src="/assets/powerVideoBox2.svg" alt="Video frame" width={215} height={166} className="w-[215px] h-[166px]" priority={true} />
            </div>
          </div>

          {/* Photo 2 */}
          <div className="absolute -right-2 -top-4 w-[130px] h-[130px]">
            <Image
              src="/assets/powerPhoto4.jpg"
              alt="Musicians"
              width={120}
              height={120}
              quality={75}
              className="w-[130px] h-[130px]"
              loading="lazy"
            />
          </div>
        </div>

        {/* Lower photos */}
        <div className="relative h-[200px] bottom-8">
          <div className="absolute left-[34px] -top-[71.5px] w-1/2 z-20">
            <Image
              src="/assets/powerPhoto1.webp"
              alt="Performance"
              width={145}
              height={145}
              quality={75}
              className="w-[143px] h-[145px] z-10 "
              loading="lazy"
            />
            <div className="relative" onClick={() => router.back()}>
              <Image
                src="/assets/beigeArrow.webp"
                alt="More gigs"
                width={145}
                height={40}
                quality={75}
                className="absolute right-8 -bottom-12 w-[145px] h-[40px]"
                loading="lazy"
              />

              <p className="absolute inset-0 font-times font-titles text-darkBlue left-[35px] top-[13px] text-[20px]">more gigs</p>
            </div>
          </div>

          <div className="absolute -right-1 -top-[54px] w-[156px] h-[156px] z-10">
            <Image src="/assets/powerPhoto3.webp" alt="Crowd" width={156} height={154} quality={75} className="w-[156px] h-[156px]" loading="lazy" />
          </div>
        </div>

        {/* Title */}
        <div className="absolute bottom-6 left-4 z-20">
          <div className="flex flex-row items-center gap-3">
            <div className="flex flex-col leading-none">
              <p className="text-lightRed text-[35px] font-titles">power</p>
              <p className="text-lightRed text-[35px] font-titles">show</p>
            </div>
            <div className="text-beige text-[8px] flex flex-col">
              <div className="-ml-[30px] mt-[40px] leading-none tracking-widest font-txt uppercase">
                <p>an upbeat, darker show. get ready to</p>
                <p>party below deck like a pirate!</p>
              </div>
            </div>
          </div>
        </div>

        <Image
          src="/assets/shipDrawing.webp"
          alt="Background drawing"
          width={150}
          height={130}
          quality={75}
          className="w-[150px] h-[130px] absolute bottom-[10px] -right-2 z-10 mix-blend-multiply brightness-[55%] opacity-[75%]"
          loading="lazy"
        />
      </div>
    </>
  );
};
