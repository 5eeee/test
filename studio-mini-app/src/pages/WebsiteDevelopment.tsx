import { motion } from 'framer-motion';
import { useTelegram } from '@twa-dev/sdk';
import Navigation from '../components/Navigation';
import ContactButton from '../components/ContactButton';

interface Service {
  id: number;
  title: string;
  description: string;
  category: string;
  isAvailable: boolean;
}

const WebsiteDevelopment = () => {
  const { webApp } = useTelegram();

  const services: Service[] = [
    {
      id: 1,
      title: "Landing Page (Frontend)",
      description: "High-converting single page websites designed to capture leads and drive conversions",
      category: "Frontend",
      isAvailable: false
    },
    {
      id: 2,
      title: "Corporate Website (Full-Stack)",
      description: "Professional multi-page websites with CMS for businesses",
      category: "Full-Stack",
      isAvailable: false
    },
    {
      id: 3,
      title: "E-commerce Platform (Full-Stack)",
      description: "Complete online stores with payment integration and inventory management",
      category: "Full-Stack",
      isAvailable: false
    },
    {
      id: 4,
      title: "API Development (Backend)",
      description: "Custom APIs for data exchange and third-party integrations",
      category: "Backend",
      isAvailable: false
    },
    {
      id: 5,
      title: "Web Application",
      description: "Interactive web applications with real-time features",
      category: "Full-Stack",
      isAvailable: false
    },
    {
      id: 6,
      title: "Technical Support",
      description: "Ongoing maintenance and support for existing websites",
      category: "Support",
      isAvailable: false
    }
  ];

  const backendServices = services.filter(service => 
    service.category === "Backend" || service.category === "Support"
  );
  
  const frontendServices = services.filter(service => 
    service.category === "Frontend"
  );
  
  const fullStackServices = services.filter(service => 
    service.category === "Full-Stack"
  );

  return (
    <div className="page-container">
      <Navigation />
      
      <motion.main 
        className="website-dev-content"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="website-dev-header">
          <h1>Website Development</h1>
          <p>Comprehensive web solutions for your business</p>
        </div>

        <div className="development-section">
          <h2>Backend Development</h2>
          <div className="services-grid">
            {backendServices.map((service, index) => (
              <motion.div
                key={service.id}
                className="service-card unavailable"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="service-header">
                  <h3>{service.title}</h3>
                  <span className="service-category">{service.category}</span>
                </div>
                
                <p className="service-description">{service.description}</p>
                
                <div className="service-status">
                  <span className="status-badge">Temporarily unavailable</span>
                </div>
                
                <button 
                  className="btn-secondary"
                  onClick={() => alert('Coming soon notification - you will be notified when this service becomes available')}
                >
                  Learn about launch
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="development-section">
          <h2>Frontend Development</h2>
          <div className="services-grid">
            {frontendServices.map((service, index) => (
              <motion.div
                key={service.id}
                className="service-card unavailable"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="service-header">
                  <h3>{service.title}</h3>
                  <span className="service-category">{service.category}</span>
                </div>
                
                <p className="service-description">{service.description}</p>
                
                <div className="service-status">
                  <span className="status-badge">Temporarily unavailable</span>
                </div>
                
                <button 
                  className="btn-secondary"
                  onClick={() => alert('Coming soon notification - you will be notified when this service becomes available')}
                >
                  Learn about launch
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="development-section">
          <h2>Full-Stack Development</h2>
          <div className="services-grid">
            {fullStackServices.map((service, index) => (
              <motion.div
                key={service.id}
                className="service-card unavailable"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="service-header">
                  <h3>{service.title}</h3>
                  <span className="service-category">{service.category}</span>
                </div>
                
                <p className="service-description">{service.description}</p>
                
                <div className="service-status">
                  <span className="status-badge">Temporarily unavailable</span>
                </div>
                
                <button 
                  className="btn-secondary"
                  onClick={() => alert('Coming soon notification - you will be notified when this service becomes available')}
                >
                  Learn about launch
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.main>
      
      <ContactButton />
    </div>
  );
};

export default WebsiteDevelopment;