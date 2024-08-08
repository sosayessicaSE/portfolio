import React, { useState } from "react";
import "./projects.css";
import page1 from "../images/5.png"
import page2 from "../images/6.png"
import page3 from "../images/7.png"
import page4 from "../images/8.png"

function Projects() {
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "Project Title 1",
      description: "Short description of the project.",
      imageUrl: page1,
      details: "Detailed information about the project."
    },
    {
      id: 2,
      title: "Project Title 2",
      description: "Short description of the project.",
      imageUrl: page2,
      details: "Detailed information about the project."
    },
    {
      id: 3,
      title: "Project Title 2",
      description: "Short description of the project.",
      imageUrl: page3,
      details: "Detailed information about the project."
    },
    {
      id: 4,
      title: "Project Title 2",
      description: "Short description of the project.",
      imageUrl: page4,
      details: "Detailed information about the project."
    },

  ]);

 
  const [selectedProject, setSelectedProject] = useState(null);


  const openModal = (project) => {
    setSelectedProject(project);
  };


  const closeModal = () => {
    setSelectedProject(null);
  };

  return (
    <div className="Projects">
      <div className="projects-list">
        {projects.map((project) => (
          <div key={project.id} className="project-card" onClick={() => openModal(project)}>
            <img src={project.imageUrl} alt={project.title} className="project-image" />
            <h3 className="project-title">{project.title}</h3>
            <p className="project-description">{project.description}</p>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedProject && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedProject.title}</h2>
            <p>{selectedProject.details}</p>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Projects;
