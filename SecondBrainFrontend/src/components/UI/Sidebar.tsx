import { SidebarItems } from "./SidebarItems"
import { TwitterIcon } from "../../icons/twitterIcon"
import { YoutubeIcon } from "../../icons/youtubeIcon"
import { Logo } from "../../icons/Logo"
import { TextIcon } from "../../icons/textIcon"
import { Button } from "./button"
import { useNavigate } from "react-router-dom"
interface sidebarProps {
    selectedType: string | null;
    onTypeSelect: (type: "twitter" | "youtube" | "document" | "All" | null) => void;
}
export function Sidebar({ selectedType, onTypeSelect }: sidebarProps) {
    const navigate = useNavigate();
    return <div className="fixed h-full w-[20%] flex flex-row md:flex-col ">
        <div className="flex flex-row pt-8 border-b-2 pb-5 border-gray-200 ">
            <div className="font-bold text-3xl pl-9 py-4  flex flex-row gap-2  text-blue-600 px-1.5">
                <Logo />
                Brainly
            </div>
        </div>

        <div className="pt-5 h-full flex justify-between md:flex-col">
            <div className=" ">
                <div className="mt-4 mx-6">
                <SidebarItems
                type={"twitter"}
                onClick={(type) => onTypeSelect(selectedType === type ? null : type)}
                text={"Twitter"}
                isSelected={selectedType === "twitter"}
                Icons={<TwitterIcon />} />
                </div>
            
           
           <div className="mt-4 mx-6">
           <SidebarItems type={"youtube"}
                onClick={(type) => onTypeSelect(selectedType === type ? null : type)}
                text={"Youtube"}
                Icons={<YoutubeIcon />}
                isSelected={selectedType === "youtube"}
            />
           </div>
           
            <div className="mt-4 mx-6">
            <SidebarItems type={"document"}
                onClick={(type) => onTypeSelect(selectedType === type ? null : type)}
                text={"document"}
                Icons={<TextIcon />}
                isSelected={selectedType === "youtube"} />
         
            </div>
          
           </div>
           <div className="flex justify-center w-full md:flex-col mb-4">
                <button className="bg-blue-700 w-1/2 ml-[20%] items-center flex justify-center text-white font-medium  py-1.5 rounded" onClick={() => {
                navigate("/signin")
            }} >Log Out</button>
        </div>
        </div>
        


    </div>
}