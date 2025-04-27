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

export const Power1360 = ({ data }) => {
  const { event, location, date, ticketsURL, venueInfo, gigStartTime, gigFinishTime } = data;
  const formattedDate = formatDate(date);
  const eventURL = "/eventURL";
  const router = useRouter();
  return (
    <>
      <div className="relative -bottom-[100px]">
        <div className="relative w-full h-full my-[250px]">
          {/* Contenedor principal con borde */}
          <div className="border-[3px] border-beige p-2 relative w-[850px] -right-[104px] -top-[310px]">
            <div className="text-left px-10">
              <h1 className="font-titles leading-none lowercase">
                <span className="text-lightRed text-[55px]">old time sailors </span>
                <span className="text-beige  text-[55px]"> at</span>
                <br />
                <span className="text-beige  text-[55px]">{event}</span>
              </h1>
              <p className="text-lightRed font-txt text-[30px] mt-4 lowercase">{location}</p>
            </div>
            <div className="absolute w-[310px] top-[20px] -right-[100px] z-20">
              <div className="bg-beige h-[220px] p-6 rounded-3xl">
                <h3 className="text-lightRed text-[30px] font-titles leading-none">
                  <p>more about</p>
                  <p>the venue</p>
                </h3>
                <div className="mt-0.5 tracking-wide">
                  <p className="text-darkBlue text-[15px] font-txt leading-tight">
                    {venueInfo}A rural escape built by the community, for the community in the heart of Newquay. A venue for the whole family with
                    seating options.
                  </p>
                  <Link href={eventURL}>
                    <p className="text-darkBlue text-[14px] mt-1 font-titles underline">contact the venue for + info</p>
                  </Link>
                </div>
              </div>
            </div>
            <div className="border-t-2 border-dashed border-beige my-4" />

            {/* Event info */}
            <div className="space-y-6 p-4 px-10">
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
                    <div key={text} className="flex items-center gap-2 text-beige font-txt">
                      <Icon className="text-[18px] text-lightRed" />
                      <span className="text-[18px] font-txt">{text}</span>
                    </div>
                  ))}
                </div>

                <div className="relative w-[330px] h-[100px]">
                  <Link className="absolute left-12 inset-0  items-center justify-center text-beige" href={ticketsURL} target="_blank">
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
                    <h3 className="relative font-txt justify-center text-[37px] uppercase -top-[79px] z-20 w-[100%] text-center">buy tickets</h3>
                  </Link>
                </div>
              </div>
              <div className="text-[17px] pb-5 text-beige font-txt text-left leading-7">
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
            </div>
          </div>
          <div className="absolute right-[18px] -top-[230px] z-10">
            <Image src="/assets/powerPhoto1.webp" alt="Performance" width={290} height={290} className="w-[290px] h-[290px] " loading="lazy" />
          </div>
          {/* Photo 2 */}
          <div className="absolute right-[45px] top-[53px] z-20">
            <Image src="/assets/powerPhoto4.jpg" alt="Musicians" width={390} height={200} className="w-[390px] " loading="lazy" />
          </div>
          {/* Photo 3 */}
          <div className="absolute left-[510px] top-[300px] z-30">
            <Image src="/assets/powerPhoto3.webp" alt="Crowd" width={450} height={450} className="w-[450px] h-[450px]" loading="lazy" />
          </div>
          <div className="absolute right-[5px] -bottom-[300px]">
            <Image
              src="/assets/shipDrawing.webp"
              alt="Background drawing"
              width={450}
              height={450}
              className="w-[450px] h-[450px] mix-blend-multiply brightness-[55%] opacity-[75%]"
              loading="lazy"
            />
          </div>

          <div className="absolute w-full h-full top-[190px] -left-[10px] z-30 ">
            <Image src="/assets/powerVideoBox2.svg" alt="Video frame" width={650} height={420} className="w-[650px] h-[420px]" priority={true} />
          </div>

          <div className="absolute inset-0 top-[285px] left-[80px] z-50">
            <video
              controls
              preload="none"
              poster={"/assets/thumbnailVideoP.webp"}
              className="object-cover w-[470px] h-[270px] rounded-sm hover:opacity-100 [&::-webkit-media-controls]:opacity-0 hover:[&::-webkit-media-controls]:opacity-100 [&::-webkit-media-controls]:transition-opacity"
            >
              <source src="/assets/powerVideo.mp4" type="video/mp4" />
            </video>
          </div>

          <div className="relative -top-[150px]" onClick={() => router.back()} role="button" tabIndex={0}>
            <Image
              src="/assets/beigeArrow.webp"
              alt="More gigs"
              width={360}
              height={100}
              className="absolute left-[10px] top-[145px] w-[360px] h-[100px]"
              loading="lazy"
            />

            <p className="absolute inset-0 font-titles text-darkBlue left-[130px] top-[156px] text-[50px]">more gigs</p>
          </div>
          {/* Title */}
          <div className="absolute -bottom-[320px]  left-[90px] z-10 ">
            <div className="flex flex-row items-center gap-3 mb-5">
              <div className="leading-[90px]">
                <p className="text-lightRed text-[110px] font-titles m-0">power</p>
                <p className="text-lightRed text-[110px] font-titles m-0  ">show</p>
              </div>
              <div className="text-beige text-[25px] -mb-[150px] -ml-[65px] leading-none">
                <div className="font-txt leading-none tracking-widest">
                  <p className="m-0">AN UPBEAT, DARKER SHOW. GET READY TO</p>
                  <p className="m-0">PARTY BELOW DECK LIKE A PIRATE!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Power1360;
