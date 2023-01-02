import React from 'react'
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import Feed from '../../components/feed/Feed';
import Rightbar from '../../components/rightbar/Rightbar';
import "./Profile.css"
import  { useState, useEffect, useContext } from 'react'
import Axios from "axios";
import { useNavigate , useParams } from "react-router";
import { AuthContext } from '../../context/AuthContext';



export default function Profile() {

  const params = useParams();
  console.log("params")
  console.log(params)
  const PublicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const {user:currentUser} = useContext(AuthContext);
  const navigate = useNavigate();

  if(currentUser==null){
    navigate('/')
  }

  const handleClick = () =>{

    localStorage.removeItem("user")
    
    window.location.reload(false)

  } 

  

  
  
  useEffect(()=>{
    
    const fetchUser= async () =>{
      const res = await Axios.get(`/users?username=${params.username}`)
      setUser(res.data)
    }


    fetchUser().then(response => {
      console.log(response);
  }).catch(e => {
      console.log(e);
  });
  },[params.username])

  return (
    <>
    
      <Navbar/>
      <div className="profile">
      <Sidebar />
      <div className="profileRight">
        <div className="profileRightTop">
          <div className="profileCover">
            <img src={user.coverImg ? PublicFolder+user.coverImg : PublicFolder+"cover/cover1.jpg"} className='profileCoverImg' />
            <img src={user.profilePicture ? PublicFolder+user.profilePicture : PublicFolder+"pfp/pfp1.jpg"} className='profilePfpImg' />
          </div>``
          <div className="profileInfo">
            <h4 className="profileName">{user.username}</h4>
            <p className="profileDesc">{user.desc}</p>
            {params.username === currentUser.username ? 
            <button className='Logout' onClick={handleClick}> Logout </button> : null}

          </div>
        </div>

        <div className="profileRightBottom">
        <Feed username={params.username}/>
        <Rightbar user={user}/>
        </div>
      </div>
      
      </div>
    </>
  )
}
