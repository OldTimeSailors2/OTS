import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-dynamic";

const DESKTOP_FOLDER = "Images/ImageLandingDesktop";

const POSTER_IMAGE = "/assets/posterOts%20(3104%20x%201800%20px).jpg";

const ASSET_KEYS = {
  logo: ["logo"],
  memberships: ["memberships", "membership"],
  description: ["description", "descripcion", "descripción"],

  instagram: ["instagram", "ig", "insta", "instagram-icon", "instagram_icon"],
  facebook: ["facebook", "fb", "facebook-icon", "facebook_icon"],
  youtube: ["youtube", "yt", "youtube-icon", "youtube_icon"],
  whatsapp: ["whatsapp", "wa", "wsp", "whatsapp-icon", "whatsapp_icon"],
  mail: ["mail", "email", "correo", "envelope", "mail-icon", "email-icon"],
  spotify: ["spotify", "sp", "spotify-icon", "spotify_icon"],
};

async function getFolderResources(folder) {
  try {
    const cloudinary = (await import("cloudinary")).v2;
    cloudinary.config(process.env.CLOUDINARY_URL);

    const res = await cloudinary.api.resources_by_asset_folder(folder, {
      resource_type: "image",
      max_results: 200,
    });

    return res?.resources ?? [];
  } catch (error) {
    console.error(`Error fetching Cloudinary folder "${folder}":`, error);
    return [];
  }
}

function findByAnyName(resources, nameList) {
  const lowerNames = nameList.map((n) => n.toLowerCase());

  return (
    resources.find((r) => {
      const filename = (r.public_id.split("/").pop() || "").toLowerCase();
      return lowerNames.some((n) => filename === n);
    }) ||
    resources.find((r) => {
      const filename = (r.public_id.split("/").pop() || "").toLowerCase();
      return lowerNames.some((n) => filename.includes(n));
    }) ||
    null
  );
}

async function fetchLandingAssets() {
  try {
    const desktopResources = await getFolderResources(DESKTOP_FOLDER);

    return {
      logo: findByAnyName(desktopResources, ASSET_KEYS.logo)?.secure_url ?? null,
      memberships:
        findByAnyName(desktopResources, ASSET_KEYS.memberships)?.secure_url ??
        null,
      description:
        findByAnyName(desktopResources, ASSET_KEYS.description)?.secure_url ??
        null,

      instagram:
        findByAnyName(desktopResources, ASSET_KEYS.instagram)?.secure_url ??
        null,
      facebook:
        findByAnyName(desktopResources, ASSET_KEYS.facebook)?.secure_url ??
        null,
      youtube:
        findByAnyName(desktopResources, ASSET_KEYS.youtube)?.secure_url ?? null,
      whatsapp:
        findByAnyName(desktopResources, ASSET_KEYS.whatsapp)?.secure_url ??
        null,
      mail: findByAnyName(desktopResources, ASSET_KEYS.mail)?.secure_url ?? null,
      spotify:
        findByAnyName(desktopResources, ASSET_KEYS.spotify)?.secure_url ??
        null,
    };
  } catch (error) {
    console.error("Error fetching landing assets (Cloudinary):", error);

    return {
      logo: null,
      memberships: null,
      description: null,
      instagram: null,
      facebook: null,
      youtube: null,
      whatsapp: null,
      mail: null,
      spotify: null,
    };
  }
}

function ResponsivePosterImage() {
  return (
    <img
      src={POSTER_IMAGE}
      alt="Old Time Sailors Home"
      className="absolute inset-0 h-full w-full object-cover object-center"
    />
  );
}

function SocialIcon({ href, src, alt }) {
  if (!src) return null;

  const isExternal = href.startsWith("http") || href.startsWith("mailto:");

  return (
    <Link
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      aria-label={alt}
      className="
        relative flex items-center justify-center
        w-[2rem] h-[2rem]
        sm:w-[1.8rem] sm:h-[1.8rem]
        lg:w-[2.45rem] lg:h-[2.45rem]
        rounded-full
        bg-[#f5f1e8]/95
        shadow-[0_8px_20px_rgba(0,0,0,0.18)]
        transition-transform duration-150
        hover:scale-[1.05]
      "
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 639px) 25px, (max-width: 1023px) 29px, 40px"
        className="object-contain p-[0.26rem] sm:p-[0.3rem] lg:p-[0.25rem]"
      />
    </Link>
  );
}

function MenuImageButton({ href, src, alt, external = false, priority = false }) {
  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      aria-label={alt}
      className="
        relative block
        w-[8rem] h-[2.15rem]
        lg:w-[8.8rem] lg:h-[2.35rem]
        xl:w-[9.4rem] xl:h-[2.5rem]
        transition-transform duration-150
        hover:translate-x-[-2px]
      "
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="160px"
        className="object-contain"
      />
    </Link>
  );
}

export default async function Home() {
  const assets = await fetchLandingAssets();

  const menuItems = [
    { href: "/media", titleImg: "/assets/media.png", alt: "Media" },
    { href: "/tickets/calendar-view", titleImg: "/assets/tickets.png", alt: "Tickets" },
    {
      href: "https://oldtimesailors.co.uk",
      titleImg: "/assets/merch.png",
      alt: "Merch",
      external: true,
    },
    { href: "/reviews", titleImg: "/assets/btnReviews.png", alt: "Reviews" },
    { href: "/our-clients", titleImg: "/assets/clients.png", alt: "Our Clients" },
    { href: "/services", titleImg: "/assets/services.png", alt: "Services" },
  ];

  const socialItems = [
    {
      href: "https://www.instagram.com/oldtimesailors",
      src: assets.instagram,
      alt: "Instagram",
    },
    {
      href: "https://www.facebook.com/oldtimesailors",
      src: assets.facebook,
      alt: "Facebook",
    },
    {
      href: "https://www.youtube.com/@oldtimesailors",
      src: assets.youtube,
      alt: "YouTube",
    },
    {
      href: "https://api.whatsapp.com/send/?phone=447539045312&text&type=phone_number&app_absent=0",
      src: assets.whatsapp,
      alt: "WhatsApp",
    },
    {
      href: "mailto:info@oldtimesailors.com",
      src: assets.mail,
      alt: "Email",
    },
    {
      href: "https://open.spotify.com/intl-es/artist/4w3YE6tXZDz1qnAzIVND4o?si=qqSIZ4BLSjWjr-WDIUr0wg&nd=1&dlsi=aab0a0bac71647c6",
      src: assets.spotify,
      alt: "Spotify",
    },
  ].filter((item) => item.src);

  return (
    <main className="w-full overflow-x-hidden bg-[#18324a]">
      <section className="relative hidden min-h-screen w-full items-center justify-center bg-[#18324a] py-4 md:flex lg:py-5">
        <div
          className="relative w-full max-w-[1350px] border-[2px] border-black overflow-hidden"
          style={{ aspectRatio: "1552 / 900" }}
        >
          <div className="absolute inset-[10px]">
            <ResponsivePosterImage />
          </div>

          <img
            src="/assets/border.png"
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute inset-[0px] z-[5] h-full w-full"
          />

          <div className="absolute inset-0 bg-[rgba(8,19,31,0.02)]" />

          <div className="absolute inset-0 z-10">
            {assets.description ? (
              <div className="absolute left-[3.8%] top-[3.8%] z-20 w-[12vw] max-w-[185px] min-w-[115px] aspect-[1.7/1]">
                <Image
                  src={assets.description}
                  alt="Description"
                  fill
                  priority
                  sizes="190px"
                  className="object-contain object-left-top"
                />
              </div>
            ) : null}

            {assets.logo ? (
              <div className="absolute left-1/2 top-[1.7%] z-20 aspect-square w-[17vw] max-w-[225px] min-w-[150px] -translate-x-1/2">
                <Image
                  src={assets.logo}
                  alt="Old Time Sailors"
                  fill
                  priority
                  sizes="230px"
                  className="object-contain"
                />
              </div>
            ) : null}

            {assets.memberships ? (
              <Link href="/memberships" aria-label="Memberships" className="absolute z-20 block left-[7.1%] top-[20%]">
                <div className="relative w-[9.8vw] h-[9.8vw] max-w-[145px] max-h-[145px] min-w-[105px] min-h-[105px] transition-transform duration-150 hover:scale-[1.02]">
                  <Image src={assets.memberships} alt="Memberships" fill priority sizes="150px" className="object-contain" />
                </div>
              </Link>
            ) : null}

            <div className="absolute right-[7.7%] top-[5.2%] z-20">
              <nav aria-label="Main navigation" className="flex flex-col items-end gap-[0.12vw]">
                {menuItems.map((item, index) => (
                  <MenuImageButton
                    key={item.alt}
                    href={item.href}
                    src={item.titleImg}
                    alt={item.alt}
                    external={item.external}
                    priority={index < 3}
                  />
                ))}
              </nav>
            </div>

            <div className="absolute left-1/2 bottom-[1.7%] z-20 -translate-x-1/2">
              <div className="flex w-fit items-center justify-center gap-[0.75vw]">
                {socialItems.map((item) => (
                  <SocialIcon key={item.alt} href={item.href} src={item.src} alt={item.alt} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="relative md:hidden w-full min-h-screen bg-[#18324a] overflow-hidden">
        <div className="absolute inset-[8px]">
          <ResponsivePosterImage />
        </div>

        <div className="absolute inset-0 bg-[rgba(8,19,31,0.08)]" />

        <div className="relative z-10 min-h-screen">
          {assets.description ? (
            <div className="absolute left-[5%] top-[3.5%] w-[7.4rem] h-[4.7rem]">
              <Image
                src={assets.description}
                alt="Description"
                fill
                priority
                sizes="120px"
                className="object-contain object-left-top"
              />
            </div>
          ) : null}

          {assets.logo ? (
            <div className="absolute left-1/2 top-[2.5%] w-[9.2rem] h-[9.2rem] -translate-x-1/2">
              <Image
                src={assets.logo}
                alt="Old Time Sailors"
                fill
                priority
                sizes="150px"
                className="object-contain"
              />
            </div>
          ) : null}

          {assets.memberships ? (
            <Link
              href="/memberships"
              aria-label="Memberships"
              className="absolute z-20 block left-[6%] top-[22%]"
            >
              <div className="relative w-[25vw] h-[25vw] max-w-[120px] max-h-[120px] min-w-[70px] min-h-[70px] transition-transform duration-150 hover:scale-[1.02]">
                <Image
                  src={assets.memberships}
                  alt="Memberships"
                  fill
                  priority
                  sizes="120px"
                  className="object-contain"
                />
              </div>
            </Link>
          ) : null}

          <nav
            aria-label="Main navigation mobile"
            className="
              absolute
              right-[1.2rem]
              top-[3.4rem]
              flex flex-col items-end
              gap-[0.08rem]
              scale-[0.82]
              z-20
            "
          >
            {menuItems.map((item, index) => (
              <Link
                key={item.alt}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                aria-label={item.alt}
                className="relative block w-[7.1rem] h-[1.95rem]"
              >
                <Image
                  src={item.titleImg}
                  alt={item.alt}
                  fill
                  priority={index < 3}
                  sizes="114px"
                  className="object-contain"
                />
              </Link>
            ))}
          </nav>

          <div className="absolute left-1/2 -translate-x-1/2 bottom-[1.8rem] z-20">
            <div className="flex items-center justify-center gap-[0.65rem]">
              {socialItems.map((item) => (
                <SocialIcon
                  key={item.alt}
                  href={item.href}
                  src={item.src}
                  alt={item.alt}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}