import { registerUser } from "../apis/AuthApis"
import type { RegisterRequest } from "../interfaces/RegitserRequest"

export let registerService = async (data:RegisterRequest)=>{
    //logics
         return  await registerUser(data);
}