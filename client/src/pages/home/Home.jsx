import React from 'react'
import "./Home.css"
import HomeIcon from '@mui/icons-material/Home';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import Feed from '../../components/feed/Feed';
import Rightbar from '../../components/rightbar/Rightbar';

export default function home() {
  return (
    <>
      <Navbar/>
      <div className="homeContainer">
      <Sidebar />
      <Feed />
      <Rightbar />
      </div>
    </>
  )
}
