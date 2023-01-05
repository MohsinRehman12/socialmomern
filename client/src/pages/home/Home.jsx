import React, { useEffect } from 'react'
import "./Home.css"
import HomeIcon from '@mui/icons-material/Home';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import Feed from '../../components/feed/Feed';
import Rightbar from '../../components/rightbar/Rightbar';
import { useNavigate } from 'react-router-dom';

const Home = ({socket, onlineUsers})=> {
  
  return (
    <>
      <Navbar/>
      <div className="homeContainer">
      <Sidebar />
      <Feed />
      <Rightbar onlineUsers={onlineUsers} socket={socket}/>
      </div>
    </>
  )
}

export default Home;
