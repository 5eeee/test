import { useState } from 'react';
import { motion } from 'framer-motion';
import { Project } from '../pages/Portfolio';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === project.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? project.images.length - 1 : prev - 1
    );
  };

  return (
    <motion.div 
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div 
        className="project-modal-content"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2>{project.title}</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        
        <div className="modal-body">
          <div className="project-details">
            <p className="project-description">{project.fullDescription}</p>
            
            <div className="project-section">
              <h3>Functionality:</h3>
              <ul className="functionality-list">
                {project.functionality.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            
            <div className="project-section">
              <h3>Technologies used:</h3>
              <div className="technologies-list">
                {project.technologies.map((tech, index) => (
                  <span key={index} className="technology-tag">{tech}</span>
                ))}
              </div>
            </div>
            
            <div className="project-meta">
              <div className="meta-item">
                <strong>Article:</strong> {project.article}
              </div>
              <div className="meta-item">
                <strong>Development time:</strong> {project.developmentTime}
              </div>
              <div className="meta-item">
                <strong>Category:</strong> {project.category}
              </div>
            </div>
          </div>
          
          <div className="project-gallery">
            <div className="gallery-header">
              <h3>Project Gallery</h3>
              <div className="image-counter">
                {currentImageIndex + 1} / {project.images.length}
              </div>
            </div>
            
            <div className="image-container">
              <div className="image-placeholder">Project Image {currentImageIndex + 1}</div>
              <button className="nav-button prev" onClick={prevImage}>‹</button>
              <button className="nav-button next" onClick={nextImage}>›</button>
            </div>
            
            <div className="image-thumbnails">
              {project.images.map((_, index) => (
                <div 
                  key={index}
                  className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                  onClick={() => setCurrentImageIndex(index)}
                >
                  <div className="thumbnail-placeholder">Img {index + 1}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="modal-footer">
          <button 
            className="btn-primary"
            onClick={() => {
              // In a real app, this would contact the manager
              alert('Learn more about this project - contact manager functionality would be implemented here');
            }}
          >
            Learn More
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectModal;