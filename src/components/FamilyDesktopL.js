import Link from "next/link";
import { FaCalendar, FaClock } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ReactPixel from 'react-facebook-pixel';
const ClickPixel = (typeClick)=>{
  ReactPixel.trackCustom('ClickPixel',{typeClick: typeClick});
  console.log('Pixel send ' + typeClick);
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

export const FamilyDesktopL = ({ data }) => {
  const { event, location, date, ticketsURL, venueInfo, gigStartTime, gigFinishTime } = data;
  const formattedDate = formatDate(date);
  const eventURL = "/eventURL";
  const router = useRouter();

  return (
    <>
      <div className="relative top-[23em]">
        <div className="relative w-full h-full">
          {/* Contenedor principal con borde */}
          <div className="relative border-[3px] border-darkBeige p-2 w-[1200px] h-[850px] -right-[130px] -top-[310px]">
            <div className="text-left px-10">
              <h1 className="leading-none lowercase font-titles">
                <span className="text-darkBlue text-[55px]">old time sailors </span>
                <span className="text-lightRed  text-[55px]"> at</span>
                <br />
                <span className="text-lightRed text-[55px]">{event}</span>
              </h1>
              <p className="text-darkBlue font-txt text-[30px] mt-4 lowercase">{location}</p>
            </div>

            <div className="border-more-dashed my-4" />

            {/* Event info */}
            <div className="space-y-6 pl-[45px]">
              <div className="flex flex-row gap-5">
                <div className="space-y-3">
                  {[
                    { icon: FaLocationDot, text: `${event}` },
                    { icon: FaCalendar, text: `${formattedDate}` },
                    {
                      icon: FaClock,
                      text: `${gigStartTime} to ${gigFinishTime}`,
                    },
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-center gap-2 text-darkBlue font-txt">
                      <Icon className="text-[25px] " />
                      <span className="text-[25px] font-txt">{text}</span>
                    </div>
                  ))}
                </div>

                <div className="relative w-[400px] h-[120px]">
                  <Link className="absolute left-4 inset-0  items-center justify-center  text-beige " href={ticketsURL} target="_blank" onClick={() => ClickPixel('BuyTicket')}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 358.62 137.01"
                      preserveAspectRatio="none"
                      className="w-[100%] h-[120px] z-10"
                    >
                      <path
                        fill="#db3a57"
                        d="M25.61,0H333.01c0,14.15,11.47,25.61,25.61,25.61V111.4c-14.15,0-25.61,11.47-25.61,25.61H25.61c0-14.15-11.47-25.61-25.61-25.61V25.61C14.15,25.61,25.61,14.15,25.61,0Z"
                      />
                    </svg>
                    <h3 className="relative font-txt justify-center text-[55px] uppercase -top-[99px] z-20 w-[100%] text-center">buy tickets</h3>
                  </Link>
                </div>
              </div>

              <p className="text-[15px] pr-[175px] text-darkBlue font-txt leading-10">
                You are invited to board the Sailorette and join the plentiful crew, 'The Old Time Sailors', for a night of footstomping, dancing and
                singing! You will be sailing back to the 19th century for an immersive experience of traditional seafaring music performed in a way
                you have never seen before. The Motley Crew and their plethora of traditional and eclectic instruments will take you back to the time
                of clashing tankards, and drunken debauchery. Sing and dance along like a drunken sailor as the band perform centuries old folk and
                shanty songs. Fancy dress is encouraged, so pull out your best seafaring garments me hearties and join the festivities.
              </p>
            </div>
          </div>
          <div className="absolute right-[21px] -top-[230px] z-10">
            <Image src="/assets/familyPhoto1.webp" alt="Performance" width={470} height={470} className="w-[470px] h-[470px] " loading="lazy" />
          </div>
          {/* Photo 2 */}
          <div className="absolute right-[95px] top-[225px] z-20">
            <Image src="/assets/familyPhoto2.webp" alt="Musicians" width={650} height={200} className="w-[650px] " loading="lazy" />
          </div>
          {/* Photo 3 */}
          <div className="absolute left-[500px] top-[550px] z-30">
            <Image src="/assets/familyPhoto3.webp" alt="Crowd" width={750} height={600} className="w-[750px]" loading="lazy" />
          </div>
          <div className="absolute right-[40px] top-[900px]">
            <Image
              src="/assets/drawing2.webp"
              alt="Background drawing"
              width={800}
              height={800}
              className="w-[600px] h-[600px] brightness-[78%] contrast-[91%]"
              loading="lazy"
            />
          </div>
          <div className="absolute top-[475px] left-[10px]">
            <Image src="/assets/videoBox.webp" alt="Video frame" width={590} height={280} priority={true} />
          </div>

          <div className="absolute inset-0 top-[509px] left-[47px] z-40">
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

          <div className="relative top-[100px]" onClick={() => router.back()} role="button" tabIndex={0}>
            <Image
              src="/assets/arrow2.webp"
              alt="More gigs"
              width={470}
              height={150}
              className="absolute left-[10px] top-[25px] w-[470px] h-[150px]"
              loading="lazy"
            />

            <p className="absolute inset-0 font-titles text-beige left-[130px] top-[45px] text-[75px]">more gigs</p>
          </div>
          {/* Title */}
          <div className="absolute -bottom-[800px]  left-[15px] z-10 ">
            <div className="flex flex-row items-center gap-3 mb-5">
              <div className="leading-[150px]">
                <p className="text-darkBlue text-[190px] font-titles">family</p>
                <p className="text-darkBlue text-[190px] font-titles">show</p>
              </div>
              <div className="text-lightRed text-[40px] -mb-[200px] -ml-[105px]">
                <div className="font-txt font-bold leading-tight tracking-widest uppercase">
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
export default FamilyDesktopL;
