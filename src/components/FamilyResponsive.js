"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaCalendar, FaClock } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { formatDate } from "@/utils/formatDate";

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

  const title = data?.eventName ?? data?.event ?? "";
  const venue = data?.venueName ?? data?.location ?? "";
  const date = data?.date ?? "";
  const formattedDate = date ? formatDate(date) : "";

  const start = data?.gigStartTime ?? data?.from ?? "";
  const end = data?.gigFinishTime ?? data?.to ?? "";
  const timeText = start && end ? `${start} to ${end}` : start || end || "—";

  const rawBuyUrl = (data?.buyTickets ?? data?.ticketsURL ?? "").trim();
  const buyUrl =
    rawBuyUrl && /^https?:\/\//i.test(rawBuyUrl)
      ? rawBuyUrl
      : rawBuyUrl
        ? `https://${rawBuyUrl}`
        : "";

  const venueInfo = data?.venueInfo ?? "";
  const description =
    data?.description ??
    `You are invited to board the Sailorette and join the plentiful crew, 'The Old Time Sailors', for a night of footstomping, dancing and singing! You will be sailing back to the 19th century for an immersive experience of traditional seafaring music performed in a way you have never seen before. The Motley Crew and their plethora of traditional and eclectic instruments will take you back to the time of clashing tankards, and drunken debauchery. Sing and dance along like a drunken sailor as the band perform centuries old folk and shanty songs. Fancy dress is encouraged, so pull out your best seafaring garments me hearties and join the festivities.`;

  const infoItems = [
    { icon: FaLocationDot, text: venue || "—" },
    { icon: FaCalendar, text: formattedDate || "—" },
    { icon: FaClock, text: timeText },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#E9DFCB] text-darkBlue">
      <section className="relative mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8 xl:px-10 py-6 md:py-8 lg:py-10">
        {/* MOBILE / TABLET */}
        <div className="block xl:hidden">
          <div className="mx-auto max-w-[820px]">
            <div className="border-[3px] border-[#b9a88d] bg-transparent p-4 sm:p-6">
              <div>
                <h1 className="font-titles lowercase leading-[0.9] tracking-tight">
                  <span className="block text-darkBlue text-[38px] sm:text-[54px]">
                    old time sailors
                  </span>
                  <span className="text-lightRed text-[38px] sm:text-[54px]">at</span>
                  <br />
                  <span className="text-lightRed text-[38px] sm:text-[54px]">
                    {title}
                  </span>
                </h1>

                <p className="mt-2 font-txt lowercase text-darkBlue text-[20px] sm:text-[28px]">
                  {venue}
                </p>
              </div>

              <div className="my-5 border-t-[3px] border-dashed border-[#b9a88d]" />

              <div className="mb-6 rounded-[28px] bg-darkBlue px-5 py-5 shadow-[0_14px_24px_rgba(0,0,0,0.12)]">
                <h3 className="font-titles lowercase leading-none text-lightRed text-[24px] sm:text-[30px]">
                  more about
                  <br />
                  the venue
                </h3>

                <p className="mt-3 font-txt text-white text-[14px] sm:text-[16px] leading-snug">
                  {venueInfo || "Venue information coming soon."}
                </p>

                <a
                  href={buyUrl || "#"}
                  target="_blank"
                  rel="noreferrer"
                  className={`mt-4 inline-block font-txt text-white underline lowercase text-[16px] sm:text-[18px] ${
                    !buyUrl ? "pointer-events-none opacity-50" : ""
                  }`}
                >
                  contact the venue for + info
                </a>
              </div>

              <div className="flex flex-col gap-6">
                <div className="space-y-3">
                  {infoItems.map(({ icon: Icon, text }, index) => (
                    <div
                      key={`${index}-${text}`}
                      className="flex items-center gap-3 font-txt leading-tight"
                    >
                      <Icon className="shrink-0 text-darkBlue text-[18px] sm:text-[22px]" />
                      <span className="text-darkBlue text-[18px] sm:text-[24px]">
                        {text}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="w-full max-w-[320px]">
                  <a
                    href={buyUrl || "#"}
                    target="_blank"
                    rel="noreferrer"
                    aria-disabled={!buyUrl}
                    onClick={(e) => {
                      if (!buyUrl) e.preventDefault();
                    }}
                    className={`relative block w-full ${
                      !buyUrl ? "cursor-not-allowed opacity-50" : "cursor-pointer"
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 358.62 137.01"
                      preserveAspectRatio="none"
                      className="h-[78px] sm:h-[86px] w-full"
                      style={{ pointerEvents: "none" }}
                    >
                      <path
                        fill="#db3a57"
                        d="M25.61,0H333.01c0,14.15,11.47,25.61,25.61,25.61V111.4c-14.15,0-25.61,11.47-25.61,25.61H25.61c0-14.15-11.47-25.61-25.61-25.61V25.61C14.15,25.61,25.61,14.15,25.61,0Z"
                      />
                    </svg>

                    <span className="pointer-events-none absolute inset-0 flex items-center justify-center font-txt uppercase text-center text-[22px] sm:text-[28px] text-white tracking-wide">
                      buy tickets
                    </span>
                  </a>
                </div>
              </div>

              <div className="mt-7">
                <p className="font-txt text-darkBlue text-[16px] sm:text-[20px] leading-7 sm:leading-9">
                  {description}
                </p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4">
              <Image
                src="/assets/familyPhoto1.webp"
                alt="Performance"
                width={900}
                height={900}
                className="w-full h-auto object-cover shadow-[0_16px_30px_rgba(0,0,0,0.16)]"
                loading="lazy"
              />

              <Image
                src="/assets/familyPhoto2.webp"
                alt="Musicians"
                width={900}
                height={600}
                className="w-full h-auto object-cover shadow-[0_16px_30px_rgba(0,0,0,0.16)]"
                loading="lazy"
              />

              <div className="border-[8px] border-darkBlue shadow-[0_16px_30px_rgba(0,0,0,0.16)]">
                <video
                  controls
                  preload="none"
                  poster="/assets/thumbnailvideo.webp"
                  className="w-full h-auto object-cover"
                >
                  <source src="/assets/familyVideo.mp4" type="video/mp4" />
                </video>
              </div>

              <Image
                src="/assets/familyPhoto3.webp"
                alt="Crowd"
                width={900}
                height={900}
                className="w-full h-auto object-cover shadow-[0_16px_30px_rgba(0,0,0,0.16)]"
                loading="lazy"
              />
            </div>

            <div className="mt-8">
              <button
                type="button"
                onClick={() => router.back()}
                className="group relative inline-block"
              >
                <Image
                  src="/assets/arrow2.webp"
                  alt="More gigs"
                  width={470}
                  height={110}
                  className="h-auto w-[280px] sm:w-[360px] transition-transform duration-200 group-hover:scale-[1.02]"
                  loading="lazy"
                />
                <span className="pointer-events-none absolute inset-0 flex items-center justify-center font-txt text-white lowercase text-[28px] sm:text-[42px] tracking-wide">
                  more gigs
                </span>
              </button>

              <div className="mt-6 leading-[0.88]">
                <p className="font-titles lowercase text-darkBlue text-[76px] sm:text-[118px]">
                  family
                </p>
                <p className="font-titles lowercase text-darkBlue text-[76px] sm:text-[118px]">
                  show
                </p>
              </div>

              <div className="mt-3 font-txt font-bold uppercase tracking-[0.14em] leading-tight text-lightRed text-[16px] sm:text-[22px]">
                <p>a traditional sailor show,</p>
                <p>sing along and dance with us!</p>
              </div>
            </div>
          </div>
        </div>

        {/* DESKTOP POSTER */}
        <div className="relative hidden xl:block h-[1480px]">
          {/* marco grande */}
          <div className="absolute left-[55px] top-[38px] w-[900px] h-[605px] border-[3px] border-[#b9a88d]">
            {/* logo */}
            <div className="absolute -left-[78px] -top-[24px] z-20">
              <Image
                src="/assets/oldTimeSailorsLogo.webp"
                alt="Old Time Sailors"
                width={135}
                height={135}
                className="h-[128px] w-[128px] object-contain"
                loading="lazy"
              />
            </div>

            {/* titulo */}
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

            {/* linea punteada */}
            <div className="absolute left-[72px] right-[52px] top-[185px] border-t-[3px] border-dashed border-[#b9a88d]" />

            {/* info */}
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

            {/* buy tickets */}
            <div className="absolute left-[510px] top-[215px] h-[36px] w-[240px]">
              <a
                href={buyUrl || "#"}
                target="_blank"
                rel="noreferrer"
                aria-disabled={!buyUrl}
                onClick={(e) => {
                  if (!buyUrl) e.preventDefault();
                }}
                className={`relative block w-full ${
                  !buyUrl ? "cursor-not-allowed opacity-50" : "cursor-pointer"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 358.62 137.01"
                  preserveAspectRatio="none"
                  className="h-full w-full"
                  style={{ pointerEvents: "none" }}
                >
                  <path
                    fill="#db3a57"
                    d="M25.61,0H333.01c0,14.15,11.47,25.61,25.61,25.61V111.4c-14.15,0-25.61,11.47-25.61,25.61H25.61c0-14.15-11.47-25.61-25.61-25.61V25.61C14.15,25.61,25.61,14.15,25.61,0Z"
                  />
                </svg>

                <span className="pointer-events-none absolute inset-0 flex items-center justify-center font-txt uppercase text-[24px] text-white tracking-wide">
                  buy tickets
                </span>
              </a>
            </div>

            {/* descripcion */}
            <div className="absolute left-[92px] top-[330px] max-w-[690px]">
              <p className="font-txt text-darkBlue text-[18px] leading-[1.48]">
                {description}
              </p>
            </div>
          </div>

          {/* tarjeta azul */}
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

        

          {/* foto superior derecha */}
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

          {/* ancla */}
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

          {/* foto grande derecha */}
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

          {/* video abajo izquierda */}
          <div className="absolute left-[18px] top-[580px] z-30">
            <div className="relative w-[520px]">
              <Image
                src="/assets/videoBox.webp"
                alt="Video frame"
                width={650}
                height={550}
                className="h-[330px] w-[520px]"
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

          {/* foto inferior central */}
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

          {/* dibujo abajo derecha */}
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

          {/* more gigs */}
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

          {/* family show */}
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
              <div className="font-txt font-bold uppercase tracking-[0.08em] leading-[1.08] text-lightRed text-[24px]">
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