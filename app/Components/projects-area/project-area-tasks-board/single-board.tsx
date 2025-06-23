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
        
    <div className="w-full p-4 rounded-lg bg-black">
        
       <div className={`flex justify-between items-center p-4 rounded-lg ${bgColor}`} >

       <span className="text-md font-medium">{boardName}</span>

       <div className="size-6 rounded-full bg-primary text-white flex items-center justify-center">
        <span className="text-md font-medium">{numberTasks}</span>
       </div>
    </div>

    <div className="mt-7">
        {[1,2].map((index)=>(
          <SingleTask key={index} />
        ))} 
    </div>
    </div>
    )
}