export type Page = {
  name: string;
  path: string;
};

export type PageMeta = {
  pages: Page[];
  nameToPath: { [key: string]: string };
  pathToName: { [key: string]: string };
};

export type Social = {
  name: string;
  iconSrc: string;
  href: string;
};

export type HeaderProps = {
  pageMeta: PageMeta;
};
export type FooterProps = {
  toRenderSocials: boolean;
};
export type TypeableProps = {
  align: "left" | "right";
  text: string;
};
export type LargeTextProps = {
  spacer: boolean;
  letterSpacing: boolean;
  textFull: string;
  textSlim: string;
};

interface SectionBase {
  name: string;
}
interface SectionFragmentID extends SectionBase {
  href?: never;
  fragmentID: string;
}
interface SectionHref extends SectionBase {
  href: string;
  fragmentID?: never;
}
export type Section = SectionFragmentID | SectionHref;
export type SectionProps = {
  name: string;
  href?: string;
  fragmentID?: string;
  active: boolean;
};

export type SectionGroup = {
  name: string;
  sections: Section[];
};

export type HeaderData = { value: string; fragmentID: string };
export type PhotoHeaderData = { value: string; fragmentID: string; photo: PhotoData };
export type PhotoData = { src: string; alt: string };
export type PhotoGroupData = { photos: PhotoData[] };
export type TextData = { value: string };
export type BulletData = { bullets: string[] };
export type SpacerData = {};
export type ContentHeader = { type: "header"; data: HeaderData };
export type ContentPhotoHeader = { type: "photoHeader"; data: PhotoHeaderData };
export type ContentPhotoGroup = { type: "photoGroup"; data: PhotoGroupData };
export type ContentText = { type: "text"; data: TextData };
export type ContentBullet = { type: "bullet"; data: BulletData };
export type ContentSpacer = { type: "spacer"; data: SpacerData };
export type Content = ContentHeader | ContentPhotoHeader | ContentPhotoGroup | ContentText | ContentBullet | ContentSpacer;

export type PaneProps = {
  sectionGroups: SectionGroup[];
  content: Content[];
};
