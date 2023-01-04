import Axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';

export default function Online({user}) {
  const PublicFolder = process.env.REACT_APP_PUBLIC_FOLDER;

  const [userInfo, setUserInfo] = useState([])
  useEffect(()=>{
    const getUser = async() =>{

      try {
        
        const res = await Axios.get(`/users?userId=${user}`);

        setUserInfo(res.data)

      } catch (error) {
        console.log(error)
      }

    }

  getUser();
  },[])
  return (
    
    <li className="rightbarFriend">

            <div className="rightbarPfpContainer">
              <img className="rightbarPfp" src={userInfo.profilePicture ? PublicFolder + userInfo.profilePicture : PublicFolder+"pfp/pfp1.jpg"} alt=''/>
              <span className="rightbarOnline"></span>
            </div>
            <span className="rightbarUsername">{userInfo.username}</span>
    </li>
  )
}
