import React from 'react'

export default function Online({user}) {
  const PublicFolder = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    
    <li className="rightbarFriend">

            <div className="rightbarPfpContainer">
              <img className="rightbarPfp" src={PublicFolder+user.photo} alt=''/>
              <span className="rightbarOnline"></span>
            </div>
            <span className="rightbarUsername">{user.username}</span>
    </li>
  )
}
