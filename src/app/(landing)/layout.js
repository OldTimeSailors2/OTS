import localFont from "next/font/local";
import "./landing.css";
import LandingWrapper from "@/wrappers/LandingWrapper";

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

export const metadata = {
  title: "Old Time Sailors",
  description: "Old Time Sailors Website",
  metadataBase: "https://www.oldtimesailors.com/",
  openGraph: {
    title: "Old Time Sailors",
    description: "Our Band",
    images: [
      {
        url: "/assets/opengraph-image.png",
        alt: "Old Time Sailors",
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${khmer_mn.variable} ${royale_signage.variable}`}>
        <LandingWrapper>{children}</LandingWrapper>
      </body>
    </html>
  );
}
