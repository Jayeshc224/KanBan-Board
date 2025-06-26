import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { BiTask } from "react-icons/bi";
import TaskName from "./sub-components/task-name";
import PriorityList from "./sub-components/priority-list";
import TaskDescription from "./sub-components/task-description";
import ProjectList from "./sub-components/project-list";

interface TaskDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function TaskDialog({ open, onOpenChange }: TaskDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="poppins max-w-4xl max-h-[90vh] overflow-y-auto">
               <DialogHeader className="pb-6">
                <div className="flex items-center gap-4">
                    <div className="size-12 bg-gray-200 rounded-full flex justify-center items-center">
                        <BiTask className="text-2xl text-gray-700" />
                    </div>
                    <div>
                        <DialogTitle className="text-2xl font-bold">New Task</DialogTitle>
                        <DialogDescription className="text-base mt-1">
                            Fill the form below to create a new task
                        </DialogDescription>
                    </div>
                </div>
                <Separator className="mt-6" />
               </DialogHeader>
               
               <div className="grid grid-cols-2 gap-8">
                <div className="flex flex-col gap-6">
                    <TaskName/>
                    <TaskDescription/>
                </div>
                <div className="flex flex-col gap-6">
                    <ProjectList/>
                    <PriorityList/>
                </div>
               </div>
               
               <div className="flex justify-end gap-4 pt-8 border-t mt-8">
                  <Button type="button" variant="secondary" onClick={() => onOpenChange(false)}>
                    Cancel
                  </Button>
                  <Button className="px-8">
                    Create Task
                  </Button>
               </div>
            </DialogContent>
        </Dialog>
    )
}