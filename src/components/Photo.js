import Image from "next/image";

/**
 * Convierte URLs relativas ("/uploads/x.jpg") en absolutas usando NEXT_PUBLIC_API_URL.
 * Si ya es absoluta (http/https), la deja igual.
 */
const toAbsoluteUrl = (url) => {
  if (!url || typeof url !== "string") return null;

  // ya absoluta
  if (url.startsWith("http://") || url.startsWith("https://")) return url;

  // relativa
  const base = process.env.NEXT_PUBLIC_API_URL;

  // Si no hay base, devolvemos la relativa (puede funcionar si el host es el mismo)
  if (!base) return url;

  // Evita doble slash: base "https://x.com/" + "/uploads/a.jpg"
  return `${base.replace(/\/$/, "")}${url.startsWith("/") ? "" : "/"}${url}`;
};

/**
 * Extrae una URL probable de diferentes estructuras:
 * - Strapi clásico: photo.attributes.url / formats.small.url
 * - Estructuras simples: photo.url / photo.src
 */
const getRawSrc = (photo) => {
  return (
    photo?.attributes?.formats?.small?.url ??
    photo?.attributes?.formats?.thumbnail?.url ??
    photo?.attributes?.url ??
    photo?.formats?.small?.url ??
    photo?.formats?.thumbnail?.url ??
    photo?.url ??
    photo?.src ??
    null
  );
};

const Photo = ({ photo, index }) => {
  const raw = getRawSrc(photo);
  const src = toAbsoluteUrl(raw);

  // Blur opcional si existe
  const blur = photo?.blurDataURL ?? photo?.attributes?.blurDataURL ?? null;

  // Si no hay src, no renderizamos imagen (evita error y “broken images”)
  if (!src) {
    return (
      <div
        className="w-[108px] h-[108px] min-[375px]:w-28 min-[375px]:h-28 xs:w-[115px] xs:h-[115px] iphone-1:w-[120px] iphone-1:h-[120px] xs2:w-[127px] xs2:h-[127px] iphone-3:w-[131px] iphone-3:h-[131px] md1:w-[148px] md1:h-[148px] md:w-[186px] md:h-[186px] md2:w-[220px] md2:h-[220px]
          lg:w-[276px] lg:h-[276px] xl:w-[145px] xl:h-[145px]
          1xxl:w-[170px] 1xxl:h-[170px] 2xl:w-[145px] 2xl:h-[145px] 4xl:w-[160px] 4xl:h-[160px] fullHD:w-[225px] fullHD:h-[225px] 2k:w-[308px] 2k:h-[308px]
          4k:w-[464px] 4k:h-[464px] relative cursor-pointer rounded-sm bg-white/10"
        data-photo-index={index}
        aria-label="photo placeholder"
        title="Missing image source"
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
