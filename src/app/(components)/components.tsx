"use client";

import styles from "@/styles/components.module.css";
import { Fragment, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

// Meta:
import { getPages, getFooterSocials } from "@/(meta)/meta";
import { type HeaderProps, type FooterProps, type TypeableProps, LargeTextProps } from "@/(meta)/types";
import { escapeString } from "@/(meta)/util";

export function Header({ pageMeta }: HeaderProps) {
  const pathname = usePathname();

  // Scroll to center the current page on path change:
  useEffect(() => {
    // Get the link element to center (and the header element):
    const name = getPages().pathToName[pathname];
    const linkElm = document.querySelector<HTMLElement>(`[data-text="${name}"]`);
    const header = document.querySelector<HTMLElement>(`.${styles.header}`);

    // Calculate the scroll position to center the link element:
    const linkCenter = (linkElm?.offsetLeft || 0) + (linkElm?.offsetWidth || 0) / 2;
    const windowCenter = window.innerWidth / 2;
    const scrollTo = linkCenter - windowCenter;

    // Scroll to center the link element:
    if (!header) return;
    header.scrollTo({
      left: scrollTo,
      behavior: "smooth"
    });
  }, [pathname]);

  return (
    <div className={styles.header}>
      {pageMeta.pages.map((page, i) => {
        return (
          <Fragment key={i}>
            <Link
              className={`${styles.headerLink} ${pathname === page.path ? styles.headerLinkActive : ""}`}
              href={page.path}
              data-text={page.name}
              prefetch={true}
            >
              {page.name}
            </Link>
            {/* Display a dot between header link elements: */}
            {i != pageMeta.pages.length - 1 ? <div className="dot"></div> : <></>}
          </Fragment>
        );
      })}
    </div>
  );
}

export function Footer({ toRenderSocials }: FooterProps) {
  return (
    <div className={styles.footer}>
      {toRenderSocials ? (
        getFooterSocials().map((social, i) => {
          return (
            <a
              key={i}
              className={styles.footerLink}
              href={social.href}
              target="_blank"
            >
              <Image
                src={social.iconSrc}
                alt={social.name}
                width={25}
                height={25}
              />
            </a>
          );
        })
      ) : (
        <></>
      )}
    </div>
  );
}

export function Typeable({ align, text }: TypeableProps) {
  // Animation parameters:
  const startDelay = 220; // The delay before the animation should begin (first blink of the cursor ("|") will be at {startDelay + blinkRate})
  const blinkRate = 530; // Supposedly the Windows default, according to ChatGPT
  const blinkCountStart = 2; // The number of times to blink before beginning to type
  const blinkCountEnd = 4; // The number of times to blink after finishing typing
  const typeRate = 120; // The base rate at which the text should be typed (120 = 100 WPM)
  const typeRandomness = 50; // The maximum random offset for the type rate at each step

  // Use hooks:
  const [currentText, setCurrentText] = useState("");
  const [currentState, setCurrentState] = useState("initial");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    let formattedText = `${text.split(" ").join("\u00A0")}\u00A0`;
    switch (currentState) {
      // Initial state:
      case "initial":
        timeout = setTimeout(() => {
          setCurrentState("blinkStart");
        }, startDelay);
        break;

      // Blink start state:
      case "blinkStart":
        timeout = setTimeout(() => {
          setCurrentText((prevText) => {
            return prevText === "|" ? "\u00A0" : "|";
          });
          setCurrentIndex((prevIndex) => prevIndex + 1);
          if (currentIndex >= 2 * blinkCountStart - 2) {
            setCurrentText("|");
            setCurrentIndex(0);
            setCurrentState("type");
          }
        }, blinkRate);
        break;

      // Typing state:
      case "type":
        timeout = setTimeout(() => {
          if (currentIndex >= formattedText.length) {
            setCurrentIndex(0);
            setCurrentState("blinkEnd");
            return;
          }
          setCurrentText((prevText) => `${prevText.slice(0, -1)}${formattedText[currentIndex]}|`);
          setCurrentIndex((prevIndex) => prevIndex + 1);
        }, typeRate + 2 * (Math.random() - 0.5) * typeRandomness);
        break;

      // Blink end state:
      case "blinkEnd":
        timeout = setTimeout(() => {
          setCurrentText((prevText) => {
            return prevText.at(-1) === "|" ? `${formattedText}\u00A0` : `${formattedText}|`;
          });
          setCurrentIndex((prevIndex) => prevIndex + 1);
          if (currentIndex >= 2 * blinkCountEnd - 1) {
            setCurrentIndex(0);
            setCurrentState("final");
          }
        }, blinkRate);
        break;
    }

    // Always clear the timeout on re-render:
    return () => clearTimeout(timeout);
  }, [currentState, currentIndex, text]);

  return <div className={`${styles.textType} ${align === "left" ? styles.alignLeft : styles.alignRight}`}>{currentText}</div>;
}

export function LargeText({ spacer, letterSpacing, textFull, textSlim }: LargeTextProps) {
  return (
    <div className={styles.textLargeContainer}>
      {spacer ? <div className={styles.textLargeSpacer}></div> : ""}
      <div className={`${styles.textLarge} ${letterSpacing ? "" : styles.textLargeNoSpacing} ${styles.textLargeFull}`}>{escapeString(textFull)}</div>
      <div className={`${styles.textLarge} ${letterSpacing ? "" : styles.textLargeNoSpacing} ${styles.textLargeSlim}`}>{escapeString(textSlim)}</div>
    </div>
  );
}
