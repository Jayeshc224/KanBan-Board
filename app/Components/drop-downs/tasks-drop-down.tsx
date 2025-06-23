"use client";

import { JSX } from "react";


import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";


type MenuItem = {
    icon: JSX.Element;
    label: string;
    className: string;
    separator?: undefined;
}


export default function TasksDropdown() {

   const menuItems: MenuItem[] = [
    {
        icon: <FaRegEdit />, label: "Edit Task", className: ""
      
    },
    {
        icon: <MdOutlineDelete className="text-lg" />, 
        label: "Delete Task", 
        className: "text-red-500",
    }
   ];
   


    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-8">
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="poppins">
                {menuItems.map((item, index) => (
                    <DropdownMenuItem key={index} className={item.className}>
                        <div className="flex items-center gap-2">
                            {item.icon}
                            <span>{item.label}</span>
                        </div>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}