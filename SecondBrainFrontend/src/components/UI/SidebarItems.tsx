import { ReactElement } from "react";

interface sidebaricons {
    text?:String;
    Icons:ReactElement;
    type?:"twitter"|"youtube"|"document"|"All";
    onClick?:(type:"twitter"|"youtube"|"document"|"All")=>void;
    isSelected?:boolean;
}
export function SidebarItems({text,Icons,onClick,type,isSelected}:sidebaricons){
    return <div className="flex pl-6 text-gray-500 font-normal text-justify mb-1.5 border-t-gray-300 p-2 cursor-pointer hover:bg-gray-200
    "onClick={()=>onClick(type)} >
        <div className="pr-3">
        {Icons}
        </div>
        <div className="text-lg">
        {text}
        </div>
      
    </div>
}