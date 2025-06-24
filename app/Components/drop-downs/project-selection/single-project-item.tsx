import { Project, projects } from "./project-selection";
import { CommandItem } from "@/components/ui/command";
import { IoMdCheckmark } from "react-icons/io";





export default function SingleProjectCommandItem({
    project,
    isSelected,
    onSelectedItem,
}:{
    project: Project;
    isSelected: boolean;
    onSelectedItem: (project: Project) => void;
})  {

    const {name:projectName, tasks, icon:ProjectIcon} = project;

    return (
       <CommandItem
       value={projectName}
       onSelect={(value:string)=> {
        const findProject = projects.find((proj)=>proj.name === value);
        if(findProject) {
            onSelectedItem(findProject);
        }
    }} 
    className="cursor-pointer hover:bg-gray-100 dark:hover:bg-black rounded-lg p-2"
    >
    <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-3">
            <div className="size-8 bg-primary flex rounded-md flex items-center justify-center text-white">
                <ProjectIcon className="text-white" />
            </div>
            <div className="flex flex-col ">
                <p className="font-medium">{projectName}</p>
                <p className="text-xs text-slate-500">
                    {tasks.length} Tasks
                </p>
            </div>
        </div>
{isSelected && (
    <div className="text-primary">
        <IoMdCheckmark className="size-5" />
    </div>
)}
    </div>
    </CommandItem>
    );
}