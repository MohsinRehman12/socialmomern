import axios from "axios";
export const loginCall = async (userCreditials, dispatch) =>{
    dispatch({type: "LOGIN_START"});
    
    try {
        const res = await axios.post()
    } catch (error) {
        
    }
}


const email = useRef();
  const password = useRef();
  const handleClick = (e) =>{
    
    e.preventDefault();
    console.log(email.current.value)
  }