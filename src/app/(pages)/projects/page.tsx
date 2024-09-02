import { Pane } from "@/(components)/pane";
import { getSectionGroups, getContent } from "@/(meta)/meta";

export default function Projects() {
  return (
    <div className="content">
      <Pane
        sectionGroups={getSectionGroups("projects")}
        content={getContent("projects")}
      ></Pane>
    </div>
  );
}
