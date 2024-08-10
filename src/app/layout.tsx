// Types:
import type { Metadata } from "next";

// Styles and fonts:
import "./styles/globals.css";
import { jetBrains, plexSerif, plexSans } from "./styles/fonts";

// Components:
import { Header } from "./(components)/components";

// Meta:
import { getPages } from "./meta";

export const metadata: Metadata = {
  title: "Brandon | Portfolio",
  description: "The personal portfolio website for Brandon Barham, branbarh.com.",
  icons: {
    icon: "/assets/favicon.ico"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${jetBrains.variable} ${plexSerif.variable} ${plexSans.variable}`}
    >
      <body>
        <div className="background">
          <div className="backgroundBase"></div>
          <div className="backgroundImage"></div>
          <div className="backgroundTint"></div>
          <div className="backgroundInsetShadow"></div>
          <div className="backgroundGrain"></div>
        </div>
        <div className="layout">
          <Header pages={getPages()} />
          {children}
        </div>
      </body>
    </html>
  );
}
