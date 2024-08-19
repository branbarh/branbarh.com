import { Pane } from "@/app/(components)/pane";
import { getSectionGroups, getContent } from "@/app/(meta)/meta";

export default function Experience() {
  return (
    <div className="content">
      <Pane
        sectionGroups={getSectionGroups("experience")}
        content={getContent("experience")}
      ></Pane>
    </div>
  );
}
