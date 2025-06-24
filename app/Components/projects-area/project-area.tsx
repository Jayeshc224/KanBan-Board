import { Card } from "@/components/ui/card";
import ProjectAreaHeader from "./project-area-header/project-area-header";
import ProjectAreaBoard from "./project-area-tasks-board/project-area-board";
import RightSideBar from "../right-side-bar/right-side-bar";

export default function ProjectsArea() {
    return (
      <div className="flex gap-6 w-full">
        <Card className="shadow-none p-7 rounded-3xl px-7 flex flex-col gap-8 flex-1 min-w-0" >
          <ProjectAreaHeader />
          <ProjectAreaBoard />
        </Card>
        <div className="w-80 flex-shrink-0">
          <RightSideBar/>
        </div>
      </div>
    )
}

