import React from 'react'

export default function Closefriend({user}) {
  const PublicFolder = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <li className="sidebarFollower">
        <img src={PublicFolder+user.photo} alt="oop" className="followerImg" />
        <span className = "followerName">{user.username}</span>
        
    </li>
  )
}
