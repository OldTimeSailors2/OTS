import Image from "next/image";
import Link from "next/link";
import Social from "@/components/Social";




const FOLDER = "Images/ImageLandingDesktop";

const ASSET_KEYS = {
  landingDesktop: ["landingdesktop", "landing_desktop", "landing-desktop", "desktop", "landing"],
  border: ["border", "frame", "marco"],
  logo: ["logo"],
  memberships: ["memberships", "membership"],
  description: ["description", "descripcion", "descripción"],
  corner: ["corner", "corners", "corner-detail", "corner_detail", "esquina", "esquinas"],

  //  Social icons (Cloudinary)
  instagram: ["instagram", "ig", "insta", "instagram-icon", "instagram_icon"],
  facebook: ["facebook", "fb", "facebook-icon", "facebook_icon"],
  youtube: ["youtube", "yt", "youtube-icon", "youtube_icon"],
  whatsapp: ["whatsapp", "wa", "wsp", "whatsapp-icon", "whatsapp_icon"],
  mail: ["mail", "email", "correo", "envelope", "mail-icon", "email-icon"],
  spotify: ["spotify", "sp", "spotify-icon", "spotify_icon"],
};

const fetchLandingAssets = async () => {
  try {
    const cloudinary = require("cloudinary").v2;

  cloudinary.config(process.env.CLOUDINARY_URL);

    const res = await cloudinary.api.resources_by_asset_folder(FOLDER, {
      resource_type: "image",
      max_results: 200,
    });

    const resources = res?.resources ?? [];

    const findByAnyName = (nameList) => {
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
    };

    return {
      landingDesktop: findByAnyName(ASSET_KEYS.landingDesktop)?.secure_url ?? null,
      border: findByAnyName(ASSET_KEYS.border)?.secure_url ?? null,
      logo: findByAnyName(ASSET_KEYS.logo)?.secure_url ?? null,
      memberships: findByAnyName(ASSET_KEYS.memberships)?.secure_url ?? null,
      description: findByAnyName(ASSET_KEYS.description)?.secure_url ?? null,
      corner: findByAnyName(ASSET_KEYS.corner)?.secure_url ?? null,

      //  social icons
      instagram: findByAnyName(ASSET_KEYS.instagram)?.secure_url ?? null,
      facebook: findByAnyName(ASSET_KEYS.facebook)?.secure_url ?? null,
      youtube: findByAnyName(ASSET_KEYS.youtube)?.secure_url ?? null,
      whatsapp: findByAnyName(ASSET_KEYS.whatsapp)?.secure_url ?? null,
      mail: findByAnyName(ASSET_KEYS.mail)?.secure_url ?? null,
      spotify: findByAnyName(ASSET_KEYS.spotify)?.secure_url ?? null,
    };
  } catch (error) {
    console.error("Error fetching landing assets (Cloudinary):", error);
    return {
      landingDesktop: null,
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
};

export default async function Home() {
  const assets = await fetchLandingAssets();

  const FRAME_PAD = "56px";
  const LOGO_TOP = "14px";

  const LOGO_SIZE = 520;
  const MEMBERSHIPS_SIZE = 170;

  const cornerStyle = assets.corner ? { "--corner-url": `url('${assets.corner}')` } : undefined;

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#1d344a]">
      {/* ÁREA INTERNA */}
      <div className="absolute inset-0" style={{ padding: FRAME_PAD }}>
        <div className="relative w-full h-full overflow-hidden">
          {assets.landingDesktop ? (
            <Image
              src={assets.landingDesktop}
              alt="Landing Desktop"
              fill
              priority
              className="object-cover"
              style={{ objectPosition: "center 55%" }}
              sizes="100vw"
            />
          ) : null}
        </div>
      </div>

      {/* MARCO BLANCO + ESQUINAS */}
      <div className="white-frame pointer-events-none z-20" style={cornerStyle}>
        <span className="white-corner tl" />
        <span className="white-corner tr" />
        <span className="white-corner br" />
        <span className="white-corner bl" />
      </div>

      {/* LOGO */}
      {assets.logo ? (
        <div className="absolute left-1/2 -translate-x-1/2 z-30" style={{ top: LOGO_TOP }}>
          <Image src={assets.logo} alt="Logo" width={LOGO_SIZE} height={LOGO_SIZE} priority />
        </div>
      ) : null}

      {/* DESCRIPTION */}
      {assets.description ? (
        <div
          className="absolute z-30"
          style={{ top: `calc(${FRAME_PAD} + 8%)`, left: `calc(${FRAME_PAD} + 2%)` }}
        >
          <Image src={assets.description} alt="Description" width={180} height={180} priority />
        </div>
      ) : null}

      {/* MEMBERSHIPS */}
      {assets.memberships ? (
        <div
          className="absolute z-30"
          style={{ top: `calc(${FRAME_PAD} + 22%)`, left: `calc(${FRAME_PAD} + 2%)` }}
        >
          <Link href="/memberships" className="inline-block">
            <Image
              src={assets.memberships}
              alt="Memberships"
              width={MEMBERSHIPS_SIZE}
              height={MEMBERSHIPS_SIZE}
              priority
            />
          </Link>
        </div>
      ) : null}

      {/* MENÚ */}
      <div
        className="absolute z-30 flex flex-col items-end"
        style={{ top: `calc(${FRAME_PAD} + 6%)`, right: `calc(${FRAME_PAD} + 2%)` }}
      >
        {[
          { href: "/media", label: "media", bg: "bg-cream", text: "txt-darkBlue" },
          { href: "/tickets", label: "tickets", bg: "bg-darkBlue", text: "txt-red" },
          { href: "https://oldtimesailors.co.uk", label: "merch", bg: "bg-red", text: "txt-cream" },
          { href: "/reviews", label: "reviews", bg: "bg-darkBlue", text: "txt-cream" },
          { href: "/our-clients", label: "our clients", bg: "bg-cream", text: "txt-red" },
          { href: "/services", label: "services", bg: "bg-red", text: "txt-cream" },
        ].map(({ href, label, bg, text }) => (
          <Link
            key={href}
            href={href}
            className={`octagon my-1 font-titles md:text-2xl flex items-center justify-center ${bg} ${text} w-44 md:w-36 h-10`}
          >
            {label}
          </Link>
        ))}
      </div>

      <div
        className="absolute left-1/2 -translate-x-1/2 z-30"
        style={{ bottom: `calc(${FRAME_PAD} - 6px)` }}
      >
        <div style={{ transform: "translateY(10px)" }}>
          <Social
            className="landing-social"
            icons={{
              instagram: assets.instagram,
              facebook: assets.facebook,
              youtube: assets.youtube,
              whatsapp: assets.whatsapp,
              mail: assets.mail,
              spotify: assets.spotify,
            }}
            iconSize={{ w: 53, h: 12 }}
          />
        </div>
      </div>

    </div>
  );
}
