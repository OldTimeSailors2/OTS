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

export const PowerDesktop = ({ data }) => {
  const { event, location, date, ticketsURL, venueInfo, gigStartTime, gigFinishTime } = data;
  const formattedDate = formatDate(date);
  const eventURL = "/eventURL";
  const router = useRouter();
  return (
    <>
      <div className="relative -bottom-[170px]">
        <div className="relative w-full h-full my-[250px]">
          {/* Contenedor principal con borde */}
          <div className="border-[3px] border-beige p-2 relative w-[1100px] -right-[100px] -top-[310px]">
            <div className="text-left px-10">
              <h1 className="leading-none font-titles lowercase pt-2">
                <span className="text-lightRed text-[55px]">old time sailors </span>
                <span className="text-beige  text-[55px]"> at</span>
                <br />
                <span className="text-beige text-[55px]">{event}</span>
              </h1>
              <p className="text-lightRed font-txt text-[30px] lowercase">{location}</p>
            </div>
            <div className="absolute w-[350px] top-[20px] -right-[100px] z-20">
              <div className="bg-beige h-[220px] p-6 rounded-3xl">
                <h3 className="text-lightRed text-[30px] font-titles leading-none">
                  more about
                  <br />
                  the venue
                </h3>
                <div className="mt-0.5 tracking-wide">
                  <p className="text-darkBlue text-[16px] font-txt leading-tight">
                    {venueInfo}A rural escape built by the community, for the community in the heart of Newquay. A venue for the whole family with
                    seating options.
                  </p>
                  <Link href={eventURL}>
                    <p className="text-darkBlue text-[15px] mt-1 font-titles underline">contact the venue for + info</p>
                  </Link>
                </div>
              </div>
            </div>
            <div className="border-t-2 border-dashed border-beige my-4" />

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
                    <div key={text} className="flex items-center gap-2 text-beige font-txt leading-tight">
                      <Icon className="text-[25px] text-lightRed" />
                      <span className="text-[25px] font-txt">{text}</span>
                    </div>
                  ))}
                </div>

                <div className="relative w-[400px] h-[100px]">
                  <Link className="absolute left-[70px] top-[5px] inset-0 items-center justify-center  text-beige " href={ticketsURL} target="_blank">
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
                    <h3 className="relative font-txt justify-center text-[47px] uppercase -top-[85px] z-20 w-[100%] text-center">buy tickets</h3>
                  </Link>
                </div>
              </div>
              <div className="text-xl pr-[150px] pb-7 text-beige font-txt text-left leading-10">
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
              {/* <p className="text-xl pr-[150px] pb-14  text-beige font-txt leading-10">
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
            <Image src="/assets/powerPhoto1.webp" alt="Performance" width={290} height={290} className="w-[370px] h-[370px] " loading="lazy" />
          </div>
          {/* Photo 2 */}
          <div className="absolute right-[25px] top-[130px] z-20">
            <Image src="/assets/powerPhoto4.jpg" alt="Musicians" width={500} height={200} className="w-[600px]" loading="lazy" />
          </div>
          {/* Photo 3 */}
          <div className="absolute  left-[515px] top-[460px] z-20">
            <Image src="/assets/powerPhoto3.webp" alt="Crowd" width={600} height={600} className="w-[600px] h-[600px]" loading="lazy" />
          </div>
          <div className="absolute -right-[15px] -bottom-[530px]">
            <Image
              src="/assets/shipDrawing.webp"
              alt="Background drawing"
              width={600}
              height={500}
              className="w-[600px] h-[500px] mix-blend-multiply brightness-[55%] contrast-[250%] opacity-[75%]"
              loading="lazy"
            />
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center -top-[320px] right-[1040px] z-30">
              <video
                controls
                preload="none"
                poster={"/assets/thumbnailVideoP.webp"}
                style={{ maxWidth: "100%" }}
                className="object-cover w-[520px] h-[300px] rounded-sm
                      hover:opacity-100 [&::-webkit-media-controls]:opacity-0 hover:[&::-webkit-media-controls]:opacity-100 [&::-webkit-media-controls]:transition-opacity"
              >
                <source src="/assets/powerVideo.mp4" type="video/mp4" />
              </video>
            </div>
            <div className="absolute -top-[418px] left-[1px] z-20 ">
              <Image src="/assets/powerVideoBox2.svg" alt="Video frame" width={650} height={550} className="w-[640px] h-[470px]" priority={true} />
            </div>
          </div>

          <div className="relative top-[15px]" onClick={() => router.back()} role="button" tabIndex={0}>
            <Image
              src="/assets/beigeArrow.webp"
              alt="More gigs"
              width={470}
              height={150}
              className="absolute left-[10px] top-[25px] w-[450px] h-[110px]"
              loading="lazy"
            />

            <p className="absolute inset-0 font-titles text-darkBlue left-[150px] top-[35px] text-[65px]">more gigs</p>
          </div>
          {/* Title */}
          <div className="absolute -bottom-[500px]  left-[15px] z-10 ">
            <div className="flex flex-row items-center gap-3 mb-5">
              <div className="leading-[140px]">
                <p className="text-lightRed text-[180px] font-titles">power</p>
                <p className="text-lightRed text-[180px] font-titles">show</p>
              </div>
              <div className="text-beige text-[30px] -mb-[205px] -ml-[105px]">
                <div className="font-txt font-bold leading-tight tracking-widest uppercase">
                  <p>an upbeat, darker show. get ready to</p>
                  <p>party below deck line like a pirate</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default PowerDesktop;
