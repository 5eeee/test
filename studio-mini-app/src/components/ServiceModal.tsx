import { motion } from 'framer-motion';
import { Service } from '../pages/Services';

interface ServiceModalProps {
  service: Service;
  onClose: () => void;
  onAddToCart: (service: Service) => void;
}

const ServiceModal = ({ service, onClose, onAddToCart }: ServiceModalProps) => {
  return (
    <motion.div 
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div 
        className="modal-content"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2>{service.title}</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        
        <div className="modal-body">
          <p className="modal-description">{service.fullDescription}</p>
          
          <div className="modal-section">
            <h3>What's included:</h3>
            <ul className="tasks-list">
              {service.tasks.map((task, index) => (
                <li key={index}>{task}</li>
              ))}
            </ul>
          </div>
          
          <div className="modal-section">
            <h3>Technologies used:</h3>
            <div className="technologies-list">
              {service.technologies.map((tech, index) => (
                <span key={index} className="technology-tag">{tech}</span>
              ))}
            </div>
          </div>
          
          <div className="service-details">
            <div className="detail-item">
              <strong>Price:</strong> ${service.price}
            </div>
            <div className="detail-item">
              <strong>Timeframe:</strong> {service.timeframe}
            </div>
            <div className="detail-item">
              <strong>Category:</strong> {service.category}
            </div>
          </div>
        </div>
        
        <div className="modal-footer">
          <button 
            className="btn-primary"
            onClick={() => onAddToCart(service)}
          >
            Add to Cart
          </button>
          <button 
            className="btn-secondary"
            onClick={() => {
              // In a real app, this would contact the manager
              alert('Contact manager functionality would be implemented here');
            }}
          >
            Contact Manager
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ServiceModal;