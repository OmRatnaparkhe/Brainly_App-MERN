import { useState } from "react";
import { CreateContentModal } from "./UI/CreateContentModal";
const [modal,setModal] = useState(false);
export function InputText() {
    return <div>
        async function InputContent(){
            <CreateContentModal open={modal} onClose={() => {
                setModal(false);
            }} />
            await onClose()
         
        InputContent();
    }
    </div>
}