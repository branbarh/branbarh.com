// Type imports:
import type { Metadata } from "next";

// Style imports:
import "./styles/globals.css";
import { jetBrains, plexSerif, plexSans } from "./styles/fonts";

// Component imports:
import { Header } from "./(components)/components";
import { Content } from "./(components)/content";

// Meta imports:
import { getPages } from "./(meta)/meta";

// Website metadata:
export const metadata: Metadata = {
  title: "Brandon | Portfolio",
  description: "The personal portfolio website for Brandon Barham, branbarh.com.",
  icons: {
    icon: "/assets/favicon.ico"
  }
};

// Root layout:
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
          <Header pageMeta={getPages()} />
          <Content>{children}</Content>
        </div>
      </body>
    </html>
  );
}
