import { Label } from "@radix-ui/react-dropdown-menu"
import { FaFlagCheckered } from "react-icons/fa";
import { FaMobileRetro } from "react-icons/fa6";
import { IconType } from "react-icons/lib";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { IoMdCheckmark } from "react-icons/io";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";

export type Project = {
    id: string;
    name: string;
    icon : IconType;
    createdAt: Date;
    tasks: string[];
}

export const projects: Project[] = [
    {
        id: "1",
        name: "Project 1",
        icon: FaMobileRetro,
        createdAt: new Date(),
        tasks: [],
    },
    {
        id: "2",
        name: "Project 2",
        icon: FaFlagCheckered,
        createdAt: new Date(),
        tasks: [],
    },
]

interface ProjectListProps {
    value: string;
    onChange: (value: string) => void;
}

export default function ProjectList({ value, onChange }: ProjectListProps) {
    const selectedProject = projects.find(project => project.id === value) || projects[0];

    function handleProjectSelect(project: Project) {
        onChange(project.id);
    }

    return (
        <div className="flex flex-col gap-2">
            <Label className="opacity-75 text-sm font-medium">Project</Label>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button 
                        variant="outline" 
                        className="w-full h-11 flex justify-between items-center"
                    >
                        <div className="flex items-center gap-3">
                            <div className="size-8 bg-primary flex rounded-md flex items-center justify-center text-white">
                                <selectedProject.icon className="text-white" />
                            </div>
                            <div className="flex flex-col items-start">
                                <p className="font-medium">{selectedProject.name}</p>
                                <p className="text-xs text-slate-500">
                                    {selectedProject.tasks.length} Tasks
                                </p>
                            </div>
                        </div>
                        <MdKeyboardDoubleArrowDown className="ml-2" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-full min-w-[var(--radix-dropdown-menu-trigger-width)] poppins">
                    {projects.map((project, index) => (
                        <DropdownMenuItem
                            key={index}
                            className="flex items-center justify-between cursor-pointer hover:bg-gray-100 dark:hover:bg-black rounded-lg p-2"
                            onClick={() => handleProjectSelect(project)}
                        >
                            <div className="flex items-center gap-3">
                                <div className="size-8 bg-primary flex rounded-md flex items-center justify-center text-white">
                                    <project.icon className="text-white" />
                                </div>
                                <div className="flex flex-col">
                                    <p className="font-medium">{project.name}</p>
                                    <p className="text-xs text-slate-500">
                                        {project.tasks.length} Tasks
                                    </p>
                                </div>
                            </div>
                            {selectedProject.name === project.name && (
                                <div className="text-primary">
                                    <IoMdCheckmark className="size-5" />
                                </div>
                            )}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}