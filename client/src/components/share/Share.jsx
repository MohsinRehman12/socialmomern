import React, { useRef, useState, useEffect } from 'react'
import "./Share.css"
import {PermMedia, Label,Room, EmojiEmotions} from "@mui/icons-material"
import {AuthContext} from '../../context/AuthContext'
import { useContext } from 'react';
import Axios from 'axios';

export default function Share() {

  const {user} = useContext(AuthContext) //use nickname currentuser
  const PublicFolder = process.env.REACT_APP_PUBLIC_FOLDER;

  const desc = useRef();

  const [file,setFile] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault()

    console.log('post user id', user._id.$oid)
    console.log('desc', desc.current.value)

    const newPost = {
      userId: user._id.$oid,
      desc: desc.current.value
    }

    if ( file) {
      const data = new FormData();
      const fileName = Date.now()
      data.append("name", fileName)
      data.append("file", file)
      newPost.img = fileName;

      try {
        await Axios.post("/upload", data)
        window.location.reload()

      } catch (error) {
        console.log(error)
      }

    }

    try {
      await Axios.post("/posts", newPost)
      window.location.reload()

    } catch (error) {

      console.log(error)

    }
  }

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img src={user.profilePicture ? PublicFolder + user.profilePicture : PublicFolder+"pfp/pfp1.jpg"} alt="" className="sharePfp" />
          <input type="text" 
          placeholder = {"Speak your mind " + user.username}  
          className="shareInput" 
          ref={desc}
          />
        </div>

        <hr className="shareHr" />

        <form className="shareBottom" onSubmit={submitHandler}>

          <label htmlFor='file' className="shareOptions">
              <PermMedia htmlColor = "red" className='shareIcon' />
            <div className="shareOption">
              <span className="shareOptionText">photo or video</span>
              <input
              style={{display:"none"}} 
              type="file" 
              id='file' 
              accept=".png,.jpeg,.jpg"
              onChange={(e)=>setFile(e.target.files[0])}/>
            </div>
          </label>

          <div className="shareOptions">
              <Label htmlColor = "orange" className='shareIcon' />
            <div className="shareOption">
              <span className="shareOptionText">Tag</span>
            </div>
          </div>

          <div className="shareOptions">
              <Room htmlColor = "blue" className='shareIcon' />
            <div className="shareOption">
              <span className="shareOptionText">Locaion</span>
            </div>
          </div>

          <div className="shareOptions">
              <EmojiEmotions htmlColor='gold' className='shareIcon' />
            <div className="shareOption">
              <span className="shareOptionText">Mood</span>
            </div>
          </div>
          <button className="shareButton" type='submit'>
            Share
          </button>
        </form>
      </div>
    </div>
  )
  }