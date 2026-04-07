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
        findByAnyName(desktopResources, ASSET_KEYS.spotify)?.secure_url ?? null,
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
      className="landing-social-pill"
      aria-label={alt}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 27px, (max-width: 1200px) 48px, 64px"
        className="object-contain"
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
      className="
        landing-menu-image-item-v2
        relative block
        w-[5rem] h-[1.45rem]
        sm:w-[5.8rem] sm:h-[1.65rem]
        md:w-[6.6rem] md:h-[1.85rem]
        lg:w-[7.2rem] lg:h-[2rem]
        xl:w-[7.8rem] xl:h-[2.15rem]
        transition-transform duration-150
        hover:scale-[1.01]
      "
      aria-label={alt}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="(max-width: 640px) 80px, (max-width: 768px) 93px, (max-width: 1024px) 106px, 125px"
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
    <main className="landing-page-v2">
      <div className="landing-stage-v2">
        <section className="landing-artboard-v2">
          <div className="landing-bg-v2 landing-bg-desktop-v2">
            {assets.landingDesktop ? (
              <Image
                src={assets.landingDesktop}
                alt="Old Time Sailors Landing Desktop"
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
            ) : null}
          </div>

          <div className="landing-bg-v2 landing-bg-mobile-v2">
            {assets.landingMobile ? (
              <Image
                src={assets.landingMobile}
                alt="Old Time Sailors Landing Mobile"
                fill={false}
                priority
                width={430}
                height={932}
                sizes="100vw"
                className="landing-mobile-image-tag"
              />
            ) : null}
          </div>

          <div className="landing-overlay-v2" />
          <div className="landing-white-frame-v2" />

          {assets.description ? (
            <div className="landing-description-wrap-v2">
              <Image
                src={assets.description}
                alt="Description"
                fill
                priority
                sizes="(max-width: 768px) 120px, (max-width: 1200px) 180px, 260px"
                className="object-contain"
              />
            </div>
          ) : null}

          {assets.memberships ? (
            <Link
              href="/memberships"
              aria-label="Memberships"
              className="
                landing-membership-wrap-v2
                max-md:!left-[1.2rem]
                max-md:!top-[10.5rem]
                max-md:!w-[6.2rem]
                max-md:!h-[6.2rem]
                max-md:z-20
              "
            >
              <Image
                src={assets.memberships}
                alt="btnMemberships"
                fill
                priority
                sizes="(max-width: 768px) 90px, (max-width: 1200px) 130px, 180px"
                className="object-contain"
              />
            </Link>
          ) : null}

          {assets.logo ? (
            <div className="landing-logo-wrap-v2">
              <Image
                src={assets.logo}
                alt="Old Time Sailors"
                fill
                priority
                sizes="(max-width: 768px) 180px, (max-width: 1200px) 260px, 420px"
                className="object-contain"
              />
            </div>
          ) : null}

          <nav
            className="
              landing-menu-wrap-v2
              flex flex-wrap items-center justify-center
              gap-x-[0.2rem] gap-y-[0.12rem]
              max-md:gap-x-[0.1rem] max-md:gap-y-[0.05rem]
            "
            aria-label="Main navigation"
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

          <div
            className="
              landing-social-wrap-v2
              max-md:!left-1/2
              max-md:!-translate-x-1/2
              max-md:!top-[24.2rem]
              max-md:!bottom-auto
              max-md:z-20
            "
          >
            {socialItems.map((item) => (
              <SocialIcon
                key={item.alt}
                href={item.href}
                src={item.src}
                alt={item.alt}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}