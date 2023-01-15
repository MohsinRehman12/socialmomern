import React from 'react'
import Navbar from '../../components/navbar/Navbar';
import "./About.css"

export default function About() {

    const PublicFolder = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <>
    <Navbar />
    <div className="about-section">
  <h1>About</h1>
  <p>Social Mo is a Fullstack Social Media App created by Mohsin Rehman as a personal project</p>
  <p>It is built using React JS, Node JS, SocketIO, and deployed on heroku</p>
</div>

<h2 className='aboutHeader'> Information</h2>
<div className="rowAbout">
  <div className="columnAbout">
    <div className="cardAbout">
      <img className="aboutImg"src={PublicFolder+"cover/cover1.jpg"} alt="Jane">

      </img>
      <div className="containerAbout">
        <h2 className='aboutName'>Mohsin Rehman</h2>
        <p className="titleAbout">Designer & Developer</p>
        <p className='aboutText'>3rd year Software Engineer at Ontario Tech University</p>
        <p className='aboutText'>Contact Information:</p>
        <p className='aboutText'>mohsinrehmaninfo@gmail.com</p>
      </div>
    </div>
  </div>
  
</div>
</>
  )
}
