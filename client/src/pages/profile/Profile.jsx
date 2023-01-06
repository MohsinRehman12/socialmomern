import React from 'react'
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import Feed from '../../components/feed/Feed';
import Rightbar from '../../components/rightbar/Rightbar';
import "./Profile.css"
import  { useState, useEffect, useContext } from 'react'
import {axiosInstance} from '../../config';
import { useNavigate , useParams } from "react-router";
import { AuthContext } from '../../context/AuthContext';
import {
  LogoutOutlined,
  ManageAccountsOutlined
} from "@mui/icons-material"


export default function Profile() {

  const params = useParams();
  console.log("params")
  console.log(params)
  const PublicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const {user:currentUser} = useContext(AuthContext);
  const navigate = useNavigate();

  const [buttonType, setButtonType] = useState('');

  if(currentUser==null){
    navigate('/')
  }

  const handleClick = () =>{

      localStorage.removeItem("user")
    
      window.location.reload(false)
    

} 


  

  
  
  useEffect(()=>{


    const fetchUser= async () =>{

    try {
      const res = await axiosInstance.get(`/users?username=${params.username}`)
      setUser(res.data)
    } catch (error) {

      if ((error.message).includes("500")){
        navigate("/")
      }
    }    
      
    }

    fetchUser();

  },[params.username])

  
  return (
    <>
    
      <Navbar/>
      <div className="profile">
      <Sidebar />
      <div className="profileRight">
        <div className="profileRightTop">
          <div className="profileCover">
            <img src={user.coverPicture ? PublicFolder+user.coverPicture : PublicFolder+"cover/cover1.jpg"} className='profileCoverImg' />
            <img src={user.profilePicture ? PublicFolder+user.profilePicture : PublicFolder+"pfp/pfp1.jpg"} className='profilePfpImg' />
          </div>
          <div className="profileInfo">
          <h4 className="profileName">{user.username}</h4>
            {user.firstName?
            <h4 className="profileRealName">Full Name: {user?.firstName} {user?.lastName}</h4>
            : null}

            <p className="profileDesc">{user.desc}</p>
            {params.username === currentUser.username ? 
            <>
              <button className='LogoutButton' onClick={handleClick}> 
              Logout
              <LogoutOutlined className='accountIcons'></LogoutOutlined>
              </button>
              <a href='../edit'>
              <button className='LogoutButton'> 
              Edit 
              <ManageAccountsOutlined className='accountIcons'></ManageAccountsOutlined>   
              </button></a>
              
            </>
            :null}

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
