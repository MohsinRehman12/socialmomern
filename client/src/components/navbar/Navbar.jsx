import React, { useContext, useEffect } from 'react'
import "./Navbar.css"
import {Link, useNavigate} from "react-router-dom"

import {Search, Person, Chat, Notifications} from '@mui/icons-material';
import {AuthContext} from "../../context/AuthContext"
import { useState } from 'react';
import { SocketContext } from '../../context/SocketContext';
import NotificationsComponenet from '../notification/Notifications';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import Axios from 'axios';
export default function Navbar() {
  const PublicFolder = process.env.REACT_APP_PUBLIC_FOLDER;

  const {user} = useContext(AuthContext);
  const [seachUser, setSearchUser] = useState("")
  const navigate = useNavigate();
  const socket = useContext(SocketContext)
  const [notifications, setNotifcations]=useState([])
  const [notificationsMessenger, setNotificationsMessenger]=useState([])
  const [notificationsFollow, setNotificationsFollow]=useState([])

  const [anchorEl, setAnchorEl] = useState(null);

  const [anchorElM, setAnchorElM] = useState(null);
  const [anchorElF, setAnchorElF] = useState(null);

  
  const handleRead =() =>{
    setNotifcations([])
  }

  const handleReadM =() =>{
    setNotificationsMessenger([])
  }


  const handleReadF =() =>{
    setNotificationsFollow([])
  }


  const open = Boolean(anchorEl);

  const handleClick = (event) => {

      setAnchorEl(event.currentTarget);

  };

  const openM = Boolean(anchorElM);
  const handleClickM = (event) => {

    setAnchorElM(event.currentTarget);

};

const openF = Boolean(anchorElF);
  const handleClickF = (event) => {

    setAnchorElF(event.currentTarget);

};
  const handleClose = () => {
    setAnchorEl(null);
    setAnchorElM(null);
    setAnchorElF(null);
  };

  const handleSubmit = async(e) =>{
    let profileSearch=([]);
    try {
      const res = await Axios.get("/users/getUA/" + seachUser)
        let x = res.data;
        navigate ("/search", {state:{x}})        
    } catch (error) {
      console.log(error)
    }
    
    
    
  }

  useEffect(()=>{
    socket.on("getNotification", data=>{

      setNotifcations((prev)=>[...prev,data]);
    })

    socket.on("getNotificationMessenger", data=>{

    setNotificationsMessenger((prev)=>[...prev,data])

    })

    socket.on("getNotificationFollow", data=>{

      setNotificationsFollow((prev)=>[...prev,data])
  
      })

  },[socket])

  console.log(notificationsFollow)
  return (
    <div className="navbarContainer">
      <div className="navbarLeft">
      <Link to="/" className='linkTo'>
        <span className="logo">SocialMo</span>
      </Link>
      </div>
      

      <div className="navbarCenter">
        <div className="searchbar">
          <Search className='searchicon'/>
          <input type="text" 
          placeholder = "Search" 
          className="searchInput" 
          onChange={(e)=>setSearchUser(e.target.value)}
          />

        </div>

        <div className="navbarLinks">

            <button className="navbarLink"
            onClick={handleSubmit}
            >Search</button>
          </div>

      </div>

      <div className="navbarRight">
          
        
          <div className="navbarIcons">
          <button className="navbarIconItem"
             aria-controls={openM ? 'demo-positioned-menu' : undefined}
             aria-haspopup="true"
             aria-expanded={openM ? 'true' : undefined}
             onClick={handleClickM}
            >
              <Chat/>
              {notificationsMessenger.length>0 ?
                <span className="navbarIconBadge">{notificationsMessenger.length}</span>
              : null}
              </button>

            
              <Menu
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          anchorEl={anchorElM}
          open={openM}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >

        {notificationsMessenger.map((n)=>
          
          <MenuItem onClick={handleClose}>
            <img src={n.pfp ?PublicFolder+ n.pfp: PublicFolder+"pfp/pfp1.jpg"}
              className='notifcationImg' >
                
            </img>

            <span className="notificationName">
            {n.senderName} Sent you a message

            </span>
            </MenuItem>
          )

        }

          <button className='notificationsButton' onClick={handleReadM}>
              Mark As Read
          </button>
        </Menu>

            
            {/* //chat button */}

            <button className="navbarIconItem"
             aria-controls={open ? 'demo-positioned-menu' : undefined}
             aria-haspopup="true"
             aria-expanded={open ? 'true' : undefined}
             onClick={handleClick}
            >
              <Notifications/>
              {notifications.length>0 ?
                <span className="navbarIconBadge">{notifications.length}</span>
              : null}
              </button>

            
              <Menu
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >

        {notifications.map((n)=>
          
          <MenuItem onClick={handleClose}>
            <img src={n.pfp ?PublicFolder+ n.pfp: PublicFolder+"pfp/pfp1.jpg"}
              className='notifcationImg' >
                
            </img>

            <span className="notificationName">
            {n.senderName} {n.type ===1 ? "Liked" : "Commented"}

            </span>
            </MenuItem>
          )

        }

          <button className='notificationsButton' onClick={handleRead}>
              Mark As Read
          </button>
        </Menu>
            

        <button className="navbarIconItem"
             aria-controls={openF ? 'demo-positioned-menu' : undefined}
             aria-haspopup="true"
             aria-expanded={openF ? 'true' : undefined}
             onClick={handleClickF}
            >
              <Person/>
              {notificationsFollow.length>0 ?
                <span className="navbarIconBadge">{notificationsFollow.length}</span>
              : null}
              </button>

            
              <Menu
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          anchorEl={anchorElF}
          open={openF}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >

        {notificationsFollow.map((n)=>
          
          <MenuItem onClick={handleClose}>
            <img src={n.pfp ?PublicFolder+ n.pfp: PublicFolder+"pfp/pfp1.jpg"}
              className='notifcationImg' >
                
            </img>

            <span className="notificationName">
            {n.senderName} Followed You

            </span>
            </MenuItem>
          )

        }

          <button className='notificationsButton' onClick={handleReadF}>
              Mark As Read
          </button>
        </Menu>
          </div>

      <Link className="navbarLinks" to={`/profile/${user.username}`}>

      <img src={user.profilePicture ? PublicFolder + user.profilePicture : PublicFolder+"pfp/pfp1.jpg"} alt="boof" className="navbarImg" />
      
      </Link>
      </div>
      


    </div>
    
  )
}
