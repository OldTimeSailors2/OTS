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
  <div className="absolute left-[39.62px] -top-2.5 w-[200.79px] h-[118.43px]">
    <Image
      src="/assets/videoBox.webp"
      alt="Video frame"
      width={250}
      height={118.43}
      quality={50}
      className="transform-gpu relative -left-[14px] h-[135px]"
      priority={true}
    />
    <div className="absolute inset-0 flex items-center justify-center">
      <video
        controls
        preload="none"
        poster={"/assets/thumbnailvideo.webp"}
        className="w-[187.97px] h-[106.42px] mt-3 -ml-5 object-cover border-darkBlue border-[6px] rounded-sm z-20 shadow-gray-500 shadow-[2px_-2px_5px_rgba(0,0,0,0.3)]
                hover:opacity-100 [&::-webkit-media-controls]:opacity-0 hover:[&::-webkit-media-controls]:opacity-100 [&::-webkit-media-controls]:transition-opacity"
      >
        <source src="/assets/familyVideo.mp4" type="video/mp4" />
      </video>
    </div>
  </div>
));

const EventDescription = memo(() => (
  <div className="text-[10px] pb-6 pt-11 text-darkBlue font-txt text-left">
    <p className="leading-[12.5px] [&:not(:last-child)]:mb-0">
      You are invited to board the Sailorette and join the plentiful crew, 'The Old Time Sailors', for a night of footstomping, dancing and singing!
      You will be sailing back to the 19th century for an immersive experience of traditional seafaring music performed in a way you have never seen
      before. The Motley Crew and their plethora of traditional and eclectic instruments will take you back to the time of clashing tankards, and
      drunken debauchery.
    </p>
    <p className="leading-[12.5px] [&:not(:last-child)]:mb-0">
      Sing and dance along like a drunken sailor as the band perform centuries old folk and shanty songs. Fancy dress is encouraged, so pull out your
      best seafaring garments me hearties and join the festivities.
    </p>
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

export const FamilyMobileM = ({ data }) => {
  const { event, location, date, ticketsURL, venueInfo, gigStartTime, gigFinishTime } = data;
  const formattedDate = formatDate(date);
  const eventURL = "/eventURL";
  const router = useRouter();
  return (
    <>
      <div className="relative -bottom-[78px]">
        {/* Contenedor principal con borde */}
        <div className="border-[2px] border-darkBeige relative mr-[32.72px] ml-[35.28px]">
          <div className="text-left lowercase pl-[11.61px] pt-[4.5px] w-[190px] border-b-[2px] border-dashed border-darkBeige">
            <h1 className="font-titles pt-1 leading-[20px] text-[21px]">
              <p>
                <span className="text-darkBlue">old time sailors </span>
                <span className="text-lightRed"> at</span>
              </p>
              <p className="text-lightRed">{event}</p>
            </h1>
            <p className="text-darkBlue text-[10.6px] font-txt uppercase">{location}</p>
          </div>

          <div className="border-more-dashed my-1" />

          <div className="absolute -right-[24.5px] top-[24px] w-[146.03px]">
            <div className="bg-darkBlue p-[11.82px] rounded-2xl">
              <h3 className="text-lightRed text-[18px] font-titles leading-[16px]">
                <p>more about</p>
                <p>the venue</p>
              </h3>
              <div className="mt-0.5">
                <p className="text-beige text-[8.9px] leading-tight font-txt">
                  {venueInfo}
                </p>
                <Link href={eventURL}>
                  <p className="text-beige text-[8.9px] mt-1 font-titles underline">contact the venue for + info</p>
                </Link>
              </div>
            </div>
          </div>

          {/* Event info */}
          <div className="space-y-6">
            <div className="ml-[11.61px] mr-[10px]">
              {[
                { icon: FaLocationDot, text: `${event}` },
                { icon: FaCalendar, text: `${formattedDate}` },
                { icon: FaClock, text: `${gigStartTime} to ${gigFinishTime}` },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-1 text-darkBlue font-txt">
                  <Icon className="text-[9.5px]" />
                  <span className="text-[9.5px]">{text}</span>
                </div>
              ))}

              <div className="relative -left-[1.05px]">
                <Link className="absolute inset-0 text-beige pt-1" href={ticketsURL} target="_blank" onClick={() => ClickPixel('BuyTicket')}>
                  <Image src="/assets/buyTickets.png" width={161.56} height={26.44}></Image>
                  {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 358.62 137.01" preserveAspectRatio="none" className="w-[85%] h-[35px] z-10">
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

        {/* Media section */}
        <div className="w-full h-[auto] relative -top-5 -left-2 mb-10">
          <div className="relative h-[200px]">
            {/* Video */}
            <VideoComponent />
            {/* Photo 2 */}
            <div className="absolute right-[6.20px] -top-2 z-10">
              <Image
                src="/assets/familyPhoto2.webp"
                alt="Musicians"
                width={155}
                height={155}
                quality={75}
                className="w-[148.54px] h-[148.54px] shadow-gray-500 shadow-[3px_3px_3px_rgba(0,0,0,0.3)]"
                loading="lazy"
              />
            </div>
          </div>

          {/* Lower photos */}
          <div className="relative h-[200px]">
            <div className="absolute left-[37.91px] -top-[91px] z-20">
              <Image
                src="/assets/familyPhoto1.webp"
                alt="Performance"
                width={172}
                height={172}
                quality={75}
                className="w-[154.33px] h-[154.33px] z-10 shadow-gray-500 shadow-[3px_3px_3px_rgba(0,0,0,0.3)]"
                loading="lazy"
              />
              <div className="relative" onClick={() => router.back()} role="button" tabIndex={0}>
                <Image
                  src="/assets/arrow2.png"
                  alt="More gigs"
                  width={160}
                  height={50}
                  quality={75}
                  className="w-[160px] h-[50px] absolute right-[28px] -bottom-[65px] cursor-pointer"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="absolute right-[2px] bottom-[72px] w-[187px] h-[180px] z-10">
              <Image src="/assets/familyPhoto3.webp" alt="Crowd" width={400} height={400} quality={75} className="w-full h-auto " loading="lazy" />
            </div>
          </div>

          {/* Title */}
          <div className="absolute -bottom-[30px] left-[20px] z-10">
            <div className="flex flex-row items-center gap-3">
              <div className="flex flex-col leading-[43.7px]">
                <p className="text-darkBlue text-[49px] font-titles">family</p>
                <p className="text-darkBlue text-[49px] font-titles">show</p>
              </div>
              <div className="text-lightRed text-[10.45px] flex flex-col">
                <Image
                  src="/assets/anchor.webp"
                  alt="Anchor"
                  width={40}
                  height={45}
                  quality={75}
                  className="w-[28.5px] h-[35.28px] mb-3 rotate-12"
                  loading="lazy"
                />
                <div className="-ml-[35px] -mb-2  font-txt uppercase leading-none tracking-widest font-bold">
                  <p>a traditional sailor show,</p>
                  <p>sing along and dance with us!</p>
                </div>
              </div>
            </div>
          </div>

          <Image
            src="/assets/drawing2.webp"
            alt="Background drawing"
            width={160}
            height={115}
            quality={75}
            className="w-[153.24px] h-[112.52px] absolute -bottom-[37px] right-[2px] z-20 brightness-[78%] contrast-[91%] opacity-[90%] rotate-4"
            loading="lazy"
          />
        </div>
      </div>
    </>
  );
};
