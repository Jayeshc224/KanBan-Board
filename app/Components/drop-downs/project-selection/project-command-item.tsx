import { Dispatch, SetStateAction } from "react";
import { Project, projects } from "./project-selection";
import { Command, CommandEmpty, CommandInput, CommandList, CommandGroup } from "@/components/ui/command";
import SingleProjectCommandItem from "./single-project-item";




export default function ProjectCommandItem({
    selectedProject,
    setSelectedProject,
}: {
    selectedProject: Project;
    setSelectedProject: Dispatch<SetStateAction<Project>>;
}) {
    function handleProjectSelect(project: Project) {
        setSelectedProject(project);
    }
    return (
       <Command>
        <CommandInput placeholder="Search projects..." />
        <CommandList className="my-3">
             <CommandEmpty>No Results Found</CommandEmpty>
             <CommandGroup>
                {projects.map((project, index) => (
                    <SingleProjectCommandItem
                    project = {project}
                    key = {index}
                    onSelectedItem = {handleProjectSelect}
                    isSelected = {selectedProject.name === project.name}
                    />
                ))}
             </CommandGroup>
        </CommandList>
       </Command>
    )
}




