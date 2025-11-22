import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTelegram } from '@twa-dev/sdk';
import Navigation from '../components/Navigation';
import ContactButton from '../components/ContactButton';
import ServiceModal from '../components/ServiceModal';

// Define service type
interface Service {
  id: number;
  title: string;
  description: string;
  fullDescription: string;
  tasks: string[];
  technologies: string[];
  price: number;
  timeframe: string; // e.g., "2-4 weeks"
  category: string;
  isAvailable: boolean;
}

const Services = () => {
  const { webApp } = useTelegram();
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const [sort, setSort] = useState<string>('default');
  
  // Sample services data
  const services: Service[] = [
    {
      id: 1,
      title: "Telegram Bot Development",
      description: "Custom Telegram bots for business automation",
      fullDescription: "Professional Telegram bot development with custom functionality, automated workflows, and seamless integration with your business processes.",
      tasks: [
        "Bot architecture design",
        "Command system implementation",
        "Database integration",
        "Webhook setup",
        "User management system"
      ],
      technologies: ["Node.js", "Telegraf", "MongoDB", "API Integration"],
      price: 499,
      timeframe: "1-2 weeks",
      category: "Telegram Bots",
      isAvailable: true
    },
    {
      id: 2,
      title: "Mini App Development",
      description: "Interactive Telegram Mini Apps",
      fullDescription: "Engaging and functional Mini Apps that run directly in Telegram, providing rich user experiences without leaving the platform.",
      tasks: [
        "UI/UX design",
        "Frontend development",
        "Backend integration",
        "Telegram API integration",
        "Payment system setup"
      ],
      technologies: ["React", "TypeScript", "Tailwind CSS", "Telegram API"],
      price: 799,
      timeframe: "2-3 weeks",
      category: "Mini Apps",
      isAvailable: true
    },
    {
      id: 3,
      title: "Web Scraper Development",
      description: "Automated data collection solutions",
      fullDescription: "Custom web scraping solutions to extract and process data from various sources automatically.",
      tasks: [
        "Target site analysis",
        "Scraping algorithm development",
        "Data processing pipeline",
        "Error handling",
        "Scheduling system"
      ],
      technologies: ["Python", "BeautifulSoup", "Selenium", "Pandas", "API"],
      price: 399,
      timeframe: "1 week",
      category: "Parsing",
      isAvailable: true
    },
    {
      id: 4,
      title: "Landing Page Development",
      description: "High-converting landing pages",
      fullDescription: "Visually appealing and conversion-optimized landing pages designed to maximize your business goals.",
      tasks: [
        "Design concept",
        "Responsive layout",
        "Call-to-action optimization",
        "Performance optimization",
        "Analytics integration"
      ],
      technologies: ["HTML", "CSS", "JavaScript", "React", "Tailwind"],
      price: 299,
      timeframe: "1 week",
      category: "Websites",
      isAvailable: true
    },
    {
      id: 5,
      title: "Corporate Website",
      description: "Professional business websites",
      fullDescription: "Complete corporate websites with all necessary sections and features for your business.",
      tasks: [
        "Information architecture",
        "Content management system",
        "Multi-page layout",
        "SEO optimization",
        "Contact forms"
      ],
      technologies: ["React", "Next.js", "Node.js", "PostgreSQL", "CMS"],
      price: 1299,
      timeframe: "3-4 weeks",
      category: "Websites",
      isAvailable: true
    },
    {
      id: 6,
      title: "E-commerce Platform",
      description: "Online store development",
      fullDescription: "Full-featured e-commerce platforms with payment integration and inventory management.",
      tasks: [
        "Product catalog",
        "Shopping cart",
        "Payment gateway",
        "Inventory management",
        "Order processing"
      ],
      technologies: ["React", "Node.js", "PostgreSQL", "Stripe", "AWS"],
      price: 2499,
      timeframe: "4-6 weeks",
      category: "Websites",
      isAvailable: true
    }
  ];

  // Filter services based on selected filter
  const filteredServices = services.filter(service => {
    if (filter === 'all') return true;
    return service.category.toLowerCase().includes(filter.toLowerCase());
  });

  // Sort services based on selected sort option
  const sortedServices = [...filteredServices].sort((a, b) => {
    if (sort === 'price-asc') return a.price - b.price;
    if (sort === 'price-desc') return b.price - a.price;
    if (sort === 'timeframe') return a.timeframe.localeCompare(b.timeframe);
    return a.id - b.id; // default order
  });

  const handleServiceClick = (service: Service) => {
    setSelectedService(service);
  };

  const closeModal = () => {
    setSelectedService(null);
  };

  const addToCart = (service: Service) => {
    // In a real app, this would add to cart context
    alert(`${service.title} added to cart!`);
    closeModal();
  };

  return (
    <div className="page-container">
      <Navigation />
      
      <motion.main 
        className="services-content"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="services-header">
          <h1>Our Services</h1>
          <p>Choose from our wide range of digital solutions</p>
        </div>

        <div className="filters">
          <div className="filter-group">
            <label>Filter by:</label>
            <select 
              value={filter} 
              onChange={(e) => setFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Services</option>
              <option value="Telegram Bots">Telegram Bots</option>
              <option value="Mini Apps">Mini Apps</option>
              <option value="Parsing">Parsing</option>
              <option value="Websites">Websites</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label>Sort by:</label>
            <select 
              value={sort} 
              onChange={(e) => setSort(e.target.value)}
              className="filter-select"
            >
              <option value="default">Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="timeframe">Timeframe</option>
            </select>
          </div>
          
          <button 
            className="reset-filters"
            onClick={() => {
              setFilter('all');
              setSort('default');
            }}
          >
            Reset Filters
          </button>
        </div>

        <div className="services-grid">
          {sortedServices.map((service, index) => (
            <motion.div
              key={service.id}
              className="service-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="service-header">
                <h3>{service.title}</h3>
                <span className="service-price">${service.price}</span>
              </div>
              
              <p className="service-description">{service.description}</p>
              
              <div className="service-meta">
                <span className="service-category">{service.category}</span>
                <span className="service-timeframe">{service.timeframe}</span>
              </div>
              
              <div className="service-actions">
                <button 
                  className="btn-details"
                  onClick={() => handleServiceClick(service)}
                >
                  Details
                </button>
                <button 
                  className="btn-cart"
                  onClick={() => addToCart(service)}
                >
                  Add to Cart
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.main>
      
      {selectedService && (
        <ServiceModal 
          service={selectedService} 
          onClose={closeModal} 
          onAddToCart={addToCart} 
        />
      )}
      
      <ContactButton />
    </div>
  );
};

export default Services;