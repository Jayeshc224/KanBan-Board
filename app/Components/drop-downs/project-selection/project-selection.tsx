import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useState } from "react";
import { FaFlagCheckered } from "react-icons/fa";
import { FaMobileRetro } from "react-icons/fa6";
import { IconType } from "react-icons/lib";
import ProjectCommandItems from "./project-command-item";






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


export default function ProjectSelectionDropdown() {

    const [selectedProject, setSelectedProject] = useState<Project>(projects[0]);


    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant={"ghost"}
                className="w-full justify-between py-9 rounded-xl bg-gray-50 dark:bg-black">
                    <div className="flex items-start flex-col text-[16px] gap-1">
                        <p className="text-[13px] text-slate-500">PROJECT</p>
                        <p className="font-bold">{selectedProject.name}</p>
                    </div>
                    <div className="size-10 bg-primary rounded-full flex items-center justify-center">
                        <selectedProject.icon className="text-white" />
                    </div>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="p-2 poppins rounded-xl">
                <ProjectCommandItems
                    selectedProject={selectedProject}
                    setSelectedProject={setSelectedProject}
                />
            </PopoverContent>
        </Popover>
        
    )
}