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

export const PowerLaptopL = ({ data }) => {
  const { event, location, date, ticketsURL, venueInfo, gigStartTime, gigFinishTime } = data;
  const formattedDate = formatDate(date);
  const eventURL = "/eventURL";
  const router = useRouter();
  return (
    <>
      <div className="relative -bottom-[100px]">
        <div className="relative w-full h-full my-[250px]">
          {/* Contenedor principal con borde */}
          <div className="border border-beige p-2 relative w-[950px] -right-[95px] -top-[310px]">
            <div className="text-left px-10 leading-none">
              <h1 className=" font-titles lowercase  leading-none">
                <span className="text-lightRed text-[55px]">old time sailors </span>
                <span className="text-beige text-[55px]"> at</span>
                <br />
                <span className="text-beige text-[55px]">{event}</span>
              </h1>
              <p className="text-lightRed font-txt text-[30px] mt-4 lowercase">{location}</p>
            </div>
            <div className="absolute w-[350px] top-[20px] -right-[100px] z-20">
              <div className="bg-beige h-[220px] p-6 rounded-3xl">
                <h3 className="text-lightRed text-[30px] font-titles leading-none">
                  <p>more about</p>
                  <p>the venue</p>
                </h3>
                <div className="mt-0.5 tracking-wide">
                  <p className="text-darkBlue text-[17px] font-txt leading-tight">
                    {venueInfo}A rural escape built by the community, for the community in the heart of Newquay. A venue for the whole family with
                    seating options.
                  </p>
                  <Link href={eventURL}>
                    <p className="text-darkBlue text-[15px] mt-1 font-titles underline">contact the venue for + info</p>
                  </Link>
                </div>
              </div>
            </div>
            <div className="border-more-dashed-beige my-4" />

            {/* Event info */}
            <div className="space-y-6 p-4">
              <div className="flex flex-row gap-5">
                <div className="space-y-3">
                  {[
                    { icon: FaLocationDot, text: `${event}` },
                    { icon: FaCalendar, text: `${formattedDate}` },
                    { icon: FaClock, text: `${gigStartTime} to ${gigFinishTime}` },
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-center gap-2 text-beige font-txt">
                      <Icon className="text-[21px] text-lightRed" />
                      <span className="text-[21px] font-txt">{text}</span>
                    </div>
                  ))}
                </div>

                <div className="relative w-[390px] h-[100px]">
                  <Link className="absolute inset-0 items-center justify-center  text-beige  top-[6px] left-[90px]" href={ticketsURL} target="_blank">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 358.62 137.01"
                      preserveAspectRatio="none"
                      className="w-[100%] h-[100px] z-10"
                    >
                      <path
                        fill="#db3a57"
                        d="M25.61,0H333.01c0,14.15,11.47,25.61,25.61,25.61V111.4c-14.15,0-25.61,11.47-25.61,25.61H25.61c0-14.15-11.47-25.61-25.61-25.61V25.61C14.15,25.61,25.61,14.15,25.61,0Z"
                      />
                    </svg>
                    <h3 className="relative font-txt uppercase justify-center text-[40px] -top-[81px] z-20 w-[100%] text-center"> buy tickets</h3>
                  </Link>
                </div>
              </div>
              <div className="text-[19px] pb-5 text-beige font-txt text-left leading-8">
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
              {/* <p className="text-[19px] text-left text-beige font-txt leading-8">
                Heave ho and up she rises! Cast aside your compass, throw your maps overboard and join the mutinous crew of The Old Time Sailor as
                they set sail for the wild uninhabited islands of Irish Punk, Shanty Punk, Polka Rock, Romani Punk, Dark Cabaret, and Twisted Circus!
                'Rock and row' with our 21 strong crew of rebellious musicians as the navigate a voyage through the thrashing seas of Hevay Metal and
                Hard Rock on a genre bending adventure into uncharted waters, join in the Wall of Death and thrash it out with your shipmates. Get
                ready for vigorous vocals, emphatic energy, mosh pits and head banging: we play it live and we play it loud, but as always with The
                Old Time Sailors... be prepared to expect the unexpected!
              </p> */}
            </div>
          </div>
          <div className="absolute right-[15px] -top-[230px] z-10">
            <Image src="/assets/powerPhoto1.webp" alt="Performance" width={290} height={290} className="w-[290px] h-[290px] " loading="lazy" />
          </div>
          {/* Photo 2 */}
          <div className="absolute right-[25px] top-[53px] z-20">
            <Image src="/assets/powerPhoto4.jpg" alt="Musicians" width={390} height={200} className="w-[390px] " loading="lazy" />
          </div>
          {/* Photo 3 */}
          <div className="absolute left-[520px] top-[288px] z-30">
            <Image src="/assets/powerPhoto3.webp" alt="Crowd" width={550} height={400} className="w-[550px]" loading="lazy" />
          </div>
          <div className="absolute -right-[0px] -bottom-[350px]">
            <Image
              src="/assets/shipDrawing.webp"
              alt="Background drawing"
              width={420}
              height={420}
              className="w-[420px] h-[420px] mix-blend-multiply brightness-[55%] opacity-[75%]"
              loading="lazy"
            />
          </div>

          <div className="absolute top-[205px] left-[10px] z-30 ">
            <Image src="/assets/powerVideoBox2.svg" alt="Video frame" width={590} height={300} className="h-[450px]" priority={true} />
          </div>

          <div className="absolute inset-0 top-[315px] left-[74px] z-50">
            <video
              controls
              preload="none"
              poster={"/assets/thumbnailVideoP.webp"}
              className="object-cover w-[460px] h-[270px] rounded-sm hover:opacity-100 [&::-webkit-media-controls]:opacity-0 hover:[&::-webkit-media-controls]:opacity-100 [&::-webkit-media-controls]:transition-opacity"
            >
              <source src="/assets/powerVideo.mp4" type="video/mp4" />
            </video>
          </div>

          <div className="relative">
            <Image
              src="/assets/beigeArrow.webp"
              alt="More gigs"
              width={430}
              height={120}
              className="absolute left-[10px] top-[25px] w-[430px] h-[120px]"
              loading="lazy"
            />
            <Link href={"/tickets/calendar-view"}>
              <p className="absolute inset-0 font-titles  text-darkBlue left-[170px] top-[45px] text-[50px]">more gigs</p>
            </Link>
          </div>
          {/* Title */}
          <div className="absolute -bottom-[420px]  left-[35px] z-10 ">
            <div className="flex flex-row items-center gap-3 mb-5">
              <div className="leading-[100px]">
                <p className="text-lightRed text-[125px] font-titles">power</p>
                <p className="text-lightRed text-[125px] font-titles">show</p>
              </div>
              <div className="text-beige text-[30px] -mb-[150px] -ml-[65px]">
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
export default PowerLaptopL;
