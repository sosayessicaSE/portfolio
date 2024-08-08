import React from 'react';

const Gallery = () => {
  const videos = [
    '../videos/template.mp4',
    '../videos/template.mp4',
  ];

  return (
    <div className="gallery-container">
      {videos.map((video, index) => (
        <video key={index} controls className="gallery-video">
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ))}
    </div>
  );
};

export default Gallery;
