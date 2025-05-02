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

export const FamilyTablet = ({ data }) => {
  const { event, location, date, ticketsURL, venueInfo, gigStartTime, gigFinishTime } = data;
  const formattedDate = formatDate(date);
  const eventURL = "/eventURL";
  const router = useRouter();
  return (
    <div className="relative top-[12vh] p-10">
      {/* Main container with border */}
      <div className="border-[3px] border-darkBeige  p-16 relative">
        <div className="text-left border-b-[3px] border-darkBeige border-dashed">
          <h1 className="font-titles lowercase leading-none">
            <span className="text-darkBlue text-[40px]">old time sailors</span>
            <span className="text-lightRed text-[40px] ">at</span>
            <br />
            <span className="text-lightRed text-[40px] ">{event}</span>
          </h1>
          <p className="text-darkBlue text-[25px] font-txt lowercase">{location}</p>

          <div className="absolute w-[50%] top-[18vh] right-[-3vw]">
            <div className="bg-darkBlue p-6 rounded-3xl">
              <h3 className="text-lightRed text-[25px] font-titles leading-none">
                <p>more about</p>
                <p>the venue</p>
              </h3>
              <div className="mt-0.5">
                <p className="text-beige font-txt leading-tight text-[15px]">
                  {venueInfo}
                </p>
                <Link href={eventURL}>
                  <p className="text-beige mt-1 font-titles underline text-[16px]">contact the venue for + info</p>
                </Link>
              </div> 
            </div>
          </div>
        </div>
        <div className="border-more-dashed my-2" />
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
                  <span className="text-[12px] font-bold">{text}</span>
                </div>
              ))}

              <div className="relative h-[8vh] mt-2 -left-[2.5vw]">
                <Link className="absolute inset-0 items-center justify-center text-beige w-[65%] left-4" href={ticketsURL} target="_blank" onClick={() => ClickPixel('BuyTicket')}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 358.62 137.01" preserveAspectRatio="none" className="w-[80%] h-[45px] z-10">
                    <path
                      fill="#db3a57"
                      d="M25.61,0H333.01c0,14.15,11.47,25.61,25.61,25.61V111.4c-14.15,0-25.61,11.47-25.61,25.61H25.61c0-14.15-11.47-25.61-25.61-25.61V25.61C14.15,25.61,25.61,14.15,25.61,0Z"
                    />
                  </svg>
                  <h3 className="relative font-txt uppercase justify-center text-[26px] -top-[42px] z-20 w-[80%] text-center"> buy tickets</h3>
                </Link>
              </div>
              <EventDescription />
            </div>
          </div>
      </div>
      {/* Media Section */}
      <div className="w-full h-[auto] relative pt-5">
        <div className="relative h-[220px] ">
          {/* Video */}
          <div className="absolute -top-12 -left-4 w-[460px] h-[280px] ">
            <Image src="/assets/videoBox.webp" alt="Video Frame" width={460} height={100} className="h-[300px]" />
            <div className="absolute inset-0 flex items-center justify-center -mb-2">
              <video
                controls
                preload="none"
                poster={"/assets/thumbnailvideo.webp"}
                className="ml-[30px] w-[95%] h-[82%] mt-[2px] object-cover border-darkBlue border-[10px] rounder-sm z-20 shadow-gray-500 shadow-[2px_-2px_5px_rgba(0,0,0,0.3)] hover:opacity-100 [&::-webkit-media-controls]:opacity-0 hover:[&::-webkit-media-controls]:opacity-100 [&::-webkit-media-controls]:transition-opacity"
              >
                <source src="/assets/familyVideo.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
          {/* Photo 2  */}
          <div className="absolute right-[8px] -top-12 w-[350px] z-10 ">
            <Image
              src="/assets/familyPhoto2.webp"
              alt="Musicians"
              width={1200}
              height={1200}
              className="w-full shadow-gray500 shadow-[3px_3px_3px_rgba(0,0,0,0.3)]"
            />
          </div>
        </div>
        {/* Lower Photos  */}
        <div className="relative h-[750px] mx-5 mb-4">
          <div className="absolute left-[0px] -top-[5px] z-20 w-1/2">
            <Image
              src="/assets/familyPhoto1.webp"
              alt="
            Performance"
              width={350}
              height={320}
              className="z-10 h-[320px] shadow-gray-500 shadow-[0px_3px_3px_rgba(0,0,0,0.3)]"
            />
            <div className="relative" onClick={() => router.back()} role="button" tabIndex={0}>
              <Image
                src="/assets/arrow2.webp"
                alt="More gigs"
                width={580}
                height={440}
                className="absolute -left-[18px] top-[60px] w-[290px] h-[110px] cursor-pointer"
              />

              <p className="absolute inset-0 font-titles text-beige w-3/4 text-center ml-4 top-[80px] text-[50px]">more gigs</p>
            </div>
          </div>
          <div className="absolute -right-[15px] top-[100px] w-[450px] h-[200px] z-10 ">
            <Image src="/assets/familyPhoto3.webp" alt="crowd" width={800} height={800} className="w-full h-auto " />
          </div>
        </div>
        {/* Title */}
        <div className="absolute -bottom-[5px] left-[15px] z-10">
          <div className="flex flex-row items-center gap-3">
            <div className="flex flex-col leading-[75px] mb-10">
              <p className="text-darkBlue font-titles text-[90px]">family</p>
              <p className="text-darkBlue font-titles text-[90px] ">show</p>
            </div>
            <div className="text-lightRed text-[15px] flex flex-col">
              <Image src="/assets/anchor.webp" alt="Anchor" width={70} height={70} className="ml-[25px] rotate-12 mb-4" />
              <div className="-ml-[50px] mb-[30px] leading-none tracking-widest font-txt uppercase text-[20px]">
                <p>a traditional sailor show,</p>
                <p>sing along and dance with us!</p>
              </div>
            </div>
          </div>
        </div>
        <Image
          src="/assets/drawing2.webp"
          alt="Background Drawing"
          width={300}
          height={300}
          className="absolute -bottom-[15px] right-[0px] z-20 brightness-[78%] contrast-[91%] opacity-[70%]"
        />
      </div>
    </div>
  );
};
export default FamilyTablet;
