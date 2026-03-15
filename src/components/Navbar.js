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

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

// ✅ IMPORTA TU COMPONENTE
import Social from "./Social"; // <-- cambia esta ruta si Social.js está en otro folder

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

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

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
    if (path === "/media") return "rgba(35, 48, 64, 0.8)";
    if (path === "/reviews") return "rgba(221, 50, 84, 0.8)";
    return "transparent";
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
    if (navbarColor === "dark") return "bg-beigePatternMobile bg-cover";
    if (navbarColor === "light") return "bg-[#1f344a]";
    return "";
  };

  const getNavbarStyle = () => {
    if (isDynamicRoute && isScrolled && navbarColor === "light") {
      return { backgroundColor: "#1f344a" };
    }
    return {};
  };

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

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

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

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const octagonMenu = useMemo(
    () => [
      { label: "media", href: "/media", bg: "bg-beigePattern", text: "text-darkBlue" },
      { label: "tickets", href: "/tickets/calendar-view", bg: "bg-white", text: "text-lightRed" },
      { label: "merch", href: "https://oldtimesailors.co.uk/", target: "_blank", bg: "bg-redPattern", text: "text-beige" },
      { label: "reviews", href: "/reviews", bg: "bg-white", text: "text-beige" },
      { label: "our clients", href: "/our-clients", bg: "bg-beigePattern", text: "text-lightRed" },
      { label: "services", href: "/services", bg: "bg-redPattern", text: "text-beige" },
      { label: "memberships", href: "/memberships", bg: "bg-beigePattern", text: "text-darkBlue" },
    ],
    []
  );

  const getPillClass = (key) => {
    const isRed = key === "mail" || key === "instagram";
    const isBlue = key === "whatsapp" || key === "facebook";

    const bg =
      navbarColor === "dark" &&
        pathname != "/media" &&
        pathname != "/reviews" &&
        pathname != "/our-clients"
        ? isRed
          ? "bg-redPattern text-beige"
          : "bg-bluePattern text-beige"
        : isRed
          ? "bg-beigePattern text-lightRed"
          : "bg-beigePattern text-darkBlue";

    return `${bg} bg-contain rounded-full p-1 sm:p-2 2k:p-3 4k:p-3.5 pointer-events-auto`;
  };

  const socialRenderers = {
    mail: () => (
      <TfiEmail
        size={22}
        className="xs:w-[24px] xs:h-[24px] iphone-3:w-[26px] iphone-3:h-[26px] sm:w-[30px] sm:h-[30px] 2k:w-[50px] 2k:h-[50px]  4k:w-[60px] 4k:h-[60px]"
      />
    ),
    whatsapp: () => (
      <FaWhatsapp
        size={22}
        className="xs:w-[24px] xs:h-[24px] iphone-3:w-[26px] iphone-3:h-[26px] sm:w-[30px] sm:h-[30px] 2k:w-[50px] 2k:h-[50px] 4k:w-[60px] 4k:h-[60px]"
      />
    ),
    instagram: () => (
      <FaInstagram
        size={22}
        className="xs:w-[24px] xs:h-[24px] iphone-3:w-[26px] iphone-3:h-[26px] sm:w-[30px] sm:h-[30px] 2k:w-[50px] 2k:h-[50px] 4k:w-[60px] 4k:h-[60px]"
      />
    ),
    facebook: () => (
      <FaFacebookF
        size={22}
        className="xs:w-[24px] xs:h-[24px] iphone-3:w-[26px] iphone-3:h-[26px] sm:w-[30px] sm:h-[30px] 2k:w-[50px] 2k:h-[50px] 4k:w-[60px] 4k:h-[60px]"
      />
    ),
  };

  return (
    <div className="fixed top-0 left-0 w-screen z-[120]">
      <div className="h-12 w-full px-4 flex items-center justify-between bg-[#0f2536] border-b border-white/10">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#e6d8bd] text-[#0f2536]
                     rounded-md border border-[#c8b38a] text-sm shadow-sm
                     hover:opacity-90 active:scale-[0.99] transition font-titles
                     [font-feature-settings:'liga'_0,'clig'_0,'calt'_0]"
          aria-label="Back"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="text-sm leading-none" />
          <span>back</span>
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

      <div
        style={getNavbarStyle()}
        className={`w-screen z-[100] flex flex-col justify-between pt-3 px-1 sm:px-4 3xl:px-9 ${pathname === "/tickets/calendar-view" || pathname === "/tickets"
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
                width={55}
                height={55}
                priority={true}
                alt="OTS Logo"
                className="xs:w-[60px] xs:h-[60px]
       sm:w-24 sm:h-24
       fullHD:w-32 fullHD:h-32
       2k:w-40 2k:h-40
       4k:w-56 4k:h-56
       pointer-events-auto"
              />
            </Link>

            <h1
              className={`octagon-navbar bg-${titleBg} bg-contain text-${titleColor} font-titles
              text-2xl xs2:text-[26px] sm:text-[40px] fullHD:text-5xl 2k:text-7xl 4k:text-8xl
              flex items-center justify-center fullHD:pb-0.5 fullHD:pl-2 ${isDynamicRoute ? "hidden" : "visible"
                }`}
              style={{
                opacity: settings?.loader,
                pointerEvents: settings?.photos ? "auto" : "none",
              }}
            >
              {title}
            </h1>
          </div>

          <div
            style={{
              opacity: settings?.loader,
              pointerEvents: settings?.photos ? "auto" : "none",
            }}
          >
            <Social
              className="flex gap-1.5 xs:gap-2 sm:gap-4 items-center"
              renderers={{
                mail: () => (
                  <span className={getPillClass("mail")}>
                    {socialRenderers.mail()}
                  </span>
                ),
                whatsapp: () => (
                  <span className={getPillClass("whatsapp")}>
                    {socialRenderers.whatsapp()}
                  </span>
                ),
                instagram: () => (
                  <span className={getPillClass("instagram")}>
                    {socialRenderers.instagram()}
                  </span>
                ),
                facebook: () => (
                  <span className={getPillClass("facebook")}>
                    {socialRenderers.facebook()}
                  </span>
                ),
              }}
            />
          </div>
        </div>

        {viewSelector === true ? <ViewSwitch /> : false}
      </div>

      <div
        className={`fixed top-12 right-0 z-[300] h-[calc(100vh-3rem)] w-[260px] ${menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        style={{ transition: "transform 180ms ease" }}
      >
        <div ref={menuRef} className="h-full bg-[#143247] text-[#e6d8bd] shadow-2xl">
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
            <span
              className="font-titles text-xl sm:text-2xl pb-[1px]"
              style={{
                fontVariantLigatures: "none",
                fontFeatureSettings: '"liga" 0, "clig" 0, "calt" 0',
              }}
            >
              menu
            </span>

            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="w-9 h-9 rounded-md inline-flex items-center justify-center hover:bg-white/10 transition"
              aria-label="Close menu"
            >
              <span className="text-xl leading-none">×</span>
            </button>
          </div>

          <div className="p-3 flex flex-col gap-2 overflow-y-auto h-[calc(100%-56px)]">
            {octagonMenu.map((item) => (
              <Link
                key={item.label}
                className={`octagon flex items-center justify-center ${item.bg} bg-contain`}
                href={item.href}
                target={item.target}
              >
                <p className={`font-titles ${item.text} text-xl sm:text-2xl pb-[1px] text-center`}>
                  {item.label}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;