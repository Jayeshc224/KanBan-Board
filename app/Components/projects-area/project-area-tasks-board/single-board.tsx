import { useTheme } from "next-themes";
import SingleTask from "./single-task";
import { useState } from "react";

export type Board = {
    id: string;
    name: string;
    createdAt: Date;
    tasks: Array<{
        id: string;
        title: string;
        description: string;
        priority: string;
    }>;
};

interface SingleBoardProps {
    board: Board;
    onTaskMove: (taskId: string, fromBoardId: string, toBoardId: string) => void;
}

export default function SingleBoard({ board, onTaskMove }: SingleBoardProps) {
    const { name: boardName, tasks, id: boardId } = board;
    const { theme } = useTheme();
    const [isDragOver, setIsDragOver] = useState(false);
    const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);
    const [draggedFromBoardId, setDraggedFromBoardId] = useState<string | null>(null);

    const numberTasks = tasks.length;
    const bgColor = theme === "dark" ? "bg-black" : "bg-gray-100";

    // Get the appropriate color for the task count based on board type
    const getTaskCountColor = () => {
        switch (boardId) {
            case "yet-to-start":
                return "bg-blue-500 text-white"; // Blue for To Do
            case "in-progress":
                return "bg-yellow-500 text-white"; // Yellow for In Progress
            case "completed":
                return "bg-green-500 text-white"; // Green for Completed
            default:
                return "bg-primary text-white"; // Default primary color
        }
    };

    const handleDragStart = (e: React.DragEvent, taskId: string) => {
        setDraggedTaskId(taskId);
        setDraggedFromBoardId(boardId);
        e.dataTransfer.setData("text/plain", taskId);
        e.dataTransfer.setData("application/json", JSON.stringify({ taskId, fromBoardId: boardId }));
    };

    const handleDragEnd = (e: React.DragEvent) => {
        setDraggedTaskId(null);
        setDraggedFromBoardId(null);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        setIsDragOver(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
        
        try {
            const data = e.dataTransfer.getData("application/json");
            if (data) {
                const { taskId, fromBoardId } = JSON.parse(data);
                if (fromBoardId !== boardId) {
                    onTaskMove(taskId, fromBoardId, boardId);
                }
            }
        } catch (error) {
            // Fallback to text data
            const taskId = e.dataTransfer.getData("text/plain");
            if (taskId && draggedFromBoardId && draggedFromBoardId !== boardId) {
                onTaskMove(taskId, draggedFromBoardId, boardId);
            }
        }
    };

    return (
        <div className="w-full p-4 rounded-lg flex flex-col h-full">
            {/* Fixed Header - Never moves */}
            <div className={`flex justify-between items-center p-4 rounded-lg ${bgColor} transition-all duration-200 flex-shrink-0`}>
                <span className="text-lg font-bold">{boardName}</span>
                <div className={`size-7 rounded-full ${getTaskCountColor()} flex items-center justify-center transition-colors duration-200`}>
                    <span className="text-base font-bold">{numberTasks}</span>
                </div>
            </div>

            {/* Drop Zone - Takes remaining space */}
            <div 
                className={`board-drop-zone flex-1 mt-4 p-2 rounded-lg min-h-[300px] ${isDragOver ? 'drag-over' : ''} ${tasks.length === 0 ? 'empty' : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                {tasks.length === 0 ? (
                    <div className={`drop-placeholder h-full flex items-center justify-center ${isDragOver ? 'drag-over' : ''}`}>
                        Drop tasks here
                    </div>
                ) : (
                    <div className="space-y-3">
                        {tasks.map((task) => (
                            <SingleTask 
                                key={task.id} 
                                taskId={task.id}
                                title={task.title}
                                description={task.description}
                                priority={task.priority}
                                onDragStart={handleDragStart}
                                onDragEnd={handleDragEnd}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}