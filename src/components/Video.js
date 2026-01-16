import Image from "next/image";
import { FaPlay } from "react-icons/fa6";

const toAbsoluteUrl = (url) => {
  if (!url || typeof url !== "string") return null;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;

  const base = process.env.NEXT_PUBLIC_API_URL;
  if (!base) return url;

  return `${base.replace(/\/$/, "")}${url.startsWith("/") ? "" : "/"}${url}`;
};

const getRawThumbnail = (video) => {
  return (
    video?.thumbnail ??
    video?.attributes?.thumbnail ??
    video?.attributes?.formats?.thumbnail?.url ??
    video?.attributes?.formats?.small?.url ??
    video?.attributes?.thumbnail?.url ??
    null
  );
};

const Video = ({ video }) => {
  const rawThumb = getRawThumbnail(video);
  const thumbSrc = toAbsoluteUrl(rawThumb);

  const blur = video?.blurDataURL ?? video?.attributes?.blurDataURL ?? null;
  const videoUrl = video?.url ?? video?.attributes?.url ?? "";

  // Si no hay thumbnail, renderizamos un placeholder (evita “broken / blur raro”)
  if (!thumbSrc) {
    return (
      <div
        className="w-[72px] h-32 iphone-3:w-20 iphone-3:h-36 md:w-24 md:h-44 min-[900px]:w-32 min-[900px]:h-72 xl:w-[72px] xl:h-32 1xxl:w-[82px] 1xxl:h-36 4xl:w-[103px] 4xl:h-44 fullHD:w-28 fullHD:h-52 2k:w-36 2k:h-60 4k:w-52 4k:h-96 cursor-pointer relative rounded-sm bg-white/10"
        data-video-url={videoUrl}
        aria-label="video placeholder"
        title="Missing video thumbnail"
      >
        <div className="items-overlay-video" />
        <div className="absolute inset-0 bg-black/40 flex justify-center items-center">
          <FaPlay className="text-white opacity-80 text-[26px] sm:text-[32px] min-[900px]:text-[40px] xl:text-[28px] 2xl:text-[36px] 2k:text-[44px] 4k:text-[56px]" />
        </div>
      </div>
    );
  }

  return (
    <div
      className="w-[72px] h-32 iphone-3:w-20 iphone-3:h-36 md:w-24 md:h-44 min-[900px]:w-32 min-[900px]:h-72 xl:w-[72px] xl:h-32 1xxl:w-[82px] 1xxl:h-36 4xl:w-[103px] 4xl:h-44 fullHD:w-28 fullHD:h-52 2k:w-36 2k:h-60 4k:w-52 4k:h-96 cursor-pointer relative"
      data-video-url={videoUrl}
    >
      <div className="items-overlay-video" />

      <Image
        src={thumbSrc}
        alt="video thumbnail"
        fill
        // sizes basado en TUS widths reales (máximo 208px en 4k)
        sizes="(max-width: 640px) 72px, (max-width: 768px) 80px, (max-width: 900px) 96px, (max-width: 1280px) 72px, (max-width: 1536px) 82px, (max-width: 1920px) 112px, (max-width: 2560px) 144px, 208px"
        style={{ objectFit: "cover", objectPosition: "center" }}
        className="rounded-sm"
        placeholder={blur ? "blur" : "empty"}
        blurDataURL={blur || undefined}
        quality={85}
      />

      <div className="absolute inset-0 bg-black/40 flex justify-center items-center z-10">
        <FaPlay className="text-white opacity-80 text-[26px] sm:text-[32px] min-[900px]:text-[40px] xl:text-[28px] 2xl:text-[36px] 2k:text-[44px] 4k:text-[56px]" />
      </div>
    </div>
  );
};

export default Video;
