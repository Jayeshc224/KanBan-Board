import { Board } from "../projects-area/project-area-tasks-board/single-board";
import { useState, useEffect } from "react";

type TaskCard = {
    label: string;
    value: number;
    color: string;
}

export default function TaskStats() {
    const [boards, setBoards] = useState<Board[]>([]);

    useEffect(() => {
        // Listen for board data updates
        const handleBoardDataUpdate = (event: CustomEvent<Board[]>) => {
            setBoards(event.detail);
        };

        window.addEventListener('boardDataUpdate', handleBoardDataUpdate as EventListener);

        return () => {
            window.removeEventListener('boardDataUpdate', handleBoardDataUpdate as EventListener);
        };
    }, []);

    // Calculate task counts from boards
    const totalTasks = boards.reduce((sum, board) => sum + board.tasks.length, 0);
    const waitingTasks = boards.find(board => board.id === "yet-to-start")?.tasks.length || 0;
    const inProgressTasks = boards.find(board => board.id === "in-progress")?.tasks.length || 0;
    const completedTasks = boards.find(board => board.id === "completed")?.tasks.length || 0;

    const statisticsCards: TaskCard[] = [
        { label: "total", value: totalTasks, color: "#6B7280" }, // Gray
        { label: "waiting", value: waitingTasks, color: "#3B82F6" }, // Blue
        { label: "in progress", value: inProgressTasks, color: "#F59E0B" }, // Yellow
        { label: "completed", value: completedTasks, color: "#15A25E" }, // Green
    ];

    return (
        <div className="flex flex-col gap-2">
            <span className="font-bold text-xl">Tasks</span>
            <div className="grid grid-cols-2 gap-3 mt-3">
                {statisticsCards.map((statCard, index) => (
                    <SingleCard key={index} statCard={statCard} />
                ))}
            </div>
        </div>
    );
}

function SingleCard({ statCard }: { statCard: TaskCard }) {
    return (
        <div className="p-3 bg-gray-100 dark:bg-black rounded-xl">
            <span className="text-[12px] text-gray-600 dark:text-gray-400">
                {statCard.label.toUpperCase()}
            </span>
            <div className="flex items-center gap-2 mt-1">
                <div 
                    className="w-1 h-4 rounded-full transition-colors duration-200"
                    style={{ backgroundColor: statCard.color }}
                ></div>
                <span className="text-lg font-bold">{statCard.value}</span>
            </div>
        </div>
    );
}
