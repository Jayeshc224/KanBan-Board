import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import TasksDropdown from "../../drop-downs/tasks-drop-down";

export default function SingleTask() {
    return (
        <Card className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
            <CardHeader className="p-0 pt-0 mb-2">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 ml-2">
                        <span className="flex items-center px-3 py-1 rounded-2xl bg-green-100 text-green-800 font-semibold text-[15px]">
                            <MdKeyboardDoubleArrowDown className="mr-1 text-green-600 text-lg" />
                            Low
                        </span>
                    </div>
                    <TasksDropdown />
                </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-1 mt-0 pb-1">
                <span className="text-xl font-extrabold leading-tight text-black">Copywriting content</span>
                <span className="text-base text-gray-500 font-normal">Create content for a client every day</span>
            </CardContent>
        </Card>
    )
}
