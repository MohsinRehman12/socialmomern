import React, { useEffect, useState, useContext, useRef } from 'react'
import "./Rightbar.css"
import { PersonAddAltOutlined, PersonRemoveOutlined} from "@mui/icons-material"
import Online from "../online/Online"
import Axios from 'axios'
import { AuthContext } from "../../context/AuthContext";
import {Link} from "react-router-dom"
import { useNavigate } from 'react-router-dom'
import {io} from 'socket.io-client'


const Rightbar=({ user, socket, onlineUsers })=> {

  const PublicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [friends, setFriends] = useState([])
  const [followed, setFollowed] = useState(currentUser.followings.includes(user?._id));
  // const [onlineUsers, setOnlineUsers] = useState([]);
  // const socket= useContext(SocketContext);
  const navigate = useNavigate();

  // useEffect(()=>{

  //   socket.current = io("ws://localhost:8900")

  // }, [])



 


  

  // useEffect(()=>{

  //   socket?.emit("getUser")

  //   socket?.on("getUsers", (users)=>{
  //     setOnlineUsers(currentUser.followings.filter(f=>users.some(u=>u.userId === f)))
  // })

  // }, [currentUser])

  


  useEffect(()=>{
    setFollowed(currentUser.followings.includes(user?._id))
    const getFollowers = async () =>{
      try {

        const friendList = await Axios.get("/users/friends/"+currentUser._id)
        
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

  const handleClickMessage= async ()=>{

    try {
      const res = await Axios.post('/convo', {
        senderId:currentUser._id,
        recieverId:user._id
      });
    } catch (error) {
      console.log(error)
    }

    navigate("/messenger")


  }

  
console.log('online',onlineUsers)
  const HomeRightbar = () =>{
    return(
      <>
      <div className='rightbar'>
      <div className="rightbarWrapper">
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          <Online onlineUsers={onlineUsers} />
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
        <>
        <button className="rightbarFollow"
         onClick={handleClick}>
          {followed ? "Unfollow" : "Follow"}
          {followed ? <PersonRemoveOutlined /> : <PersonAddAltOutlined></PersonAddAltOutlined>}
        </button>
        {followed? 
        <button onClick={handleClickMessage} className='rightbarFollow'>
          Message 
        </button>
        : null}
        </>
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
        {user.birthday ?
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Birthday:</span>
            <span className="rightbarInfoValue">{(user.birthday)}</span>
          </div>
        : null}
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">{user.relationship ===4 ? 
            "Complicated"
            : user.relationship ===2 ? "Married"
            : user.relationship ===3 ? "Engaged": "Single"

            }</span>
          </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
        {friends.map((friend)=>(
        
        <Link to={"/profile/"+friend.username} className="userFollowingsLink" style={{textDecoration: "none"}}>

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
export default  Rightbar;