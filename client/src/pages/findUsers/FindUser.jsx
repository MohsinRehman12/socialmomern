import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import Rightbar from '../../components/rightbar/Rightbar'
import Sidebar from '../../components/sidebar/Sidebar'
import "./FindUsers.css"
export default function FindUser({results}) {

    const PublicFolder = process.env.REACT_APP_PUBLIC_FOLDER;

    console.log(results)
    return (
    <>
    <Navbar></Navbar>
    <div className='searchUserWrapper'>
    <div className="searchUserContainer">
    <h4 className='searchHeader'>Search Results</h4>
{results ? 
<>
    {results.map((u)=>{
        <div className="searchUser">
        <img src={PublicFolder+"/pfp/pfp1.jpg"} className="searchImg"></img>
        <span className="searchName"> {u.username}</span>
      </div>
    })}
</>
:<p className='searchHeader' >No Users Found</p>}

      
      </div>
      <Rightbar />
    </div>
    </>
  )
}
