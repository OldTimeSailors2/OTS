"use client";

import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { fetchEvents } from "@/helpers/fetchData";
import FamilyLanding from "@/components/FamilyLanding";
import PowerLanding from "@/components/PowerLanding";
import MainDiv from "@/components/MainDiv";
import { useNavbarColor } from "@/context/NavbarColorProvider";

const GigLanding = () => {
  const params = useParams();
  const eventParam = params?.event; // /tickets/<eventParam>

  const [currentEvent, setCurrentEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { setNavbarColor } = useNavbarColor();

  const eventIdFromUrl = useMemo(() => String(eventParam ?? "").trim(), [eventParam]);
  const eventSlugFromUrl = useMemo(() => eventIdFromUrl.toLowerCase(), [eventIdFromUrl]);

  useEffect(() => {
    let isMounted = true;

    const initPixel = async () => {
      try {
        if (typeof window === "undefined") return;

        const pixelId = process.env.NEXT_PUBLIC_PIXEL_ID || process.env.PIXEL_ID;
        if (!pixelId) return;

        const mod = await import("react-facebook-pixel");

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const events = await fetchEvents(); // /api/event
        const raw = await fetchEvents();
        console.log("RAW fetchEvents():", raw, "isArray?", Array.isArray(raw));

        console.log("events length:", events.length, "first:", events[0]);


        let found = events.find((e) => String(e?.id ?? "") === eventIdFromUrl);

        if (!found) {
          found = events.find((e) => {
            const slug = String(e?.eventName ?? e?.event ?? "")
              .toLowerCase()
              .trim()
              .replace(/\s+/g, "-");
            return slug === eventSlugFromUrl;
          });
        }

        if (!found) {
          throw new Error(`Event "${eventIdFromUrl}" not found.`);
        }

        setCurrentEvent(found);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
        setCurrentEvent(null);
      } finally {
        setIsLoading(false);
      }
    };

    if (eventIdFromUrl) fetchData();
  }, [eventIdFromUrl, eventSlugFromUrl]);

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
        className={`${currentEvent.typeOfShow === "Family" ? "bg-beigePattern bg-contain" : "bg-darkBlue bg-contain"
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