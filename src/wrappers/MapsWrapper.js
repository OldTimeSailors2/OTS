"use client";

import { APIProvider } from "@vis.gl/react-google-maps";

const MapsWrapper = ({ children }) => {
  return <APIProvider apiKey={process.env.NEXT_PUBLIC_MAPS_API_KEY}>{children}</APIProvider>;
};

export default MapsWrapper;
