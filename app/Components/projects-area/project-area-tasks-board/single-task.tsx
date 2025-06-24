import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import TasksDropdown from "../../drop-downs/tasks-drop-down";





export default function SingleTask() {
    return (
        <Card className="shadow-none">
            <CardHeader className="p-0 pt-0">
                <div className="flex justify-between items-center">
                    <div className="p-1 py-[2px] bg-green-500/15 rounded-3xl px-2 pr-3 font-medium text-green-900
                     flex items-center gap-1 text-xs ml-5">
                        <MdKeyboardDoubleArrowDown className="mb-[1px]" />
                        <span className="text-[11px]">Low</span>
                    </div>
                    <TasksDropdown />
                </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-0 mt-0 pb-1">
                <span className="text-sm font-bold">Copywriting content</span>
                <span className="text-xs text-gray-500"> Create content for a client every day</span>
            </CardContent>
        </Card>

    )
}
