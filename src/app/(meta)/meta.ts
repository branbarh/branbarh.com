export type Page = {
  name: string;
  path: string;
};

export type PageMeta = {
  pages: Page[];
  nameToPath: { [key: string]: string };
  pathToName: { [key: string]: string };
};

export function getPages(): PageMeta {
  // Get the list of page names and routes:
  // [TODO] Hard-coded for now until MongoDB is setup:
  const pages: Page[] = [
    {
      name: "Home",
      path: "/"
    },
    {
      name: "About",
      path: "/about"
    },
    {
      name: "Experience",
      path: "/experience"
    },
    {
      name: "Projects",
      path: "/projects"
    },
    {
      name: "Skills",
      path: "/skills"
    },
    {
      name: "Connect",
      path: "/connect"
    }
  ];

  // Generate name/route conversion maps:
  let nameToPath: { [key: string]: string } = {};
  let pathToName: { [key: string]: string } = {};
  for (let i = 0; i < pages.length; i++) {
    nameToPath[pages[i].name] = pages[i].path;
    pathToName[pages[i].path] = pages[i].name;
  }

  return {
    pages,
    nameToPath,
    pathToName
  };
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
