import { ReactElement } from "react"
import { DeleteIcon } from "../../icons/deleteIcon"

interface deleteButtonProps {
    Icon:ReactElement
    onClick:(id:string)=>{}
    reference?:any
}
export function  DeleteButton({Icon,onClick,reference}:deleteButtonProps){
    return <div>
        <button ref={reference} onClick={onClick}>{Icon}</button>
    </div>
    
}

