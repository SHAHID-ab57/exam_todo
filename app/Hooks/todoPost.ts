import axios from "axios";
import { useMutation } from "react-query";


const postForm = (data:any)=> axios.post ("http://localhost:2000/todo",data)


export const postMuitate = (option:any)=>{

    return useMutation(postForm, option)

}