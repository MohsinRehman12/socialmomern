import React from 'react'
import  { useState, useEffect, useContext } from 'react'

import "./Edit.css";
import { AuthContext } from '../../context/AuthContext';
import Navbar from '../../components/navbar/Navbar';
import { useNavigate } from "react-router";
import { axiosInstance } from '../../config';

export default function Edit() {

  const {user} = useContext(AuthContext);
  const PublicFolder = process.env.REACT_APP_PUBLIC_FOLDER;

  const [email, setEmail] = useState("")
  const [password, setpassword] = useState("")
  const [username, setUsername] = useState("")
  const [desc, setDesc] = useState("")
  const [current, setCurrent] = useState("")
  const [from, setFrom] = useState("")
  const [check, setCheck] = useState(true)
  const [relationship, setRelationship] = useState(true)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [birthDate, setBirthDate] = useState("")

  const [filePfp,setFilePfp] = useState(null);
  const [coverPfp,setCoverPfp] = useState(null);

  const [editStatus, setEditStatus] = ("");
  const navigate = useNavigate();
  const handleClick = async (e) =>{
    e.preventDefault()
    let testCheck = true;

    try {

    
        if(email && testCheck=== true){
            try {

            
                    const res = await axiosInstance.get("users/checkE/" + email);
        
                
                
            } catch (error) {
                testCheck = false;;
                if(error.message.includes("409")){
                    window.alert("email is already in use");
                    navigate("/");

                }

                if(error.message.includes("500")){
                    window.alert("server error");
                    navigate("/");

                }

            }
        }

        if(username && testCheck=== true){
            try {

                const res = await axiosInstance.get("users/checkU/" + username);
        
                console.log(res);

                
                
            } catch (error) {
                testCheck = false;;
                if(error.message.includes("410")){
                    window.alert("username is already in use");
                    navigate("/");
                    testCheck = false;

                }

                if(error.message.includes("500")){
                    window.alert("server error");
                    navigate("/");

                }

            }
        }

        if(testCheck){


        try {

            if(desc){
                const res = await axiosInstance.put("users/" + user._id,
                {desc:desc, userId:user._id }
                );
            }

            if(password){
                const res = await axiosInstance.put("users/" + user._id,
                {password:password, userId:user._id }
                );
            }

            if(from){
                const res = await axiosInstance.put("users/" + user._id,
                {from:from, userId:user._id }
                );
            }

            if(current){
                const res = await axiosInstance.put("users/" + user._id,
                {city:current, userId:user._id }
                );
            }

            if(relationship){
                const res = await axiosInstance.put("users/" + user._id,
                {relationship:relationship, userId:user._id }
                );
            }

            if(birthDate){
                const res = await axiosInstance.put("users/" + user._id,
                {birthday:birthDate, userId:user._id }
                );
            }

            if(firstName){
                
                const res = await axiosInstance.put("users/" + user._id,
                {firstName:firstName, userId:user._id }
                );
            }
            if(lastName){
                const res = await axiosInstance.put("users/" + user._id,
                {lastName:lastName, userId:user._id }
                );
            }
            

            if ( coverPfp ) {
                const data = new FormData();
                const fileName = Date.now()
                data.append("name", fileName)
                data.append("file", coverPfp)
                setCoverPfp(fileName);          
                try {
                  await axiosInstance.post("/upload", data)
          
                } catch (error) {
                    testCheck = false;;

                  console.log(error)

                }

                let x = JSON.parse(localStorage.getItem(["user"]))
            console.log(x.profilePicture)
                
            
          
              try {
                const res = await axiosInstance.put("users/" + user._id,
                {coverPicture:fileName, userId:user._id})
                let x = JSON.parse(localStorage.getItem(["user"]))
                x.coverPicture=fileName;

                localStorage.setItem("user", JSON.stringify(x))          
              } catch (error) {
                testCheck = false;;

                if(error.message.includes("500")){
                    window.alert("server error");
                    navigate("/");

                }
          
              }
            }
            


            if ( filePfp ) {
                const data = new FormData();
                const fileName = Date.now()
                data.append("name", fileName)
                data.append("file", filePfp)
                setFilePfp(fileName);          
                try {
                  await axiosInstance.post("/upload", data)

                } catch (error) {
                    testCheck = false;;

                    if(error.message.includes("500")){
                        window.alert("upload error");
                        navigate("/");
    
                    }

                }
            
          
              try {
                const res = await axiosInstance.put("users/" + user._id,
                {profilePicture:fileName, userId:user._id})

                let x = JSON.parse(localStorage.getItem(["user"]))
                console.log(x.profilePicture)

                x.profilePicture=fileName;

                localStorage.setItem("user", JSON.stringify(x))          

          
              } catch (error) {
                testCheck = false;;

                console.log(error)

                if(error.message.includes("500")){
                    window.alert("server error");
                    navigate("/");

                }
          
              }
              }
            
            
            // if(check===true){
            //     navigate("/")
            // }
            
            
            
            
        } catch (error) {
            testCheck = false;;

            if(error.message.includes("500")){
                window.alert("server error");
                navigate("/edit");

            }



        }
    }
        

        
        
    } catch (error) {
        testCheck = false;;

        if(error.message.includes("500")){
            window.alert("server error");
            navigate("/edit");

        }
        
    }

    if(testCheck){
        window.alert("edit succesful");
        navigate("/");
        window.location.reload();
    }
    
    
}





  return (
    <>
    <Navbar />
    <div className="container-xl px-4 mt-4">
   
    <hr className="mt-0 mb-4"/>
    <div className="row">
        <div className="col-xl-4">
            <div className="card mb-4 mb-xl-0">
                <div className="card-header">Profile Picture</div>
                <div className="profileImageCards">

                <div className="card-body text-center">
                    <img className="img-account-profile rounded-circle mb-2" 
                    src={user.profilePicture ? PublicFolder+user.profilePicture : PublicFolder+"pfp/pfp1.jpg"} 
                    alt=""/>
                    <div className="small font-italic text-muted mb-4"></div>
                    <label htmlFor='file' className="shareOptions">
                    <span className="btn btn-primary" type="button">Upload new image</span>

                    <input
                        style={{display:"none"}} 
                        type="file" 
                        id='file'
                        name='filePfP' 
                        accept=".png,.jpeg,.jpg"
                        onChange={(e)=>setFilePfp(e.target.files[0])}/>
                    </label>
                </div>
                </div>
                <div className="profileImageCards">

                
                <div className="card-body text-center">
                    <img className="img-account-profile mb-2" 
                    src={user.coverPicture ? PublicFolder+user.coverPicture : PublicFolder+"cover/cover1.jpg"} 
                    alt=""/>
                    <div className="small font-italic text-muted mb-4"></div>
                    <label htmlFor='file1' className="shareOptions">
                    <span className="btn btn-primary" type="button">Upload new image</span>

                    <input
                        style={{display:"none"}} 
                        type="file" 
                        id='file1' 
                        accept=".png,.jpeg,.jpg"
                        name='fileCover' 
                        onChange={(e)=>setCoverPfp(e.target.files[0])}
                        />
                    </label>
                </div>
            </div>
            </div>
        </div>
        <div className="col-xl-8">
            <div className="card mb-4">
                <div className="card-header">Account Details</div>
                <div className="card-body">
                    <form>
                        <div className="mb-3">
                            <label className="small mb-1" htmlFor="inputUsername">Username (current username {user.username})</label>
                            <input 
                            className="form-control" 
                            id="inputUsername" 
                            type="text" 
                            placeholder="Enter your username" 
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                            />
                        </div>
                        <div className="row gx-3 mb-3">
                            <div className="col-md-6">
                                <label className="small mb-1" htmlFor="inputFirstName">First name</label>
                                <input 
                                className="form-control" 
                                id="inputFirstName" 
                                type="text" 
                                placeholder="Enter your first name"
                                onChange={(e) => setFirstName(e.target.value)}
                                value={firstName}
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="small mb-1" htmlFor="inputLastName">Last name</label>
                                <input 
                                className="form-control" 
                                id="inputLastName" 
                                type="text" 
                                placeholder="Enter your last name" 
                                onChange={(e) => setLastName(e.target.value)}
                                value={lastName}
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="small mb-1" htmlFor="inputDesc">Description</label>
                                <input 
                                className="form-control" 
                                id="inputDesc" 
                                type="text" 
                                placeholder="Enter your last name" 
                                onChange={(e) => setDesc(e.target.value)}
                                value={desc}
                                />
                            </div>
                        </div>
                        <div className="row gx-3 mb-3">
                           
                            <div className="col-md-6">
                                <label className="small mb-1" htmlFor="inputLocationCurrent">Current Location</label>
                                <input className="form-control" 
                                id="inputLocationCurrent" 
                                type="text" 
                                placeholder="Enter your location"
                                onChange={(e) => setCurrent(e.target.value)}
                                value={current}
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="small mb-1" htmlFor="inputLocationFrom">Location From:</label>
                                <input 
                                className="form-control" 
                                id="inputLocationFrom" 
                                type="text" 
                                placeholder="Enter your location"
                                onChange={(e) => setFrom(e.target.value)}
                                value={from}
                                />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="small mb-1" htmlFor="inputEmailAddress">Email address</label>
                            <input 
                            className="form-control" 
                            id="inputEmailAddress" 
                            type="email" placeholder="Enter your email address" 
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            />
                        </div>

                        <div className="mb-3">
                            <div className='relationshipRow'>
                            <label className="small mb-1" htmlFor="relationship1">Single</label>
                            <input 
                            id="relationship1" 
                            name='relationshipButton' 
                            type="radio"
                            className='relationshipRadioButton'
                            onChange={(e) => setRelationship(e.target.value)}
                            value= {1}
                            />

                        <label className="small mb-1" htmlFor="relationship2">Engaged</label>
                            <input 
                            id="relationship2" 
                            name='relationshipButton' 
                            type="radio"
                            className='relationshipRadioButton'
                            onChange={(e) => setRelationship(e.target.value)}
                            value= {2}
                            />

                        <label className="small mb-1" htmlFor="relationship3">Married</label>
                            <input 
                            id="relationship3" 
                            name='relationshipButton' 
                            className='relationshipRadioButton'
                            type="radio"
                            onChange={(e) => setRelationship(e.target.value)}
                            value= {3}
                            />  

                        <label className="small mb-1" htmlFor="relationship4">Complicated</label>
                            <input 
                            id="relationship4"
                            name='relationshipButton' 
                            type="radio"
                            className='relationshipRadioButton'
                            onChange={(e) => setRelationship(e.target.value)}
                            value= {4}
                        />
                        </div>
                        </div>
                        <div className="row gx-3 mb-3">
                            
                            <div className="col-md-6">
                                <label className="small mb-1" htmlFor="inputBirthday">Birthday</label>
                                <input className="form-control" 
                                id="inputBirthday" 
                                type="date" 
                                name="birthday" 
                                placeholder="Enter your birthday" 
                                onChange={(e) => setBirthDate(e.target.value)}
                                value= {birthDate}
                                />
                            </div>
                        </div>
                        <p className='errorMessageText'>{editStatus}</p>
                        <button className="btn btn-primary" onClick={handleClick} type="button">Save changes</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
</>
  )
}
