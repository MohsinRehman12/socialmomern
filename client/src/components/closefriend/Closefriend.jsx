import React from 'react'
import { Link } from 'react-router-dom';
import "./Closefriend.css"
export default function Closefriend({user}) {
  const PublicFolder = process.env.REACT_APP_PUBLIC_FOLDER;

  return (

    <Link to = {"/profile/"+ user.username} >
    <li className="sidebarFollower">
        <img src={user.profilePicture ? PublicFolder + user.profilePicture : PublicFolder+"pfp/pfp1.jpg"} alt="oop" className="followerImg" />
        <span className = "followerName">{user.username}</span>
        
    </li>
    </Link>
  )
}
