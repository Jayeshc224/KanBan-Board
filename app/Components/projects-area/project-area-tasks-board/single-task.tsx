import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { MdKeyboardDoubleArrowDown, MdKeyboardDoubleArrowRight, MdKeyboardDoubleArrowUp } from "react-icons/md";
import TasksDropdown from "../../drop-downs/tasks-drop-down";
import { useState } from "react";
import { IconType } from "react-icons/lib";

interface SingleTaskProps {
    taskId: string;
    title: string;
    description: string;
    priority: string;
    onDragStart: (e: React.DragEvent, taskId: string) => void;
    onDragEnd: (e: React.DragEvent) => void;
}

type PriorityItem = {
    name: string;
    icon: IconType;
    textColor: string;
    backGroundColor: string;
}

const PriorityListArray: PriorityItem[] = [
    {
        name: "Low",
        icon: MdKeyboardDoubleArrowDown,
        textColor: "text-green-500",
        backGroundColor: "bg-green-500/15",
    },
    {
        name: "Medium",
        icon: MdKeyboardDoubleArrowRight,
        textColor: "text-yellow-500",
        backGroundColor: "bg-yellow-500/15",
    },
    {
        name: "High",
        icon: MdKeyboardDoubleArrowUp,
        textColor: "text-red-500",
        backGroundColor: "bg-red-500/15",
    },
];

const getPriorityStyles = (priority: string): PriorityItem => {
    const priorityItem = PriorityListArray.find(item => item.name === priority);
    return priorityItem || PriorityListArray[0]; // Default to Low if not found
};

export default function SingleTask({ taskId, title, description, priority, onDragStart, onDragEnd }: SingleTaskProps) {
    const [isDragging, setIsDragging] = useState(false);
    const priorityStyles = getPriorityStyles(priority);
    const PriorityIcon = priorityStyles.icon;

    const handleDragStart = (e: React.DragEvent) => {
        setIsDragging(true);
        onDragStart(e, taskId);
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/plain", taskId);
    };

    const handleDragEnd = (e: React.DragEvent) => {
        setIsDragging(false);
        onDragEnd(e);
    };

    return (
        <Card 
            className={`task-card bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 shadow-sm min-w-0 w-full ${isDragging ? 'dragging' : ''}`}
            draggable
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            <CardHeader className="p-0 pt-0 mb-2">
                <div className="flex justify-between items-center min-w-0">
                    <div className="flex items-center gap-2 ml-2 min-w-0 flex-1">
                        <div className={`size-6 ${priorityStyles.backGroundColor} rounded-md flex items-center justify-center text-lg ${priorityStyles.textColor} flex-shrink-0`}>
                            <PriorityIcon />
                        </div>
                        <span className={`${priorityStyles.textColor} text-sm font-medium truncate`}>
                            {priority}
                        </span>
                    </div>
                    <TasksDropdown />
                </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-1 mt-0 pb-1 min-w-0">
                <span className="text-xl font-extrabold leading-tight text-black dark:text-white break-words">
                    {title}
                </span>
                <span className="text-base text-gray-500 dark:text-gray-400 font-normal break-words">
                    {description}
                </span>
            </CardContent>
        </Card>
    );
}
