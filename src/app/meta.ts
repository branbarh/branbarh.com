export function getPages(): string[] {
  // [TODO] Hard-coded for now until MongoDB is setup:
  return ["Home", "About", "Experience", "Projects", "Skills", "Connect"];
}

export type Social = {
  name: string;
  iconSrc: string;
  href: string;
};

export function getSocials(): Social[] {
  return [
    {
      name: "LinkedIn",
      iconSrc: "/assets/linkedin.svg",
      href: "https://linkedin.com/in/branbarh"
    },
    {
      name: "Email",
      iconSrc: "/assets/gmail.svg",
      href: "mailto:branbarh@umich.edu"
    },
    {
      name: "GitHub",
      iconSrc: "/assets/github.svg",
      href: "https://github.com/branbarh"
    }
  ];
}
