"use client";

import { ReactNode, useEffect, useState } from "react";
import Image from "next/image";
import styles from "@/styles/pane.module.css";
import componentStyles from "@/styles/components.module.css";

import { type PaneProps, type HeaderData, type PhotoHeaderData, type PhotoGroupData, type TextData, type BulletData, type SpacerData, type SectionGroup, type SectionProps } from "@/(meta)/types";
import useFragmentID from "@/(hooks)/fragmentID";

function PaneSection({ name, href, fragmentID, active }: SectionProps) {
  return (
    <div className={`${styles.paneSection} ${active ? styles.active : ""}`}>
      <div className={styles.paneSectionDot}></div>
      <div className={styles.paneSectionName}>
        <a
          href={href ? href : `#${fragmentID}`}
          target={href ? "_blank" : "_self"}
        >
          {name}{" "}
          {href ? (
            <Image
              src="/assets/icons/external.svg"
              alt="External Link"
              width={14}
              height={14}
            />
          ) : (
            ""
          )}
        </a>
      </div>
    </div>
  );
}

function PaneSectionGroup({ name, sections }: SectionGroup) {
  const activateBefore = 25;
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const layout = document.querySelector<HTMLElement>(".layout");
    const pane = document.querySelector<HTMLElement>(`.${styles.pane}`);
    const fragments = sections.map((section) => document.querySelector<HTMLElement>(`#${section.fragmentID}`));
    const onScroll = () => {
      const paneOffset = pane ? pane.offsetTop : 0;
      const fragmentOffsets = fragments.map((fragment) => (fragment ? fragment.offsetTop : 0));
      const scrollOffset = layout ? layout.scrollTop : 0;
      const offsetDiffs = fragmentOffsets.map((fragmentOffset) => paneOffset + fragmentOffset - scrollOffset - activateBefore);
      let maxAS = 0;
      for (let i = 1; i < offsetDiffs.length; i++) {
        if (fragments[i] && offsetDiffs[i] <= 0) maxAS = i;
      }
      setActiveSection(maxAS);
    };
    onScroll();
    layout?.removeEventListener("scroll", onScroll);
    layout?.addEventListener("scroll", onScroll, { passive: true });
    return () => layout?.removeEventListener("scroll", onScroll);
  }, [sections]);

  return (
    <div className={styles.paneSectionGroup}>
      <div className={styles.paneSectionGroupName}>{name}</div>
      {sections.map((section, i) => {
        return (
          <PaneSection
            key={i}
            name={section.name}
            href={section.href}
            fragmentID={section.fragmentID}
            active={(section.fragmentID ? true : false) && i == activeSection}
          />
        );
      })}
    </div>
  );
}

function PaneContentScrollProgress() {
  const [scrollFraction, setScrollFraction] = useState(0);

  useEffect(() => {
    const layout = document.querySelector<HTMLElement>(".layout");
    const onScroll = () => {
      const scroll = layout ? layout.scrollTop : 0;
      const layoutHeight = layout ? layout.scrollHeight - layout.offsetHeight : 1;
      const scrollFrac = Math.min(scroll / layoutHeight, 1);
      setScrollFraction(scrollFrac);
    };

    layout?.removeEventListener("scroll", onScroll);
    layout?.addEventListener("scroll", onScroll, { passive: true });
    return () => layout?.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={styles.paneContentScrollProgressContainer}
      style={{ width: `${scrollFraction * 100}%` }}
    >
      <div className={styles.paneContentScrollProgress} />
    </div>
  );
}

function PaneHeader({ value, fragmentID }: HeaderData) {
  return (
    <div className={styles.paneHeaderContainer}>
      <div
        className={styles.paneHeader}
        id={fragmentID}
      >
        {value}
      </div>
      <div className={styles.paneHeaderFragmentLink}>
        <a href={`#${fragmentID}`}>
          <Image
            src="/assets/icons/link.svg"
            alt="Link"
            width={25}
            height={25}
          />
        </a>
      </div>
    </div>
  );
}

function PanePhotoHeader({ value, fragmentID, photo }: PhotoHeaderData) {
  return (
    <div className={styles.panePhotoHeader}>
      <div className={styles.paneHeaderContainer}>
        <div
          className={styles.paneHeader}
          id={fragmentID}
        >
          {value}
        </div>
        <div className={styles.paneHeaderFragmentLink}>
          <a href={`#${fragmentID}`}>
            <Image
              src="/assets/icons/link.svg"
              alt="Link"
              width={25}
              height={25}
            />
          </a>
        </div>
      </div>
      <div className={styles.panePhotoHeaderPhoto}>
        {/* The standard HTML <img> tag needs to be used here, since we are loading dynamic images (potetially from other hosts): */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={styles.panePhotoHeaderPhoto}
          src={photo.src}
          alt={photo.alt}
        ></img>
      </div>
    </div>
  );
}

function PanePhotoGroup({ photos }: PhotoGroupData) {
  return (
    <div className={styles.panePhotoGroup}>
      {photos.map((photo, i) => {
        return (
          <div
            key={i}
            className={styles.panePhoto}
          >
            {/* The standard HTML <img> tag needs to be used here, since we are loading dynamic images (potetially from other hosts): */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photo.src}
              alt={photo.alt}
            />
          </div>
        );
      })}
    </div>
  );
}

function PaneText({ value }: TextData) {
  return <div className={styles.paneText}>{value}</div>;
}

function PaneBullet({ bullets }: BulletData) {
  return (
    <div className={styles.paneBullet}>
      <ul>
        {bullets.map((bullet, i) => {
          return <li key={i}>{bullet}</li>;
        })}
      </ul>
    </div>
  );
}

function PaneSpacer({}: SpacerData) {
  return (
    <div className={styles.paneSpacer}>
      <div className={styles.paneSpacerBar} />
      <div className={styles.paneSpacerDot} />
      <div className={styles.paneSpacerDot} />
      <div className={styles.paneSpacerDot} />
      <div className={styles.paneSpacerBar} />
    </div>
  );
}

export function Pane({ sectionGroups, content }: PaneProps) {
  // Setup for dynamic pane item generation:
  interface PaneTypes {
    header: HeaderData;
    photoHeader: PhotoHeaderData;
    photoGroup: PhotoGroupData;
    text: TextData;
    bullet: BulletData;
    spacer: SpacerData;
  }
  const PaneComponents: { [K in keyof PaneTypes]: (arg: PaneTypes[K]) => ReactNode } = {
    header: PaneHeader,
    photoHeader: PanePhotoHeader,
    photoGroup: PanePhotoGroup,
    text: PaneText,
    bullet: PaneBullet,
    spacer: PaneSpacer
  };
  function GeneratePaneItem<K extends keyof PaneTypes>(itemType: K, itemData: PaneTypes[K]) {
    const paneItemGen = PaneComponents[itemType];
    return paneItemGen(itemData);
  }
  // Setup for fragment scrolling on page load:
  const fragmentID = useFragmentID();
  let [initialFragmentID, setInitialFragmentID] = useState(true);

  useEffect(() => {
    // Only scroll to the fragment specified by the URL's fragment ID if the page was just loaded:
    if (!initialFragmentID) return;
    setInitialFragmentID(false);

    // Check that the fragmentID is not empty:
    if (fragmentID === "") return;

    // Scroll to the fragment if the fragmentID is valid:
    const layout = document.querySelector<HTMLElement>(".layout");
    const header = document.querySelector<HTMLElement>(`.${componentStyles.header}`);
    const paneContent = document.querySelector<HTMLElement>(`.${styles.paneContent}`);
    const fragment = document.querySelector<HTMLElement>(`#${fragmentID}`);
    if (!layout || !header || !paneContent || !fragment) return;
    const paneOffset = header.offsetHeight;
    const fragmentOffset = fragment.offsetTop;
    const paneContentOffset = paneContent.offsetTop;
    const scrollTo = paneOffset + paneContentOffset + fragmentOffset; // [TODO] this scrolls just a little too far down (although I can't remember when this is the case???)
    layout.scrollTo({
      top: scrollTo,
      behavior: "smooth"
    });
  }, [initialFragmentID, fragmentID]);

  return (
    <div className={styles.pane}>
      <div className={styles.paneSidebar}>
        <div className={styles.paneSectionGroupContainer}>
          {sectionGroups.map((group, i) => (
            <PaneSectionGroup
              key={i}
              name={group.name}
              sections={group.sections}
            />
          ))}
        </div>
      </div>
      <div className={styles.paneContent}>
        <PaneContentScrollProgress />
        <div className={styles.paneContentItemContainer}>
          {content.map((item, i) => {
            return (
              <div
                key={i}
                className="paneContentItem"
              >
                {GeneratePaneItem(item.type, item.data)}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
