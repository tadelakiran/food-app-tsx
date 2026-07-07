import type { RegisterRequest } from "../interfaces/RegitserRequest";
import axiosInstance from "./AxiosConfig";

export const registerUser = async(data: RegisterRequest) => {
    return await axiosInstance.post("/customers", data);
};