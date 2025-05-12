import Link from "next/link";
import { FaCalendar, FaClock } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import Image from "next/image";
import { memo } from "react";
import { useRouter } from "next/navigation";

import ReactPixel from 'react-facebook-pixel';
const ClickPixel = (typeClick)=>{
  ReactPixel.trackCustom('ClickPixel',{typeClick: typeClick});
  console.log('Pixel send');
}
const VideoComponent = memo(() => (
  <div className="absolute -left-0 -top-2.5 w-[298px] h-[140px]">
    <Image src="/assets/videoBox.webp" alt="Video frame" width={250} height={100} quality={50} priority={true} className="transform-gpu" />
    <div className="absolute inset-0 flex items-center justify-center">
      <video
        controls
        preload="none"
        poster={"/assets/thumbnailvideo.webp"}
        className="w-[82%] h-[90%] mt-3 -ml-6 object-cover border-darkBlue border-[6px] rounded-sm z-20 shadow-gray-500 shadow-[2px_-2px_5px_rgba(0,0,0,0.3)] hover:opacity-100 [&::-webkit-media-controls]:opacity-0 hover:[&::-webkit-media-controls]:opacity-100 [&::-webkit-media-controls]:transition-opacity"
      >
        <source src="/assets/family/video.mp4" type="video/mp4" />
      </video>
    </div>
  </div>
));

const EventDescription = memo(() => (
  <div className="text-[14px] pb-6 pt-5 text-darkBlue font-txt">
    <p className="leading-relaxed [&:not(:last-child)]:mb-0">
      You are invited to board the Sailorette and join the plentiful crew, 'The Old Time Sailors', for a night of footstomping, dancing and singing!
    </p>
    <p className="leading-relaxed [&:not(:last-child)]:mb-0">
      You will be sailing back to the 19th century for an immersive experience of traditional seafaring music performed in a way you have never seen
      before.
    </p>
    <p className="leading-relaxed [&:not(:last-child)]:mb-0">
      The Motley Crew and their plethora of traditional and eclectic instruments will take you back to the time of clashing tankards, and drunken
      debauchery. Sing and dance along like a drunken sailor as the band perform centuries old folk and shanty songs.
    </p>
    <p className="leading-relaxed">Fancy dress is encouraged, so pull out your best seafaring garments me hearties and join the festivities.</p>
  </div>
));
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
export const FamilyMobileL = ({ data }) => {
  const { event, location, date, ticketsURL, venueInfo, gigStartTime, gigFinishTime } = data;
  const formattedDate = formatDate(date);
  const eventURL = "/eventURL";
  const router = useRouter();
  return (
    <>
      <div className="relative -bottom-[75px] pb-[35px]">
        {/* Contenedor principal con borde */}
        <div className="border-[3px] border-darkBeige p-4 mx-4 relative">
          <div className="text-left font-txt lowercase border-b-[2px] border-dashed border-darkBeige">
            <h1 className="font-titles">
              <span className="text-darkBlue text-2xl">old time sailors</span>
              <span className="text-lightRed text-2xl"> at</span>
              <br />
              <span className="text-lightRed text-2xl">{event}</span>
            </h1>
            <p className="text-darkBlue text-xl font-txt upercase">{location}</p>
          </div>

          <div className="border-more-dashed pb-2" />

          <div className="absolute -right-[3vw] top-[8vh] w-[50%]">
            <div className="bg-darkBlue p-3 rounded-2xl">
              <h3 className="text-lightRed text-lg font-bold font-titles leading-none">
                <p>more about</p>
                <p>the venue</p>
              </h3>
              <div className="mt-0.5">
                <p className="text-beige text-[9px] leading-tight font-txt">
                  {venueInfo}
                </p>
                <Link href={eventURL}>
                  <p className="text-beige text-[9px] mt-1 font-titles underline">contact the venue for + info</p>
                </Link>
              </div>
            </div>
          </div>

          {/* Event info */}
          <div>
            <div>
              {[
                { icon: FaLocationDot, text: `${event}` },
                { icon: FaCalendar, text: `${formattedDate}` },
                { icon: FaClock, text: `${gigStartTime} to ${gigFinishTime}` },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-darkBlue font-txt">
                  <Icon className="text-[13px]" />
                  <span className="text-[12px]">{text}</span>
                </div>
              ))}

              <div className="relative h-[5vh] mt-2 -left-[2.5vw]">
                <Link className="absolute inset-0 items-center justify-center text-beige w-[70%] left-4" href={ticketsURL} target="_blank" onClick={() => ClickPixel('BuyTicket')}>
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

        {/* Media section */}
        <div className="w-full h-[auto] relative -top-5 -left-2 mb-[70px]">
          <div className="relative h-[200px]">
            {/* Video */}
            <VideoComponent />
            {/* Photo 2 */}
            <div className="absolute -right-[2px] -top-4 w-[175px] z-10">
              <Image
                src="/assets/familyPhoto2.webp"
                alt="Musicians"
                width={180}
                height={170}
                quality={75}
                className="w-[180px] h-[170px] shadow-gray-500 shadow-[3px_3px_3px_rgba(0,0,0,0.3)]"
                loading="lazy"
              />
            </div>
          </div>

          {/* Lower photos */}
          <div className="relative h-[200px]">
            <div className="absolute left-[19px] bottom-[73px] w-1/2 z-20">
              <Image
                src="/assets/familyPhoto1.webp"
                alt="Performance"
                width={197}
                height={197}
                quality={75}
                className="w-[197px] h-[197px] z-10 shadow-gray-500 shadow-[0px_3px_3px_rgba(0,0,0,0.3)]"
                loading="lazy"
              />
              <div className="relative" onClick={() => router.back()} role="button" tabIndex={0}>
                <Image
                  src="/assets/arrow2.webp"
                  alt="More gigs"
                  width={180}
                  height={55}
                  quality={75}
                  className="w-[180px] h-[55px] absolute right-[45px] -bottom-[65px] cursor-pointer"
                  loading="lazy"
                />

                <p className="absolute inset-0 font-titles  text-beige left-[50px] top-5 text-[24px]">more gigs</p>
              </div>
            </div>

            <div className="absolute -right-[6px] bottom-[3em] w-[225px] h-[200px] z-10">
              <Image src="/assets/familyPhoto3.webp" alt="Crowd" width={400} height={400} quality={75} className="w-full h-auto " loading="lazy" />
            </div>
          </div>

          {/* Title */}
          <div className="absolute -bottom-[85px] left-[20px] z-10">
            <div className="flex flex-row items-center gap-3">
              <div className="flex flex-col leading-[45px]">
                <p className="text-darkBlue text-[57px]  font-titles">family</p>
                <p className="text-darkBlue text-[57px]  font-titles">show</p>
              </div>
              <div className="text-lightRed text-[9px] flex flex-col gap-4">
                <Image
                  src="/assets/anchor.webp"
                  alt="Anchor"
                  width={45}
                  height={50}
                  quality={75}
                  className="w-[45px] h-[50px] rotate-12 ml-[15px]"
                  loading="lazy"
                />
                <div className="-ml-[40px] -mb-[8px] font-txt uppercase leading-none tracking-widest">
                  <p>a traditional sailor show,</p>
                  <p>sing along and dance with us!</p>
                </div>
              </div>
            </div>
          </div>

          <Image
            src="/assets/drawing2.webp"
            alt="Background drawing"
            width={170}
            height={125}
            quality={75}
            className="w-[170px] h-[125px] absolute -bottom-[110px] -right-[4px] z-20 brightness-[78%] contrast-[91%] opacity-[70%]"
            loading="lazy"
          />
        </div>
      </div>
    </>
  );
};
