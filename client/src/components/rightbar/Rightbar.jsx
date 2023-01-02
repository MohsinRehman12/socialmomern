import React, { useEffect, useState, useContext } from 'react'
import "./Rightbar.css"
import {CakeOutlined, Add, Remove} from "@mui/icons-material"
import {Users} from "../../testData"
import Online from "../online/Online"
import Axios from 'axios'
import { AuthContext } from "../../context/AuthContext";
import {Link} from "react-router-dom"


export default function Rightbar({ user }) {

  const PublicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [friends, setFriends] = useState([])
  const [followed, setFollowed] = useState(currentUser.followings.includes(user?._id));

  console.log('current followed', followed)

  


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
  },[user])

  const handleClick = async () =>{
    try {
      console.log('user id click',user._id)
      console.log('other id',currentUser._id.$oid)

      if(followed){
        await Axios.put(`/users/${user._id}/unfollow`, {userId:currentUser._id})
        dispatch({type:"UNFOLLOW", payload:user._id})
      }
      else{
        await Axios.put(`/users/${user._id}/follow`, {userId:currentUser._id})
        dispatch({type:"FOLLOW", payload:user._id})

      }
      setFollowed(!followed)
      console.log('current followed', followed)

    } catch (error) {
      console.log(error)
    }

  }

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
      {user.username !== currentUser.username && (
        <button className="rightbarFollow"
         onClick={handleClick}>
          {followed ? "Unfollow" : "Follow"}
          {followed ? <Remove /> : <Add></Add>}

        </button>
      )}
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
