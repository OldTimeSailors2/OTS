import Image from "next/image";
import Link from "next/link";

export default function Social({
  className = "",
  icons = {},       
  renderers = {},   
  itemClassName = "", 
}) {
  const W = 60;
  const H = 60;

  const items = [
    { key: "instagram", href: "https://www.instagram.com/oldtimesailors", label: "Instagram" },
    { key: "facebook", href: "https://www.facebook.com/oldtimesailors", label: "Facebook" },
    { key: "youtube", href: "https://youtube.com/@oldtimesailors?si=n5Akshq1tzxvuPxS", label: "YouTube" },
    { key: "whatsapp", href: "https://wa.me/447539045312", label: "WhatsApp" },
    { key: "mail", href: "mailto:captainnicholasmoffat@oldtimesailors.com", label: "Email" },
    { key: "spotify", href: "https://open.spotify.com/artist/4w3YE6tXZDz1qnAzIVND4o?si=qqSIZ4BLSjWjr-WDIUr0wg", label: "Spotify" },
  ];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {items.map((it) => {
        const IconRenderer = renderers?.[it.key];
        const iconUrl = icons?.[it.key];

        if (!IconRenderer && !iconUrl) return null;

        return (
          <Link
            key={it.key}
            href={it.href}
            target={it.key === "mail" ? undefined : "_blank"}
            rel={it.key === "mail" ? undefined : "noopener noreferrer"}
            aria-label={it.label}
            className={itemClassName}
            style={{ display: "inline-flex" }}
          >
            {IconRenderer ? (
              <IconRenderer />
            ) : (
              <Image
                src={iconUrl}
                alt={it.label}
                width={W}
                height={H}
                priority
                style={{ width: "60px", height: "60px" }}
              />
            )}
          </Link>
        );
      })}
    </div>
  );
}