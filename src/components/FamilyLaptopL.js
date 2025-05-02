import Link from "next/link";
import { FaCalendar, FaClock } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import Image from "next/image";
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

export const FamilyLaptopL = ({ data }) => {
  const { event, location, date, ticketsURL, venueInfo, gigStartTime, gigFinishTime } = data;
  const formattedDate = formatDate(date);
  const eventURL = "/eventURL";
  const router = useRouter();
  return (
    <>
      <div className="relative top-[15vh]">
        <div className="relative w-full my-[75vh]">
          {/* Contenedor principal con borde */}
          <div className="border-4 border-solid border-darkBeige p-2 relative h-[100vh] w-[63vw] -right-[4vw] -top-[85vh]">
            <div className="text-left px-[5vw] border-dashed border-b-4 border-darkBeige">
              <h1 className=" leading-none font-titles lowercase">
                <span className="text-darkBlue text-[55px]">old time sailors </span>
                <span className="text-lightRed text-[55px]">at</span>
                <br />
                <span className="text-lightRed text-[55px]">{event}</span>
              </h1>
              <p className="text-darkBlue font-txt lowercase text-[30px]">{location}</p>
            </div>
            <div className="absolute w-[23vw] top-[2vh] -right-[5vw] z-20">
              <div className="bg-darkBlue p-6 rounded-3xl">
                <h3 className="text-lightRed text-[30px] font-titles leading-none">
                  <p>more about </p>
                  <p>the venue</p>
                </h3>
                <div className="mt-0.5 tracking-wide">
                  <p className="text-beige text-[15px] font-txt leading-tight">
                    {venueInfo}
                  </p>
                  <Link href={eventURL}>
                    <p className="text-beige text-[15px] mt-1 font-titles underline">contact the venue for + info</p>
                  </Link>
                </div>
              </div>
            </div>
            <div className="border-more-dashed my-4" />

            {/* Event info */}
            <div className="space-y-6 px-[6vw]">
              <div className="flex flex-row gap-5">
                <div className="space-y-3">
                  {[
                    { icon: FaLocationDot, text: `${event}` },
                    { icon: FaCalendar, text: `${formattedDate}` },
                    { icon: FaClock, text: `${gigStartTime} to ${gigFinishTime}` },
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-center gap-2 text-darkBlue font-txt">
                      <Icon className="text-[19px]" />
                      <span className="text-[19px] font-bold" >{text}</span>
                    </div>
                  ))}
                </div>

                <div className="relative w-[20vw]">
                  <Link className="absolute inset-0 items-center justify-center text-beige" href={ticketsURL} target="_blank" onClick={() => ClickPixel('BuyTicket')}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 358.62 137.01"
                      preserveAspectRatio="none"
                      className="w-[100%] h-[15vh] z-10"
                    >
                      <path
                        fill="#db3a57"
                        d="M25.61,0H333.01c0,14.15,11.47,25.61,25.61,25.61V111.4c-14.15,0-25.61,11.47-25.61,25.61H25.61c0-14.15-11.47-25.61-25.61-25.61V25.61C14.15,25.61,25.61,14.15,25.61,0Z"
                      />
                    </svg>
                    <h3 className="relative font-txt uppercase justify-center text-[40px] -top-[11.5vh] z-20 w-[100%] text-center"> buy tickets</h3>
                  </Link>
                </div>
              </div>

              <p className="text-[19px] text-left text-darkBlue leading-8 font-txt">
                You are invited to board the Sailorette and join the plentiful crew, 'The Old Time Sailors', for a night of footstomping, dancing and
                singing! You will be sailing back to the 19th century for an immersive experience of traditional seafaring music performed in a way
                you have never seen before. The Motley Crew and their plethora of traditional and eclectic instruments will take you back to the time
                of clashing tankards, and drunken debauchery. Sing and dance along like a drunken sailor as the band perform centuries old folk and
                shanty songs. Fancy dress is encouraged, so pull out your best seafaring garments me hearties and join the festivities.
              </p>
            </div>
          </div>
          <div className="absolute right-[365px] -top-[280px]">
            <Image src="/assets/anchor.webp" alt="Anchor" width={100} height={100} className="w-[50px] h-[60px]" loading="lazy" />
          </div>
          <div className="absolute right-[65px] -top-[450px] z-10">
            <Image
              src="/assets/familyPhoto1.webp"
              alt="Performance"
              width={200}
              height={200}
              className="w-[290px] h-[290px] shadow-gray-500 shadow-[0px_3px_20px_rgba(0,0,0,0.3)]"
              loading="lazy"
            />
          </div>
          {/* Photo 2 */}
          <div className="absolute right-[100px] top-[-175px] z-20">
            <Image
              src="/assets/familyPhoto2.webp"
              alt="Musicians"
              width={200}
              height={200}
              className="w-[390px] shadow-gray-500 shadow-[3px_3px_3px_rgba(0,0,0,0.3)]"
              loading="lazy"
            />
          </div>
          {/* Photo 3 */}
          <div className="absolute left-[450px] top-[80px] z-30">
            <Image src="/assets/familyPhoto3.webp" alt="Crowd" width={400} height={400} className="w-[550px] " loading="lazy" />
          </div>
          <div className="absolute -right-[0px] -bottom-[-150px]">
            <Image
              src="/assets/drawing2.webp"
              alt="Background drawing"
              width={300}
              height={300}
              className="w-[380px] h-[330px] brightness-[78%] contrast-[91%]"
              loading="lazy"
            />
          </div>

          <div className="absolute top-[-25px] left-[10px]">
            <Image src="/assets/videoBox.webp" alt="Video frame" width={590} height={280} priority={true} />
          </div>

          <div className="absolute inset-0 top-[10px] left-[47px] z-40">
            <video
              controls
              preload="none"
              poster={"/assets/thumbnailvideo.webp"}
              className="object-cover w-[540px] h-[300px] border-darkBlue border-[10px] rounded-sm shadow-gray-500 shadow-[2px_-2px_5px_rgba(0,0,0,0.3)]
              hover:opacity-100 [&::-webkit-media-controls]:opacity-0 hover:[&::-webkit-media-controls]:opacity-100 [&::-webkit-media-controls]:transition-opacity"
            >
              <source src="/assets/familyVideo.mp4" type="video/mp4" />
            </video>
          </div>

          <div className="relative" onClick={() => router.back()} role="button" tabIndex={0}>
            <Image
              src="/assets/arrow2.webp"
              alt="More gigs"
              width={300}
              height={300}
              className="absolute left-[10px] top-[-48vh] w-[430px] h-[120px] cursor-pointer"
              loading="lazy"
            />

            <p className="absolute inset-0  font-titles text-beige left-[150px] top-[-45vh] text-[50px]">more gigs</p>
          </div>
          {/* Title */}
          <div className="absolute -bottom-[15vh]  left-[15px] z-10 ">
            <div className="flex flex-row items-center gap-3 mb-5">
              <div className="leading-[110px]">
                <p className="text-darkBlue text-[125px] font-titles">family</p>
                <p className="text-darkBlue text-[145px] font-titles">show</p>
              </div>
              <div className="text-lightRed text-[30px] -mb-[150px] -ml-[35px]">
                <div className="font-txt uppercase leading-tight tracking-widest">
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
export default FamilyLaptopL;
