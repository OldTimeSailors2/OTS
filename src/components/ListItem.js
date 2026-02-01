"use client";

import Image from "next/image";
import Link from "next/link";

const normalizeDateString = (value) => {
  if (typeof value !== "string") return "";
  return value.trim();
};

const parseDateFlexible = (dateString) => {
  const s = normalizeDateString(dateString);
  if (!s) return null;

  // dd/mm/yyyy o dd/mm/yy
  const dmY = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{2}|\d{4})$/);
  if (dmY) {
    const day = dmY[1].padStart(2, "0");
    const month = dmY[2].padStart(2, "0");
    const year = dmY[3].length === 2 ? `20${dmY[3]}` : dmY[3];
    const d = new Date(`${year}-${month}-${day}T00:00:00`);
    return isNaN(d.getTime()) ? null : d;
  }

  // yyyy-mm-dd
  const iso = s.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  if (iso) {
    const year = iso[1];
    const month = iso[2].padStart(2, "0");
    const day = iso[3].padStart(2, "0");
    const d = new Date(`${year}-${month}-${day}T00:00:00`);
    return isNaN(d.getTime()) ? null : d;
  }

  // intento general
  const d = new Date(s);
  return isNaN(d.getTime()) ? null : d;
};

const formatOneDate = (dateString) => {
  const d = parseDateFlexible(dateString);
  if (!d) return null;

  const options = { day: "2-digit", month: "long" };
  return new Intl.DateTimeFormat("en-US", options).format(d).replace(",", "");
};

const formatDateOrRange = (dateInput) => {
  const raw = normalizeDateString(dateInput);
  if (!raw) return "TBA";

  const parts = raw.split(/\s*[–—-]\s*/);
  if (parts.length === 2) {
    const [startRaw, endRaw] = parts.map((x) => x.trim());
    const start = formatOneDate(startRaw);
    const end = formatOneDate(endRaw);

    if (start && end) return `${start} - ${end}`;
    if (start) return `${start} -`;
    if (end) return `- ${end}`;
    return raw;
  }

  const single = formatOneDate(raw);
  return single ?? raw;
};

const normalizeTime = (t) => {
  if (typeof t !== "string") return "";
  const s = t.trim();
  if (!s) return "";
  return s;
};

const slugify = (text) => {
  const s = (text ?? "").toString().trim();
  if (!s) return "event";

  return (
    s
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/&/g, " and ")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "") || "event"
  );
};

const ListItem = ({ event }) => {
  const safeEvent = event ?? {};

  const safeTitle =
    (typeof safeEvent.event === "string" && safeEvent.event) ||
    (typeof safeEvent.eventName === "string" && safeEvent.eventName) ||
    (typeof safeEvent.title === "string" && safeEvent.title) ||
    "";

  const safeLocation =
    (typeof safeEvent.location === "string" && safeEvent.location) ||
    (typeof safeEvent.venueName === "string" && safeEvent.venueName) ||
    "";

  const safeDate = typeof safeEvent.date === "string" ? safeEvent.date : "";

  const safeStart =
    (typeof safeEvent.gigStartTime === "string" && safeEvent.gigStartTime) ||
    (typeof safeEvent.from === "string" && safeEvent.from) ||
    "";

  const safeEnd =
    (typeof safeEvent.gigFinishTime === "string" && safeEvent.gigFinishTime) ||
    (typeof safeEvent.to === "string" && safeEvent.to) ||
    "";

  const longDate = formatDateOrRange(safeDate);
  const startTxt = normalizeTime(safeStart);
  const endTxt = normalizeTime(safeEnd);

  const slug = slugify(safeTitle || "event");
  const href = `/tickets/${slug}`;

  const log = (label) => (e) => {
    console.log(`✅ ${label}`, {
      type: e?.type,
      target: e?.target,
      currentTarget: e?.currentTarget,
      href,
      slug,
      title: safeTitle,
    });
  };

  return (
    <div
      className="relative border-b-3 border-lightRed py-3 mr-[29.18px] ml-[32.42px] md:mx-[5%]"
      onPointerDownCapture={log("ListItem onPointerDownCapture")}
      onClickCapture={log("ListItem onClickCapture")}
    >
      <div
        className="flex justify-between items-start gap-4"
        onPointerDownCapture={log("Row onPointerDownCapture")}
        onClickCapture={log("Row onClickCapture")}
      >
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
            <span className="text-[12px] md:text-[18px] text-darkBlue font-txt font-bold">
              {longDate}
            </span>

            {startTxt ? (
              <span className="text-[12px] md:text-[18px] text-darkBlue font-txt">
                - {startTxt}
              </span>
            ) : null}

            {endTxt ? (
              <span className="text-[12px] md:text-[18px] text-darkBlue font-txt">
                - {endTxt}
              </span>
            ) : null}
          </div>

          <h2 className="mt-1 text-[18px] xs:text-[24px] md:text-[40px] font-titles text-lightRed leading-none">
            {safeTitle ? safeTitle.toLowerCase() : "tba"}
          </h2>

          <p className="mt-1 text-[13px] md:text-[22px] text-darkBlue font-txt">
            {safeLocation}
          </p>
        </div>

        <div
          className="shrink-0"
          onPointerDownCapture={log("Right wrapper onPointerDownCapture")}
          onClickCapture={log("Right wrapper onClickCapture")}
        >
          <Link
            href={href}
            aria-label="More info"
            className="relative z-[9999] pointer-events-auto cursor-pointer inline-block"
            onPointerDownCapture={log("Link onPointerDownCapture")}
            onClickCapture={log("Link onClickCapture")}
            onClick={log("Link onClick (bubble)")}
          >
            <Image
              src="/assets/+info.png"
              width={108.12}
              height={31.52}
              alt="More info"
              priority
              className="pointer-events-auto select-none"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ListItem;