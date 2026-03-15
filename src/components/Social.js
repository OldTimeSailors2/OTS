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
    { key: "mail", href: "https://mail.google.com/mail/?view=cm&fs=1&to=captainnicholasmoffat@oldtimesailors.com", label: "Email" },
    { key: "spotify", href: "https://open.spotify.com/artist/4w3YE6tXZDz1qnAzIVND4o?si=qqSIZ4BLSjWjr-WDIUr0wg", label: "Spotify" },
  ];

  const RenderIcon = ({ it }) => {
    const IconRenderer = renderers?.[it.key];
    const iconUrl = icons?.[it.key];
    if (!IconRenderer && !iconUrl) return null;

    return IconRenderer ? (
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
    );
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {items.map((it) => {
        // ✅ mailto: con <a> normal (más confiable)
        if (it.key === "mail") {
          return (
            <a
              key={it.key}
              href={it.href}
              aria-label={it.label}
              className={itemClassName}
              style={{ display: "inline-flex" }}
            >
              <RenderIcon it={it} />
            </a>
          );
        }

        // ✅ externos con Link + target _blank (o podrías usar <a> también)
        return (
          <Link
            key={it.key}
            href={it.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={it.label}
            className={itemClassName}
            style={{ display: "inline-flex" }}
          >
            <RenderIcon it={it} />
          </Link>
        );
      })}
    </div>
  );
}
