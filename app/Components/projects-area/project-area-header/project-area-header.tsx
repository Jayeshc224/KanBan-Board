import { MdOutlineSortByAlpha } from "react-icons/md";
import { useState } from "react";
import SortingDropDown from "../../drop-downs/sorting-drop-down";
import { Button } from "@/components/ui/button";
import TaskDialog from "../../window-dialog/task-dialog/task-dialog";

export default function ProjectAreaHeader() {
    const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);

    return (
       <div className="flex justify-between items-center">
         <div className="flex items-center gap-3">
            <span className="text-2xl font-bold">Projects</span>
         </div>
         <div className="flex items-center gap-3">
            <MdOutlineSortByAlpha className="text-xl text-gray-500" />
            <span className="text-sm text-gray-500">Sort </span>
            <SortingDropDown />
            <Button 
                className="rounded-3xl px-4 text-white" 
                onClick={() => setIsTaskDialogOpen(true)}
            >
                Add Task
            </Button>
            <TaskDialog 
                open={isTaskDialogOpen} 
                onOpenChange={setIsTaskDialogOpen} 
            />
         </div>
       </div>
    )
}
