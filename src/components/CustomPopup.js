"use client";

import { useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";

const CustomPopup = ({ position, children, isVisible, isTransitioning }) => {
  const containerDiv = useMemo(() => document.createElement("div"), []);
  const bubbleAnchor = useMemo(() => document.createElement("div"), []);
  const map = useMap();
  const mapsLibrary = useMapsLibrary("maps");
  const coreLibrary = useMapsLibrary("core");

  useEffect(() => {
    if (!map || !mapsLibrary || !isVisible) return;

    // Assigning class names for styling
    containerDiv.className = "popup-container";
    bubbleAnchor.className = "popup-bubble-anchor";
    containerDiv.appendChild(bubbleAnchor);

    const addingDuration = !isTransitioning ? 0 : 200;
    const overlay = new mapsLibrary.OverlayView();

    overlay.onAdd = function () {
      this.getPanes().floatPane.appendChild(containerDiv);
      setTimeout(() => {
        bubbleAnchor.firstChild.classList.add("seeable");
        bubbleAnchor.classList.add("seeable");
      }, addingDuration);
    };

    overlay.draw = function () {
      const divPosition = this.getProjection().fromLatLngToDivPixel(
        new coreLibrary.LatLng(position.lat, position.lng),
      );

      containerDiv.style.left = divPosition.x + "px";
      containerDiv.style.top = divPosition.y + "px";
    };

    overlay.onRemove = function () {
      if (containerDiv.parentElement) {
        if (bubbleAnchor.firstChild) {
          bubbleAnchor.firstChild.classList.remove("seeable");
        }
        bubbleAnchor.classList.remove("seeable");
        setTimeout(
          () => containerDiv.parentElement.removeChild(containerDiv),
          200,
        );
      }
    };

    overlay.setMap(map);

    return () => {
      overlay.setMap(null);
    };
  }, [map, mapsLibrary, position, isVisible, containerDiv, bubbleAnchor]);

  return createPortal(children, bubbleAnchor);
};

export default CustomPopup;
