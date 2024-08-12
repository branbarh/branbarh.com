"use client";

import styles from "../styles/components.module.css";
import { Fragment } from "react";
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

export function Pane() {}
