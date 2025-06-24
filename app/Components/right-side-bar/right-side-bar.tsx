import { Card } from "@/components/ui/card";
import ProjectSelectionDropdown from "../drop-downs/project-selection/project-selection";
import CircularProgress from "./circular-progress";
import TaskStats from "./task-stats";





export default function RightSideBar() {
    return (
        <Card className="shadow-none p-6 rounded-3xl h-full">
            <div className="flex flex-col gap-4 h-full">
                <ProjectSelectionDropdown/>
                <CircularProgress/>
                <TaskStats/>
            </div>
            
        </Card>
    )
}