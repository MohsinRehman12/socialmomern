import React, { useState } from 'react'
import { useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import Navbar from '../../components/navbar/Navbar'
import Rightbar from '../../components/rightbar/Rightbar'
import Sidebar from '../../components/sidebar/Sidebar'
import "./FindUsers.css"
export default function FindUser() {

    const PublicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
    const location = useLocation();

    const [results, setResults] = useState([])

    useEffect(()=>{
        

        setResults(location.state.x)




    }, [location])


    console.log(results)


    return (
    <>
    <Navbar></Navbar>
    <div className='searchUserWrapper'>
    <div className="searchUserContainer">
    <h4 className='searchHeader'>Search Results</h4>
{results.length>0 ? 
<>
    {results.map((u)=>(
    <Link to={`/profile/`+u.username}>
        <div className="searchUser">
        <img src={u.profilePicture ? PublicFolder + u.profilePicture : PublicFolder+"pfp/pfp1.jpg"} className="searchImg"></img>
        <span className='navlinkUser'> {u.username}</span>
      </div>
    </Link>
    ))}
</>
:<p className='searchHeader' >No Users Found</p>}

      
      </div>
      <Rightbar />
    </div>
    </>
  )
}
