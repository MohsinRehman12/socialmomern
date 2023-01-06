import Axios from "axios";

export const axiosInstance = Axios.create({
    baseURL :"https://socialmo.herokuapp.com/api"
})