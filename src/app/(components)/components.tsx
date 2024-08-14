"use client";

import styles from "../styles/components.module.css";
import { Fragment, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

// Meta:
import { getSocials, type Social, type Page, type PageMeta } from "../(meta)/meta";

type HeaderProps = {
  pageMeta: PageMeta;
};
type FooterProps = {
  toRenderSocials: boolean;
};
type TypeableProps = {
  text: string;
};

export function Header({ pageMeta }: HeaderProps) {
  const pathname = usePathname();
  return (
    <div className={styles.header}>
      {pageMeta.pages.map((page, i) => {
        return (
          <Fragment key={i}>
            <a
              className={`${styles.headerLink} ${pathname === page.path ? styles.headerLinkActive : ""}`}
              href={page.path}
              data-text={page.name}
            >
              {page.name}
            </a>
            {/* Display a dot between header link elements: */}
            {i != pageMeta.pages.length - 1 ? <div className={styles.dot}></div> : <></>}
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
        getSocials().map((social, i) => {
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

export function Typeable({ text }: TypeableProps) {
  const blinkRate = 530; // Supposedly the Windows default, according to ChatGPT
  const blinkCountStart = 3; // The number of times to blink before beginning to type
  const blinkCountEnd = 4; // The number of times to blink after finishing typing
  const typeRate = 120; // The base rate at which the text should be typed (120 = 100 WPM)
  const typeRandomness = 50; // The maximum random offset for the type rate at each step

  const [currentText, setCurrentText] = useState("|");
  const [currentState, setCurrentState] = useState("blinkStart");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    let formattedText = `${text.split(" ").join("\u00A0")}\u00A0`;
    switch (currentState) {
      case "blinkStart":
        timeout = setTimeout(() => {
          setCurrentText((prevText) => {
            return prevText === "|" ? "\u00A0" : "|";
          });
          setCurrentIndex((prevIndex) => prevIndex + 1);
          if (currentIndex >= 2 * blinkCountStart - 1) {
            setCurrentIndex(0);
            setCurrentState("type");
          }
        }, blinkRate);
        break;
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
    return () => clearTimeout(timeout);
  }, [currentState, currentIndex, text]);

  return <div className={styles.textType}>{currentText}</div>;
}

export function Pane() {}
