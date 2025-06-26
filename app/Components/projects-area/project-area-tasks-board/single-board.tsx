import { useTheme } from "next-themes";
import SingleTask from "./single-task";


export type Board = {
    name: string;
    createdAt: Date;
    tasks: string[];
};

export default function SingleBoard({board}: {board: Board}) {
    
    const {name: boardName, tasks} = board;

    const {theme} = useTheme();

    const numberTasks = tasks.length;

    const bgColor = theme === "dark" ? "bg-black" : "bg-gray-100";
    
    
    
    return (
        
    <div className="w-full p-4 rounded-lg">
        
       <div className={`flex justify-between items-center p-4 rounded-lg ${bgColor}`} >

       <span className="text-lg font-bold">{boardName}</span>

       <div className="size-7 rounded-full bg-primary text-white flex items-center justify-center">
        <span className="text-base font-bold">{numberTasks}</span>
       </div>
    </div>

    <div className="mt-4 space-y-3">
        {[1,2].map((index)=>(
          <SingleTask key={index} />
        ))} 
    </div>
    </div>
    )
}