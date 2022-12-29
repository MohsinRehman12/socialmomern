import React, { useEffect, useState } from 'react'
import Post from '../post/Post'
import Share from '../share/Share'
import "./Feed.css"
import Axios from "axios";


export default function Feed({username}) {

  const [posts, setPosts] = useState([]);


  useEffect(()=>{
    
    const fetchPosts= async () =>{
      const res = username ? await Axios.get("/posts/profile/"+ username)
      : await Axios.get("/posts/timeline/63a65dc54ac737f84debccbe")
      console.log(res.data)
      setPosts(res.data)
    }

    fetchPosts().then(response => {
      console.log(response);
  }).catch(e => {
      console.log(e);
  });
  },[username])
  return (
    <div className='feed'>
      <div className="feedWrapper">
        <Share/>
        {posts.map((p)=> (
          <Post key={p._id} post={p} />
        ))}

      </div>
    </div>
  )
}
