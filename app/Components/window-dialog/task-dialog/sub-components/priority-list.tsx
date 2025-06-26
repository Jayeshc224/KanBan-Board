import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DropdownMenuContent, Label } from "@radix-ui/react-dropdown-menu";
import { useState } from "react";
import { IoCheckmark } from "react-icons/io5";
import { IconType } from "react-icons/lib";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";







type PriorityItem = {
    name: string;
    icon: IconType;
    textColor: String;
    backGroundColor: String;
}

const PriorityListArray : PriorityItem[] = [
    {
        name: "Low",
        icon: MdKeyboardDoubleArrowDown,
        textColor: "text-green-500",
        backGroundColor: "bg-green-500/15",
    },
    {
        name: "Medium",
        icon: MdKeyboardDoubleArrowDown,
        textColor: "text-yellow-500",
        backGroundColor: "bg-yellow-500/15",
    },
    {
        name: "High",
        icon: MdKeyboardDoubleArrowDown,
        textColor: "text-red-500",
        backGroundColor: "bg-red-500/15",
    },
    
];

export default function PriorityList() {

    const [selectedPriority, setSelectedPriority] = useState<PriorityItem>(PriorityListArray[0]);

function renderSelectedPriority() {
    return (
      <div className="flex flex-col gap-2">
        <div
        className={`size-6 ${selectedPriority?.backGroundColor} rounded-md flex
        items-center justify-center text-lg ${selectedPriority?.textColor}`}>
            {<selectedPriority.icon />} 
            </div>
            <span className={`${selectedPriority.textColor} text-sm font-medium`}>{selectedPriority.name}</span>
        </div>
      
    );
}


function renderDropDownMenuItem(priority: PriorityItem) {
    return (
        <div className="flex items-center gap-2">
            <div className={`size-6 ${priority.backGroundColor} rounded-md flex
            items-center justify-center text-lg ${priority.textColor}`}>
                {<priority.icon />}
            </div>
            <span className={`${priority.textColor} text-sm font-medium`}>{priority.name}</span>
        </div>
    )
}

function isDropDownItemChecked(priorityItem: PriorityItem) {
    return(
        <>{priorityItem.name === selectedPriority.name && <IoCheckmark/>}</>
    );
}

return (
    <div className="">
        <Label className="opacity-75 text-sm font-medium">Priority</Label>
        <div className="mt-2 w-full">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button id="priority-dropdown"
                    variant={"outline"}
                    className="w-full h-11 flex justify-between">
                        {renderSelectedPriority()}
                        <MdKeyboardDoubleArrowDown className="ml-2" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                align="start"
                className="w-full min-w-[var(--radix-dropdown-menu-trigger-width)] poppins"
                >
                    {PriorityListArray.map((priorityItem,index)=>(
                        <DropdownMenuItem
                        key={index}
                        className="flex items-center justify-between"
                        onClick={()=>{
                            setSelectedPriority(priorityItem);
                        }}>
                        </DropdownMenuItem>
                    ))}
                    {renderDropDownMenuItem(selectedPriority)}
                    {isDropDownItemChecked(selectedPriority)}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    </div>
)
}

