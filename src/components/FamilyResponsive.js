"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaCalendar, FaClock } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { formatDate } from "@/utils/formatDate";
import logo from "../../public/assets/logo.svg";
import { col } from "framer-motion/client";

const BORDER_BROWN = "#8e7b5c";
const DIVIDER_BROWN = "#9a8c72";
const FRAME_PINK = "#ef637b";
const SOCIAL_RED = "#db3a57";
const VIDEO_BG = "#d8d4ca";

const SOCIAL_LINKS = [
  {
    label: "Email",
    href: "mailto:captainnicholasmoffat@oldtimesailors.com",
    src: "/assets/social-media-icons-light/mail-light.svg",
    bg: SOCIAL_RED,
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/447539045312",
    src: "/assets/social-media-icons-light/whats-light.svg",
    bg: "#1f344a",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/oldtimesailors",
    src: "/assets/social-media-icons-light/insta-light.svg",
    bg: SOCIAL_RED,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/oldtimesailors",
    src: "/assets/social-media-icons-light/facebook-light.svg",
    bg: "#1f344a",
    nativeAspect: true,
  },
];

function PosterHeader() {
  // Logo lives inside <TitleSection /> so it can overlap the border; only the
  // social-icon row sits in the header row above.
  return (
    <header
      className="flex items-center justify-end"
      style={{ marginRight: "-13px" }}
    >
      <SocialIconRow />
    </header>
  );
}

function SocialIconRow() {
  return (
    <ul className="flex items-center gap-1.5">
      {SOCIAL_LINKS.map((link) => (
        <li key={link.label}>
          <SocialCircle {...link} />
        </li>
      ))}
    </ul>
  );
}

function SocialCircle({ label, href, src, bg, nativeAspect }) {
  const isExternal = href.startsWith("http");
  return (
    <a
      href={href}
      aria-label={label}
      style={{ backgroundColor: bg }}
      className="flex h-8 w-8 items-center justify-center rounded-full"
      {...(isExternal ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      <Image
        src={src}
        alt=""
        width={nativeAspect ? 9 : 18}
        height={18}
        className={
          nativeAspect
            ? "h-[18px] w-auto object-contain"
            : "h-[18px] w-[18px] object-contain"
        }
      />
    </a>
  );
}

function VenueCard({ venueInfo, buyUrl }) {
  return (
    <aside
      style={{
        padding: "0.73875rem",
        width: "clamp(8.28rem, 41.402vw, 11.12688rem)",
        height: "clamp(6.475rem, 32.372vw, 8.7rem)",
      }}
      className="rounded-2xl bg-darkBlue shadow-[0_12px_28px_rgba(0,0,0,0.16)]"
    >
      <h3 className="font-titles text-lightRed text-[clamp(0.75rem,4.186vw,1.125rem)] leading-[0.86] lowercase">
        MORE ABOUT
        <br />
        THE VENUE
      </h3>
      <p
        style={{ marginTop: "0.41875rem" }}
        className="font-txt text-[clamp(0.4rem,2.072vw,0.556875rem)] leading-snug text-white"
      >
        {venueInfo}
      </p>
      <a
        href={buyUrl || "#"}
        target="_blank"
        rel="noreferrer"
        style={{ marginTop: "0.41875rem" }}
        className={`inline-block font-txt text-[clamp(0.4rem,2.072vw,0.556875rem)] uppercase tracking-wide text-white underline ${
          !buyUrl ? "pointer-events-none opacity-50" : ""
        }`}
      >
        CONTACT THE VENUE FOR + INFO
      </a>
    </aside>
  );
}

function EventInfoList({ items }) {
  return (
    <ul className="space-y-1.5 w-full max-w-[clamp(8.7rem,43.498vw,11.69rem)] sm:max-w-none">
      {items.map(({ icon: Icon, text }, i) => (
        <li
          key={`${i}-${text}`}
          className="flex items-center gap-2 font-txt text-darkBlue"
        >
          <Icon className="shrink-0 text-xs" />
          <span
            className={`text-[10.02px] leading-tight ${
              i === 0 ? "min-[391px]:max-[405px]:max-w-[150px]" : ""
            }`}
          >
            {text}
          </span>
        </li>
      ))}
    </ul>
  );
}

function BuyTicketsButton({ buyUrl }) {
  return (
    <a
      href={buyUrl || "#"}
      target="_blank"
      rel="noreferrer"
      aria-disabled={!buyUrl}
      onClick={(e) => {
        if (!buyUrl) e.preventDefault();
      }}
      className={`block w-[78%] max-w-[169px]  ${!buyUrl ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
    >
      <Image
        src="/assets/buyTickets.png"
        alt="Buy tickets"
        width={420}
        height={120}
        className="h-auto w-full object-contain"
      />
    </a>
  );
}

function TitleSection({ title, infoItems, buyUrl, description, venueInfo }) {
  return (
    <div className="relative">
      {/* Logo — overlaps the top-left of the bordered region per design (X:-34.45, Y:-5.953) */}
      <Image
        src={logo}
        alt="Old Time Sailors"
        width={80}
        height={80}
        priority
        className="absolute z-10 h-20 w-20 object-contain"
        style={{ left: "-34.45px", top: "-66.953px" }}
      />

      {/* Bordered title card — contains everything in the top "info" region.
          `relative` anchors the VenueCard so it can overlap the right border by -10px. */}
      <section
        style={{ borderColor: BORDER_BROWN }}
        className="relative border-[1.3px] px-3 pt-3 pb-8"
      >
        {/* Title — capped to max-width 187.04px on the left of the section */}
        <div style={{ maxWidth: "187.04px" }}>
          <h1 className="font-titles leading-[0.95] tracking-tight lowercase">
            <span className="block text-darkBlue text-[clamp(1rem,5.153vw,1.385rem)]">
              old time sailors <span className="text-lightRed">at</span>
            </span>
            <span className="block break-words text-lightRed text-[clamp(1rem,5.153vw,1.385rem)]">
              {title}
            </span>
          </h1>
        </div>

        <hr
          style={{ borderColor: DIVIDER_BROWN }}
          className="my-3 border-0 border-t-2 border-dashed"
        />

        {/* Info list + BUY TICKETS */}
        <div className="flex flex-col gap-2.5">
          <EventInfoList items={infoItems} />
          <BuyTicketsButton buyUrl={buyUrl} />
          <p className="font-txt text-[10.02px] leading-[1.5] text-darkBlue">
            {description}
          </p>
        </div>

        {/* Venue card overlaps the right border by -10px per design spec */}
        <div
          className="absolute top-3"
          style={{
            width: "clamp(8.28rem, 41.402vw, 11.12688rem)",
            right: "-18px",
          }}
        >
          <VenueCard venueInfo={venueInfo} buyUrl={buyUrl} />
        </div>
      </section>
    </div>
  );
}

function PhotoCollage({ onBack }) {
  return (
    <div className="relative flex flex-col gap-3 top-[clamp(-2.875rem,-10.698vw,-1.9375rem)] items-center">
      {/* Row 1: video (204.2548 × 128) overflows wrapper -10px left AND overlaps musicians (148.5492 sq) by -10px on the right */}
      <div className="flex items-start">
        <div
          className="relative z-10 shrink-0 border-[6px] border-darkBlue shadow-[0_16px_30px_rgba(0,0,0,0.18)]"
          style={{
            width: "clamp(12.75rem, 51.687vw, 13.891rem)",
            height: "clamp(8rem, 30.93vw, 8.3125rem)",
            marginLeft: "-10px",
            marginRight: "-10px",
            top: "clamp(0.6rem, 5.581vw, 1.5rem)",
          }}
        >
          <video
            controls
            preload="none"
            poster="/assets/thumbnailvideo.webp"
            className="block h-full w-full object-cover"
          >
            <source src="/assets/familyVideo.mp4" type="video/mp4" />
          </video>
        </div>
        <div
          className="relative shrink-0 shadow-[0_16px_28px_rgba(0,0,0,0.16)]"
          style={{ width: "clamp(9.2843rem, 39.535vw, 10.625rem)" }}
        >
          <Image
            src="/assets/familyPhoto2.webp"
            alt="Musicians"
            width={470}
            height={420}
            sizes="149px"
            className="block h-auto w-full"
            loading="lazy"
          />
        </div>
      </div>

      {/* Row 2: performance square (154.3307) + crowd with pink frame (334.9775 × 211.7288, landscape).
          Combined ≈489px > ~432 available, so we scale both down proportionally (~0.86) to fit
          while keeping the design's aspect ratios and overlap behavior. The square overlaps the
          pink frame's left edge for the layered look in the design ref. */}
      <div className="flex items-start" style={{ marginLeft: "-10px" }}>
        <div
          className="relative z-10 shrink-0 shadow-[0_16px_28px_rgba(0,0,0,0.16)]"
          style={{
            width: "clamp(10.625rem, 43.023vw, 11.5625rem)",
            // marginRight: "-18px",
            top: "clamp(-1.5rem, -3.581vw, -0.6875rem)",
            right: "-7px",
          }}
        >
          <Image
            src="/assets/familyPhoto1.webp"
            alt="Performance"
            width={300}
            height={300}
            sizes="154px"
            className="block h-auto w-full"
            loading="lazy"
          />
        </div>
        <div className="relative shrink-0">
          <Image
            src="/assets/familyPhoto3.webp"
            alt="Crowd"
            width={184}
            height={183}
            sizes="184px"
            style={{ width: "183.9527px", height: "183.3775px" }}
            className="block shadow-[0_16px_28px_rgba(0,0,0,0.14)]"
            loading="lazy"
          />
        </div>
      </div>

      <div
        className="relative w-full max-w-[161px]"
        style={{
          left: "clamp(-6.5rem, calc(-1.75rem - 16vw), -5.5rem)",
          top: "clamp(-2rem, calc(8vw - 3.875rem), -1.5rem)",
        }}
      >
        <MoreGigsButton onBack={onBack} />
      </div>
      <FamilyShowFooter />
    </div>
  );
}

function MoreGigsButton({ onBack }) {
  return (
    <button
      type="button"
      onClick={onBack}
      className="group block w-[100%]"
      aria-label="More gigs"
    >
      <Image
        src="/assets/moreGigs.png"
        alt="More gigs"
        width={370}
        height={95}
        className="h-auto w-full transition-transform duration-200 group-hover:scale-[1.02]"
        loading="lazy"
      />
    </button>
  );
}

function FamilyShowFooter() {
  return (
    <div className="relative pb-6 w-full top-[-2rem]">
      {/* Faded background sketch, bottom-right */}
      <Image
        src="/assets/drawing2.webp"
        alt=""
        width={230}
        height={180}
        className="pointer-events-none absolute bottom-0 right-[-2rem] top-[-3rem] h-auto w-[62%] object-contain opacity-85 mix-blend-multiply brightness-[72%] contrast-[128%]"
        loading="lazy"
      />

      {/* "family / show" with anchor sitting between the two lines */}
      <div className="flex">
        <div className="relative font-titles text-[clamp(2rem,calc(29.09vw-4.818rem),2.5rem)] leading-[0.82] lowercase text-darkBlue">
          <p>family</p>
          <p>show</p>
          <Image
            src="/assets/anchor.webp"
            alt=""
            width={56}
            height={76}
            className="pointer-events-none absolute left-[100%] top-[20%] h-auto w-[clamp(25px,calc(14vw-27.5px),32px)] -translate-y-1/2 object-contain"
            loading="lazy"
          />
        </div>

        {/* Subtitle on the right, aligned with the second ("show") line baseline */}
        <div className="relative top-[clamp(1.8rem,calc(54.4vw-10.95rem),2.5rem)] left-[-0.5rem] width-full">
          <p className="font-serif text-[11px] font-extrabold uppercase leading-tight tracking-[0.16em] text-lightRed whitespace-nowrap">
            A traditional sailor show,
          </p>
          <p className="font-serif text-[11px] font-extrabold uppercase leading-tight tracking-[0.16em] text-lightRed">
            sing along and dance with us!
          </p>
        </div>
      </div>
    </div>
  );
}

function MobilePoster({
  data,
  infoItems,
  buyUrl,
  title,
  venueInfo,
  description,
  onBack,
}) {
  return (
    <div className="block pt-[74px] lg:hidden">
      <div className="flex w-full max-w-[500x] flex-col gap-3 px-[34px] pb-[34px]">
        <PosterHeader />
        <TitleSection
          title={title}
          infoItems={infoItems}
          buyUrl={buyUrl}
          description={description}
          venueInfo={venueInfo}
        />
        <PhotoCollage onBack={onBack} />
      </div>
    </div>
  );
}

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
      <section className="relative mx-auto w-full max-w-[1600px] px-0 lg:px-10 py-0 lg:py-10">
        <MobilePoster
          data={data}
          infoItems={infoItems}
          buyUrl={buyUrl}
          title={title}
          venueInfo={venueInfo}
          description={description}
          onBack={() => router.back()}
        />

        {/* DESKTOP POSTER — the social icon row lives in the Navbar sub bar
            (see Navbar.js, light variant on dynamic /tickets/ routes) */}
        <div className="relative hidden lg:block h-[1480px]">
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
                <span className="text-darkBlue text-[38px]">
                  old time sailors{" "}
                </span>
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

          <div className="absolute left-[790px] top-[30px] z-30 w-[300px]">
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

          <div className="absolute left-[1000px] top-[295px] z-20">
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
              <div
                className="font-txt font-bold tracking-[0.08em] leading-[1.08] text-lightRed text-[24px]"
                style={{ textTransform: "uppercase" }}
              >
                <p>A TRADITIONAL SAILOR SHOW,</p>
                <p>SING ALONG AND DANCE WITH US!</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
