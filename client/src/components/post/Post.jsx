import React, { useState, useEffect } from 'react'
import "./Post.css"
import {MoreVert, Favorite, Recommend, Comment, FavoriteBorderOutlined} from "@mui/icons-material"
import {format} from "timeago.js";
import {Link} from "react-router-dom";
import { useContext } from 'react';
import {AuthContext} from '../../context/AuthContext'
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Comments from "../comment/Comments"
import { SocketContext } from '../../context/SocketContext';
import { axiosInstance } from '../../config';
export default function Post({post}) {


  
  const [like, setLike] = useState(post.likes.length)
  const [isLiked, setIsLiked] = useState(false)
  const PublicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const {user:currentUser} = useContext(AuthContext) //use nickname currentuser
  const [openComments, setOpenComments] = useState(false);
  const [newComment, setNewComment] = useState("")
  const socket = useContext(SocketContext);
  const [comments, setComments] = useState([])

  useEffect (()=>{
    setIsLiked(post.likes.includes(currentUser._id))
  }, [currentUser._id,post.likes])

  
  const handleClick = () =>{
    setOpenComments(!openComments)
  }

  const likeHandler = () =>{

    

    try {
    axiosInstance.put ("/posts/"+post._id+"/like",  
    {userId:currentUser._id})

    } catch (error) {
      console.log(error)
    }
    setLike(isLiked ? like -1 : like+1)
    
    setIsLiked(!isLiked)

    if(!isLiked){
      socket.emit("sendNotification", {
        senderName: currentUser.username,
        recieverId: user._id,
        type:1,
        pfp: currentUser.profilePicture,
        senderId: currentUser._id
      } )
  
    }

  
    
  }

  useEffect(()=>{

    try {

      const fetchUser= async () =>{
        const res = await axiosInstance.get(`/users?userId=${post.userId}`)
        setUser(res.data)
      }
          fetchUser();

    } catch (error) {
      console.log(error)
    }
    
  },[post.userId])

  useEffect (()=>{

    const getComments = async () =>{

        try {
            const res =  await axiosInstance.get("/comment/"+post?._id)
            setComments(res.data)
        } catch (error) {

            console.log(error)

        }
    }
    getComments();
  }, [openComments])
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const comment = {
      postId: post._id,
      sender: currentUser._id,
      text: newComment,
      
  }

    try {
        const res =  await axiosInstance.post("/comment", comment);
        setComments([...comments, res.data])
        setNewComment('');

        
          socket.emit("sendNotification", {
            senderName: currentUser.username,
            recieverId: user._id,
            type:2,
          } )
      
        
        
    } catch (error) {
        console.log(error)
    }
  }

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
            {isLiked ? 
            <Favorite className = "postIcons" htmlColor='tomato' onClick={likeHandler}/> 
            :
            <FavoriteBorderOutlined className='postIcons' htmlColor='#272727' onClick={likeHandler} />
            }
            <span className="postLikeCounter">{like} people liked this</span>
          </div>

          <div className="postBottomRight">
            <Comment className = "postIcons" 
            
            htmlColor='black'
            
            onClick={handleClick}

            />
            <span className="postCommentText"> 
            {post.comments} comments 
            
            </span>
          
          </div>
          
        </div>
        { openComments ? 
        <>
        <div className="postBottomComments">
            <ul className="commentsLists"> Comments

              {comments.map ((c)=>(
                    <Comments comments={c}/>
                ))}

            </ul>
         </div>
         <div className="chatBoxBottomComment">
                    <textarea 
                    placeholder="write a message..." 
                    className="messageBoxInputComment"
                    onChange={(e)=>setNewComment(e.target.value)}
                    value={newComment}
                    >    
                    </textarea>
                    <button className='messageSendButtonComment'
                    onClick={handleSubmit}
                    >Send</button>
                </div>
         </>
        : null
      }
      </div>
    </div>
  )
}
