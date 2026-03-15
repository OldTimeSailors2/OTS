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
    .normalize("NFD") 
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "") 
    .replace(/\s+/g, "-") 
    .replace(/-+/g, "-"); 

const GigLanding = () => {
  const params = useParams();

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
        console.log("params:", params);
        console.log("eventParam:", eventParam);
        console.log("eventIdFromUrl:", eventIdFromUrl);
        console.log("events ids:", Array.isArray(events) ? events.map((e) => e?.id) : events);

        if (!Array.isArray(events)) {
          throw new Error("fetchEvents() no devolvió un array.");
        }

        let found = events.find(
          (e) => String(e?.id ?? "").toLowerCase().trim() === eventIdNormalized
        );

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

  //  Navbar color
  useEffect(() => {
    if (currentEvent) {
      setNavbarColor(currentEvent.typeOfShow === "Family" ? "dark" : "light");
    }
  }, [currentEvent, setNavbarColor]);
  return(
  <MainDiv>
  {(isLoading || error || !currentEvent)?
      <div className="p-6 text-center">
        <p className="text-xl font-semibold">{
          isLoading ? "Loading..." :
          error ? "No se pudo cargar el evento" :
          !currentEvent ? "No event found" :""
        }</p>
        {error && <p className="mt-2 opacity-80">{error}</p>}
      </div>
    :
      <div className={`${
        currentEvent.typeOfShow === "Family"
        ? "bg-beigePattern bg-contain"
        : "bg-contain"
        } bg-repeat overscroll-none scroll-smooth`}
        >
        {currentEvent.typeOfShow === "Family" ? (
          <FamilyLanding data={currentEvent} />
        ) : (
          <PowerLanding data={currentEvent} />
        )}
      </div>
      }
      </MainDiv>)

};

export default GigLanding;