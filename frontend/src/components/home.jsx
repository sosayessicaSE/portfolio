import React from 'react';
import './Home.css'; 
import profileImage from '../images/profile.png'; // Asegúrate de tener una imagen de perfil en la carpeta correcta

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        <img src={profileImage} alt="Profile" className="home-image" />
        <h1 className="home-title">Yessica Sosa</h1>
        <p className="home-intro">
          FULL STACK DEVELOPER
        </p>
      </div>
    </div>
  );
};

export default Home;
