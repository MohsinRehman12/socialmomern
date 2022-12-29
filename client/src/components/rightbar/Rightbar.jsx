import React from 'react'
import "./Rightbar.css"
import {CakeOutlined} from "@mui/icons-material"
import {Users} from "../../testData"
import Online from "../online/Online"



export default function Rightbar({ user }) {

  const PublicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
  
  const HomeRightbar = () =>{
    return(
      <>
      <div className='rightbar'>
      <div className="rightbarWrapper">
        <div className="birthdayContainer">
          <CakeOutlined className='birthdayIcons' htmlColor='orange' />
          <span className="birthdayText"> <b>Person</b> Has a birthday today along with <b> 3 others</b> </span>

        </div>
        <img className='rightBarAd' src='/pfp/pfp1.jpg' alt='ad' />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map(u=>(
              <Online key={u.id} user={u}/>
          ))}
        </ul>
        </div>
    </div>
      </>
    )
  };

  const ProfileRightBar =() => {
    return(
      <>
        <div className="rightbarInfo">
        <h4 className="rightbarTitle">User information</h4>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">{user.relationship ===1 ? 
            "Single"
            : user.relationship ===2 ? "Married"
            : user.relationship ===3 ? "Engaged": "Complicated"
            }</span>
          </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          <div className="rightbarFollowing">
            <img
              src={`${PublicFolder}pfp/pfp1.jpg`}
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">John Carter</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src={`${PublicFolder}pfp/pfp1.jpg`}
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">John Carter</span>
          </div>
          <div className="rightbarFollowing">
            <img
            src={`${PublicFolder}pfp/pfp1.jpg`}
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">John Carter</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src={`${PublicFolder}pfp/pfp1.jpg`}
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">John Carter</span>
         </div>
        </div>
        </div>

      </>
      )
  }
  return (
    <div className="rightbar">

      <div className="rightbarwrapper">
        {user ? <ProfileRightBar /> : <HomeRightbar></HomeRightbar>}
      </div>
    </div>
      
  )
}
