import { ReactElement } from "react"

export interface ButtonProps  {
    variant:("primary" | "secondary"|"third")
    size? : "sm"|"md"|"lg"|"xl"
    onClick?:()=>void
    startIcon?:ReactElement
    endIcon?:ReactElement | String
    text:String
    fullWidth?:boolean;
    loading?:boolean
}
 
const variantStyles = {
    "primary": "bg-blue-700 text-white text-center  ",
    "secondary":"bg-purple-700 text-lg text-white",
    "third":"text-xl bg-blue-700 text-white font-normal"
}
const defaultstyles = "rounded-md flex"

const sizestyles = {
    "sm":"sm py-1.5 m-1 px-1",
    "md":"md py-2.5 m-1.5 px-5",
    "lg":"lg py-3.5 m-2 px-4",
    "xl":"w-full m-2 py-1 px-[43%]"
}

const textstyles = "font-medium"
export const Button = ({variant,size,startIcon,onClick,text,fullWidth,loading}: ButtonProps)=>{
    return (
        <button onClick={onClick} className={ `${variantStyles[variant]} ${defaultstyles} ${fullWidth?" w-full flex px-4 justify-center text-center items-center" : ""} ${loading?"opacity-45":""} ${size ? sizestyles[size] : ""} ${textstyles}`} disabled={loading}>
        {startIcon ? <div className="px-1">{startIcon}</div>:null}{text}</button>
    )
}