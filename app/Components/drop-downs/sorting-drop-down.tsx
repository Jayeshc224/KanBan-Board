import { Button } from "@/components/ui/button";
//import { DropdownMenu, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { IoArrowDown, IoArrowUp } from "react-icons/io5";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu"
import React from "react";


const options = ["A-Z", "Z-A"];



export default function SortingDropDown() {

    const [selectedOption, setSelectedOption] = React.useState("A-Z");
    return (
       <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="ghost">
            <span className="text-sm font-medium"> {selectedOption}</span>
             {selectedOption === "A-Z" ? (
                <IoArrowDown className="text-sm" />
             ):(
                <IoArrowUp className="text-sm" />
             )}
            </Button>

        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-2 poppins">
            {options.map((option, index) => (
                <DropdownMenuCheckboxItem key={index} className="h-9"
                checked={selectedOption === option}
                onCheckedChange={() => setSelectedOption(option)}
                >
                    {option}
                </DropdownMenuCheckboxItem>
            ))}
        </DropdownMenuContent>
       </DropdownMenu>
    )
}

