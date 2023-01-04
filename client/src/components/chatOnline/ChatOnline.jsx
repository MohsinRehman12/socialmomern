import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import "./ChatOnline.css"
export default function ChatOnline({onlineUsers, currentId, setCurrentChat}) {

    const PublicFolder = process.env.REACT_APP_PUBLIC_FOLDER;

    const [friends, setFriends] = useState([]);
    const [onlineFriends, setOnlineFriends] = useState([]);

    const handleClick =  async (user) => {
      try {
        const res = await Axios.get(`/convo/find/${currentId}/${user._id}`);
        setCurrentChat(res.data);
      } catch (error) {
        if ((error.message).includes("404")){
          try {
            const res = await Axios.post('/convo', {
              senderId:currentId,
              recieverId:user._id
            });

          } catch (error) {
            console.log(error)
          }
        }
      }
    }
    useEffect(()=>{
      const getUsers = async ()=>{
        const res = await Axios.get("/users/friends/"+currentId)
        setFriends(res.data);
      }

      getUsers();


    },[currentId])


    useEffect(()=>{

      setOnlineFriends(
        friends.filter(f=>onlineUsers?.includes(f._id))
      )

    },[friends, onlineUsers])

  return (

    
    <div className="chatOnline">
      {onlineFriends.map(o=>(
        <div className="chatOnlineFriend" onClick={()=>handleClick(o)}>
            <div className="chatOnlineImgContainer">
            <img src={o.profilePicture ? PublicFolder + o.profilePicture : PublicFolder+"pfp/pfp1.jpg"} 
                alt="" 
                className="chatOnlineImg" />

            <div className="chatOnlineBadge">


            </div>
            </div>
            <span className="chatOnlineName">{o.username}</span>


        </div>
    ))}
    </div>
  )
}
