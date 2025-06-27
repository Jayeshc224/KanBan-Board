import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuContent } from "@/components/ui/dropdown-menu";
import { Label } from "@radix-ui/react-dropdown-menu";
import { IoCheckmark } from "react-icons/io5";
import { IconType } from "react-icons/lib";
import { MdKeyboardArrowRight, MdKeyboardDoubleArrowDown, MdKeyboardDoubleArrowUp } from "react-icons/md";

type PriorityItem = {
    name: string;
    icon: IconType;
    textColor: string;
    backGroundColor: string;
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
        icon: MdKeyboardArrowRight,
        textColor: "text-yellow-500",
        backGroundColor: "bg-yellow-500/15",
    },
    {
        name: "High",
        icon: MdKeyboardDoubleArrowUp,
        textColor: "text-red-500",
        backGroundColor: "bg-red-500/15",
    },
];

interface PriorityListProps {
    value: string;
    onChange: (value: string) => void;
}

export default function PriorityList({ value, onChange }: PriorityListProps) {
    const selectedPriority = PriorityListArray.find(item => item.name === value) || PriorityListArray[0];

    return (
        <div className="flex flex-col gap-2">
            <Label className="opacity-75 text-sm font-medium">Priority</Label>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button 
                        variant="outline" 
                        className="w-full h-11 flex justify-between items-center"
                    >
                        <div className="flex items-center gap-3">
                            <div className={`size-6 ${selectedPriority.backGroundColor} rounded-md flex items-center justify-center text-lg ${selectedPriority.textColor}`}>
                                <selectedPriority.icon />
                            </div>
                            <span className={`${selectedPriority.textColor} text-sm font-medium`}>
                                {selectedPriority.name}
                            </span>
                        </div>
                        <MdKeyboardDoubleArrowDown className="ml-2" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-full min-w-[var(--radix-dropdown-menu-trigger-width)] poppins z-50">
                    {PriorityListArray.map((priorityItem, index) => (
                        <DropdownMenuItem
                            key={index}
                            className="flex items-center justify-between cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg p-3 w-full"
                            onClick={() => onChange(priorityItem.name)}
                        >
                            <div className="flex items-center gap-3">
                                <div className={`size-6 ${priorityItem.backGroundColor} rounded-md flex items-center justify-center text-lg ${priorityItem.textColor}`}>
                                    <priorityItem.icon />
                                </div>
                                <span className={`${priorityItem.textColor} text-sm font-medium`}>
                                    {priorityItem.name}
                                </span>
                            </div>
                            {selectedPriority.name === priorityItem.name && (
                                <div className="text-primary">
                                    <IoCheckmark className="size-5" />
                                </div>
                            )}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

