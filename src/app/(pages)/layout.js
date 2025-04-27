import "../globals.css";
import localFont from "next/font/local";
import PagesWrapper from "@/wrappers/PagesWrapper";

const khmer_mn = localFont({
  src: "../../../public/fonts/Times-Sans-Serif.ttf",
  subsets: ["latin"],
  variable: "--font-txt",
  display: "swap",
});

const royale_signage = localFont({
  src: "../../../public/fonts/RoyalSignage-Regular.ttf",
  subsets: ["latin"],
  variable: "--font-titles",
  display: "swap",
});
const din_condensed = localFont({
  src: "../../../public/fonts/DIN-Condensed-Bold.ttf",
  subsets: ["latin"],
  variable: "--font-numbers",
  display: "swap",
});

export const metadata = {
  title: {
    template: "%s | OTS",
    default: "OTS",
  },
  metadataBase: "https://www.oldtimesailors.com/",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${khmer_mn.variable} ${royale_signage.variable} ${din_condensed.variable} bg-beigePattern`}>
        <PagesWrapper>{children}</PagesWrapper>
      </body>
    </html>
  );
}
