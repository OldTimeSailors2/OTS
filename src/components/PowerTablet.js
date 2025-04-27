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
export const PowerTablet = ({ data }) => {
  const { event, location, date, ticketsURL, venueInfo, gigStartTime, gigFinishTime } = data;
  const formattedDate = formatDate(date);
  const eventURL = "/eventURL";
  const router = useRouter();
  return (
    <>
      <div className="relative -bottom-[120px]  px-[5px]">
        {/* Contenedor principal con borde */}
        <div className="border-[3px] border-beige p-4 mx-6 relative">
          <div className="text-left">
            <h1 className="font-titles lowercase leading-none">
              <span className="text-lightRed text-[40px]">old time sailors </span>
              <span className="text-beige text-[40px]"> at</span>
              <br />
              <span className="text-beige  text-[40px]">{event}</span>
            </h1>

            <p className="text-lightRed font-txt text-[25px]lowercase">{location}</p>

            <div className="absolute w-56 top-9 -right-6">
              <div className="bg-beige p-6 rounded-3xl">
                <h3 className="text-lightRed text-[25px] font-titles leading-none">
                  <p>more about</p>
                  <p>the venue</p>
                </h3>
                <div className="mt-0.5">
                  <p className="text-darkBlue text-[15px] font-txt leading-tight">
                    {venueInfo}A rural escape built by the community, for the community in the heart of Newquay. A venue for the whole family with
                    seating options.
                  </p>
                  <Link href={eventURL}>
                    <p className="text-darkBlue text-[16px] mt-1 font-titles underline">contact the venue for + info</p>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="border-more-dashed-beige my-4" />

          {/* Event info */}
          <div className="space-y-6 ">
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
                    <span className="text-[18px]">{text}</span>
                  </div>
                ))}
              </div>

              <div className="relative">
                <Link className="absolute inset-0 items-center justify-center  text-beige w-[220px] left-4 top-4" href={ticketsURL} target="_blank">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 358.62 137.01" preserveAspectRatio="none" className="w-[100%] h-[65px] z-10">
                    <path
                      fill="#db3a57"
                      d="M25.61,0H333.01c0,14.15,11.47,25.61,25.61,25.61V111.4c-14.15,0-25.61,11.47-25.61,25.61H25.61c0-14.15-11.47-25.61-25.61-25.61V25.61C14.15,25.61,25.61,14.15,25.61,0Z"
                    />
                  </svg>
                  <h3 className="relative font-txt uppercase justify-center text-[27px] -top-[52px] z-20 w-[100%] text-center "> buy tickets</h3>
                </Link>
              </div>
            </div>

            <div className="text-[20px] pb-9 pt-5 text-beige font-txt text-left">
              <p className="leading-relaxed [&:not(:last-child)]:mb-0">
                Heave ho and up she rises! Cast aside your compass, throw your maps overboard and join the mutinous crew of The Old Time Sailor as
                they set sail for the wild uninhabited islands of Irish Punk, Shanty Punk, Polka Rock, Romani Punk, Dark Cabaret, and Twisted Circus!
              </p>
              <p className="leading-relaxed [&:not(:last-child)]:mb-0">
                'Rock and row' with our 21 strong crew of rebellious musicians as the navigate a voyage through the thrashing seas of Hevay Metal and
                Hard Rock on a genre bending adventure into uncharted waters, join in the Wall of Death and thrash it out with your shipmates.
              </p>
              <p className="leading-relaxed [&:not(:last-child)]:mb-0">
                Get ready for vigorous vocals, emphatic energy, mosh pits and head banging: we play it live and we play it loud, but as always with
                The Old Time Sailors... be prepared to expect the unexpected!
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Media section */}
      <div className="w-full h-[auto] relative -bottom-[140px] mb-[50px]">
        <div className="relative h-[220px]">
          {/* Video */}
          {/* Contenedor principal */}
          <div className="relative w-[550px] h-[230px] -top-[2px] left-[11px] z-30">
            {/* Video primero en el DOM pero con z-index menor */}
            <div className="absolute inset-0  flex items-center justify-center z-40">
              <video
                controls
                preload="none"
                poster={"/assets/thumbnailVideoP.webp"}
                className="w-[70%] h-[98%] absolute -top-[19px] left-[31px] object-cover rounded-sm]  hover:opacity-100 [&::-webkit-media-controls]:opacity-0 hover:[&::-webkit-media-controls]:opacity-100 [&::-webkit-media-controls]:transition-opacity"
              >
                <source src="/assets/powerVideo.mp4" type="video/mp4" />
              </video>
            </div>

            {/* Recuadro después en el DOM y con z-index mayor */}
            <div className="absolute inset-0 z-10 -top-[110px] -left-[15px]">
              <Image src="/assets/powerVideoBox2.svg" alt="Video frame" width={480} height={370} className="w-[480px] h-[372px]" priority={true} />
            </div>
          </div>

          {/* Photo 2 */}
          <div className="absolute right-[20px] -top-[52px] w-[320px] z-10">
            <Image src="/assets/powerPhoto4.jpg" alt="Musicians" width={140} height={140} className="w-full" loading="lazy" />
          </div>
        </div>

        {/* Lower photos */}
        <div className="relative h-[750px] mx-5 mb-4">
          <div className="absolute -top-[26px] -left-[7px] w-1/2 z-20">
            <Image src="/assets/powerPhoto1.webp" alt="Performance" width={300} height={280} className="z-10 h-[320px] ml-7 mt-4" loading="lazy" />
            <div className="relative" onClick={() => router.back()} role="button" tabIndex={0}>
              <Image
                src="/assets/beigeArrow.webp"
                alt="More gigs"
                width={290}
                height={110}
                className="absolute -left-[18px] top-[80px] w-[290px] h-[110px]"
                loading="lazy"
              />

              <p className="absolute inset-0 font-titles  text-darkBlue left-[70px] top-[105px] text-[45px]">more gigs</p>
            </div>
          </div>

          <div className="absolute -right-[15px] top-[75px] w-[450px] h-[200px] z-10">
            <Image src="/assets/powerPhoto3.webp" alt="Crowd" width={400} height={400} className="w-full h-auto" loading="lazy" />
          </div>
        </div>

        {/* Title */}
        <div className="absolute -bottom-[10px]  left-[15px] z-30 ">
          <div className="flex flex-row items-center gap-3">
            <div className="flex flex-col leading-[75px] mb-6">
              <p className="text-lightRed text-[90px] font-titles">power</p>
              <p className="text-lightRed text-[90px] font-titles">show</p>
            </div>
            <div className="text-beige text-[20px] flex flex-col">
              <div className="-ml-[45px] mt-[70px] font-txt leading-none tracking-widest uppercase">
                <p>an upbeat, darker show. get ready to</p>
                <p>party below deck like a pirate!</p>
              </div>
            </div>
          </div>
        </div>

        <Image
          src="/assets/shipDrawing.webp"
          alt="Background drawing"
          width={300}
          height={300}
          className="absolute -bottom-[20px] right-[5px] z-20 mix-blend-multiply brightness-[55%] opacity-[75%]"
          loading="lazy"
        />
      </div>
    </>
  );
};
export default PowerTablet;
