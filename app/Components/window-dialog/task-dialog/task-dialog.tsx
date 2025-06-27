import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { BiTask } from "react-icons/bi";
import { useState } from "react";
import TaskName from "./sub-components/task-name";
import PriorityList from "./sub-components/priority-list";
import TaskDescription from "./sub-components/task-description";
import ProjectList from "./sub-components/project-list";

interface TaskDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onTaskCreate: (task: {
        id: string;
        title: string;
        description: string;
        priority: string;
        projectId: string;
    }) => void;
}

export default function TaskDialog({ open, onOpenChange, onTaskCreate }: TaskDialogProps) {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        priority: "Low",
        projectId: "1"
    });

    const [errors, setErrors] = useState<{
        title?: string;
        description?: string;
    }>({});

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // Clear error when user starts typing
        if (errors[field as keyof typeof errors]) {
            setErrors(prev => ({ ...prev, [field]: undefined }));
        }
    };

    const validateForm = () => {
        const newErrors: { title?: string; description?: string } = {};

        if (!formData.title.trim()) {
            newErrors.title = "Task title is required";
        }

        if (!formData.description.trim()) {
            newErrors.description = "Task description is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleCreateTask = () => {
        if (validateForm()) {
            const newTask = {
                id: `task-${Date.now()}`, // Generate unique ID
                title: formData.title.trim(),
                description: formData.description.trim(),
                priority: formData.priority,
                projectId: formData.projectId
            };

            onTaskCreate(newTask);
            
            // Reset form
            setFormData({
                title: "",
                description: "",
                priority: "Low",
                projectId: "1"
            });
            setErrors({});
            
            // Close dialog
            onOpenChange(false);
        }
    };

    const handleCancel = () => {
        // Reset form
        setFormData({
            title: "",
            description: "",
            priority: "Low",
            projectId: "1"
        });
        setErrors({});
        onOpenChange(false);
    };

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
                    <TaskName 
                        value={formData.title}
                        onChange={(value) => handleInputChange('title', value)}
                        error={errors.title}
                    />
                    <TaskDescription 
                        value={formData.description}
                        onChange={(value) => handleInputChange('description', value)}
                        error={errors.description}
                    />
                </div>
                <div className="flex flex-col gap-6">
                    <ProjectList 
                        value={formData.projectId}
                        onChange={(value) => handleInputChange('projectId', value)}
                    />
                    <PriorityList 
                        value={formData.priority}
                        onChange={(value) => handleInputChange('priority', value)}
                    />
                </div>
               </div>
               
               <div className="flex justify-end gap-4 pt-8 border-t mt-8">
                  <Button type="button" variant="secondary" onClick={handleCancel}>
                    Cancel
                  </Button>
                  <Button className="px-8" onClick={handleCreateTask}>
                    Create Task
                  </Button>
               </div>
            </DialogContent>
        </Dialog>
    )
}