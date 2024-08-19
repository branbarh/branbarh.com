import { Pane } from "@/app/(components)/pane";
import { getSectionGroups, getContent } from "@/app/(meta)/meta";

export default function About() {
  return (
    <div className="content">
      <Pane
        sectionGroups={getSectionGroups("about")}
        content={getContent("about")}
      ></Pane>
    </div>
  );
}
