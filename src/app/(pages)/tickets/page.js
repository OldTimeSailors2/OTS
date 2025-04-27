import TicketsComponent from "@/components/tickets-client";
import ViewSelector from "@/components/ViewSelector";

export const metadata = {
  title: "Tickets",
  description: "Find out where are we playing next",
  openGraph: {
    title: "Tickets",
    description: "Find out where are we playing next",
    images: [
      {
        url: "/assets/opengraph-image.png",
        alt: "Old Time Sailors",
      },
    ],
  },
};

const Tickets = () => {
  return (
    <ViewSelector />
    // <TicketsComponent/>
  );
};

export default Tickets;
