import styles from "../styles/components.module.css";
import { Fragment } from "react";
import Image from "next/image";

// Meta:
import { getSocials, type Social } from "../meta";

type HeaderProps = {
  pages: string[];
};
type FooterProps = {
  toRenderSocials: boolean;
};

export function Header({ pages }: HeaderProps) {
  return (
    <div className={styles.header}>
      {pages.map((pageName, i) => {
        return (
          <Fragment key={i}>
            <a
              className={styles.headerLink}
              href={pageName === "Home" ? "/" : `/${pageName.toLowerCase()}`}
            >
              {pageName}
            </a>
            {/* Display a dot between header link elements: */}
            {i != pages.length - 1 ? <div className={styles.dot}></div> : <></>}
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
