import { Button } from "@/components/ui/button";
import SearchBar from "./search-bar";
import AppNameAndLogo from "./logo-app";
import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "@/app/mode-toggle";







export default function NavBar() {
    return (
        <div className="poppins p-4 flex justify-between items-center ">
            <div className="flex items-center gap-16">
                <AppNameAndLogo />
                <SearchBar />  
            </div>

            <div className="flex items-center gap-5">
                <Separator orientation="vertical" className="h-5 w-[2px] bg-gray-500" />
                <ModeToggle />
               <Button className="rounded-3xl h-10 shadow-none bg-primary text-white font-semibold">
                Add New Project
               </Button>
            </div>


        </div>

        

    )
}