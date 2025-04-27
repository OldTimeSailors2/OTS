import Link from "next/link";
import { FaCalendar, FaClock } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import Image from "next/image";
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

export const FamilyLaptop = ({ data }) => {
  const { event, location, date, ticketsURL, venueInfo, gigStartTime, gigFinishTime } = data;
  const formattedDate = formatDate(date);
  const eventURL = "/eventURL";
  const router = useRouter();
  return (
    <div className="relative -bottom-[340px] mb-[30px]">
      <div className="relative w-full h-full my-[50px]">
        {/* Main container with border */}
        <div className="border-[3px] border-darkBeige p-2 relative w-[63vw] -right-[95px] -top-[310px]">
          <div className="text-left px-10 border-b-[3px] border-darkBeige border-dashed">
            <h1 className="font-titles leading-none lowercase">
              <span className="text-darkBlue text-[40px] ">old time sailors </span>
              <span className="text-lightRed text-[40px] ">at</span>
              <br />
              <span
                className="text-lightRed text-[40px] 
              "
              >
                {event}
              </span>
            </h1>
            <p className="text-darkBlue text-[30px] lowercase font-txt">{location}</p>
          </div>
          <div className="absolute w-72 top-[21px] -right-[75px] z-20">
            <div className="bg-darkBlue p-6 rounded-3xl">
              <h3 className="text-lightRed text-[25px] font-titles leading-none">
                <p>more about</p>
                <p>the venue</p>
              </h3>
              <div className="mt-0.5 tracking-wide">
                <p className="text-beige font-txt leading-tight text-[12px]">
                  {venueInfo}A rural escape built by the community, for the community in the heart of Newquay. A venue for the whole family with
                  seating options.
                </p>
                <Link href={eventURL}>
                  <p className="text-beige mt-1 font-titles underline text-[12px]">contact the venue for + info</p>
                </Link>
              </div>
            </div>
          </div>
          <div className="border-more-dashed my-4" />
          {/* Event Info  */}
          <div className="p-10">
            <div className="flex flex-row gap-5">
              <div className="p-5">
                {[
                  { icon: FaLocationDot, text: `${event}` },
                  { icon: FaCalendar, text: `${formattedDate}` },
                  { icon: FaClock, text: `${gigStartTime} to ${gigFinishTime}` },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2 text-darkBlue font-txt">
                    <Icon className="text-[18px]" />
                    <span className="text-[18px] font-bold">{text}</span>
                  </div>
                ))}
              </div>

              <div className="relative">
                <Link
                  className="absolute inset-0 items-center justify-center text-beige top-[10px] w-[240px] left-1"
                  href={ticketsURL}
                  target="_blank"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 358.62 137.01" preserveAspectRatio="none" className="w-[100%] h-[95px] z-10">
                    <path
                      fill="#db3a57"
                      d="M25.61,0H333.01c0,14.15,11.47,25.61,25.61,25.61V111.4c-14.15,0-25.61,11.47-25.61,25.61H25.61c0-14.15-11.47-25.61-25.61-25.61V25.61C14.15,25.61,25.61,14.15,25.61,0Z"
                    />
                  </svg>
                  <h3 className="relative font-txt uppercase justify-center text-[32px] -top-[71px] z-20 w-[100%] text-center"> buy tickets</h3>
                </Link>
              </div>
            </div>
            <p className="text-[15px] font-txt text-darkBlue text-left leading-7 mt-3 px-4">
              You are invited to board the Sailorette and join the plentiful crew, 'The Old Time Sailors', for a night of footstomping, dancing and
              singing! You will be sailing back to the 19th century for an immersive experience of traditional seafaring music performed in a way you
              have never seen before. The Motley Crew and their plethora of traditional and eclectic instruments will take you back to the time of
              clashing tankards, and drunken debauchery. Sing and dance along like a drunken sailor as the band perform centuries old folk and shanty
              songs. Fancy dress is encouraged, so pull out your best seafaring garments me hearties and join the festivities.
            </p>
          </div>
        </div>
      </div>
      <div className="absolute right-[218px] -top-[120px] ">
        <Image
          src="/assets/anchor.webp"
          alt="Anchor"
          width={100}
          height={100}
          className="w-[60px] h-[70px] min-[1440px]:w-[60px] min-[1440px]:h-[70px]"
        />
      </div>
      <div className="absolute right-[15px] -top-[230px] z-10">
        <Image
          src="/assets/familyPhoto1.webp"
          alt="
            Performance"
          width={200}
          height={200}
          className="w-[205px] h-[205px] shadow-gray-500 shadow-[0px_3px_3px_rgba(0,0,0,0.3)] min-[1440px]:w-[290px] min-[1440px]:h-[290px]"
        />
      </div>
      <div className="absolute right-[25px] top-[35px] z-30 min-[1440px]:top-[53px] min-[1440px]:z-20">
        <Image
          src="/assets/familyPhoto2.webp"
          alt="Musicians"
          width={200}
          height={200}
          className="w-[290px] shadow-gray500 shadow-[3px_3px_3px_rgba(0,0,0,0.3)] min-[1440px]:w-[390px]"
        />
      </div>
      <div className="absolute right-[275px] top-[300px] w-[380px] z-40 min-[1440px]:right-0 min-[1440px]:left-[520px] min-[1440px]:top-[268px] min-[1440px]:z-30 min-[1440px]:w-[550px]">
        <Image
          src="/assets/familyPhoto3.webp"
          alt="crowd"
          width={550}
          height={550}
          className="h-[350px]  min-[1440px]:w-[550px] min-[1440px]:h-[550px]"
        />
      </div>
      <div className="absolute -right-[0px] -bottom-[30px] min-[1440px]:-bottom-[300px]">
        <Image
          src="/assets/drawing2.webp"
          alt="Background Drawing"
          width={300}
          height={300}
          className="w-[300px] h-[250px] min-[1440px]:w-[380px] min-[1440px]:h-[330px] brightness-[78%] contrast-[91%]"
        />
      </div>
      <div className="absolute top-[230px] left-[40px] w-[410px] h-[280px] z-50 ">
        <Image src="/assets/videoBox.webp" alt="Video Frame" width={590} height={280} />
        <div className="absolute inset-0 flex items-center justify-center mb-7 min-[1440px]:top-[107px]">
          <video
            controls
            preload="none"
            poster={"/assets/thumbnailvideo.webp"}
            className="object-cover w-[88%] border-darkBlue border-[10px] rounded-sm z-20 shadow-gray-500 shadow-[2px_-2px_5px_rgba(0,0,0,0.3)] hover:opacity-100 [&::-webkit-media-controls]:opacity-0 hover:[&::-webkit-media-controls]:opacity-100 [&::-webkit-media-controls]:transition-opacity"
          >
            <source src="/assets/familyVideo.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
      <div className="relative" onClick={() => router.back()} role="button" tabIndex={0}>
        <Image
          src="/assets/arrow2.webp"
          alt="More gigs"
          width={300}
          height={300}
          className="absolute left-[25px] -top-[150px] w-[310px] h-[110px] cursor-pointer"
        />

        <p className="absolute inset-0 font-titles text-beige left-[115px] -top-[122px] text-[40px] ">more gigs</p>
      </div>
      <div className="absolute -bottom-[165px]  left-[45px] z-10 ">
        <div className="flex flex-row items-center gap-3 mb-5">
          <div className="leading-[63px]">
            <p className="text-darkBlue font-titles text-[80px] ">family</p>
            <p className="text-darkBlue font-titles text-[80px] ">show</p>
          </div>
          <div className="text-lightRed text-[20px] -mb-[75px] -ml-[45px]">
            <div className="leading-tight tracking-widest font-txt uppercase">
              <p>a traditional sailor show,</p>
              <p>sing along and dance with us!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FamilyLaptop;
