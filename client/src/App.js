import Home from "./pages/home/Home"
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import Profile from "./pages/profile/Profile"
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register"
import React from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";



function App() {
   
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home/>}>

        </Route>

        <Route exact path="/login" element={<Login/>}>
        </Route>

        <Route exact path="/register" element={<Register />}>
          
        </Route>

        <Route exact path="/profile/:username" element={<Profile/>}>

        </Route>


      </Routes>
    </BrowserRouter>
  )
}

export default App;
