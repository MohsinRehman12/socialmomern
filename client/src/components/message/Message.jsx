import React, { useEffect, useState } from 'react'
import "./Message.css"
import {format} from 'timeago.js'
import axios from 'axios'
export default function Message({message, own}) {

  const [user, setUser] = useState("");
  useEffect(() => {
    const getUser = async() => {
      try {
        const res = await axios("/users?userId="+ message.sender)
        setUser(res.data);
        console.log(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    getUser();
  },[])

    const PublicFolder = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    
    <div className={own? "message own" : "message"}>
      <div className="messageTop">
        <img src={user ? PublicFolder + user.profilePicture : PublicFolder+"pfp/pfp1.jpg"} alt="" className="messageImg" />
        <p className="messageText">{message.text}</p>
      </div>

      <div className="messageBottom">
        {format(message.createdAt)}
      </div>
    </div>
  )
}
