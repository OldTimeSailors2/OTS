import Image from "next/image";

/**
 * Cloudinary-only:
 * - Acepta URLs absolutas (https://...)
 * - Acepta protocol-relative (//res.cloudinary.com/...) y las convierte a https
 * - NO usa Strapi ni NEXT_PUBLIC_API_URL
 */
const toHttpsUrl = (url) => {
  if (!url || typeof url !== "string") return null;

  if (url.startsWith("https://")) return url;
  if (url.startsWith("http://")) return url.replace(/^http:\/\//, "https://");
  if (url.startsWith("//")) return `https:${url}`;

  // Si llega algo relativo, no lo aceptamos (Cloudinary-only)
  return null;
};

/**
 * Cloudinary-only:
 * Prioriza el campo url/secure_url que tú ya estás generando desde Cloudinary.
 * (No attributes, no formats de Strapi)
 */
const getCloudinarySrc = (photo) => {
  return photo?.url ?? photo?.secure_url ?? null;
};

const Photo = ({ photo, index }) => {
  const raw = getCloudinarySrc(photo);
  const src = toHttpsUrl(raw);

  const blur = photo?.blurDataURL ?? null;

  if (!src) {
    return (
      <div
        className="w-[108px] h-[108px] min-[375px]:w-28 min-[375px]:h-28 xs:w-[115px] xs:h-[115px] iphone-1:w-[120px] iphone-1:h-[120px] xs2:w-[127px] xs2:h-[127px] iphone-3:w-[131px] iphone-3:h-[131px] md1:w-[148px] md1:h-[148px] md:w-[186px] md:h-[186px] md2:w-[220px] md2:h-[220px]
          lg:w-[276px] lg:h-[276px] xl:w-[145px] xl:h-[145px]
          1xxl:w-[170px] 1xxl:h-[170px] 2xl:w-[145px] 2xl:h-[145px] 4xl:w-[160px] 4xl:h-[160px] fullHD:w-[225px] fullHD:h-[225px] 2k:w-[308px] 2k:h-[308px]
          4k:w-[464px] 4k:h-[464px] relative cursor-pointer rounded-sm bg-white/10"
        data-photo-index={index}
        aria-label="photo placeholder"
        title="Missing Cloudinary image url"
      >
        <div className="items-overlay" />
      </div>
    );
  }

  return (
    <div
      className="w-[108px] h-[108px] min-[375px]:w-28 min-[375px]:h-28 xs:w-[115px] xs:h-[115px] iphone-1:w-[120px] iphone-1:h-[120px] xs2:w-[127px] xs2:h-[127px] iphone-3:w-[131px] iphone-3:h-[131px] md1:w-[148px] md1:h-[148px] md:w-[186px] md:h-[186px] md2:w-[220px] md2:h-[220px]
        lg:w-[276px] lg:h-[276px] xl:w-[145px] xl:h-[145px]
        1xxl:w-[170px] 1xxl:h-[170px] 2xl:w-[145px] 2xl:h-[145px] 4xl:w-[160px] 4xl:h-[160px] fullHD:w-[225px] fullHD:h-[225px] 2k:w-[308px] 2k:h-[308px]
        4k:w-[464px] 4k:h-[464px] relative cursor-pointer"
      data-photo-index={index}
    >
      <div className="items-overlay" />
      <Image
        src={src}
        alt="photo thumbnail"
        fill
        sizes="(max-width: 640px) 128px, (max-width: 1366px) 176px, (max-width: 2560px) 234px, 464px"
        style={{ objectFit: "cover", objectPosition: "center" }}
        className="rounded-sm"
        placeholder={blur ? "blur" : "empty"}
        blurDataURL={blur || undefined}
      />
    </div>
  );
};

export default Photo;
