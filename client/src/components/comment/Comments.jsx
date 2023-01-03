import axios from 'axios';
import React, { useEffect, useState } from 'react'
import "./Comment.css"
export default function Comment({comments}) {

  const PublicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState([])
  useEffect(()=>{
    const getCommenter = async () =>{

    try {
        const res = await axios.get("/users?userId="+comments.sender)
        setUser(res.data)
      }
      
    catch (error) {
      console.log(error)
    }

  }

  getCommenter();

  })
  return (
    <div className="commentWrapper">

      <div className="userInfoContainer">
      <img 
      className="commentPfpImg"
      src={user.profilePicture ? PublicFolder + user.profilePicture : PublicFolder+"pfp/pfp1.jpg"}
      >
      </img>

      <span className="commentUserName"> {user.username}</span>
        
      </div>
      
      <p className='commentText'>{comments.text}</p>


    </div>
  )
}
