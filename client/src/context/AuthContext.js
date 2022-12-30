import { useEffect, createContext, useReducer } from "react"
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
    user:{"_id":{"$oid":"63a65dc54ac737f84debccbe"},"username":"Mo","email":"Mo@gmail.com","password":"$2b$10$sULcQYmF7GLIbAjxeGwa6.5R.VYeCgUYDvPh3MJoyleQwDd0MjFF.","profilePicture":"","followers":["63aa018ed6109315e7250129"],"followings":["63aa018ed6109315e7250129"],"isAdmin":false,"createdAt":{"$date":{"$numberLong":"1671847365123"}},"updatedAt":{"$date":{"$numberLong":"1672270557025"}},"__v":{"$numberInt":"0"},"city":"Toronto, Ontario","desc":"updated desc test","from":"Toronto, Ontario","relationship":{"$numberInt":"1"}},
    isFetching: false,
    error:false
};

export const AuthContext = createContext(INITIAL_STATE);



export const AuthContextProvider = ({children}) =>{
    const [state, dispatch] = useReducer(AuthReducer,INITIAL_STATE);

    useEffect(()=>{
        localStorage.setItem("user", JSON.stringify(state.user))
      },[state.user])
    return(
        <AuthContext.Provider value={{
            user:state.user, 
            isFetching:state.isFetching, 
            error:state.error,
            dispatch,
        
        }}>
            {children}
        </AuthContext.Provider>
    )
}