import { MdOutlineSortByAlpha } from "react-icons/md";
import SortingDropDown from "../../drop-downs/sorting-drop-down";
import { Button } from "@/components/ui/button";




export default function ProjectAreaHeader() {
    return (
       <div className="flex justify-between items-center">
         <div className="flex items-center gap-3">
            <span className="text-2xl font-bold">Projects</span>
         </div>
         <div className="flex items-center gap-3">
            <MdOutlineSortByAlpha className="text-xl text-gray-500" />
            <span className="text-sm text-gray-500">Sort </span>
         </div>
          <SortingDropDown />
          <Button className="rounded-3xl px-4"> Add Task</Button>
       </div>
    )
}
