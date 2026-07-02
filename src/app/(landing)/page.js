import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-dynamic";

const DESKTOP_FOLDER = "Images/ImageLandingDesktop";

const POSTER_IMAGE = "/assets/posterOts%20(3104%20x%201800%20px).avif";

const ASSET_KEYS = {
  logo: ["logo"],
  memberships: ["memberships", "membership"],
  description: ["description", "descripcion", "descripción"],
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
    };
  } catch (error) {
    console.error("Error fetching landing assets (Cloudinary):", error);

    return {
      logo: null,
      memberships: null,
      description: null,
    };
  }
}

function ResponsivePosterImage() {
  return (
    <img
      src={POSTER_IMAGE}
      alt="Old Time Sailors Home"
      className="absolute inset-0 h-full w-full  object-center"
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
        w-[1.65rem] h-[1.65rem]
        sm:w-[1.75rem] sm:h-[1.75rem]
        lg:w-[2.8rem] lg:h-[2.8rem]
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
        sizes="(max-width: 639px) 30px, (max-width: 1023px) 33px, 43px"
        className="object-contain p-0 sm:p-[0.1rem] lg:p-[0.12rem]"
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
      src: "/assets/instagram.png",
      alt: "Instagram",
    },
    {
      href: "https://www.facebook.com/oldtimesailors",
      src: "/assets/facebook.png",
      alt: "Facebook",
    },
     {
      href: "mailto:info@oldtimesailors.com",
      src: "/assets/email.png",
      alt: "Email",
    },
    {
      href: "https://api.whatsapp.com/send/?phone=447539045312&text&type=phone_number&app_absent=0",
      src: "/assets/whatssap.png",
      alt: "WhatsApp",
    },
    {
      href: "https://www.youtube.com/@oldtimesailors",
      src: "/assets/youtube.png",
      alt: "YouTube",
    },
    {
      href: "https://open.spotify.com/intl-es/artist/4w3YE6tXZDz1qnAzIVND4o?si=qqSIZ4BLSjWjr-WDIUr0wg&nd=1&dlsi=aab0a0bac71647c6",
      src: "/assets/spotify.png",
      alt: "Spotify",
    },
  ];

  return (
    <main className="w-full overflow-x-hidden bg-[#18324a]">
      <section className="relative hidden min-h-screen w-full items-center justify-center bg-[#18324a] py-4 md:flex lg:py-5">
        <div
          className="landing-desktop-artboard relative w-full max-w-[1350px] border-[2px] border-black overflow-hidden"
        >
          <div className="absolute inset-[26px]">
            <ResponsivePosterImage />

            <div
              aria-hidden="true"
              className="landing-desktop-border-overlay pointer-events-none absolute z-[5]"
            />
          </div>

          <div className="absolute inset-0 bg-[rgba(8,19,31,0.02)]" />

          <div className="absolute inset-0 z-10">
            <div
              className="landing-description-pos absolute z-30 w-[12vw] max-w-[185px] min-w-[115px]"
            >
              <img
                src="/assets/description.svg"
                alt="Description"
                className="block h-auto w-full object-contain"
              />
            </div>

            <div
              className="
    absolute
    left-1/2
    top-[-161px]
    z-30
    -translate-x-1/2
    w-[540px]
    h-[540px]
    pointer-events-none
  "
            >
              <Image
                src="/assets/logoHomepage.png"
                alt="Old Time Sailors"
                fill
                priority
                sizes="540px"
                className="object-contain"
              />
            </div>

            {assets.memberships ? (
              <Link
                href="/memberships"
                aria-label="Memberships"
                className="landing-membership-pos absolute z-20 block"
              >
                <div className="relative w-[200px] h-[170px] transition-transform duration-150 hover:scale-[1.02]">
                  <Image
                    src={assets.memberships}
                    alt="Memberships"
                    fill
                    priority
                    sizes="200px"
                    className="object-contain"
                  />
                </div>
              </Link>
            ) : null}


            <div className="absolute right-[60px] top-[55px] z-20">
              <nav aria-label="Main navigation" className="flex flex-col items-end]">
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

            <div className="absolute left-1/2 z-20 bottom-[8px] -translate-x-1/2">
              <div className="flex w-fit items-center justify-center gap-[28px]">
                {socialItems.map((item) => (
                  <SocialIcon key={item.alt} href={item.href} src={item.src} alt={item.alt} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>


      <section className="relative md:hidden w-full h-[100dvh] bg-[#1B3046] overflow-hidden flex items-center justify-center p-5">
        <div
          className="landing-mobile-frame relative"
        >
          <img
            src="/assets/Recurso2x.avif"
            alt="Old Time Sailors Home"
            className="block h-full w-full object-contain"
          />

          <div
            aria-hidden="true"
            className="landing-mobile-border-overlay pointer-events-none absolute border-[2px] border-black"
          />

          <Link
            href="/memberships"
            aria-label="Memberships"
            className="absolute left-[18%] top-[19%] z-20 block w-[100px] h-[100px] -translate-x-1/2 transition-transform duration-150 hover:scale-[1.02]"
          >
            <Image
              src="/assets/memberjoinus.png"
              alt="Memberships - Join Us"
              fill
              priority
              className="object-contain"
            />
          </Link>

          <div className="absolute right-[7%] top-[10%] z-20">
            <nav aria-label="Main navigation mobile" className="flex flex-col items-end gap-[2px]">
              {menuItems.map((item, index) => (
                <Link
                  key={item.alt}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  aria-label={item.alt}
                  className="relative block w-[82px] h-[18px] transition-transform duration-150 hover:translate-x-[-2px]"
                >
                  <Image
                    src={item.titleImg}
                    alt={item.alt}
                    fill
                    priority={index < 3}
                    sizes="82px"
                    className="object-contain"
                  />
                </Link>
              ))}
            </nav>
          </div>

          <div className="absolute left-1/2 bottom-[45%] z-20 -translate-x-1/2">
            <div className="flex w-fit items-center justify-center gap-[13px]">
              {socialItems.map((item) => (
                <SocialIcon key={item.alt} href={item.href} src={item.src} alt={item.alt} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}