interface InputProps {
    placeholder: string;
    reference?:any
    type?:"text" | "password"
    
}
export function InputBox({ placeholder,reference,type }: InputProps) {
    return <div className="">
        <input type={type} placeholder={placeholder} ref={reference} className=" bg-gray-200 rounded-sm p-3 py-2 text-black px-5 text-start my-2 w-full pr-1.5" />
    </div>
}