import {axiosInstance} from "./config";
export const loginCall = async (userCreditials, dispatch) =>{
    dispatch({type: "LOGIN_START"});
    
    try {
        const res = await axiosInstance.post("/auth/login", userCreditials);
        dispatch({type:"LOGIN_SUCCESS", payload:res.data});
    } catch (error) {
      dispatch({type:"LOGIN_FAILURE", payload: error});

    }
}

