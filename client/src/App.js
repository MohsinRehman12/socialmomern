import Home from "./pages/home/Home"
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import Profile from "./pages/profile/Profile"
import Login from "./pages/Login/Login";
import Messenger from "./pages/messenger/Messenger";
import Register from "./pages/Register/Register"
import React, { useContext, useEffect, useState } from "react";
import Edit from "./pages/edit/Edit"
import { createRoot } from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import FindUser from "./pages/findUsers/FindUser";
import {io} from 'socket.io-client'



const App = () => {

  const {user} = useContext(AuthContext)

  const [socket, setSocket] = useState(null)

  useEffect(()=>{
    setSocket(io("ws://localhost:8900"));
  },[])


  useEffect(()=>{
    socket?.emit("addUser", user?._id)

  },[socket,user])
   
  console.log('socket',socket)

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/"  element={user ? <Home socket={socket}></Home> : <Register/>}>

        </Route>

        <Route exact path="/login" element={user ? <Navigate to="/" /> : <Login/>}>
        </Route>

        <Route exact path="/register" element={user ? <Navigate to="/" /> :<Register />}>
          
        </Route>

        <Route exact path="/messenger"  element={!user ? <Navigate to="/" /> :<Messenger sockets={socket} ></Messenger>}>
          
        </Route>

        <Route exact path="/profile/:username" element={!user ? <Navigate to="/" /> :<Profile />}>

        </Route>

        <Route exact path="/edit" element={!user ? <Navigate to="/" /> :<Edit />}>

        </Route>

        <Route exact path="/search" element={!user ? <Navigate to="/" /> :<FindUser/>}>

        </Route>


      </Routes>
    </BrowserRouter>
  )
}

export default App;
