"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaCalendar, FaClock } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { formatDate } from "@/utils/formatDate";
import logo from "../../public/assets/logo.svg";

export default function FamilyResponsive({ data = {} }) {
  const router = useRouter();

  useEffect(() => {
    const html = document.documentElement;
    const previousBg = html.style.backgroundColor;
    html.style.backgroundColor = "#E9DFCB";

    return () => {
      html.style.backgroundColor = previousBg;
    };
  }, []);

  const title = data?.eventName ?? data?.event ?? "newquay orchard";
  const venue = data?.venueName ?? data?.location ?? "Newquay Orchard, Newquay";
  const date = data?.date ?? "";
  const formattedDate = date ? formatDate(date) : "Saturday, May 12, 2025";

  const start = data?.gigStartTime ?? data?.from ?? "7:30PM";
  const end = data?.gigFinishTime ?? data?.to ?? "10:30PM";
  const timeText = start && end ? `${start} to ${end}` : start || end || "—";

  const rawBuyUrl = (data?.buyTickets ?? data?.ticketsURL ?? "").trim();
  const buyUrl =
    rawBuyUrl && /^https?:\/\//i.test(rawBuyUrl)
      ? rawBuyUrl
      : rawBuyUrl
        ? `https://${rawBuyUrl}`
        : "";

  const venueInfo =
    data?.venueInfo ??
    "A rural escape built by the community, for the community in the heart of Newquay. A venue for the whole family with seating options.";

  const description =
    data?.description ??
    `You are invited to board the Sailorette and join the plentiful crew, 'The Old Time Sailors', for a night of footstomping, dancing and singing! You will be sailing back to the 19th century for an immersive experience of traditional seafaring music performed in a way you have never seen before. The Motley Crew and their plethora of traditional and eclectic instruments will take you back to the time of clashing tankards, and drunken debauchery. Sing and dance along like a drunken sailor as the band perform centuries old folk and shanty songs. Fancy dress is encouraged, so pull out your best seafaring garments me hearties and join the festivities`;

  const infoItems = [
    { icon: FaLocationDot, text: venue || "—" },
    { icon: FaCalendar, text: formattedDate || "—" },
    { icon: FaClock, text: timeText },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#E9DFCB] text-darkBlue">
      <section className="relative mx-auto w-full max-w-[1600px] px-0 xl:px-10 py-0 xl:py-10">
        {/* MOBILE / TABLET POSTER */}
        <div className="block xl:hidden">
          <div className="mx-auto w-full max-w-[430px]">
            <div
              className="relative w-full overflow-hidden bg-[#E9DFCB]"
              style={{ aspectRatio: "860 / 1736" }}
            >
              <div className="absolute inset-[0.8%] border border-[#9a8c72]/70" />

              {/* logo */}
              <div className="absolute left-[0.5%] top-[5.2%] z-20">
                <Image
                  src={logo}
                  alt="Logo"
                  width={110}
                  height={110}
                  className="w-[12vw] max-w-[78px] h-auto object-contain"
                  loading="lazy"
                />
              </div>

              <div className="absolute left-[2.5%] top-[8.9%] right-[2.3%] bottom-[1.8%] border border-[#9a8c72]/70" />

              {/* title */}
              <div className="absolute left-[10.3%] top-[10.6%] w-[49%] z-20">
                <h1 className="font-titles lowercase leading-[0.9] tracking-tight">
                  <span className="block text-darkBlue ">
                    old time sailors <span className="text-lightRed">at</span>
                  </span>
                  <span className="block text-lightRed  break-words">
                    {title}
                  </span>
                </h1>

                <p className="mt-[1.6%] font-txt lowercase text-darkBlue tracking-wide leading-[1.05] text-[clamp(0.72rem,1.9vw,0.95rem)]">
                  {venue}
                </p>
              </div>

              <div className="absolute left-[10.2%] right-[10.3%] top-[17.3%] border-t-[2px] border-dashed border-[#9a8c72]" />

              {/* venue card */}
              <div className="absolute right-[2%] top-[10.7%] z-30 w-[30%] rounded-[24px] bg-darkBlue px-[2.4%] py-[3.1%] shadow-[0_12px_28px_rgba(0,0,0,0.16)]">
            
                <h3 className="font-titles lowercase leading-[0.9] text-lightRed text-[clamp(0.88rem,2.5vw,1.35rem)]">
                  more about
                  <br />
                  the venue
                </h3>

                <p className="mt-[4.5%] font-txt text-white leading-[1.08] text-[clamp(0.56rem,1.45vw,0.72rem)]">
                  {venueInfo}
                </p>

                <a
                  href={buyUrl || "#"}
                  target="_blank"
                  rel="noreferrer"
                  className={`mt-[5%] inline-block font-txt text-white underline lowercase tracking-[0.01em] leading-[1.05] text-[clamp(0.52rem,1.3vw,0.66rem)] ${
                    !buyUrl ? "pointer-events-none opacity-50" : ""
                  }`}
                >
                  contact de venue for + info
                </a>
              </div>

              {/* event info */}
              <div className="absolute left-[10.2%] top-[22.0%] z-20 space-y-[1.4%] w-[46%]">
                {infoItems.map(({ icon: Icon, text }, index) => (
                  <div
                    key={`${index}-${text}`}
                    className="flex items-start gap-[3.5%] text-darkBlue"
                  >
                    <Icon className="mt-[0.22em] shrink-0 text-[clamp(0.68rem,1.85vw,0.9rem)]" />
                    <span className="font-txt leading-[1.1] text-[clamp(0.62rem,1.75vw,0.82rem)]">
                      {text}
                    </span>
                  </div>
                ))}
              </div>

              {/* buy tickets */}
              <div className="absolute left-[10.2%] top-[29.2%] z-20 w-[45.5%]">
                <a
                  href={buyUrl || "#"}
                  target="_blank"
                  rel="noreferrer"
                  aria-disabled={!buyUrl}
                  onClick={(e) => {
                    if (!buyUrl) e.preventDefault();
                  }}
                  className={`block w-full ${
                    !buyUrl ? "cursor-not-allowed opacity-50" : "cursor-pointer"
                  }`}
                >
                  <Image
                    src="/assets/buyTickets.png"
                    alt="Buy tickets"
                    width={420}
                    height={120}
                    className="w-full h-auto object-contain"
                    loading="lazy"
                  />
                </a>
              </div>

              {/* description */}
              <div className="absolute left-[10.2%] right-[11.3%] top-[33.8%] z-20">
                <p className="font-txt text-darkBlue leading-[1.18] text-[clamp(0.56rem,1.6vw,0.78rem)]">
                  {description}
                </p>
              </div>

              {/* video */}
              <div className="absolute left-[7.2%] top-[45.1%] z-30 w-[51.8%] border-[6px] border-darkBlue bg-[#d8d4ca] shadow-[0_16px_30px_rgba(0,0,0,0.18)]">
                <video
                  controls
                  preload="none"
                  poster="/assets/thumbnailvideo.webp"
                  className="w-full h-auto object-cover"
                >
                  <source src="/assets/familyVideo.mp4" type="video/mp4" />
                </video>
              </div>

              {/* image right top */}
              <div className="absolute right-[5.3%] top-[44.3%] z-20 w-[39%] shadow-[0_16px_28px_rgba(0,0,0,0.16)]">
                <Image
                  src="/assets/familyPhoto2.webp"
                  alt="Musicians"
                  width={400}
                  height={400}
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
              </div>

              {/* image left bottom */}
              <div className="absolute left-[5.3%] top-[60.5%] z-20 w-[39.5%] shadow-[0_16px_28px_rgba(0,0,0,0.16)]">
                <Image
                  src="/assets/familyPhoto1.webp"
                  alt="Performance"
                  width={400}
                  height={400}
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
              </div>

              {/* image right bottom framed */}
              <div className="absolute right-[5.1%] top-[63.7%] z-20 w-[45.6%] border-[4px] border-[#ef637b] p-[1.2%] shadow-[0_16px_28px_rgba(0,0,0,0.14)]">
                <Image
                  src="/assets/familyPhoto3.webp"
                  alt="Crowd"
                  width={500}
                  height={680}
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
              </div>

              {/* more gigs */}
              <div className="absolute left-[3.3%] top-[81.8%] z-20 w-[42%]">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="group relative block w-full"
                >
                  <Image
                    src="/assets/moreGigs.png"
                    alt="More gigs"
                    width={370}
                    height={95}
                    className="w-full h-auto transition-transform duration-200 group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                  <span className="pointer-events-none absolute inset-0 flex items-center justify-center font-txt text-white lowercase tracking-wide text-[clamp(0.78rem,2.2vw,1.2rem)]">
                  </span>
                </button>
              </div>

              {/* family show */}
              <div className="absolute left-[5.4%] top-[88.2%] z-20">
                <div className="leading-[0.85]">
                  <p className="font-titles lowercase text-darkBlue text-[clamp(2rem,6vw,3.8rem)]">
                    family
                  </p>
                  <p className="font-titles lowercase text-darkBlue text-[clamp(2rem,6vw,3.8rem)]">
                    show
                  </p>
                </div>
              </div>

              {/* anchor */}
              <div className="absolute left-[40.2%] top-[89.5%] z-20">
                <Image
                  src="/assets/anchor.webp"
                  alt="Anchor"
                  width={56}
                  height={76}
                  className="w-[7vw] max-w-[40px] h-auto object-contain"
                  loading="lazy"
                />
              </div>

              {/* bottom subtitle */}
              <div className="absolute left-[48%] right-[6%] top-[95.0%] z-20">
                <div className="font-txt font-bold lowercase leading-[1.02] tracking-[0.03em] text-lightRed text-[clamp(0.42rem,1.2vw,0.72rem)]">
                  <p>a traditional sailor show,</p>
                  <p>sing along and dance with us!</p>
                </div>
              </div>

              {/* drawing */}
              <div className="absolute right-[3.3%] bottom-[2.6%] z-0 opacity-[0.42]">
                <Image
                  src="/assets/drawing2.webp"
                  alt="Background drawing"
                  width={230}
                  height={180}
                  className="w-[24vw] max-w-[130px] h-auto object-contain mix-blend-multiply brightness-[72%] contrast-[128%]"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>

        {/* DESKTOP POSTER */}
        <div className="relative hidden xl:block h-[1480px]">
          <div className="absolute left-[55px] top-[38px] w-[900px] h-[605px] border-[3px] border-[#b9a88d]">
            <div className="absolute -left-[78px] -top-[24px] z-20">
              <Image
                src={logo}
                alt="Logo"
                width={135}
                height={135}
                className="h-[128px] w-[128px] object-contain"
                loading="lazy"
              />
            </div>

            <div className="absolute left-[92px] top-[8px] max-w-[650px]">
              <h1 className="font-titles lowercase leading-[0.93] tracking-tight">
                <span className="text-darkBlue text-[38px]">old time sailors </span>
                <span className="text-lightRed text-[38px]">at</span>
                <br />
                <span className="text-lightRed text-[38px]">{title}</span>
              </h1>

              <p className="mt-1 font-txt uppercase text-darkBlue text-[20px] tracking-wide">
                {venue}
              </p>
            </div>

            <div className="absolute left-[72px] right-[52px] top-[185px] border-t-[3px] border-dashed border-[#b9a88d]" />

            <div className="absolute left-[92px] top-[220px]">
              <div className="space-y-3">
                {infoItems.map(({ icon: Icon, text }, index) => (
                  <div
                    key={`${index}-${text}`}
                    className="flex items-center gap-3 font-txt"
                  >
                    <Icon className="shrink-0 text-darkBlue text-[22px]" />
                    <span className="text-darkBlue text-[19px] leading-tight">
                      {text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="absolute left-[510px] top-[245px] w-[240px]">
              <a
                href={buyUrl || "#"}
                target="_blank"
                rel="noreferrer"
                aria-disabled={!buyUrl}
                onClick={(e) => {
                  if (!buyUrl) e.preventDefault();
                }}
                className={`block w-full ${
                  !buyUrl ? "cursor-not-allowed opacity-50" : "cursor-pointer"
                }`}
              >
                <Image
                  src="/assets/buyTickets.png"
                  alt="Buy tickets"
                  width={300}
                  height={100}
                  className="w-full h-auto object-contain"
                  loading="lazy"
                />
              </a>
            </div>

            <div className="absolute left-[92px] top-[330px] max-w-[690px]">
              <p className="font-txt text-darkBlue text-[18px] leading-[1.48]">
                {description}
              </p>
            </div>
          </div>

          <div className="absolute left-[790px] top-[58px] z-30 w-[300px]">
            <div className="rounded-[32px] bg-darkBlue px-8 py-7 shadow-[0_18px_30px_rgba(0,0,0,0.14)]">
              <h3 className="font-titles lowercase leading-[0.92] text-lightRed text-[34px]">
                more about
                <br />
                the venue
              </h3>

              <p className="mt-3 font-txt text-white text-[16px] leading-[1.18]">
                {venueInfo || "Venue information coming soon."}
              </p>

              <a
                href={buyUrl || "#"}
                target="_blank"
                rel="noreferrer"
                className={`mt-3 inline-block font-txt text-white underline lowercase text-[16px] ${
                  !buyUrl ? "pointer-events-none opacity-50" : ""
                }`}
              >
                contact the venue for + info
              </a>
            </div>
          </div>

          <div className="absolute right-[40px] top-[90px] z-10">
            <Image
              src="/assets/familyPhoto1.webp"
              alt="Performance"
              width={300}
              height={300}
              className="h-[300px] w-[300px] object-cover shadow-[0_14px_24px_rgba(0,0,0,0.16)]"
              loading="lazy"
            />
          </div>

          <div className="absolute left-[1000px] top-[270px] z-20">
            <Image
              src="/assets/anchor.webp"
              alt="Anchor"
              width={56}
              height={76}
              className="h-auto w-[56px]"
              loading="lazy"
            />
          </div>

          <div className="absolute right-[70px] top-[380px] z-20">
            <Image
              src="/assets/familyPhoto2.webp"
              alt="Musicians"
              width={470}
              height={420}
              className="h-[420px] w-[470px] object-cover shadow-[0_18px_30px_rgba(0,0,0,0.16)]"
              loading="lazy"
            />
          </div>

          <div className="absolute left-[18px] top-[580px] z-30">
            <div className="relative w-[520px]">
              <Image
                src="/assets/videoBox.png"
                alt="Video frame"
                width={650}
                height={550}
                className="h-[314px] w-[517px]"
                priority
              />
              <div className="absolute left-[30px] top-[34px] w-[440px]">
                <video
                  controls
                  preload="none"
                  poster="/assets/thumbnailvideo.webp"
                  className="h-[238px] w-full object-cover border-[8px] border-darkBlue shadow-[0_12px_24px_rgba(0,0,0,0.18)]"
                >
                  <source src="/assets/familyVideo.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
          </div>

          <div className="absolute left-[460px] top-[685px] z-20">
            <Image
              src="/assets/familyPhoto3.webp"
              alt="Crowd"
              width={470}
              height={470}
              className="h-[470px] w-[470px] object-cover shadow-[0_16px_28px_rgba(0,0,0,0.16)]"
              loading="lazy"
            />
          </div>

          <div className="absolute right-[100px] top-[800px] z-0 opacity-[0.72]">
            <Image
              src="/assets/drawing2.webp"
              alt="Background drawing"
              width={350}
              height={290}
              className="h-[290px] w-[350px] object-contain mix-blend-multiply brightness-[72%] contrast-[128%]"
              loading="lazy"
            />
          </div>

          <div className="absolute left-[25px] top-[880px] z-20">
            <button
              type="button"
              onClick={() => router.back()}
              className="group relative inline-block"
            >
              <Image
                src="/assets/arrow2.webp"
                alt="More gigs"
                width={370}
                height={95}
                className="h-[95px] w-[370px] transition-transform duration-200 group-hover:scale-[1.02]"
                loading="lazy"
              />
              <span className="absolute inset-0 flex items-center justify-center font-titles text-white lowercase text-[34px] tracking-wide">
                more gigs
              </span>
            </button>
          </div>

          <div className="absolute left-[40px] top-[1000px] z-10">
            <div className="leading-[0.83]">
              <p className="font-titles lowercase text-darkBlue text-[128px]">
                family
              </p>
              <p className="font-titles lowercase text-darkBlue text-[128px]">
                show
              </p>
            </div>

            <div className="absolute left-[285px] top-[165px] w-[700px]">
              <div className="font-txt font-bold lowercase tracking-[0.08em] leading-[1.08] text-lightRed text-[24px]">
                <p>a traditional sailor show,</p>
                <p>sing along and dance with us!</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}