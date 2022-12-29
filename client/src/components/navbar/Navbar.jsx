import React from 'react'
import "./Navbar.css"
import {Link} from "react-router-dom"

import {Search, Person, Chat, Notifications} from '@mui/icons-material';
export default function Navbar() {
  const PublicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
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
          <input type="text" placeholder = "Search" className="searchInput" />

        </div>

      </div>

      <div className="navbarRight">
          <div className="navbarLinks">
            <span className="navbarLink">Home</span>
            <span className="navbarLink">Feed</span>

          </div>

          <div className="navbarIcons">
            <div className="navbarIconItem">
              <Person/>
              <span className="navbarIconBadge">1</span>
            </div>

            <div className="navbarIconItem">
              <Chat/>
              <span className="navbarIconBadge">1</span>
            </div>


            <div className="navbarIconItem">
              <Notifications/>
              <span className="navbarIconBadge">1</span>
            </div>
          </div>
      </div>
      <img src={`${PublicFolder}pfp/pfp1.jpg`} alt="boof" className="navbarImg" />
      

    </div>
  )
}
