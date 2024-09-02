import { Pane } from "@/(components)/pane";
import { getSectionGroups, getContent } from "@/(meta)/meta";

export default function Skills() {
  return (
    <div className="content">
      <Pane
        sectionGroups={getSectionGroups("skills")}
        content={getContent("skills")}
      ></Pane>
    </div>
  );
}
