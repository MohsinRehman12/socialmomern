import React, { useRef, useState } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput
}
from 'mdb-react-ui-kit';
import "./Register.css"

import Axios from "axios";

import {useNavigate} from "react-router";
import { useEffect } from 'react';
import { axiosInstance } from '../../config';

function App() {

  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const firstName = useRef();
  const lastName = useRef();

  const navigate = useNavigate();

  const [registerStatus, setRegisterStatus] = useState('')
  const [passwordStatus, setPasswordStatus] = useState('')
  const [usernameStatus, setUsernameStatus] = useState('')

  const [disableButton, setDisableButton] = useState(true)
  const handleClick = async (e) =>{
    
    e.preventDefault();

    


      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
        firstName: firstName.current.value,
        lastName: lastName.current.value
      }
      try {
        const res = 
        await axiosInstance.post("/auth/register", user)
        navigate("/login");

      } catch (error) {
        if ((error.message).includes("409")){
          setRegisterStatus("Email is in use please enter another")
        }

        if ((error.message).includes("410")){
          setRegisterStatus("Username is already taken please choose")
        }

        if ((error.message).includes("500")){
          setRegisterStatus("An error has occured with the server please refresh the page")
        }
      }
   

  }

  const testChangeUser = async (e) => {
    if(username.current.value.includes(" ")
    || username.current.value.includes("/")
    || username.current.value.includes("@")
    || username.current.value.includes("#")
    || username.current.value.includes("$")
    || username.current.value.includes("%")
    || username.current.value.includes("^")
    || username.current.value.includes("&")
    || username.current.value.includes("*")
    || username.current.value.includes("(")
    || username.current.value.includes(")")
    || username.current.value.includes("+")
    || username.current.value.includes("=")
    || username.current.value.includes("?")
    || username.current.value.includes("\\")
    || username.current.value.includes("~")
    || username.current.value.includes("`")
    || username.current.value.includes("<")
    || username.current.value.includes(">")
    || username.current.value.includes(".")
    || username.current.value.includes("[")
    || username.current.value.includes("]")
    || username.current.value.includes("{")
    || username.current.value.includes("}")
    || username.current.value.includes("|")
    || username.current.value.includes("!")

    ){
      setDisableButton(true)
      setUsernameStatus("username can only include [a-Z], [0-9] and _ or -")
    }

    else if(username.current.value[username.current.value.length-1].includes("_")
    || username.current.value[username.current.value.length-1].includes("-")
    ){
      setUsernameStatus("usernames must not end with a - or _")
      setDisableButton(true)
    }

    else if(username.current.value ===""){
      setUsernameStatus("")
      setDisableButton(true)
    }

    
    else if(username.current.value.length <6){
      setUsernameStatus("usernames must be 6 or more characters")
      setDisableButton(true)


    }

    else if(registerStatus==="" && usernameStatus==="" && passwordStatus ==""){
      setDisableButton(false)

    }

    

    else{
      setUsernameStatus("")
    }


  }

  const testChange = async (e) =>{
    if(password.current.value.includes(" ")
    || password.current.value.includes("/")
    || password.current.value.includes("@")
    || password.current.value.includes("#")
    || password.current.value.includes("$")
    || password.current.value.includes("%")
    || password.current.value.includes("^")
    || password.current.value.includes("&")
    || password.current.value.includes("*")
    || password.current.value.includes("(")
    || password.current.value.includes(")")
    || password.current.value.includes("+")
    || password.current.value.includes("=")
    || password.current.value.includes("?")
    || password.current.value.includes("\\")
    || password.current.value.includes("~")
    || password.current.value.includes("`")
    || password.current.value.includes("<")
    || password.current.value.includes(">")
    || password.current.value.includes(".")
    || password.current.value.includes("[")
    || password.current.value.includes("]")
    || password.current.value.includes("{")
    || password.current.value.includes("}")
    || password.current.value.includes("|")
    || password.current.value.includes("!")

    ){
      setDisableButton(true)
      setPasswordStatus("password can only include [a-Z], [0-9] and _ or -")
    }

    else if(password.current.value==="" || passwordAgain.current.value==="" ){
      setPasswordStatus("")
      setDisableButton(true)
    }

    else if(passwordAgain.current.value !== password.current.value){
      setPasswordStatus("Passwords Dont Match")
      setDisableButton(true)

    }
    else if(passwordAgain.current.value.length <6 || password.current.value.length <6){
      setPasswordStatus("Passwords must be 6 or more characters")
      setDisableButton(true)


    }else if(registerStatus==="" && usernameStatus==="" && passwordStatus ==""){
      setDisableButton(false)

    }

    

    else{
      setPasswordStatus("")
    }


  }
  useEffect(()=>{
    

  }, [password])
  
  return (
    <MDBContainer className="my-5">

      <MDBCard>
        <MDBRow className='g-0'>

          <MDBCol md='6'>
            <MDBCardImage src="SocialMoLogo.jpg" alt="login form" className='rounded-start w-100'/>
          </MDBCol>

          <MDBCol md='6'>
            <MDBCardBody className='d-flex flex-column'>
            <form onSubmit={handleClick}>

              <div className='d-flex flex-row mt-2'>
                <span className="h1 fw-bold mb-0">Join Now To Socialize Globally</span>
              </div>

              <h5 className="fw-normal my-4 pb-3" style={{letterSpacing: '1px'}}>Sign Up</h5>

              <p className='passwordStatusText'>{usernameStatus}</p>
                <MDBInput 
                wrapperClass='mb-4' 
                label='Username' 
                id='Username' 
                ref = {username} 
                required 
                type='text' 
                size="lg"
                onChange={(e)=>testChangeUser(e)}
                />

                <MDBInput 
                wrapperClass='mb-4' 
                label='Email address' 
                id='Email' 
                ref = {email} 
                required type='email' 
                size="lg"/>

              <MDBInput 
                wrapperClass='mb-4' 
                label='Enter First Name ' 
                ref = {firstName} 
                required 
                id='firstName' 
                type='text' 
                size="lg"
                minLength="1"
                />

                <MDBInput 
                wrapperClass='mb-4' 
                label='Enter Last Name ' 
                ref = {lastName} 
                required 
                id='lastName' 
                type='text' 
                size="lg"
                minLength="1"
                />


                
                <p className='passwordStatusText'>{passwordStatus}</p>
                <MDBInput 
                wrapperClass='mb-4' 
                label='Password' 
                id='Password' 
                ref = {password} 
                required 
                type='password' 
                size="lg"
                minLength="6"
                onChange={(e)=>testChange(e)}
                />

                <MDBInput 
                wrapperClass='mb-4' 
                label='Enter Password Again' 
                ref = {passwordAgain} 
                required 
                id='PasswordAgain' 
                type='password' 
                size="lg"
                minLength="6"
                />

              <p className='passwordStatusText'>{registerStatus}</p>

              <MDBBtn disabled={disableButton} className="mb-4 px-5" color='dark' size='lg' onSubmit={handleClick}>Register</MDBBtn>

              </form>
              <p className="mb-5 pb-lg-2" style={{color: '#393f81'}}>Already have an account? <a href="/login" style={{color: '#393f81'}}>Login here</a></p>

              

            </MDBCardBody>
          </MDBCol>

        </MDBRow>
      </MDBCard>

    </MDBContainer>
  );
}

export default App;