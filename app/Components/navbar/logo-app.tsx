import { BiTask } from "react-icons/bi";

export default function AppNameAndLogo() {
    return (
        <div className="flex items-center gap-2">
            <div className="bg-primary size-10 text-lg text-white rounded-xl flex justify-center items-center">
                <BiTask />
            </div>
            <div className="flex  gap-1 items-center  text-xl">
               <span className="text-xl font-bold">KanBan</span>
            </div>
        </div>
    )
}