import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import "./Convos.css"
export default function Convos({convo, currentUser}) {

    const PublicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
    const [user, setUser] = useState([])

    useEffect(()=>{
      const friendConvoId = convo.members.find((m)=>m !== currentUser._id );
      const getUser = async() => {

        try {
          const res = await axios("/users?userId="+ friendConvoId)
          setUser(res.data)
          console.log(res.data.username)


        } catch (error) {
          console.log(error)
        }


      }

      getUser();
    }, [currentUser, convo])
  return (
    <div className='convo'>
        <img src={user?.profilePicture ? PublicFolder+user?.profilePicture : PublicFolder+"pfp/pfp1.jpg"} alt="" className="convoImg" />
        <span className="convoName">{user.username}</span>
    </div>
  )
}
