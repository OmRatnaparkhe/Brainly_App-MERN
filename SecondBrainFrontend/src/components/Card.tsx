import axios from "axios";
import { DeleteIcon } from "../icons/deleteIcon";
import { ShareIcon } from "../icons/share"
import { Button } from "./UI/button";
import { DeleteButton } from "./UI/DeleteButton";
import { BACKEND_URL } from "../config";
import { render, unmountComponentAtNode } from "react-dom";
import Dashboard from "../Pages/dashboard";
import { useRef, useState } from "react";
import { LinkIcon } from "../icons/linkIcon";
interface CardProps {
    id:string
    title: string;
    link: string;
    type: "twitter" | "youtube"|"document";
    text: string;
}
export const CardComponent = ({title, link, type,id, text }: CardProps) => {

    async function deleteCard(){
        try {
            await axios.delete(`${BACKEND_URL}/api/v1/content/${id}`, {
                headers: {
                    "Authorization": localStorage.getItem("token")
                }
            });
            // Reload the page after successful deletion
            window.location.reload();
        } catch (error) {
            console.error("Error deleting card:", error);
            alert("Failed to delete card. Please try again.");
        }
    }
    return <div >
        <div  className="p-8 bg-white rounded-md border-gray-200 border h-72 w-72 items-center overflow-y-auto min-w-72 ">
            <div  className="flex justify-between">
                <div className="flex gap-x-3 ">
                <a href={link}><ShareIcon size="md" /></a>
                    <span className="font-bold  text-lg">{title}</span>
                </div>
                <div className="flex gap-x-3  text-black">
                        
                    <DeleteButton  onClick={deleteCard} Icon={<DeleteIcon/>}/>
                </div>
            </div>
            <div>
                <div className="-m-3 mt-3 ">
                    {type == "youtube" && <iframe className="w-full" src={link.replace("watch", "embed").replace("?v=","/")} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                    }

                    {type == "twitter" && <blockquote className="twitter-tweet"><a href={link.replace("x.com","twitter.com")}></a></blockquote>
                    }
                    
                    {text && (
                    <div className="mt-4 text-md font-medium text-gray-700 whitespace-pre-line break-words">
                        {text}
                    </div>
                )}
                </div>
                
            </div>

        </div>
    </div>
}