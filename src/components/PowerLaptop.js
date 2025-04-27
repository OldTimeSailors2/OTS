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

export const PowerLaptop = ({ data }) => {
  const { event, location, date, ticketsURL, venueInfo, gigStartTime, gigFinishTime } = data;
  const formattedDate = formatDate(date);
  const eventURL = "/eventURL";
  const router = useRouter();

  return (
    <>
      <div className="relative top-[330px] right-[5px">
        <div className="relative w-full my-[50px]">
          {/* Contenedor principal con borde */}
          <div className="border-[3px] border-beige p-2 relative w-[650px] -right-[95px] -top-[310px]">
            <div className="text-left px-10">
              <h1 className=" font-titles leading-[18px] lowercase pt-5">
                <span className="text-lightRed text-[40px]">old time sailors </span>
                <span className="text-beige text-[40px]">at</span>
                <br />
                <br />
                <span className="text-beige  text-[40px]">{event}</span>
              </h1>
              <p className="text-lightRed font-txt text-[30px] lowercase mt-2">{location}</p>
            </div>
            <div className="absolute w-[250px] top-[27px] -right-[75px] z-20">
              <div className="bg-beige p-4 rounded-3xl ">
                <h3 className="text-lightRed text-[25px] font-titles leading-none">
                  <p>more about</p>
                  <p>the venue</p>
                </h3>
                <div className="mt-0.5 tracking-wide">
                  <p className="text-darkBlue text-[12px] font-txt leading-tight">
                    {venueInfo}A rural escape built by the community, for the community in the heart of Newquay. A venue for the whole family with
                    seating options.
                  </p>
                  <Link href={eventURL}>
                    <p className="text-darkBlue text-[12px] mt-1 font-titles underline">contact the venue for + info</p>
                  </Link>
                </div>
              </div>
            </div>
            <div className="border-more-dashed-beige my-4" />

            {/* Event info */}
            <div className="space-y-2 p-4">
              <div className="flex flex-row gap-5">
                <div className="space-y-3">
                  {[
                    { icon: FaLocationDot, text: `${event}` },
                    { icon: FaCalendar, text: `${formattedDate}` },
                    { icon: FaClock, text: `${gigStartTime} to ${gigFinishTime}` },
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-center gap-2 text-beige font-txt px-4">
                      <Icon className="text-[18px] text-lightRed" />
                      <span className="text-[18px] font-txt">{text}</span>
                    </div>
                  ))}
                </div>
                <div className="relative ">
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
              <div className="text-[15px] pt-5 text-beige font-txt text-left leading-7 px-4">
                <p className="leading-relaxed [&:not(:last-child)]:mb-0">
                  Heave ho and up she rises! Cast aside your compass, throw your maps overboard and join the mutinous crew of The Old Time Sailor as
                  they set sail for the wild uninhabited islands of Irish Punk, Shanty Punk, Polka Rock, Romani Punk, Dark Cabaret, and Twisted
                  Circus!
                </p>
                <p className="leading-relaxed [&:not(:last-child)]:mb-0">
                  'Rock and row' with our 21 strong crew of rebellious musicians as the navigate a voyage through the thrashing seas of Hevay Metal
                  and Hard Rock on a genre bending adventure into uncharted waters, join in the Wall of Death and thrash it out with your shipmates.
                </p>
                <p className="leading-relaxed [&:not(:last-child)]:mb-0">
                  Get ready for vigorous vocals, emphatic energy, mosh pits and head banging: we play it live and we play it loud, but as always with
                  The Old Time Sailors... be prepared to expect the unexpected!
                </p>
              </div>
              <p className="text-[15px] text-left text-beige font-txt leading-7 px-4"></p>
            </div>
          </div>

          <div className="absolute right-[15px] -top-[230px] z-10">
            <Image src="/assets/powerPhoto1.webp" alt="Performance" width={200} height={200} className="w-[200px] h-[200px]" loading="lazy" />
          </div>
          {/* Photo 2 */}
          <div className="absolute right-[25px] -top-[35px] z-30">
            <Image src="/assets/powerPhoto4.jpg" alt="Musicians" width={290} height={200} className="w-[290px]" loading="lazy" />
          </div>
          {/* Photo 3 */}
          <div className="absolute right-[275px] top-[255px] w-[380px] z-40">
            <Image src="/assets/powerPhoto3.webp" alt="Crowd" width={400} height={400} className="h-[360px]" loading="lazy" />
          </div>
          <div className="absolute -right-[18px] bottom-[0px]">
            <Image
              src="/assets/shipDrawing.webp"
              alt="Background drawing"
              width={300}
              height={300}
              className="w-[330px] h-[300px] mix-blend-multiply brightness-[55%] opacity-[75%]"
              loading="lazy"
            />
          </div>
          <div className="absolute top-[195px] left-[38px] w-[410px] h-[280px] z-50">
            <Image src="/assets/powerVideoBox2.svg" alt="Video frame" width={430} height={100} priority={true} />
            <div className="absolute inset-0 top-[41px] -left-[10px] -right-[10px] flex items-center justify-center">
              <video
                controls
                preload="none"
                poster={"/assets/thumbnailVideoP.webp"}
                className="object-cover w-[75%] h-[75%] rounded-sm z-20  hover:opacity-100 [&::-webkit-media-controls]:opacity-0 hover:[&::-webkit-media-controls]:opacity-100 [&::-webkit-media-controls]:transition-opacity"
              >
                <source src="/assets/powerVideo.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
          <div className="relative" onClick={() => router.back()} role="button" tabIndex={0}>
            <Image
              src="/assets/beigeArrow.webp"
              alt="More gigs"
              width={310}
              height={110}
              className="absolute left-[25px] -top-[100px] w-[310px] h-[110px]"
              loading="lazy"
            />

            <p className="absolute inset-0 font-titles  text-darkBlue left-[130px] -top-[72px] text-[40px]">more gigs</p>
          </div>
          {/* Title */}
          <div className="absolute -bottom-[190px]  left-[45px] z-10 pb-8">
            <div className="flex flex-row items-center gap-3 mb-5">
              <div className="leading-[63px]">
                <p className="text-lightRed text-[80px] font-titles">power</p>
                <p className="text-lightRed text-[80px] font-titles">show</p>
              </div>
              <div className="text-beige text-[20px] -mb-[75px] -ml-[35px]">
                <div className="font-txt leading-tight tracking-widest uppercase">
                  <p>an upbeat, darker show. get ready to</p>
                  <p>party below deck like a pirate!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default PowerLaptop;
