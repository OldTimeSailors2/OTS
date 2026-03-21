/**
 * Mock data for the Services page.
 *
 * Shape matches the JSON feed consumed by fetchServices() + normalizeService(),
 * and the fields expected by ServicesDisplay (id, paragraph, images[]).
 *
 * To use:  import { MOCK_SERVICES } from "@/mocks/services";
 *          // replace the fetchServices() call with this array during dev
 */

/**
 * Creates a mock Strapi-style image entry.
 * Uses `localPath` (a /assets/… route) when provided;
 * falls back to a placehold.co URL so every slot always has an image.
 *
 * @param {number} id
 * @param {string} slug   - label for the placeholder fallback
 * @param {string|null} localPath - e.g. "/assets/powerPhoto1.webp"
 */
const mockImage = (id, slug, localPath = null) => {
  const fallback = (size) =>
    localPath ?? `https://placehold.co/${size}/1a1a2e/1a1a2e?text=${slug}`;
  return {
    id,
    blurDataURL: null,
    attributes: {
      url: fallback("800x800"),
      formats: {
        small:  { url: fallback("400x400") },
        medium: { url: fallback("600x600") },
        xl:     { url: fallback("800x800") },
      },
    },
  };
};

/** @type {Array<{ id: string, title: string, description: string, icon: string, paragraph: string, images: object[] }>} */
export const MOCK_SERVICES = [
  {
    id: "our-show",
    title: "Our Show",
    description: "A high-energy live seafaring experience.",
    icon: "/assets/icon-show.svg",
    paragraph: `
      <p>A regular Old Time Sailors show includes up to 3 hours of live music by a highly rehearsed crew of 18 to 20 musicians.</p>
      <p>Two shows for diferent ocasions:
      <ul>
        <li>A <strong>Family show</strong> for everyone</li>
        <li>A <strong>Power show</strong> for ravers</li>
      </ul>
      <p>Full self contained. Includes <strong>PA, sound crew, lights, props, deco, special effects machines</strong>, and more.</p>
      <p><strong>Available all over the World.</strong></p>
    `,
    images: [
      mockImage(1,  "  ", "/assets/powerPhoto1.webp"),
      mockImage(2,  "  ", "/assets/powerPhoto2.webp"),
      mockImage(3,  "  ", "/assets/powerPhoto3.webp"),
      mockImage(4,  "  ", "/assets/powerPhoto4.jpg"),
    ],
  },
  {
    id: "festival-and-event-organization",
    title: "Festival & Event Organization",
    description: "End-to-end event production with a nautical twist.",
    icon: "/assets/icon-festival.svg",
    paragraph: `
      <h3><strong> TIDE OVER FESTIVALS</strong></h3> 
      <p>We help organize festivals and all sorts of events!</p>
      <p>Our own <strong>Tide Over Festival</strong>, a <strong>1000 capacity event</strong>, joint effort between us and <strong>Morwellham Quay</strong>.</p>
      
      <p>Lovely family festival by the <strong>Tamar River where two shires meet.</strong></p>
    `,
    images: [
      mockImage(5,  "  ", "/assets/familyPhoto1.webp"),
      mockImage(6,  "  ", "/assets/familyPhoto2.webp"),
      mockImage(7,  "  ", "/assets/familyPhoto3.webp"),
      mockImage(8,  "  "),
    ],
  },
  {
    id: "hms-warrior",
    title: "HMS Warrior",
    description: "Exclusive experiences aboard a historic warship.",
    icon: "/assets/icon-warrior.svg",
    paragraph: `
      <p><strong>12 metres long, 2.5 metres wide, 6 metres maximum height (adaptable).
Weight: 16 tons.</strong></p>
      <p>Stage size: <strong>foldable pop-up stage</strong> for maximum size <strong>5 metres by 7 metres</strong>.</p>
      <p>HMS Warrior is our <strong>flagship portable live sound system</strong>.</p>
      <p>It's literally a <strong> pop up and play system</strong>.</p>
      <p><strong>4 wheel drive</strong>, it can battle through mud and rain.</p>
      <p>The <strong>surprise factor is massive</strong>, and it carries a <strong>line array sound system</strong> with enough sound for <strong>up to 3500 punters.</strong></p>
      <p>The Warrior also comes with <strong>lights and special effects</strong>, any.</p>
    `,
    images: [
      mockImage(9,  "  ", "/assets/reviews.webp"),
      mockImage(10, "  ", "/assets/view-selector-image.JPEG"),
      mockImage(11, "."),
      mockImage(12, "  "),
    ],
  },
  {
    id: "music-agency",
    title: "Music Agency",
    description: "Booking and management for maritime folk acts.",
    icon: "/assets/icon-music.svg",
    paragraph: `
      <p>Elevate your events and projects with our <strong>exceptional music agency.</strong></p>
      <p>From live <strong>performances to studio recordings</strong>, our diverse talent pool and professional excellence ensure <strong>unforgettable experiences.</strong></p>
      <p>Contact us now to transform your vision into a <strong>harmonious reality.</strong></p>
    `,
    images: [
      mockImage(13, "  "),
      mockImage(14, "  "),
      mockImage(15, "  "),
      mockImage(16, "  "),
    ],
  },
  {
    id: "festival-within-a-festival",
    title: "Festival Within a Festival",
    description: "A self-contained nautical stage for your event.",
    icon: "/assets/icon-fwf.svg",
    paragraph: `
      <p>We have the best <strong>Vintage Remix Retro Area</strong> for your festival.</p>
      <p>A perfect mix of ingredients to reach an <strong>Old Time area combining Circus and Victorian vibes.</strong></p>
      <p>Includes:</p>
      <ul>
        <li>Big Top</li>
        <li>Circus Programming</li>
        <li>Street Performances</li>
        <li>Re-enactors</li>
        <li>Themed games</li>
      </ul>
    `,
    images: [
      mockImage(17, "  ", "/assets/familyPhoto1.webp"),
      mockImage(18, "  ", "/assets/familyPhoto2.webp"),
      mockImage(19, "  ", "/assets/familyPhoto3.webp"),
      mockImage(20, "  "),
    ],
  },
  {
    id: "pirate-props-and-games",
    title: "Pirate Props & Games",
    description: "Hire authentic-looking props and interactive games.",
    icon: "/assets/icon-props.svg",
    paragraph: `
      <p>Transform your events into <strong>swashbuckling spectacles!</strong></p>
      <p>Our pirate props, from <strong>treasure chests to ship décor</strong>, guarantee an <strong>immersive experience.</strong></p>
      <p>Contact us to bring the <strong>spirit of the high seas</strong> to your next gathering.</p>
      <p><strong>Arr matey, let the adventures begin!</strong></p>
    `,
    images: [
      mockImage(21, "  "),
      mockImage(22, "  "),
      mockImage(23, "  "),
      mockImage(24, "  "),
    ],
  },
];
