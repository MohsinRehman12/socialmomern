import React, { useEffect, useState, useContext } from 'react'
import "./Rightbar.css"
import {CakeOutlined} from "@mui/icons-material"
import {Users} from "../../testData"
import Online from "../online/Online"
import Axios from 'axios'
import { AuthContext } from "../../context/AuthContext";
import {Link} from "react-router-dom"


export default function Rightbar({ user }) {

  const PublicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [friends, setFriends] = useState([])


  useEffect(()=>{

    const getFollowers = async () =>{
      try {

        const friendList = await Axios.get("/users/friends/"+user._id)
        
        setFriends(friendList.data)
        console.log('friendList', friendList.data)


      } catch (error) {
        console.log(error)
      }
    }
    
    //get around async not being used in useEffect by creating a async function and then calling it
    getFollowers(); 
  },[user._id])

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
        {friends.map((friend)=>(
        
        <Link to={"/profile/"+friend.username} style={{textDecoration: "none"}}>

          <div className="rightbarFollowing">

              <img
              src={friend.profilePicture 
                ? PublicFolder+friend.profilePicture 
                : PublicFolder+"pfp/pfp1.jpg"}
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">
              {friend.username}
            </span>
            
          </div>
          </Link>
          ))}
          
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
