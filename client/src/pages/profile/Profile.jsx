import React from 'react'
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import Feed from '../../components/feed/Feed';
import Rightbar from '../../components/rightbar/Rightbar';
import "./Profile.css"
import  { useState, useEffect } from 'react'
import Axios from "axios";
import { useParams } from "react-router";


export default function Profile() {

  const params = useParams();
  console.log("params")
  console.log(params)
  const PublicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});

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
  },[user])

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
