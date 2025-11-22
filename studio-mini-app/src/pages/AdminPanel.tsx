import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTelegram } from '@twa-dev/sdk';
import Navigation from '../components/Navigation';

// Define types
interface Service {
  id: number;
  title: string;
  description: string;
  price: number;
  timeframe: string;
  category: string;
  isAvailable: boolean;
}

interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  category: string;
}

const AdminPanel = () => {
  const { webApp } = useTelegram();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [services, setServices] = useState<Service[]>([
    { id: 1, title: "Telegram Bot Development", description: "Custom Telegram bots", price: 499, timeframe: "1-2 weeks", category: "Telegram Bots", isAvailable: true },
    { id: 2, title: "Mini App Development", description: "Interactive Telegram Mini Apps", price: 799, timeframe: "2-3 weeks", category: "Mini Apps", isAvailable: true },
    { id: 3, title: "Web Scraper Development", description: "Automated data collection", price: 399, timeframe: "1 week", category: "Parsing", isAvailable: true }
  ]);
  
  const [portfolios, setPortfolios] = useState<PortfolioItem[]>([
    { id: 1, title: "E-commerce Platform", description: "Full-featured online store", category: "Websites" },
    { id: 2, title: "CRM Telegram Bot", description: "Customer relationship management bot", category: "Telegram Bots" }
  ]);

  // Mock statistics data
  const stats = {
    totalUsers: {
      day: 24,
      week: 142,
      month: 589
    },
    conversions: {
      viewsToCart: 12.5,
      cartToPayment: 8.2
    },
    popularServices: [
      { name: "Telegram Bot Development", count: 42 },
      { name: "Mini App Development", count: 38 },
      { name: "Web Scraper Development", count: 25 }
    ],
    financial: {
      today: 2450,
      week: 12580,
      month: 48720
    }
  };

  const toggleServiceStatus = (id: number) => {
    setServices(services.map(service => 
      service.id === id ? { ...service, isAvailable: !service.isAvailable } : service
    ));
  };

  const deleteService = (id: number) => {
    setServices(services.filter(service => service.id !== id));
  };

  const addService = () => {
    const newService: Service = {
      id: services.length + 1,
      title: "New Service",
      description: "Service description",
      price: 0,
      timeframe: "TBD",
      category: "Other",
      isAvailable: true
    };
    setServices([...services, newService]);
  };

  return (
    <div className="page-container admin-panel">
      <Navigation />
      
      <motion.main 
        className="admin-content"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="admin-header">
          <h1>Admin Panel</h1>
          <div className="admin-tabs">
            <button 
              className={activeTab === 'dashboard' ? 'active' : ''}
              onClick={() => setActiveTab('dashboard')}
            >
              Dashboard
            </button>
            <button 
              className={activeTab === 'services' ? 'active' : ''}
              onClick={() => setActiveTab('services')}
            >
              Services
            </button>
            <button 
              className={activeTab === 'portfolio' ? 'active' : ''}
              onClick={() => setActiveTab('portfolio')}
            >
              Portfolio
            </button>
            <button 
              className={activeTab === 'content' ? 'active' : ''}
              onClick={() => setActiveTab('content')}
            >
              Content Management
            </button>
          </div>
        </div>

        {activeTab === 'dashboard' && (
          <div className="dashboard-content">
            <h2>Dashboard Overview</h2>
            
            <div className="stats-grid">
              <div className="stat-card">
                <h3>Users</h3>
                <div className="stat-values">
                  <div><span>Today:</span> {stats.totalUsers.day}</div>
                  <div><span>This Week:</span> {stats.totalUsers.week}</div>
                  <div><span>This Month:</span> {stats.totalUsers.month}</div>
                </div>
              </div>
              
              <div className="stat-card">
                <h3>Conversions</h3>
                <div className="stat-values">
                  <div><span>Views to Cart:</span> {stats.conversions.viewsToCart}%</div>
                  <div><span>Cart to Payment:</span> {stats.conversions.cartToPayment}%</div>
                </div>
              </div>
              
              <div className="stat-card">
                <h3>Financial</h3>
                <div className="stat-values">
                  <div><span>Today:</span> ${stats.financial.today}</div>
                  <div><span>This Week:</span> ${stats.financial.week}</div>
                  <div><span>This Month:</span> ${stats.financial.month}</div>
                </div>
              </div>
            </div>
            
            <div className="popular-services">
              <h3>Popular Services</h3>
              <div className="services-list">
                {stats.popularServices.map((service, index) => (
                  <div key={index} className="service-item">
                    <span className="service-name">{service.name}</span>
                    <span className="service-count">{service.count} orders</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'services' && (
          <div className="services-management">
            <h2>Services Management</h2>
            
            <div className="admin-actions">
              <button className="btn-primary" onClick={addService}>Add New Service</button>
            </div>
            
            <div className="filters">
              <input type="text" placeholder="Search services..." />
              <select>
                <option>All Categories</option>
                <option>Telegram Bots</option>
                <option>Mini Apps</option>
                <option>Parsing</option>
                <option>Websites</option>
              </select>
              <select>
                <option>All Statuses</option>
                <option>Active</option>
                <option>Unavailable</option>
              </select>
            </div>
            
            <div className="services-table">
              <div className="table-header">
                <div>Title</div>
                <div>Category</div>
                <div>Price</div>
                <div>Timeframe</div>
                <div>Status</div>
                <div>Actions</div>
              </div>
              {services.map(service => (
                <div key={service.id} className="table-row">
                  <div>{service.title}</div>
                  <div>{service.category}</div>
                  <div>${service.price}</div>
                  <div>{service.timeframe}</div>
                  <div>
                    <span className={`status-badge ${service.isAvailable ? 'active' : 'inactive'}`}>
                      {service.isAvailable ? 'Active' : 'Unavailable'}
                    </span>
                  </div>
                  <div className="actions">
                    <button 
                      className="btn-secondary"
                      onClick={() => toggleServiceStatus(service.id)}
                    >
                      {service.isAvailable ? 'Disable' : 'Enable'}
                    </button>
                    <button 
                      className="btn-danger"
                      onClick={() => deleteService(service.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'portfolio' && (
          <div className="portfolio-management">
            <h2>Portfolio Management</h2>
            
            <div className="admin-actions">
              <button className="btn-primary">Add New Project</button>
            </div>
            
            <div className="filters">
              <input type="text" placeholder="Search projects..." />
              <select>
                <option>All Categories</option>
                <option>Websites</option>
                <option>Telegram Bots</option>
                <option>Mini Apps</option>
                <option>Web Apps</option>
              </select>
            </div>
            
            <div className="portfolio-grid">
              {portfolios.map(item => (
                <div key={item.id} className="portfolio-item">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <div className="portfolio-meta">
                    <span className="category">{item.category}</span>
                  </div>
                  <div className="portfolio-actions">
                    <button className="btn-secondary">Edit</button>
                    <button className="btn-danger">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'content' && (
          <div className="content-management">
            <h2>Content Management</h2>
            <p>Manage website content, descriptions, and other text elements</p>
            
            <div className="content-sections">
              <div className="content-card">
                <h3>Homepage Content</h3>
                <textarea placeholder="Edit homepage content..."></textarea>
                <button className="btn-primary">Save Changes</button>
              </div>
              
              <div className="content-card">
                <h3>About Page</h3>
                <textarea placeholder="Edit about page content..."></textarea>
                <button className="btn-primary">Save Changes</button>
              </div>
              
              <div className="content-card">
                <h3>Footer Content</h3>
                <textarea placeholder="Edit footer content..."></textarea>
                <button className="btn-primary">Save Changes</button>
              </div>
            </div>
          </div>
        )}
      </motion.main>
    </div>
  );
};

export default AdminPanel;