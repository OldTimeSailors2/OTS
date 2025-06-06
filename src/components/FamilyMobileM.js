import Link from "next/link";
import { FaCalendar, FaClock } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import Image from "next/image";
import { memo } from "react";
import { useRouter } from "next/navigation";

import ReactPixel from 'react-facebook-pixel';
const ClickPixel = (typeClick) => {
  ReactPixel.trackCustom('ClickPixel', { typeClick: typeClick });
  console.log('Pixel send');
}
const VideoComponent = memo(() => (
  <div className="absolute left-3 top-1.5 w-[200.79px] h-[118.43px]">
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
      <div className="relative top-[5em] mr-2 ml-2">
        <div className="relative border-2 border-darkBeige w-[90vw]">
          <div className="text-left lowercase border-b-[2px] border-dashed border-darkBeige pl-5">
            <h1 className="font-titles leading-none">
              <span className="text-darkBlue text-xl">old time sailors </span> <span className="text-lightRed text-xl"> at</span>
              <br />
              <span className="text-lightRed text-xl">{event}</span>
            </h1>
            <p className="text-darkBlue text-md font-txt">{location}</p>
          </div>
          <div className="absolute -right-[1em] top-[1.5em] w-[146.03px]">
            <div className="bg-darkBlue p-3 py-4 rounded-2xl">
              <h3 className="text-lightRed text-[15px] font-bold font-titles leading-none">
                <p>more about</p>
                <p>the venue</p>
              </h3>
              <div className="mt-0.5">
                <p className="text-beige text-[7px] leading-tight font-txt">
                  {venueInfo}
                </p>
                <Link href={eventURL}>
                  <p className="text-beige text-[8px] mt-1  underline font-titles">contact the venue for + info</p>
                </Link>
              </div>
            </div>
          </div>
          <div className="pt-2">
            {[
              { icon: FaLocationDot, text: `${event}` },
              { icon: FaCalendar, text: `${formattedDate}` },
              { icon: FaClock, text: `${gigStartTime} to ${gigFinishTime}` },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-darkBlue font-bold pr-5 pl-5">
                <Icon className="text-[10px]" />
                <span className="text-[10px] font-txt">{text}</span>
              </div>
            ))}

            <div className="relative pt-2 pb-2">
              <Link className="absolute items-center justify-center text-beige pl-5" href={`${ticketsURL}`} target="_blank" onClick={() => ClickPixel('BuyTicket')}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 358.62 137.01" preserveAspectRatio="none" className="w-[10em] h-[35px] z-10">
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
        <div className="relative w-full h-[400px] relative -top-5 -left-2">
          {/* Media section */}
          <div className="relative h-[200px]">
            <VideoComponent />
            <div className="absolute left-[12em] top-0 w-[10em] h-[10em] z-10">
              <Image
                src="/assets/familyPhoto2.webp"
                alt="Musicians"
                width={130}
                height={130}
                quality={75}
                className="w-full h-full shadow-gray-500 shadow-[3px_3px_3px_rgba(0,0,0,0.3)]"
                loading="lazy"
              />
            </div>
          </div>

          {/* Lower photos */}
          <div className="relative h-[200px] bottom-8">
            <div className="absolute left-[22px] -top-16 w-1/2 z-10">
              <Image
                src="/assets/familyPhoto1.webp"
                alt="Performance"
                width={200}
                height={200}
                quality={75}
                className="w-[153px] h-[155px] z-10 shadow-gray-500 shadow-[0px_3px_3px_rgba(0,0,0,0.3)]"
                loading="lazy"
              />
              <div className="relative" onClick={() => router.back()} role="button" tabIndex={0}>
                <Image
                  src="/assets/arrow2.webp"
                  alt="More gigs"
                  width={145}
                  height={40}
                  quality={75}
                  className="absolute right-[3em] -bottom-12 w-[145px] h-[40px] cursor-pointer"
                  loading="lazy"
                />
                <p className="absolute inset-0 font-times font-titles text-beige left-[25px] top-[13px] text-[20px]">more gigs</p>
              </div>
            </div>

            <div className="absolute left-[10em] bottom-[1em] w-[12em] h-[12em] z-10">
              <Image
                src="/assets/familyPhoto3.webp"
                alt="Crowd"
                width={156}
                height={154}
                quality={75}
                className="w-full h-full "
                loading="lazy"
              />
            </div>
          </div>

          {/* Title */}
          <div className="absolute bottom-4 left-4 z-20">
            <div className="flex flex-row items-center gap-3">
              <div className="flex flex-col leading-[37px]">
                <p className="text-darkBlue text-[46px] font-titles">family</p>
                <p className="text-darkBlue text-[46px] font-titles">show</p>
              </div>
              <div className="text-lightRed text-[8px] flex flex-col">

                <div className="-ml-[35px] mt-[6.5em] leading-none tracking-widest font-txt uppercase">
                  <p>a traditional sailor show,</p>
                  <p>sing along and dance with us!</p>
                </div>
              </div>
            </div>
          </div>



        </div>
      </div>
    </>
  )
};
