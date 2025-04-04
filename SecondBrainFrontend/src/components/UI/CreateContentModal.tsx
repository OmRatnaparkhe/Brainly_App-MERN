import axios from "axios";
import { CrossIcon } from "../../icons/CrossIcon";
import { InputBox } from "../Input";
import { Button } from "./button";
import { useRef, useState } from "react";
import { BACKEND_URL } from "../../config";

enum ContentType {
    Youtube = "youtube",
    Twitter = "twitter",
    Text = "text",
    Document = "document" 
}

//@ts-ignore
export function CreateContentModal({ open, onClose }) {
    const titleRef = useRef<HTMLInputElement>(null);
    const linkRef = useRef<HTMLInputElement>(null);
    const textRef = useRef<HTMLTextAreaElement>(null); 
    const [type, setType] = useState(ContentType.Youtube);
    
    async function addContent() {
        const title = titleRef.current?.value;
        const link = linkRef.current?.value;
        const text = textRef.current?.value; 
        console.log(text);
        await axios.post(`${BACKEND_URL}/api/v1/content`, {
            link,
            title,
            type,
            text
        }, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        });
        onClose();
    }
    
    return (
        <div>
            {open && (
                <div className="w-screen h-screen top-0 left-0 fixed inset-0 bg-slate-400/50 flex justify-center items-center px-4 z-50">
                    <div className="flex w-full max-w-lg flex-col justify-center bg-white p-6 rounded-lg shadow-lg">
                        <div className="flex justify-end">
                            <div onClick={onClose} className="cursor-pointer">
                                <CrossIcon />
                            </div>
                        </div>
                        <div className="my-2 w-full">
                            {type !== ContentType.Document && (
                                <InputBox reference={titleRef} placeholder="Title" />
                            )}
                            {type !== ContentType.Document && (
                                <InputBox reference={linkRef} placeholder="Link" />
                            )}
                            <textarea ref={textRef} placeholder="Plain Text" className="w-full border border-gray-300 rounded-md py-2 px-2 mt-2 resize-none h-32" /> 
                        </div>
                        <div className="flex justify-center gap-2 flex-wrap">
                            <Button size="md" text="Twitter" variant="secondary" onClick={() => setType(ContentType.Twitter)} />
                            <Button size="md" text="Youtube" variant="secondary" onClick={() => setType(ContentType.Youtube)} />
                            <Button size="md" text="Document" variant="secondary" onClick={() => setType(ContentType.Document)} />
                        </div>
                        <div className="flex justify-center mt-4">
                            <Button onClick={addContent} variant="third" text="Submit" size="xl" />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}