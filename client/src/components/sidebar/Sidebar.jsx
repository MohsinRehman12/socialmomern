import React from 'react'
import "./Sidebar.css"
import {Users} from "../../testData"
import Closefriend from '../closefriend/Closefriend'
import {Link} from "react-router-dom"
import { AuthContext } from '../../context/AuthContext';
import {useContext, useState, useEffect} from 'react'
import { 
  DynamicFeedOutlined,
  Chat,
  AccountCircleOutlined,
  HelpOutline,
} from "@mui/icons-material"

import Axios from 'axios'



export default function Sidebar() {


  const [friends, setFriends] = useState([])

  
  const {user} = useContext(AuthContext);

  useEffect(()=>{
    const getFollowers = async () =>{
      try {

        const friendList = await Axios.get("/users/friends/"+user._id)
        
        setFriends(friendList.data)


      } catch (error) {
        console.log(error)
      }
    }
    
    //get around async not being used in useEffect by creating a async function and then calling it
    getFollowers(); 
  },[user])
  return (
    <div className='sidebar'>
      <div className="sidebarWrapper">
      <ul className="sidebarList">
        
          <li className="sidebarListItem">
          <Link to="/" >
            <DynamicFeedOutlined className="sidebarIcon" />
            <span className="sidebarListItemText">Feed</span>
          </Link>
          </li>
          <li className="sidebarListItem">
          <Link to="/messenger" >
            <Chat className="sidebarIcon" />
            <span className="sidebarListItemText">Chats</span>
          </Link>
          </li>


          <li className="sidebarListItem">
          <Link to={"/profile/"+user.username} >
            <AccountCircleOutlined className="sidebarIcon" />
            <span className="sidebarListItemText">Profile</span>
          </Link>
          </li>
         
        
          <li className="sidebarListItem">
            <Link to="/About">
            <HelpOutline className="sidebarIcon" />
            <span className="sidebarListItemText">About</span>
            </Link>
          </li>
          
        </ul>
        
        <hr className='sidebarHr'></hr>
        <ul className='sidebarFollowerList'>
          {friends.map((u)=>(
              <Closefriend key={u.id} user={u} />
          ))}
        </ul>

      </div>
    </div>
  )
}
