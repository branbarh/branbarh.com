import { Pane } from "@/(components)/pane";
import { getSectionGroups, getContent } from "@/(meta)/meta";

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
