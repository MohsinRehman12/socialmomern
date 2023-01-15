import Axios from 'axios';
import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import { axiosInstance } from '../../config';
import { AuthContext } from '../../context/AuthContext';

export default function Online({onlineUsers}) {
  const PublicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
  const {user:currentUser} = useContext(AuthContext);
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);

  useEffect(()=>{
    const getUsers = async ()=>{
      const res = await axiosInstance.get("/users/friends/"+currentUser._id)
      setFriends(res.data);
    }

    getUsers();


  },[currentUser._id])


  useEffect(()=>{

    setOnlineFriends(
      friends.filter(f=>onlineUsers?.includes(f._id))
    )

  },[friends, onlineUsers])
  
  return (
    <>
    {onlineFriends.map(o=>(
    <li className="rightbarFriend">

            <div className="rightbarPfpContainer">
              <img className="rightbarPfp" src={o.profilePicture ? PublicFolder + o.profilePicture : PublicFolder+"pfp/pfp1.jpg"} alt=''/>
              <span className="rightbarOnline"></span>
            </div>
            <span className="rightbarUsername">{o.username}</span>
    </li>
    ))}
    </>
  )
}
