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

export const Family1360 = ({ data }) => {
  const { event, location, date, ticketsURL, venueInfo, gigStartTime, gigFinishTime } = data;
  const formattedDate = formatDate(date);
  const eventURL = "/eventURL";
  const router = useRouter();
  return (
    <>
      <div className="relative -bottom-[100px]">
        <div className="relative w-full h-full my-[250px]">
          {/* Contenedor principal con borde */}
          <div className="border-[3px] border-darkBeige p-2 relative w-[850px] -right-[104px] -top-[310px]">
            <div className="text-left px-10">
              <h1 className="font-titles leading-none lowercase">
                <span className="text-DarkBlue text-[53px]">old time sailors XXX</span>
                <span className="text-lightRed  text-[53px]"> at</span>
                <br />
                <span className="text-lightRed  text-[53px]">{event}</span>
              </h1>
              <p className="text-darkBlue font-txt text-[30px] mt-4 lowercase">{location}</p>
            </div>
            <div className="absolute w-[350px] top-[20px] -right-[103px] z-20">
              <div className="bg-darkBlue h-[220px] p-6 rounded-3xl">
                <h3 className="text-lightRed text-[30px] font-titles leading-none">
                  <p>more about x</p>
                  <p>the venue</p>
                </h3>
                <div className="mt-0.5 tracking-wide">
                  <p className="text-beige text-[15px] font-txt leading-tight">
                    {venueInfo}A rural escape built by the community, for the community in the heart of Newquay. A venue for the whole family with
                    seating options.
                  </p>
                  <Link href={eventURL}>
                    <p className="text-beige text-[14px] mt-1 font-titles underline">contact the venue for + info</p>
                  </Link>
                </div>
              </div>
            </div>
            <div className="border-more-dashed my-4" />

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
                    <div key={text} className="flex items-center gap-2 text-darkBlue font-txt">
                      <Icon className="text-[18px] text-darkBlue" />
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

              <p className="text-[17px] text-left text-darkBlue font-txt leading-7">
                You are invited to board the Sailorette and join the plentiful crew, 'The Old Time Sailors', for a night of footstomping, dancing and
                singing! You will be sailing back to the 19th century for an immersive experience of traditional seafaring music performed in a way
                you have never seen before. The Motley Crew and their plethora of traditional and eclectic instruments will take you back to the time
                of clashing tankards, and drunken debauchery. Sing and dance along like a drunken sailor as the band perform centuries old folk and
                shanty songs. Fancy dress is encouraged, so pull out your best seafaring garments me hearties and join the festivities.
              </p>
            </div>
          </div>
          <div className="absolute right-[18px] -top-[230px] z-10">
            <Image src="/assets/familyPhoto1.webp" alt="Performance" width={290} height={290} className="w-[290px] h-[290px] " loading="lazy" />
          </div>
          {/* Photo 2 */}
          <div className="absolute right-[45px] top-[53px] z-20">
            <Image src="/assets/familyPhoto2.webp" alt="Musicians" width={390} height={200} className="w-[390px] " loading="lazy" />
          </div>
          {/* Photo 3 */}
          <div className="absolute left-[510px] top-[300px] z-30">
            <Image src="/assets/familyPhoto3.webp" alt="Crowd" width={450} height={450} className="w-[450px] h-[450px]" loading="lazy" />
          </div>
          <div className="absolute right-[35px] -bottom-[300px]">
            <Image
              src="/assets/drawing2.webp"
              alt="Background drawing"
              width={350}
              height={350}
              className="w-[350px] h-[350px] brightness-[78%] contrast-[91%]"
              loading="lazy"
            />
          </div>
          <div className="absolute top-[225px] left-[10px]">
            <Image src="/assets/videoBox.webp" alt="Video frame" width={590} height={280} priority={true} />
          </div>

          <div className="absolute inset-0 top-[257px] left-[47px] z-40">
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

          <div className="relative -top-[150px]" onClick={() => router.back()} role="button" tabIndex={0}>
            <Image
              src="/assets/arrow2.webp"
              alt="More gigs"
              width={360}
              height={100}
              className="absolute left-[10px] top-[145px] w-[360px] h-[100px]"
              loading="lazy"
            />

            <p className="absolute inset-0 font-titles text-beige left-[130px] top-[156px] text-[50px]">more gigs</p>
          </div>
          {/* Title */}
          <div className="absolute -bottom-[320px]  left-[90px] z-10 ">
            <div className="flex flex-row items-center gap-3 mb-5">
              <div className="leading-[90px]">
                <p className="text-darkBlue text-[110px] font-titles m-0">family</p>
                <p className="text-darkBlue text-[110px] font-titles m-0  ">show</p>
              </div>
              <div className="text-lightRed text-[25px] -mb-[130px] -ml-[65px] leading-none font-txt">
                <div className="font-txt leading-none tracking-widest uppercase">
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
export default Family1360;
