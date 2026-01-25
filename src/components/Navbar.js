"use client";
import { useState, useEffect, useMemo, useRef } from "react";
import { useLoader } from "@/context/LoaderContext";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import logo from "../../public/assets/logo.svg";
import logo2 from "../../public/assets/logo-services.svg";
import { TfiEmail } from "react-icons/tfi";
import { FaWhatsapp, FaInstagram, FaFacebookF } from "react-icons/fa";
import ViewSwitch from "./ViewSelectorSwitch";
import { useNavbarColor } from "@/context/NavbarColorProvider";
import useScrollTrigger from "@/hooks/useScrollTrigger";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const defaultSettings = { loader: 1, photos: true };
  const settings = useLoader() || defaultSettings;

  const [title, setTitle] = useState("");
  const [titleBg, setTitleBg] = useState("");
  const [titleColor, setTitleColor] = useState("");
  const [navStyle, setNavStyle] = useState({});
  const [viewSelector, setViewSelector] = useState(false);
  const { navbarColor } = useNavbarColor();

  // ✅ NUEVO: menú desplegable
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // ✅ NUEVO: items del menú (ajusta rutas si quieres)
  const menuSections = useMemo(
    () => [
      {
        items: [
          { label: "Media", href: "/media" },
          { label: "Music", href: "/media/music" },
          { label: "Videos", href: "/media/videos" },
          { label: "Photos", href: "/media/photos" },
        ],
      },
      {
        items: [
          { label: "Tour / Tickets", href: "/tickets" },
          { label: "Merch", href: "/merch" },
          { label: "Fan Page", href: "/fan-page" },
          { label: "Book the Band", href: "/book-the-band" },
          { label: "Contact", href: "/contact" },
        ],
      },
    ],
    []
  );

  const fixedRoutes = [
    "/tickets",
    "/tickets/map-view",
    "/tickets/calendar-view",
    "/reviews",
    "/media",
    "/our-clients",
    "/services",
    "/memberships",
  ];

  const isDynamicRoute =
    pathname.startsWith("/tickets/") && !fixedRoutes.includes(pathname);

  const getBackgroundColor = (path) => {
    if (path === "/media") {
      return "rgba(35, 48, 64, 0.8)";
    } else if (path === "/reviews") {
      return "rgba(221, 50, 84, 0.8)";
    } else return "transparent";
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 1) {
        setNavStyle({
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          backgroundColor: getBackgroundColor(pathname),
          transition: "background-color 0.3s, box-shadow 0.3s",
        });
      } else {
        setNavStyle({});
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  useEffect(() => {
    switch (pathname) {
      case "/tickets":
        setTitle("tickets");
        setTitleBg("bluePattern");
        setTitleColor("lightRed");
        setViewSelector(false);
        break;
      case "/tickets/map-view":
        setTitle("tickets");
        setTitleBg("bluePattern");
        setTitleColor("lightRed");
        setViewSelector(true);
        break;
      case "/tickets/calendar-view":
        setTitle("tickets");
        setTitleBg("bluePattern");
        setTitleColor("lightRed");
        setViewSelector(true);
        break;
      case "/reviews":
        setTitle("reviews");
        setTitleBg("bluePattern");
        setTitleColor("beige");
        setViewSelector(false);
        break;
      case "/media":
        setTitle("media");
        setTitleBg("beigePattern");
        setTitleColor("darkBlue");
        setViewSelector(false);
        break;
      case "/our-clients":
        setTitle("our clients");
        setTitleBg("beigePattern");
        setTitleColor("lightRed");
        setViewSelector(false);
        break;
      case "/services":
        setTitle("services");
        setTitleBg("redPattern");
        setTitleColor("beige");
        setViewSelector(false);
        break;
      case "/memberships":
        setTitle("memberships");
        setTitleBg("beigePattern");
        setTitleColor("");
        setViewSelector(false);
        break;
      default:
        setTitle("tickets");
        setTitleBg("bluePattern");
        setTitleColor("lightRed");
        setViewSelector(false);
        break;
    }
  }, [pathname]);

  const isScrolled = useScrollTrigger({ threshold: 0 });

  const getNavbarBackground = () => {
    if (!isDynamicRoute || !isScrolled) return "";

    if (navbarColor === "dark") {
      return "bg-beigePatternMobile bg-cover";
    } else if (navbarColor === "light") {
      return "bg-[#1f344a]";
    }

    return "";
  };

  const getNavbarStyle = () => {
    if (isDynamicRoute && isScrolled && navbarColor === "light") {
      return {
        backgroundColor: "#1f344a",
      };
    }
    return {};
  };

  // ✅ NUEVO: Back
  const onBack = () => {
    try {
      router.back();
      setTimeout(() => {
        if (window.location.pathname === pathname) router.push("/");
      }, 150);
    } catch {
      router.push("/");
    }
  };

  // ✅ NUEVO: cerrar menú con ESC
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // ✅ NUEVO: click afuera
  useEffect(() => {
    if (!menuOpen) return;

    const onMouseDown = (e) => {
      const el = menuRef.current;
      if (!el) return;
      if (!el.contains(e.target)) setMenuOpen(false);
    };

    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, [menuOpen]);

  // ✅ NUEVO: cerrar al navegar
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <div className="fixed top-0 left-0 w-screen z-[120]">
      {/* ========================= */}
      {/* ✅ NUEVO: TOP BAR (Back + Hamburguesa) */}
      {/* ========================= */}
      <div className="h-12 w-full px-4 flex items-center justify-between bg-[#0f2536] border-b border-white/10">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#e6d8bd] text-[#0f2536]
                     rounded-md border border-[#c8b38a] font-semibold text-sm shadow-sm
                     hover:opacity-90 active:scale-[0.99] transition"
          aria-label="Back"
        >
          <span className="text-base leading-none">←</span>
          <span>Back</span>
        </button>

        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          className="w-10 h-10 flex items-center justify-center text-[#e6d8bd] hover:bg-white/10 rounded-md transition"
          aria-label="Open menu"
          aria-expanded={menuOpen}
        >
          <span className="text-2xl leading-none">☰</span>
        </button>
      </div>

      {/* ========================= */}
      {/* ✅ TU NAVBAR ORIGINAL (sin eliminar nada) */}
      {/* ========================= */}
      <div
        style={getNavbarStyle()}
        className={`w-screen z-[100] flex flex-col justify-between pt-3 px-1 sm:px-4 3xl:px-9 ${
          pathname === "/tickets/calendar-view" || pathname === "/tickets"
            ? "bg-beigePatternMobile bg-cover"
            : ""
        } ${getNavbarBackground()}`}
      >
        <div className="flex justify-between">
          <div className="flex gap-1.5 sm:gap-4 items-center">
            <Link
              href="/"
              className="inline-block"
              style={{
                opacity: settings?.loader,
                pointerEvents: settings?.photos ? "auto" : "none",
              }}
            >
              <Image
                src={
                  ![
                    "/services",
                    "/tickets",
                    "/tickets/calendar-view",
                    "/tickets/map-view",
                  ].includes(pathname) && navbarColor === "light"
                    ? logo
                    : logo2
                }
                width={65}
                height={65}
                priority={true}
                alt="OTS Logo"
                className="xs:w-[80px] xs:h-[80px] sm:w-32 sm:h-32 fullHD:w-40 fullHD:h-40 2k:w-48 2k:h-48 4k:w-64 4k:h-64 pointer-events-auto"
              />
            </Link>

            <h1
              className={`octagon-navbar bg-${titleBg} bg-contain text-${titleColor} font-titles
              text-2xl xs2:text-[26px] sm:text-[40px] fullHD:text-5xl 2k:text-7xl 4k:text-8xl
              flex items-center justify-center fullHD:pb-0.5 fullHD:pl-2 ${
                isDynamicRoute ? "hidden" : "visible"
              }`}
              style={{
                opacity: settings?.loader,
                pointerEvents: settings?.photos ? "auto" : "none",
              }}
            >
              {title}
            </h1>
          </div>

          <div className="flex gap-1.5 xs:gap-2 sm:gap-4 items-center">
            <Link
              className={`${
                pathname != "/media" &&
                pathname != "/reviews" &&
                pathname != "/our-clients" &&
                navbarColor === "dark"
                  ? "bg-redPattern text-beige"
                  : "bg-beigePattern text-lightRed"
              }
              bg-contain rounded-full p-1 sm:p-2 2k:p-3 4k:p-3.5 pointer-events-auto`}
              style={{
                opacity: settings?.loader,
                pointerEvents: settings?.photos ? "auto" : "none",
              }}
              href="mailto:captainnicholasmoffat@oldtimesailors.com"
              target="_blank"
            >
              <TfiEmail
                size={22}
                className="xs:w-[24px] xs:h-[24px] iphone-3:w-[26px] iphone-3:h-[26px] sm:w-[30px] sm:h-[30px] 2k:w-[50px] 2k:h-[50px]  4k:w-[60px] 4k:h-[60px]"
              />
            </Link>

            <Link
              className={`${
                navbarColor === "dark" &&
                pathname != "/media" &&
                pathname != "/reviews" &&
                pathname != "/our-clients"
                  ? "bg-bluePattern text-beige"
                  : "bg-beigePattern text-darkBlue"
              }
              bg-contain rounded-full p-1 sm:p-2 2k:p-3 4k:p-3.5 pointer-events-auto`}
              style={{
                opacity: settings?.loader,
                pointerEvents: settings?.photos ? "auto" : "none",
              }}
              href="https://wa.me/447539045312"
              target="_blank"
            >
              <FaWhatsapp
                size={22}
                className="xs:w-[24px] xs:h-[24px] iphone-3:w-[26px] iphone-3:h-[26px] sm:w-[30px] sm:h-[30px] 2k:w-[50px] 2k:h-[50px] 4k:w-[60px] 4k:h-[60px]"
              />
            </Link>

            <Link
              className={`${
                navbarColor === "dark" &&
                pathname != "/media" &&
                pathname != "/reviews" &&
                pathname != "/our-clients"
                  ? "bg-redPattern text-beige"
                  : "bg-beigePattern text-lightRed"
              }
              bg-contain rounded-full p-1 sm:p-2 2k:p-3 4k:p-3.5 pointer-events-auto`}
              style={{
                opacity: settings?.loader,
                pointerEvents: settings?.photos ? "auto" : "none",
              }}
              href="https://www.instagram.com/oldtimesailors"
              target="_blank"
            >
              <FaInstagram
                size={22}
                className="xs:w-[24px] xs:h-[24px] iphone-3:w-[26px] iphone-3:h-[26px] sm:w-[30px] sm:h-[30px] 2k:w-[50px] 2k:h-[50px] 4k:w-[60px] 4k:h-[60px]"
              />
            </Link>

            <Link
              className={`${
                navbarColor === "dark" &&
                pathname != "/media" &&
                pathname != "/reviews" &&
                pathname != "/our-clients"
                  ? "bg-bluePattern text-beige"
                  : "bg-beigePattern text-darkBlue"
              }
              bg-contain rounded-full p-1 sm:p-2 2k:p-3 4k:p-3.5 pointer-events-auto`}
              style={{
                opacity: settings?.loader,
                pointerEvents: settings?.photos ? "auto" : "none",
              }}
              href="https://www.facebook.com/oldtimesailors/"
              target="_blank"
            >
              <FaFacebookF
                size={22}
                className="xs:w-[24px] xs:h-[24px] iphone-3:w-[26px] iphone-3:h-[26px] sm:w-[30px] sm:h-[30px] 2k:w-[50px] 2k:h-[50px] 4k:w-[60px] 4k:h-[60px]"
              />
            </Link>
          </div>
        </div>

        {viewSelector === true ? <ViewSwitch /> : false}
      </div>

      {/* ========================= */}
      {/* ✅ NUEVO: PANEL MENÚ DESPLEGABLE (derecha) */}
      {/* ========================= */}
      <div
        className={`fixed top-12 right-0 z-[300] h-[calc(100vh-3rem)] w-72 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ transition: "transform 180ms ease" }}
      >
        <div
          ref={menuRef}
          className="h-full bg-[#143247] text-[#e6d8bd] border-l border-[#c8b38a] shadow-2xl"
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
            <span className="font-titles text-lg">Menu</span>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="w-9 h-9 rounded-md inline-flex items-center justify-center hover:bg-white/10 transition"
              aria-label="Close menu"
            >
              <span className="text-xl leading-none">×</span>
            </button>
          </div>

          <nav className="py-2">
            {menuSections.map((section, idx) => (
              <div
                key={idx}
                className={`${idx > 0 ? "mt-2 pt-2 border-t border-white/10" : ""}`}
              >
                {section.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="px-4 py-2.5 flex items-center justify-between hover:bg-white/10 transition"
                  >
                    <span className="font-medium">{item.label}</span>
                    <span className="text-white/60">›</span>
                  </Link>
                ))}
              </div>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
