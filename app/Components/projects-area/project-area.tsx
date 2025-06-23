import { Card } from "@/components/ui/card";
import ProjectAreaHeader from "./project-area-header/project-area-header";
import ProjectAreaBoard from "./project-area-tasks-board/project-area-board";

export default function ProjectsArea() {
    return (
      <Card className="shadow-none p-7 rounded-3xl px-7 flex flex-col gap-8" >
        <ProjectAreaHeader />
        <ProjectAreaBoard />
      </Card>
    )
}

