"use client";
import { useState, useEffect, useMemo, useRef } from "react";
import { useLoader } from "@/context/LoaderContext";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import logo from "../../public/assets/logo.svg";
import logo2 from "../../public/assets/logo-services.svg";

import ViewSwitch from "./ViewSelectorSwitch";
import { useNavbarColor } from "@/context/NavbarColorProvider";
import useScrollTrigger from "@/hooks/useScrollTrigger";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import Social from "./Social";

const routeConfig = {
  "/tickets": { titleImg: "/assets/tickets.png", viewSelector: false, label: "tickets" },
  "/tickets/map-view": { titleImg: "/assets/tickets.png", viewSelector: true, label: "tickets" },
  "/tickets/calendar-view": { titleImg: "/assets/tickets.png", viewSelector: true, label: "tickets" },
  "/reviews": { titleImg: "/assets/btnReviews.png", label: "reviews" },
  "/media": { titleImg: "/assets/btnMedia.png", label: "media" },
  "/our-clients": { titleImg: "/assets/btnClientspng.png", label: "our clients" },
  "/services": { titleImg: "/assets/btnServices.png", label: "services" },
  "/memberships": { titleImg: "/assets/memberships.png", label: "memberships" },
};

const defaultConfig = {
  titleImg: "/assets/tickets.png",
  viewSelector: false,
};

const menuItems = [
  { href: "/media", titleImg: "/assets/media.png" },
  { href: "/tickets/calendar-view", titleImg: "/assets/tickets.png" },
  { href: "/reviews", titleImg: "/assets/btnReviews.png" },
  { href: "/our-clients", titleImg: "/assets/clients.png" },
  { href: "/services", titleImg: "/assets/services.png" },
  { href: "/memberships", titleImg: "/assets/memberships.png" },
];

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const settings = useLoader() || { loader: 1, photos: true };

  const { navbarColor } = useNavbarColor();
  const isScrolled = useScrollTrigger({ threshold: 0 });

  const [navStyle, setNavStyle] = useState({});
  const [menuOpen, setMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(1440);
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
    pathname?.startsWith("/tickets/") && !fixedRoutes.includes(pathname);

  const config = routeConfig[pathname] || defaultConfig;

  const getBackgroundColor = (path) => {
    if (path === "/media") return "rgba(35, 48, 64, 0.96)";
    if (path === "/reviews") return "rgba(221, 50, 84, 0.96)";
    return "rgba(15, 37, 54, 0.96)";
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const hasShadow = window.scrollY > 1;

      setNavStyle({
        backgroundColor: getBackgroundColor(pathname),
        boxShadow: hasShadow
          ? "0 6px 18px rgba(0,0,0,0.18)"
          : "0 2px 10px rgba(0,0,0,0.08)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        transition: "all 0.3s ease",
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const combinedStyle = useMemo(
    () => ({
      ...navStyle,
      ...(isDynamicRoute && isScrolled && navbarColor === "light"
        ? { backgroundColor: "#1f344a" }
        : {}),
    }),
    [navStyle, isDynamicRoute, isScrolled, navbarColor]
  );

  const onBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
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

    const onClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const currentLogo =
    ![
      "/services",
      "/tickets",
      "/tickets/calendar-view",
      "/tickets/map-view",
    ].includes(pathname) && navbarColor === "light"
      ? logo
      : logo2;

  const socialSize = useMemo(() => {
    if (windowWidth <= 360) return 14;
    if (windowWidth <= 420) return 16;
    if (windowWidth <= 480) return 17;
    if (windowWidth <= 640) return 18;
    if (windowWidth <= 768) return 20;
    if (windowWidth <= 1024) return 24;
    return 30;
  }, [windowWidth]);

  const logoSize = useMemo(() => {
    if (windowWidth <= 480) return 38;
    if (windowWidth <= 640) return 42;
    return 55;
  }, [windowWidth]);

  const titleWidth = useMemo(() => {
    if (windowWidth <= 360) return 82;
    if (windowWidth <= 480) return 92;
    if (windowWidth <= 640) return 110;
    if (windowWidth <= 768) return 140;
    return 200;
  }, [windowWidth]);

  const sideMenuTop = useMemo(() => {
    if (windowWidth <= 640) return 112;
    return 140;
  }, [windowWidth]);

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-[9999]">
        {/* TOP BAR */}
        <div
          style={combinedStyle}
          className="w-full px-3 sm:px-4 py-2 flex items-center justify-between"
        >
          <button
            onClick={onBack}
            className="px-2.5 sm:px-3 py-1 bg-[#e6d8bd] text-[#0f2536] rounded-md text-xs sm:text-sm whitespace-nowrap"
          >
            <FontAwesomeIcon icon={faArrowLeft} /> back
          </button>

          <div />

          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="text-[#e6d8bd] text-xl sm:text-2xl leading-none"
            aria-label="Abrir menú"
          >
            ☰
          </button>
        </div>

        {/* SUB BAR */}
        <div className="w-full px-3 sm:px-4 py-2 sm:py-3 flex items-center gap-2 sm:gap-3 bg-transparent">
          {!isDynamicRoute ? (
            <div
              className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1"
              style={{
                opacity: settings.loader,
              }}
            >
              <Image
                src={currentLogo}
                width={logoSize}
                height={logoSize}
                alt="logo"
                className="object-contain shrink-0 cursor-pointer"
                onClick={() => router.push("/")}
              />

              <Image
                src={config.titleImg}
                alt="title"
                width={titleWidth}
                height={60}
                className="object-contain h-auto max-w-full"
              />
            </div>
          ) : (
            <div className="flex-1" />
          )}

          <div className="ml-auto shrink-0 flex items-center justify-end">
            <Social size={socialSize} />
          </div>
        </div>

        {config.viewSelector && (
          <div className="w-full px-3 py-2 bg-transparent">
            <ViewSwitch />
          </div>
        )}
      </div>

      {menuOpen && (
        <div
          className="fixed inset-0 z-[10000] bg-black/35 backdrop-blur-[2px]"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* SIDE MENU */}
      <div
        className={`fixed right-0 w-[260px] sm:w-[290px] z-[10001] ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          top: `${sideMenuTop}px`,
          height: `calc(100vh - ${sideMenuTop}px)`,
          transition: "transform 0.25s ease",
        }}
      >
        <div
          ref={menuRef}
          className="h-full bg-[#384855] p-4 shadow-2xl overflow-y-auto"
        >
          <div className="flex justify-between items-center pb-3">
            <span className="text-[#e6d8bd] text-lg sm:text-xl font-semibold tracking-[0.18em] uppercase">
              Menu
            </span>

            <button
              onClick={() => setMenuOpen(false)}
              className="text-[#e6d8bd] text-xl leading-none hover:opacity-80"
              aria-label="Cerrar menú"
            >
              ✕
            </button>
          </div>

          <div className="flex flex-col gap-4 mt-3">
            {menuItems.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href === "/tickets/calendar-view" &&
                  ["/tickets", "/tickets/map-view", "/tickets/calendar-view"].includes(pathname));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block transition-all duration-200 ${
                    isActive ? "opacity-100" : "opacity-90 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={item.titleImg}
                    alt={item.href}
                    width={130}
                    height={30}
                    className="object-contain w-[70%] h-auto mx-auto"
                  />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;