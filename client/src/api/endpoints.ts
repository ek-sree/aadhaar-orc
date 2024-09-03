import axios from "axios";

const mainApi = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials:true
});

export const aadharApi = async(data:FormData)=>{
    try {
        const config = {
            headers:{
                "Content-Type":"multipart/form-data"
            },
            withCredentials:true
        }
        return await mainApi.post("/postAadhar",data,config)
    } catch (error) {
        console.log("Error occured while posting aadhar",error);
    }
}