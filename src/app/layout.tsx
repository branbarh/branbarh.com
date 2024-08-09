
// Types:
import type { Metadata } from "next";

// Styles and fonts:
import "./styles/globals.css";
import { jetBrains, plexSerif, plexSans } from "./styles/fonts";

export const metadata: Metadata = {
  title: "Brandon | Portfolio",
  description: "The personal portfolio website for Brandon Barham, branbarh.com.",
  icons: {
    icon: "/assets/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jetBrains.variable} ${plexSerif.variable} ${plexSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
