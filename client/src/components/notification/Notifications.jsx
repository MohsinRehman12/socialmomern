import React from 'react'
import "./Notification.css"
export default function Notifications() {

    const PublicFolder = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div className='notifcationWrapper'>
      <img 
      src={PublicFolder+'pfp/pfp1.jpg'}
      className='notifcationImg'
      ></img>
     <span className="notificationName">Person Name</span>

     <span className="notificationAction">Liked the post</span>
    </div>
  )
}
