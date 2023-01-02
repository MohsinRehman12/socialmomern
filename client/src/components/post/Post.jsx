import React, { useState, useEffect } from 'react'
import "./Post.css"
import {MoreVert, Favorite, Recommend, Comment} from "@mui/icons-material"
import Axios from "axios";
import {format} from "timeago.js";
import {Link} from "react-router-dom";
import { useContext } from 'react';
import {AuthContext} from '../../context/AuthContext'


export default function Post({post}) {


  
  const [like, setLike] = useState(post.likes.length)
  const [isLiked, setIsLiked] = useState(false)
  const PublicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const {user:currentUser} = useContext(AuthContext) //use nickname currentuser

  useEffect (()=>{
    setIsLiked(post.likes.includes(currentUser._id))
  }, [currentUser._id,post.likes])

  const likeHandler = () =>{

    

    try {
    Axios.put ("/posts/"+post._id+"/like",  
    {userId:currentUser._id})

    console.log('id is', currentUser._id)
    } catch (error) {
      console.log(error)
    }
    setLike(isLiked ? like -1 : like+1)
    setIsLiked(!isLiked)
  }

  useEffect(()=>{
    
    const fetchUser= async () =>{
      const res = await Axios.get(`/users?userId=${post.userId}`)
      setUser(res.data)
    }

    fetchUser().then(response => {
      console.log('a',response);
  }).catch(e => {
      console.log(e);
  });
  },[post.userId])

  return (
    <div className='post'>
      <div className="postWrapper">
        <div className="postTop">
            <div className="postTopLeft">
              <Link to={`/profile/${user.username}`}>
                <img src={user.profilePicture ? PublicFolder + user.profilePicture : PublicFolder+"pfp/pfp1.jpg"} alt="" className="postPfp" />
              </Link>  
                <span className="postUsername">{user.username}</span>
                <span className="postDate">{format(post.createdAt)}</span>
                
            </div>

            <div className="postTopRight">

                <MoreVert/>

            </div>
        </div>

        <div className="postCenter">
          
          <span className="postText">{post?.desc}</span>
          <img src={PublicFolder+post.img} alt="" className="postImg" />

        </div>


        <div className="postBottom">

          <div className="postBottomLeft">
            <Favorite className = "postIcons" htmlColor='tomato' onClick={likeHandler}/>
            <Recommend className = "postIcons" htmlColor='#7690F0' onClick={likeHandler}/>
            <span className="postLikeCounter">{like} people liked this</span>
          </div>

          <div className="postBottomRight">
            <Comment className = "postIcons" htmlColor='black'/>
            <span className="postCommentText"> {post.comment} comments </span>
            
          </div>
          
        </div>
      </div>
    </div>
  )
}
