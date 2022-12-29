import React from 'react'
import "./Share.css"
import {PermMedia, Label,Room, EmojiEmotions} from "@mui/icons-material"

export default function Share() {
  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img src="assets/pfp/pfp1.jpg" alt="" className="sharePfp" />
          <input type="text" placeholder = "Speak your mind" className="shareInput" />
        </div>

        <hr className="shareHr" />

        <div className="shareBottom">

          <div className="shareOptions">
              <PermMedia htmlColor = "red" className='shareIcon' />
            <div className="shareOption">
              <span className="shareOptionText">photo or video</span>
            </div>
          </div>

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
          <button className="shareButton">
            Share
          </button>
        </div>
      </div>
    </div>
  )
  }