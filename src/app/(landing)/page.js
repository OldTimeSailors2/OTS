import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-dynamic";

const DESKTOP_FOLDER = "Images/ImageLandingDesktop";
const MOBILE_FOLDER = "Images/ImageLandingMovile";

const ASSET_KEYS = {
  landingDesktop: [
    "landingdesktop",
    "landing_desktop",
    "landing-desktop",
    "desktop",
    "landing",
  ],
  landingMobile: [
    "landingmobile",
    "landing_mobile",
    "landing-mobile",
    "mobile",
    "landing",
  ],

  border: ["border", "frame", "marco"],
  logo: ["logo"],
  memberships: ["memberships", "membership"],
  description: ["description", "descripcion", "descripción"],
  corner: [
    "corner",
    "corners",
    "corner-detail",
    "corner_detail",
    "esquina",
    "esquinas",
  ],

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
    const [desktopResources, mobileResources] = await Promise.all([
      getFolderResources(DESKTOP_FOLDER),
      getFolderResources(MOBILE_FOLDER),
    ]);

    const desktopImage =
      findByAnyName(desktopResources, ASSET_KEYS.landingDesktop)?.secure_url ||
      desktopResources[0]?.secure_url ||
      null;

    const mobileImage =
      findByAnyName(mobileResources, ASSET_KEYS.landingMobile)?.secure_url ||
      mobileResources[0]?.secure_url ||
      null;

    return {
      landingDesktop: desktopImage,
      landingMobile: mobileImage,

      border:
        findByAnyName(desktopResources, ASSET_KEYS.border)?.secure_url ?? null,
      logo: findByAnyName(desktopResources, ASSET_KEYS.logo)?.secure_url ?? null,
      memberships:
        findByAnyName(desktopResources, ASSET_KEYS.memberships)?.secure_url ??
        null,
      description:
        findByAnyName(desktopResources, ASSET_KEYS.description)?.secure_url ??
        null,
      corner:
        findByAnyName(desktopResources, ASSET_KEYS.corner)?.secure_url ?? null,

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
      landingDesktop: null,
      landingMobile: null,
      border: null,
      logo: null,
      memberships: null,
      description: null,
      corner: null,
      instagram: null,
      facebook: null,
      youtube: null,
      whatsapp: null,
      mail: null,
      spotify: null,
    };
  }
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
        lg:w-[2.9rem] lg:h-[2.9rem]
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
        sizes="(max-width: 639px) 25px, (max-width: 1023px) 29px, 46px"
        className="object-contain p-[0.26rem] sm:p-[0.3rem] lg:p-[0.25rem]"
      />
    </Link>
  );
}

function MenuImageButton({
  href,
  src,
  alt,
  external = false,
  priority = false,
}) {
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
    {
      href: "/media",
      titleImg: "/assets/media.png",
      alt: "Media",
    },
    {
      href: "/tickets/calendar-view",
      titleImg: "/assets/tickets.png",
      alt: "Tickets",
    },
    {
      href: "https://oldtimesailors.co.uk",
      titleImg: "/assets/merch.png",
      alt: "Merch",
      external: true,
    },
    {
      href: "/reviews",
      titleImg: "/assets/btnReviews.png",
      alt: "Reviews",
    },
    {
      href: "/our-clients",
      titleImg: "/assets/clients.png",
      alt: "Our Clients",
    },
    {
      href: "/services",
      titleImg: "/assets/services.png",
      alt: "Services",
    },
  ];

  const socialItems = [
    { href: "https://instagram.com", src: assets.instagram, alt: "Instagram" },
    { href: "https://facebook.com", src: assets.facebook, alt: "Facebook" },
    { href: "https://youtube.com", src: assets.youtube, alt: "YouTube" },
    { href: "https://wa.me", src: assets.whatsapp, alt: "WhatsApp" },
    { href: "mailto:info@oldtimesailors.com", src: assets.mail, alt: "Email" },
    { href: "https://spotify.com", src: assets.spotify, alt: "Spotify" },
  ].filter((item) => item.src);

  return (
    <main className="w-full overflow-x-hidden bg-[#18324a]">
      {/* DESKTOP / TABLET */}
      <section className="relative hidden md:flex min-h-screen w-full items-center justify-center bg-[#18324a]  py-4 lg: lg:py-5">
        <div
          className="relative w-full max-w-[1350px] border-[2px] border-black "
          style={{
            aspectRatio: "1552 / 900"
          }}
        >
          {/* Fondo real */}
          <div className="absolute inset-x-[0%] top-[0%] bottom-[2%]">
            {assets.landingDesktop ? (
              <Image
                src={assets.landingDesktop}
                alt="Old Time Sailors Landing Desktop"
                fill
                priority
                sizes="100vw"
                className="object-contain"
              />
            ) : null}
          </div>

          <div className="absolute inset-0 bg-[rgba(8,19,31,0.04)]" />

          {/* Layout principal del canvas */}
          <div className="absolute inset-0 z-10 px-[4.5%] pt-[3.2%]">
            {/* Zona superior principal */}
            <div className="grid h-full grid-cols-[1fr_1fr] items-start">
              {/* IZQUIERDA */}
              <div className="flex h-full flex-col items-start justify-start gap-[1.2vw] pt-[0.3vw]">
                {assets.description ? (
                  <div className="relative w-[12vw] max-w-[215px] min-w-[120px] aspect-[1.7/1]">
                    <Image
                      src={assets.description}
                      alt="Description"
                      fill
                      priority
                      sizes="220px"
                      className="object-contain object-left-top"
                    />
                  </div>
                ) : (
                  <div className="h-[6vw]" />
                )}
              </div>

              {/* CENTRO / LOGO */}
              <div className="flex h-full items-start justify-center pt-0">
                {assets.logo ? (
                  <div className="relative w-[18vw] max-w-[310px] min-w-[170px] aspect-square">
                    <Image
                      src={assets.logo}
                      alt="Old Time Sailors"
                      fill
                      priority
                      sizes="320px"
                      className="object-contain"
                    />
                  </div>
                ) : null}
              </div>
            </div>

            {/* MEMBERSHIPS DESKTOP ABSOLUTO */}
            {assets.memberships ? (
              <Link
                href="/memberships"
                aria-label="Memberships"
                className="absolute z-20 block left-[9%] top-[21.5%]"
              ><div className="relative w-[182px] h-[182px] transition-transform duration-150 hover:scale-[1.02]">
                  <Image
                    src={assets.memberships}
                    alt="Memberships"
                    fill
                    priority
                    sizes="500px"
                    className="object-contain"
                  />
                </div>
              </Link>
            ) : null}
            {/* MENÚ DESKTOP ABSOLUTO */}
            <div className="absolute right-[4.2%] top-[3.5%] z-20">
              <nav
                aria-label="Main navigation"
                className="flex flex-col items-end gap-[0.2vw] -translate-x-[5vw]"
              >
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

            {/* REDES DESKTOP ABSOLUTAS */}
            <div className="absolute left-1/2 bottom-[4.2%] z-20 -translate-x-1/2 translate-y-[18%]">
              <div className="mt-[9vw] flex w-fit items-center justify-center gap-[0.9vw]">
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
        </div>
      </section>

      {/* MOBILE */}
      <section className="relative md:hidden w-full min-h-screen bg-[#18324a]">
        {assets.landingMobile ? (
          <div className="absolute inset-0">
            <Image
              src={assets.landingMobile}
              alt="Old Time Sailors Landing Mobile"
              fill
              priority
              sizes="100vw"
              className="object-cover object-top"
            />
          </div>
        ) : null}

        <div className="absolute inset-0 bg-[rgba(8,19,31,0.08)]" />

        <div className="relative z-10 min-h-screen flex flex-col justify-between px-4 pt-4 pb-5">
          <div className="flex flex-col gap-3">
            {assets.description ? (
              <div className="relative w-[7.4rem] h-[4.7rem]">
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

            <div className="flex justify-between items-start gap-2">
              {assets.memberships ? (
                <Link
                  href="/memberships"
                  aria-label="Memberships"
                  className="absolute z-20 block left-[6%] top-[21%]"
                >
                  <div className="relative w-[25vw] h-[25vw] max-w-[500px] max-h-[500px] min-w-[64px] min-h-[64px] transition-transform duration-150 hover:scale-[1.02]">
                    <Image
                      src={assets.memberships}
                      alt="Memberships"
                      fill
                      priority
                      sizes="500px"
                      className="object-contain"
                    />
                  </div>
                </Link>
              ) : null}

              {assets.logo ? (
                <div className="relative w-[9.7rem] h-[9.7rem] shrink-0 -mt-2">
                  <Image
                    src={assets.logo}
                    alt="Old Time Sailors"
                    fill
                    priority
                    sizes="155px"
                    className="object-contain"
                  />
                </div>
              ) : null}

              <div className="w-[6.3rem]" />
            </div>

            <nav
              aria-label="Main navigation mobile"
              className="
                absolute
                right-[0.6rem]
                top-[5.2rem]
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
          </div>

          <div className="absolute left-1/2 -translate-x-1/2 top-[26.5rem] z-20">
            <div className="flex items-center justify-center gap-[0.8rem]">
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