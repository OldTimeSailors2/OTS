"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchEvents } from "@/helpers/fetchData";
import FamilyLanding from "@/components/FamilyLanding";
import PowerLanding from "@/components/PowerLanding";
import Loading from "./loading";
import MainDiv from "@/components/MainDiv";
import { useNavbarColor } from "@/context/NavbarColorProvider";
import ReactPixel from 'react-facebook-pixel'
const GigLanding = () => {
  const { event } = useParams();
  const [currentEvent, setCurrentEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { setNavbarColor } = useNavbarColor();

  useEffect(() => {
    ReactPixel.init(process.env.PIXEL_ID);
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const events = await fetchEvents();

        const foundEvent = events.find((e) => e.event.toLowerCase().replace(/\s+/g, "-") === event);

        if (foundEvent) {
          setCurrentEvent(foundEvent);
        } else {
          throw new Error(`Event "${event}" not found.`);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setIsLoading(false);
      }
    };

    if (event) {
      fetchData();
    }
  }, [event]);

  useEffect(() => {
    if (currentEvent) {
      setNavbarColor(currentEvent.typeOfShow === "Family" ? "dark" : "light");
    }
  }, [currentEvent, setNavbarColor]);

  if (isLoading) return <Loading />;
  if (error) return <div>{error}</div>;
  if (!currentEvent) return <div>No event found</div>;

  return (
    <MainDiv>
      <div 
      className={`${currentEvent.typeOfShow === "Family" ? " bg-beigePattern bg-contain" : " bg-darkBlue bg-contain"}`} 
      style={{
        backgroundRepeat: "repeat",
        overscrollBehavior: "none", // Esto ayuda a que el scroll sea más natural
        scrollBehavior: "smooth", // Para un scroll más fluido
      }}
      >
        {currentEvent.typeOfShow === "Family" ? <FamilyLanding data={currentEvent} /> : <PowerLanding data={currentEvent} />}
      </div>
    </MainDiv>
  );
};
export default GigLanding;
