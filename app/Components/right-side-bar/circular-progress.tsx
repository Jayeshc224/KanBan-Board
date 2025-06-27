import "react-circular-progressbar/dist/styles.css";
import { Board } from "../projects-area/project-area-tasks-board/single-board";
import { useState, useEffect } from "react";

export default function CircularProgress() {
    const [boards, setBoards] = useState<Board[]>([]);

    useEffect(() => {
        // Function to handle board data updates
        const handleBoardDataUpdate = (event: CustomEvent<Board[]>) => {
            setBoards(event.detail);
        };

        // Listen for board data updates
        window.addEventListener('boardDataUpdate', handleBoardDataUpdate as EventListener);

        // Check if there's already board data available (for initial load)
        // We'll dispatch a custom event to request current board data
        const requestBoardData = () => {
            const event = new CustomEvent('requestBoardData');
            window.dispatchEvent(event);
        };

        // Request board data on mount
        requestBoardData();

        return () => {
            window.removeEventListener('boardDataUpdate', handleBoardDataUpdate as EventListener);
        };
    }, []);

    // Calculate task counts from boards
    const totalTasks = boards.reduce((sum, board) => sum + board.tasks.length, 0);
    const toDoTasks = boards.find(board => board.id === "yet-to-start")?.tasks.length || 0;
    const inProgressTasks = boards.find(board => board.id === "in-progress")?.tasks.length || 0;
    const completedTasks = boards.find(board => board.id === "completed")?.tasks.length || 0;
    
    // Calculate percentages for each status (relative to total tasks)
    const toDoPercentage = totalTasks > 0 ? Math.round((toDoTasks / totalTasks) * 100) : 0;
    const inProgressPercentage = totalTasks > 0 ? Math.round((inProgressTasks / totalTasks) * 100) : 0;
    const completedPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    // Create a custom circular progress with multiple arcs
    const radius = 104; // Increased radius to match original size (52 * 2)
    const strokeWidth = 20; // Increased stroke width for thicker appearance
    const circumference = 2 * Math.PI * radius;
    
    // Calculate stroke dasharray for each arc
    const toDoDashArray = (toDoPercentage / 100) * circumference;
    const inProgressDashArray = (inProgressPercentage / 100) * circumference;
    const completedDashArray = (completedPercentage / 100) * circumference;

    return (
        <div className="flex flex-col items-center my-10">
            <div className="relative">
                {/* Custom SVG with multiple arcs */}
                <svg width="240" height="240" className="transform -rotate-90">
                    {/* Background circle */}
                    <circle
                        cx="120"
                        cy="120"
                        r={radius}
                        stroke="#e2e8f0"
                        strokeWidth={strokeWidth}
                        fill="none"
                    />
                    
                    {/* To Do arc */}
                    <circle
                        cx="120"
                        cy="120"
                        r={radius}
                        stroke="#3B82F6"
                        strokeWidth={strokeWidth}
                        fill="none"
                        strokeLinecap="butt"
                        strokeDasharray={`${toDoDashArray} ${circumference}`}
                        strokeDashoffset="0"
                        className="transition-all duration-500 ease-in-out"
                    />
                    
                    {/* In Progress arc */}
                    <circle
                        cx="120"
                        cy="120"
                        r={radius}
                        stroke="#F59E0B"
                        strokeWidth={strokeWidth}
                        fill="none"
                        strokeLinecap="butt"
                        strokeDasharray={`${inProgressDashArray} ${circumference}`}
                        strokeDashoffset={`-${toDoDashArray}`}
                        className="transition-all duration-500 ease-in-out"
                    />
                    
                    {/* Completed arc */}
                    <circle
                        cx="120"
                        cy="120"
                        r={radius}
                        stroke="#15A25E"
                        strokeWidth={strokeWidth}
                        fill="none"
                        strokeLinecap="butt"
                        strokeDasharray={`${completedDashArray} ${circumference}`}
                        strokeDashoffset={`-${toDoDashArray + inProgressDashArray}`}
                        className="transition-all duration-500 ease-in-out"
                    />
                </svg>
                
                {/* Center content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-center">
                        <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Tasks</div>
                        <div className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                            {totalTasks}
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Legend */}
            <div className="flex justify-center gap-4 mt-4">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-xs text-gray-600 dark:text-gray-400">
                        To Do ({toDoTasks})
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="text-xs text-gray-600 dark:text-gray-400">
                        In Progress ({inProgressTasks})
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-gray-600 dark:text-gray-400">
                        Completed ({completedTasks})
                    </span>
                </div>
            </div>
        </div>
    )
}