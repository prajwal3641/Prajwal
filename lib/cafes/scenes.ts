export interface SceneLevel {
  tileSize: number;
  size: number;
  fallbackOnly?: boolean;
}

export interface LinkHotspot {
  yaw: number;
  pitch: number;
  rotation: number;
  target: string;
}

export interface InfoHotspot {
  yaw: number;
  pitch: number;
  title: string;
  text: string;
}

export interface SceneConfig {
  id: string;
  name: string;
  description: string;
  previewImage: string;
  levels: SceneLevel[];
  faceSize: number;
  initialViewParameters: { pitch: number; yaw: number; fov: number };
  linkHotspots: LinkHotspot[];
  infoHotspots: InfoHotspot[];
}

const BASE = "/cafes/coffee-studios";

export const SCENES: SceneConfig[] = [
  {
    id: "0-1-entrance",
    name: "Entrance",
    description: "Welcome — step inside",
    previewImage: `${BASE}/images/1-Entrance.jpg`,
    levels: [
      { tileSize: 256, size: 256, fallbackOnly: true },
      { tileSize: 512, size: 512 },
    ],
    faceSize: 443.5,
    initialViewParameters: { pitch: 0, yaw: 0, fov: 1.5707963267948966 },
    linkHotspots: [
      { yaw: 2.3403681292878815, pitch: -0.008680023294751038, rotation: 0, target: "1-3-rooftop" },
      { yaw: 0.9417271397976883, pitch: -0.0492200371048952, rotation: 4.71238898038469, target: "3-5-kitchen" },
    ],
    infoHotspots: [
      { yaw: 0.05,  pitch: 0.08,  title: "Espresso Bar",  text: "Single-origin espresso pulled fresh every 20 minutes. Ask your barista for today's origin." },
      { yaw: -1.3,  pitch: -0.05, title: "Daily Menu",    text: "House-made pastries baked every morning — croissants, muffins, and seasonal specials until 3pm." },
    ],
  },
  {
    id: "1-3-rooftop",
    name: "Rooftop",
    description: "Open-air rooftop seating",
    previewImage: `${BASE}/images/3-rooftop.jpg`,
    levels: [
      { tileSize: 256, size: 256, fallbackOnly: true },
      { tileSize: 512, size: 512 },
    ],
    faceSize: 443.5,
    initialViewParameters: { pitch: 0, yaw: 0, fov: 1.5707963267948966 },
    linkHotspots: [
      { yaw: -1.9801736012290156, pitch: 0.5951411232327022, rotation: 0.7853981633974483, target: "0-1-entrance" },
      { yaw: 0.37764326391827296, pitch: -0.12035894495130606, rotation: 5.497787143782138, target: "2-4-roof-room" },
    ],
    infoHotspots: [
      { yaw: 1.6, pitch: 0.05, title: "Open-Air Seating", text: "42 seats with a panoramic city view. Open daily from 10am until sunset, weather permitting." },
    ],
  },
  {
    id: "2-4-roof-room",
    name: "Roof Room",
    description: "Private rooftop lounge",
    previewImage: `${BASE}/images/Cafe-Main.jpg`,
    levels: [
      { tileSize: 256, size: 256, fallbackOnly: true },
      { tileSize: 512, size: 512 },
    ],
    faceSize: 443.5,
    initialViewParameters: { pitch: 0, yaw: 0, fov: 1.5707963267948966 },
    linkHotspots: [
      { yaw: -3.1199717407768155, pitch: 0.025998613039718066, rotation: 0.7853981633974483, target: "1-3-rooftop" },
    ],
    infoHotspots: [
      { yaw: 0.9, pitch: 0.0, title: "Private Lounge", text: "Available for bookings of 8–20 guests. Contact hello@artisanbean.co to reserve your date." },
    ],
  },
  {
    id: "3-5-kitchen",
    name: "Kitchen",
    description: "Where the magic is made",
    previewImage: `${BASE}/images/5-Kitchen.jpg`,
    levels: [
      { tileSize: 256, size: 256, fallbackOnly: true },
      { tileSize: 512, size: 512 },
    ],
    faceSize: 443.5,
    initialViewParameters: { pitch: 0, yaw: 0, fov: 1.5707963267948966 },
    linkHotspots: [
      { yaw: 0.3756572349628282, pitch: -0.07713150035311855, rotation: 0, target: "0-1-entrance" },
    ],
    infoHotspots: [
      { yaw: -0.6, pitch: 0.05, title: "In-House Roastery", text: "Beans roasted every Wednesday on-site. Ask your barista for the current roast tasting notes." },
    ],
  },
];
