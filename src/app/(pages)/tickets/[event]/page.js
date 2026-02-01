"use client";

import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { fetchEvents } from "@/helpers/fetchData";
import FamilyLanding from "@/components/FamilyLanding";
import PowerLanding from "@/components/PowerLanding";
import MainDiv from "@/components/MainDiv";
import { useNavbarColor } from "@/context/NavbarColorProvider";

const slugify = (value) =>
  String(value ?? "")
    .normalize("NFD") // separa tildes
    .replace(/[\u0300-\u036f]/g, "") // elimina tildes
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "") // elimina : ( ) etc
    .replace(/\s+/g, "-") // espacios -> guiones
    .replace(/-+/g, "-"); // colapsa guiones dobles

const GigLanding = () => {
  const params = useParams();

  // ✅ Funciona sin importar si tu folder es [event], [id], [slug] o catch-all
  const eventParam = useMemo(() => {
    if (!params) return "";
    const first = Object.values(params)[0];
    return Array.isArray(first) ? first[0] : first;
  }, [params]);

  const [currentEvent, setCurrentEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { setNavbarColor } = useNavbarColor();

  const eventIdFromUrl = useMemo(() => {
    try {
      return decodeURIComponent(String(eventParam ?? "")).trim();
    } catch {
      return String(eventParam ?? "").trim();
    }
  }, [eventParam]);

  const eventIdNormalized = useMemo(
    () => eventIdFromUrl.toLowerCase().trim(),
    [eventIdFromUrl]
  );

  // Pixel init (safe)
  useEffect(() => {
    let isMounted = true;

    const initPixel = async () => {
      try {
        if (typeof window === "undefined") return;

        const pixelId =
          process.env.NEXT_PUBLIC_PIXEL_ID || process.env.PIXEL_ID;
        if (!pixelId) return;

        await import("react-facebook-pixel");
        if (!isMounted) return;

        // Si luego quieres inicializar:
        // ReactPixel.default.init(pixelId);
      } catch (e) {
        console.warn("Pixel init skipped:", e?.message || e);
      }
    };

    initPixel();

    return () => {
      isMounted = false;
    };
  }, []);

  // Fetch + match
  useEffect(() => {
    let alive = true;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const events = await fetchEvents(); // /api/event

        // ✅ Debug útil (puedes borrar luego)
        console.log("params:", params);
        console.log("eventParam:", eventParam);
        console.log("eventIdFromUrl:", eventIdFromUrl);
        console.log("events ids:", Array.isArray(events) ? events.map((e) => e?.id) : events);

        if (!Array.isArray(events)) {
          throw new Error("fetchEvents() no devolvió un array.");
        }

        // 1) match directo por id (ahora tus ids ya son slugs)
        let found = events.find(
          (e) => String(e?.id ?? "").toLowerCase().trim() === eventIdNormalized
        );

        // 2) fallback: slugify(eventName/event) vs slugify(param)
        if (!found) {
          const targetSlug = slugify(eventIdFromUrl);
          found = events.find(
            (e) => slugify(e?.eventName ?? e?.event) === targetSlug
          );
        }

        if (!found) {
          throw new Error(`Event "${eventIdFromUrl}" not found.`);
        }

        if (!alive) return;
        setCurrentEvent(found);
      } catch (err) {
        if (!alive) return;
        setError(err instanceof Error ? err.message : String(err));
        setCurrentEvent(null);
      } finally {
        if (!alive) return;
        setIsLoading(false);
      }
    };

    if (eventIdFromUrl) fetchData();

    return () => {
      alive = false;
    };
  }, [params, eventParam, eventIdFromUrl, eventIdNormalized]);

  // ✅ Navbar color
  useEffect(() => {
    if (currentEvent) {
      setNavbarColor(currentEvent.typeOfShow === "Family" ? "dark" : "light");
    }
  }, [currentEvent, setNavbarColor]);

  if (isLoading) {
    return (
      <MainDiv>
        <div className="p-6 text-center">
          <p className="text-xl font-semibold">Loading...</p>
        </div>
      </MainDiv>
    );
  }

  if (error) {
    return (
      <MainDiv>
        <div className="p-6 text-center">
          <p className="text-xl font-semibold">No se pudo cargar el evento</p>
          <p className="mt-2 opacity-80">{error}</p>
        </div>
      </MainDiv>
    );
  }

  if (!currentEvent) {
    return (
      <MainDiv>
        <div className="p-6 text-center">
          <p className="text-xl font-semibold">No event found</p>
        </div>
      </MainDiv>
    );
  }

  return (
    <MainDiv>
      <div
        className={`${
          currentEvent.typeOfShow === "Family"
            ? "bg-beigePattern bg-contain"
            : "bg-darkBlue bg-contain"
        }`}
        style={{
          backgroundRepeat: "repeat",
          overscrollBehavior: "none",
          scrollBehavior: "smooth",
        }}
      >
        {currentEvent.typeOfShow === "Family" ? (
          <FamilyLanding data={currentEvent} />
        ) : (
          <PowerLanding data={currentEvent} />
        )}
      </div>
    </MainDiv>
  );
};

export default GigLanding;