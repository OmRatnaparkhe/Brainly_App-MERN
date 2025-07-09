import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";

export function useContent (){
    const [contents,setContents] = useState([]);
    function refresh(){
            axios.get(`${BACKEND_URL}/api/v1/content`,{
                headers:{
                    "Authorization":localStorage.getItem("token")
                },
                withCredentials: true
            }).then((response)=>{
                setContents(response.data.content)
            })
        }
    

    useEffect(()=>{
        refresh()
        let appear = setInterval(()=>{
            refresh()
        },3000)
        return ()=>{
            clearInterval(appear);
        }
    },[])
   
    return {contents,refresh};
}
