import React from 'react'
import "./Message.css"
import {format} from 'timeago.js'
export default function Message({message, own}) {

    const PublicFolder = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    
    <div className={own? "message own" : "message"}>
      <div className="messageTop">
        <img src={PublicFolder+"pfp/pfp1.jpg"} alt="" className="messageImg" />
        <p className="messageText">{message.text}</p>
      </div>

      <div className="messageBottom">
        {format(message.createdAt)}
      </div>
    </div>
  )
}
