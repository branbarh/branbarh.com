// Import Google Fonts:
import { IBM_Plex_Sans, IBM_Plex_Serif, JetBrains_Mono } from "next/font/google";

// Define variable fonts:
const jetBrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap"
});

// Define weighted non-variable fonts:
const plexSerif = IBM_Plex_Serif({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-plex-serif",
  display: "swap"
});
const plexSans = IBM_Plex_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-plex-sans",
  display: "swap"
});

// Export fonts for use throughout the application:
export { jetBrains, plexSerif, plexSans };
