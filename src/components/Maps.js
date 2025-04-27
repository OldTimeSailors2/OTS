"use client";

import { useEffect, useState, useMemo, useCallback, Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { useApiIsLoaded, Map, useMap, useMapsLibrary, Marker } from "@vis.gl/react-google-maps";
import MainDiv from "./MainDiv";
import windowLogo from "../../public/assets/logo-badge.svg";
import CustomPopup from "./CustomPopup";
import { CgClose } from "react-icons/cg";

const Maps = ({ markersList }) => {
  const overlayData = useMemo(
    () => ({
      mobile: {
        imageUrl: "/assets/map-mobile.webp",
        sw: { lat: 48.15101962663997, lng: -14.624391892254629 }, // SW coordinates A
        ne: { lat: 63.41423162171008, lng: 7.880460478192122 }, // NE coordinates A
      },
      desktop: {
        imageUrl: "/assets/map-desktop.webp",
        sw: { lat: 48.16567701912835, lng: -25.34704814225463 }, // SW coordinates B
        ne: { lat: 63.41423162170996, lng: 18.06478665006712 }, // NE coordinates B
      },
    }),
    []
  );

  const [currentOverlay, setCurrentOverlay] = useState(overlayData.mobile);
  const [overlayLoaded, setOverlayLoaded] = useState(false);
  const [activeMarkerId, setActiveMarkerId] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const coreLibrary = useMapsLibrary("core");
  const mapsLibrary = useMapsLibrary("maps");
  const map = useMap("MapOTS");
  const apiIsLoaded = useApiIsLoaded();

  const [mapCenter, setMapCenter] = useState({ lat: 55.97, lng: -3.699966 });
  const [markerIconScale, setMarkerIconScale] = useState(6);

  //Overlay useEffect
  useEffect(() => {
    if (!apiIsLoaded || !map || !coreLibrary || !mapsLibrary || overlayLoaded) return;

    // Solid color map type to avoid showing map
    const solidColorMapType = new mapsLibrary.ImageMapType({
      getTileUrl: function (coord, zoom) {
        // Return a solid color image
        return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAABCAYAAAD0In+KAAAACXBIWXMAAAsSAAALEgHS3X78AAAAEUlEQVQImWPcubS3gYGBgQEAECsCbWtkXRcAAAAASUVORK5CYII=";
      },
      tileSize: new coreLibrary.Size(256, 256),
      maxZoom: 20,
    });

    // Set the custom map type to the map
    map.mapTypes.set("solidColor", solidColorMapType);
    map.setMapTypeId("solidColor");

    const southWestLatLng = new coreLibrary.LatLng(currentOverlay.sw.lat, currentOverlay.sw.lng);
    const northEastLatLng = new coreLibrary.LatLng(currentOverlay.ne.lat, currentOverlay.ne.lng);
    const bounds = new coreLibrary.LatLngBounds(southWestLatLng, northEastLatLng);

    const overlayOptions = { clickable: false };
    const overlay = new mapsLibrary.GroundOverlay(currentOverlay.imageUrl, bounds, overlayOptions);
    overlay.setMap(map);

    setOverlayLoaded(true);
  }, [apiIsLoaded, map, coreLibrary, mapsLibrary, currentOverlay, overlayLoaded]);

  const restrictions = useMemo(
    () => ({
      latLngBounds: {
        north: currentOverlay.ne.lat,
        south: currentOverlay.sw.lat,
        west: currentOverlay.sw.lng,
        east: currentOverlay.ne.lng,
      },
      strictBounds: true,
    }),
    [currentOverlay]
  );

  const breakpoints = useMemo(
    () => [
      {
        min: 0,
        max: 374,
        action: () => {
          setMapCenter({ lat: 54.7, lng: -2.399966 });
          setMarkerIconScale(4);
        },
      },
      {
        min: 375,
        max: 379,
        action: () => {
          setMapCenter({ lat: 54.9, lng: -2.399966 });
          setMarkerIconScale(4);
        },
      },
      {
        min: 380,
        max: 383,
        action: () => {
          setMapCenter({ lat: 54.8, lng: -2.399966 });
          setMarkerIconScale(4);
        },
      },
      {
        min: 384,
        max: 389,
        action: () => {
          setMapCenter({ lat: 54.55, lng: -2.399966 });
          setMarkerIconScale(4);
        },
      },
      {
        min: 390,
        max: 392,
        action: () => {
          setMapCenter({ lat: 54.7, lng: -2.399966 });
          setMarkerIconScale(5);
        },
      },
      {
        min: 393,
        max: 399,
        action: () => {
          setMapCenter({ lat: 55, lng: -2.399966 });
          setMarkerIconScale(5);
        },
      },
      {
        min: 400,
        max: 413,
        action: () => {
          setMapCenter({ lat: 55.1, lng: -2.399966 });
          setMarkerIconScale(5);
        },
      },
      {
        min: 414,
        max: 419,
        action: () => {
          setMapCenter({ lat: 54.8, lng: -2.399966 });
          setMarkerIconScale(5);
        },
      },
      {
        min: 420,
        max: 559,
        action: () => {
          setMapCenter({ lat: 54.9, lng: -2.399966 });
          setMarkerIconScale(5);
        },
      },
      {
        min: 600,
        max: 767,
        action: () => {
          setMapCenter({ lat: 56.3, lng: -3.699966 });
          setMarkerIconScale(5);
        },
      },
      {
        min: 768,
        max: 819,
        action: () => {
          setMapCenter({ lat: 55.3, lng: -3.999966 });
        },
      },
      {
        min: 820,
        max: 1023,
        action: () => {
          setMapCenter({ lat: 55, lng: -3.699966 });
        },
      },
      {
        min: 1024,
        max: 1279,
        action: () => {
          setMapCenter({ lat: 55, lng: -3.699966 });
          setMarkerIconScale(8);
        },
      },
      {
        min: 1280,
        max: 1365,
        action: () => {
          setMapCenter({ lat: 54.7, lng: -3.799966 });
          setMarkerIconScale(4);
        },
      },
      {
        min: 1366,
        max: 1439,
        action: () => {
          setMapCenter({ lat: 54.8, lng: -3.799966 });
          setMarkerIconScale(5);
        },
      },
      {
        min: 1440,
        max: 1919,
        action: () => {
          setMapCenter({ lat: 54.5, lng: -3.799966 });
          setMarkerIconScale(5);
        },
      },
      {
        min: 1920,
        max: 1999,
        action: () => {
          setMapCenter({ lat: 54.8, lng: -3.799966 });
        },
      },
      {
        min: 2000,
        max: 2999,
        action: () => {
          setMapCenter({ lat: 54.5, lng: -3.799966 });
          setMarkerIconScale(8);
        },
      },
      {
        min: 3000,
        max: Infinity,
        action: () => {
          setMapCenter({ lat: 54.85, lng: -3.799966 });
          setMarkerIconScale(9);
        },
      },

      // Add more breakpoints as needed
    ],
    []
  );

  // Set up resize listener and initial settings
  useEffect(() => {
    const checkDeviceAndAdjustMap = () => {
      const width = window.innerWidth;
      const isMobile = window.matchMedia("(max-width: 1279px)").matches;

      // Determine current overlay based on device type
      const currentOverlay = isMobile ? overlayData.mobile : overlayData.desktop;
      setCurrentOverlay(currentOverlay);

      // Find and apply the appropriate breakpoint action
      const breakpoint = breakpoints.find((bp) => width >= bp.min && width <= bp.max);
      if (breakpoint) breakpoint.action();
    };

    checkDeviceAndAdjustMap(); // Call once on mount
    window.addEventListener("resize", checkDeviceAndAdjustMap); // Adjust on resize

    // Cleanup
    return () => window.removeEventListener("resize", checkDeviceAndAdjustMap);
  }, []);

  const handleMarkerClick = (id, markerPosition) => {
    if (activeMarkerId && activeMarkerId !== id) {
      setIsTransitioning(true);
      setActiveMarkerId(id);
      setTimeout(() => map.panTo(markerPosition), 200);
    } else {
      setIsTransitioning(false);
      setActiveMarkerId(id);
      map.panTo(markerPosition);
    }
  };

  const createPopupContent = useCallback(
    (markerData) => (
      <div className="popup-bubble">
        <div className="flex items-center justify-center px-2 border-r-3 border-dashed border-[#354557]">
          <Image src={windowLogo} height={50} width={50} alt="Old Time Sailors Tickets Logo" className="md:w-[70px]" />
        </div>

        <div className="flex flex-col mt-2.5 md1:mt-3 mb-2 px-2 md1:px-4 items-center gap-1.5 md1:gap-3 w-full">
          <button className="absolute top-0 right-0 pt-0.5 pr-0.5" onClick={() => setActiveMarkerId(null)}>
            <CgClose className=" text-[15px] md1:text-[20px] text-[#232f3f] " />
          </button>

          <ul className="flex flex-col self-start max-xl:gap-1 -space-y-1">
            <li className="text-xl leading-5 md:text-3xl text-lightRed font-titles font-medium flex items-start max-xl:mb-0.5">
              event:
              <p className="max-xl:max-w-48 text-[19px] md:text-[28px] text-darkBlue font-txt pl-1 xl:whitespace-nowrap">{markerData.event}</p>
            </li>
            <li className="text-xl md:text-3xl text-lightRed font-titles font-medium flex items-start">
              location:
              <p className="max-xl:max-w-48 text-[19px] md:text-[28px] text-darkBlue font-txt pl-1 xl:whitespace-nowrap">{markerData.location}</p>
            </li>
            <li className="text-xl md:text-3xl text-lightRed font-titles font-medium flex items-start">
              date:
              <p className="max-xl:max-w-48 text-[19px] md:text-[28px] text-darkBlue font-txt pl-1 xl:whitespace-nowrap">{markerData.date}</p>
            </li>
          </ul>
          <Link
            className="octagon-tickets flex items-center justify-center bg-darkBlue"
            href={`/tickets/${markerData.event.replace(/\s+/g, "-").toLowerCase()}`}
          >
            <p className="text-center text-3xl md:text-[42px] font-titles text-lightRed">+ info</p>
          </Link>
        </div>
      </div>
    ),
    []
  );

  return (
    <MainDiv className={"h-dvh"}>
      <Map zoom={5} maxZoom={9} center={mapCenter} gestureHandling={"greedy"} disableDefaultUI={true} id={"MapOTS"} restriction={restrictions}>
        {coreLibrary &&
          markersList.map((m) => (
            <Fragment key={m.id}>
              <Marker
                position={m.markerPosition}
                onClick={() => handleMarkerClick(m.id, m.markerPosition)}
                icon={{
                  path: coreLibrary.SymbolPath.CIRCLE,
                  fillColor: "#dd3254",
                  fillOpacity: 1.0,
                  scale: markerIconScale,
                  strokeColor: "#dd3254",
                  strokeWeight: 0.5,
                }}
              />

              <CustomPopup position={m.markerPosition} isVisible={activeMarkerId === m.id} isTransitioning={isTransitioning}>
                {createPopupContent(m)}
              </CustomPopup>
            </Fragment>
          ))}
      </Map>
    </MainDiv>
  );
};

export default Maps;
