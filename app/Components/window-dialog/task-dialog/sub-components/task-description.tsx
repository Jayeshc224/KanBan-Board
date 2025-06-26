import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-dropdown-menu";
import { ChangeEvent, useState } from "react";
import { FaCircleExclamation } from "react-icons/fa6";




export default function TaskDescription() {
    
    const [textCounter, setTextCounter] = useState("");

    const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const text = e.target.value;
        if (text.length <= 50) {
            setTextCounter(text);
        } 
    }

    return (
        <div className="flex flex-col gap-2">
            <Label  className="opacity-75 text-sm font-medium">Task Description</Label>
            <Textarea  
            placeholder="Give a description of the task" 
            className="resize-none"
            onChange={handleTextChange}
            />

            <div className="text-red-500 text-[12px] flex items-center gap-1">
                <FaCircleExclamation  />
                <p>This is an error</p>
            </div>

            <p className="text-[12px] text-gray-500">
                {textCounter.length} / 50 characters
            </p>



        </div>
        
    )
}