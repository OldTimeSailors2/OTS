"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchEvents } from "@/helpers/fetchData";
import FamilyLanding from "@/components/FamilyLanding";
import PowerLanding from "@/components/PowerLanding";
import Loading from "./loading";
import MainDiv from "@/components/MainDiv";
import { useNavbarColor } from "@/context/NavbarColorProvider";
const GigLanding = () => {
  const { event } = useParams();
  const [currentEvent, setCurrentEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { setNavbarColor } = useNavbarColor();

  useEffect(() => {
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
    <MainDiv
      className={`
        w-full flex-1 
    ${currentEvent.typeOfShow === "Family" ? " bg-beigePattern bg-contain" : " bg-darkBlue bg-contain"}`}
      style={{
        overscrollBehavior: "none", // Esto ayuda a que el scroll sea más natural
        scrollBehavior: "smooth", // Para un scroll más fluido
      }}
    >
      <div className="flex-1 h-full">
        {currentEvent.typeOfShow === "Family" ? <FamilyLanding data={currentEvent} /> : <PowerLanding data={currentEvent} />}
      </div>
    </MainDiv>
  );
};
export default GigLanding;
