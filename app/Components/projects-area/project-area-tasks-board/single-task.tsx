import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import TasksDropdown from "../../drop-downs/tasks-drop-down";





export default function SingleTask() {
    return (
        <Card className="shadow-none">
            <CardHeader className="p-4">
                <div className="flex justify-between items-center">
                    <div className="p-1 py-[4px] bg-green-500/15 rounded-3xl px-2 pr-4 font-medium text-green-900
                     flex items-center gap-1 text-sm">
                        <MdKeyboardDoubleArrowDown className="mb-[2px]" />
                        <span className="text-[12px]">Low</span>
                    </div>
                    <TasksDropdown />
                </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 mt-1">
                <span className="text-lg font-bold">Copywriting content</span>
                <span className="text-sm text-gray-500"> Create content for a client every day</span>
            </CardContent>
        </Card>

    )
}
