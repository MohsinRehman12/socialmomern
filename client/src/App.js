import Home from "./pages/home/Home"
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import Profile from "./pages/profile/Profile"
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register"
import React, { useContext } from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { AuthContext } from "./context/AuthContext";



function App() {

  const {user} = useContext(AuthContext)
   
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={user ? <Home/> : <Register/>}>

        </Route>

        <Route exact path="/login" element={user ? <Navigate to="/" /> : <Login/>}>
        </Route>

        <Route exact path="/register" element={user ? <Navigate to="/" /> :<Register />}>
          
        </Route>

        <Route exact path="/profile/:username" element={<Profile/>}>

        </Route>


      </Routes>
    </BrowserRouter>
  )
}

export default App;
