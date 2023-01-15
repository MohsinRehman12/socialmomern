import Home from "./pages/home/Home"
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import Profile from "./pages/profile/Profile"
import Login from "./pages/Login/Login";
import Messenger from "./pages/messenger/Messenger";
import Register from "./pages/Register/Register"
import React, { useContext, useEffect, useState } from "react";
import Edit from "./pages/edit/Edit"
import About from "./pages/about/About";
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
import { SocketContext, socket } from "./context/SocketContext";


const App = () => {

  const {user} = useContext(AuthContext)

  const [onlineUsers, setOnlineUsers] = useState(null);

  // useEffect(()=>{
  //   setSocket(io("ws://localhost:8900"));
  // },[])


  useEffect(()=>{
    socket?.emit("addUser", user?._id)

    socket?.on("getUsers", (users)=>{
      setOnlineUsers(user.followings.filter(f=>users.some(u=>u.userId === f)))
  })

  },[socket,user])
   
  return (
    <SocketContext.Provider value={socket}>
    <BrowserRouter>
      <Routes>
        <Route exact path="/"  element={user ? <Home  onlineUsers={onlineUsers}></Home> : <Register/>}>

        </Route>

        <Route exact path="/login" element={user ? <Navigate to="/" /> : <Login/>}>
        </Route>

        <Route exact path="/register" element={user ? <Navigate to="/" /> :<Register />}>
          
        </Route>

        <Route exact path="/messenger"  element={!user ? <Navigate to="/" /> :<Messenger  onlineUsers={onlineUsers}></Messenger>}>
          
        </Route>

        <Route exact path="/profile/:username" element={!user ? <Navigate to="/" /> :<Profile />}>

        </Route>

        <Route exact path="/edit" element={!user ? <Navigate to="/" /> :<Edit />}>

        </Route>

        <Route exact path="/search" element={!user ? <Navigate to="/" /> :<FindUser/>}>

        </Route>

        <Route exact path="/about" element={!user ? <Navigate to="/" /> :<About/>}>

        </Route>


      </Routes>
    </BrowserRouter>
    </SocketContext.Provider>
  )
}

export default App;
