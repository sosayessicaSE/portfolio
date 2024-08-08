import React from 'react';
import './Aboutme.css'; // Make sure to create this CSS file with the provided styles
import library from "../images/librarygif.gif"
import plane from "../images/plane.png"
const AboutMe = () => {
  return (
    <div className="aboutme-container">
      <img src={plane} alt="" id='plane'/>
      <div className="aboutme-content">
        <img 
          src="https://via.placeholder.com/200" 
          alt="Profile" 
          className="aboutme-image" 
        />
        <h1 className="aboutme-title">About Me</h1>
        <p className="aboutme-intro">
          Hello! I'm Yessica Sosa, a passionate developer with a knack for creating engaging and user-friendly applications. I have experience in various technologies and love to take on new challenges. My journey began in the tech world, and I've been fascinated by how technology can solve real-world problems ever since.
        </p>
        <p className="aboutme-details">
          With a background in software development and a keen interest in emerging technologies, I strive to stay updated with the latest trends and continuously improve my skills. When I'm not coding, you might find me exploring new tech gadgets, reading novels, or travelling.
        </p>
      </div>
      <img src={library} alt="" id='gif'/>
    </div>
  );
};

export default AboutMe;
