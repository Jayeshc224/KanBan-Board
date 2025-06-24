"use client"

import { useTheme } from "next-themes";
import NavBar from "./Components/navbar/nav-bar";
import ProjectsArea from "./Components/projects-area/project-area";

export default function Home() {
  const { theme } = useTheme();
  const  bgColor = theme === "dark" ? "bg-black" : "bg-gray-200";
  return (
   <div className={`${bgColor} border min-h-screen w-full`}>
    <NavBar/>
    <div className="px-6 mt-8 poppins">
      <ProjectsArea />
    </div>
   </div>
  );
}
