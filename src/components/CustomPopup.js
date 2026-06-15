"use client";

import { useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";

const CustomPopup = ({ position, children, isVisible, isTransitioning }) => {
  const containerDiv = useMemo(() => document.createElement("div"), []);
  const bubbleAnchor = useMemo(() => document.createElement("div"), []);

  const map = useMap("MapOTS");
  const mapsLibrary = useMapsLibrary("maps");
  const coreLibrary = useMapsLibrary("core");

  // Base DOM + no bloquear mapa
  useEffect(() => {
    containerDiv.className = "popup-container";
    bubbleAnchor.className = "popup-bubble-anchor";

    if (!containerDiv.contains(bubbleAnchor)) {
      containerDiv.appendChild(bubbleAnchor);
    }
  }, [containerDiv, bubbleAnchor]);

  // Overlay estable (1 vez)
  useEffect(() => {
    if (!map || !mapsLibrary || !coreLibrary) return;

    const overlay = new mapsLibrary.OverlayView();

    overlay.onAdd = function () {
      this.getPanes().floatPane.appendChild(containerDiv);
    };

    overlay.draw = function () {
      const proj = this.getProjection();
      if (!proj) return;

      const divPosition = proj.fromLatLngToDivPixel(
        new coreLibrary.LatLng(position.lat, position.lng)
      );
      if (!divPosition) return;

      containerDiv.style.left = divPosition.x + "px";
      containerDiv.style.top = divPosition.y + "px";
    };

    overlay.onRemove = function () {
      if (containerDiv.parentElement) {
        containerDiv.parentElement.removeChild(containerDiv);
      }
    };

    overlay.setMap(map);

    return () => overlay.setMap(null);
  }, [map, mapsLibrary, coreLibrary, position.lat, position.lng, containerDiv]);

  // Visible / invisible
  useEffect(() => {
    if (!isVisible) {
      containerDiv.style.opacity = "0";
      containerDiv.style.visibility = "hidden";
      containerDiv.style.pointerEvents = "none";

      if (bubbleAnchor.firstChild) bubbleAnchor.firstChild.classList.remove("seeable");
      bubbleAnchor.classList.remove("seeable");
      return;
    }

    containerDiv.style.visibility = "visible";
    containerDiv.style.opacity = "1";
    containerDiv.style.pointerEvents = "none"; // contenedor nunca captura

    const addingDuration = !isTransitioning ? 0 : 200;
    setTimeout(() => {
      if (bubbleAnchor.firstChild) bubbleAnchor.firstChild.classList.add("seeable");
      bubbleAnchor.classList.add("seeable");
    }, addingDuration);
  }, [isVisible, isTransitioning, containerDiv, bubbleAnchor]);

  return createPortal(children, bubbleAnchor);
};

export default CustomPopup;