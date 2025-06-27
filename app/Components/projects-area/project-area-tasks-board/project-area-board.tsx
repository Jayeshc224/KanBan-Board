import SingleBoard, { Board } from "./single-board";
import { useState, useEffect, useRef, useCallback } from "react";

// Create a custom event system to share board data
const emitBoardData = (boards: Board[]) => {
    const event = new CustomEvent('boardDataUpdate', { detail: boards });
    window.dispatchEvent(event);
};

interface ProjectAreaBoardProps {
    onBoardsChange?: (boards: Board[]) => void;
}

export default function ProjectAreaBoard({ onBoardsChange }: ProjectAreaBoardProps) {
    const [boards, setBoards] = useState<Board[]>([
        {
            id: "yet-to-start",
            name: "Yet to Start", 
            createdAt: new Date(), 
            tasks: [
                {
                    id: "task-1",
                    title: "Design new logo",
                    description: "Create a modern logo for the company",
                    priority: "High"
                },
                {
                    id: "task-2",
                    title: "Write blog post",
                    description: "Write a blog post about latest trends",
                    priority: "Medium"
                }
            ]
        },
        {
            id: "in-progress",
            name: "In Progress", 
            createdAt: new Date(), 
            tasks: [
                {
                    id: "task-3",
                    title: "Develop API",
                    description: "Build REST API for the application",
                    priority: "High"
                }
            ]
        },
        {
            id: "completed",
            name: "Completed", 
            createdAt: new Date(), 
            tasks: [
                {
                    id: "task-4",
                    title: "Setup database",
                    description: "Configure and setup the database",
                    priority: "Low"
                }
            ]
        },
    ]);

    const eventListenerAdded = useRef(false);

    const handleTaskMove = useCallback((taskId: string, fromBoardId: string, toBoardId: string) => {
        setBoards(prevBoards => {
            const newBoards = [...prevBoards];
            
            // Find the source and destination boards
            const fromBoardIndex = newBoards.findIndex(board => board.id === fromBoardId);
            const toBoardIndex = newBoards.findIndex(board => board.id === toBoardId);
            
            if (fromBoardIndex === -1 || toBoardIndex === -1) return prevBoards;
            
            // Find the task to move
            const taskIndex = newBoards[fromBoardIndex].tasks.findIndex(task => task.id === taskId);
            if (taskIndex === -1) return prevBoards;
            
            // Remove task from source board
            const [movedTask] = newBoards[fromBoardIndex].tasks.splice(taskIndex, 1);
            
            // Add task to destination board
            newBoards[toBoardIndex].tasks.push(movedTask);
            
            return newBoards;
        });
    }, []);

    // Listen for new task creation events
    useEffect(() => {
        // Prevent duplicate event listeners
        if (eventListenerAdded.current) {
            return;
        }

        const handleNewTask = (event: CustomEvent<{
            id: string;
            title: string;
            description: string;
            priority: string;
            projectId: string;
        }>) => {
            const newTask = {
                id: event.detail.id,
                title: event.detail.title,
                description: event.detail.description,
                priority: event.detail.priority
            };

            setBoards(prevBoards => {
                const newBoards = [...prevBoards];
                // Add the new task to the "Yet to Start" board
                const yetToStartBoard = newBoards.find(board => board.id === "yet-to-start");
                if (yetToStartBoard) {
                    // Check if task already exists to prevent duplicates
                    const taskExists = yetToStartBoard.tasks.some(task => task.id === newTask.id);
                    if (!taskExists) {
                        yetToStartBoard.tasks.push(newTask);
                    }
                }
                return newBoards;
            });
        };

        // Listen for requests for current board data
        const handleRequestBoardData = () => {
            emitBoardData(boards);
        };

        window.addEventListener('newTaskCreated', handleNewTask as EventListener);
        window.addEventListener('requestBoardData', handleRequestBoardData);
        eventListenerAdded.current = true;

        return () => {
            window.removeEventListener('newTaskCreated', handleNewTask as EventListener);
            window.removeEventListener('requestBoardData', handleRequestBoardData);
            eventListenerAdded.current = false;
        };
    }, []); // Remove boards from dependency array since we use functional updates

    // Emit board data whenever boards change
    useEffect(() => {
        emitBoardData(boards);
        if (onBoardsChange) {
            onBoardsChange(boards);
        }
    }, [boards, onBoardsChange]);

    // Emit initial board data on component mount
    useEffect(() => {
        // Emit the initial board data immediately when component mounts
        emitBoardData(boards);
        if (onBoardsChange) {
            onBoardsChange(boards);
        }
    }, [boards, onBoardsChange]); // Add proper dependencies

    return (
        <div className="h-full rounded-2xl flex items-center mt-4 gap-3">
            {boards.map((board) => (
                <SingleBoard 
                    key={board.id} 
                    board={board} 
                    onTaskMove={handleTaskMove}
                />
            ))}
        </div>
    );
}