import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-dropdown-menu";
import { FaCircleExclamation } from "react-icons/fa6";
import { useState } from "react";

interface TaskNameProps {
    value: string;
    onChange: (value: string) => void;
    error?: string;
}

export default function TaskName({ value, onChange, error }: TaskNameProps) {
    return (
        <div className="flex flex-col gap-2">
            <Label className="opacity-75 text-sm font-medium">Task Title</Label>
            <Input 
                placeholder="Enter task name" 
                className="h-11"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />

            {error && (
                <div className="text-red-500 text-[12px] flex items-center gap-1">
                    <FaCircleExclamation />
                    <p>{error}</p>
                </div>
            )}
        </div>
    )
}