import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTelegram } from '@twa-dev/sdk';
import Navigation from '../components/Navigation';
import ContactButton from '../components/ContactButton';

const IndividualProject = () => {
  const { webApp } = useTelegram();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    projectType: '',
    complexity: 3,
    features: [] as string[],
    techRequirements: '',
    additionalOptions: [] as string[],
    name: '',
    telegram: '',
    email: '',
    phone: '',
    projectDescription: ''
  });

  // Calculate project cost based on selections
  const calculateCost = () => {
    let cost = 500; // Base cost
    
    // Add cost based on complexity (scale 1-5)
    cost += (formData.complexity - 1) * 300;
    
    // Add cost for features
    cost += formData.features.length * 200;
    
    // Add cost for additional options
    cost += formData.additionalOptions.length * 150;
    
    return cost;
  };

  const calculateTimeframe = () => {
    // Base timeframe in weeks
    let weeks = 2;
    
    // Add time based on complexity
    weeks += formData.complexity - 1;
    
    // Add time for features
    weeks += Math.ceil(formData.features.length / 3);
    
    return `${weeks}-${weeks + 2} weeks`;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, category: string) => {
    const { value, checked } = e.target;
    setFormData(prev => {
      const currentArray = [...prev[category as keyof typeof formData] as string[]];
      if (checked) {
        return { ...prev, [category]: [...currentArray, value] };
      } else {
        return { ...prev, [category]: currentArray.filter(item => item !== value) };
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit the form to backend
    alert('Project request submitted! In a real app, this would send to the manager.');
  };

  return (
    <div className="page-container">
      <Navigation />
      
      <motion.main 
        className="project-content"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="progress-bar">
          <div className={`step ${step >= 1 ? 'active' : ''}`}>Calculator</div>
          <div className={`step ${step >= 2 ? 'active' : ''}`}>Details</div>
          <div className={`step ${step >= 3 ? 'active' : ''}`}>Contact</div>
        </div>

        {step === 1 && (
          <motion.div 
            className="step-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <h2>Project Calculator</h2>
            <p>Configure your custom project</p>
            
            <div className="calculator-section">
              <div className="form-group">
                <label>Project Type:</label>
                <select 
                  name="projectType" 
                  value={formData.projectType}
                  onChange={handleInputChange}
                >
                  <option value="">Select project type</option>
                  <option value="web-app">Web Application</option>
                  <option value="telegram-bot">Telegram Bot</option>
                  <option value="mini-app">Mini App</option>
                  <option value="mobile-app">Mobile App</option>
                  <option value="api">API Development</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Project Complexity:</label>
                <div className="slider-container">
                  <input 
                    type="range" 
                    min="1" 
                    max="5" 
                    name="complexity"
                    value={formData.complexity}
                    onChange={handleInputChange}
                  />
                  <div className="slider-value">Level {formData.complexity}</div>
                </div>
              </div>
              
              <div className="form-group">
                <label>Features:</label>
                <div className="checkbox-group">
                  <label>
                    <input 
                      type="checkbox" 
                      value="authentication"
                      checked={formData.features.includes('authentication')}
                      onChange={(e) => handleCheckboxChange(e, 'features')}
                    />
                    User Authentication
                  </label>
                  <label>
                    <input 
                      type="checkbox" 
                      value="database"
                      checked={formData.features.includes('database')}
                      onChange={(e) => handleCheckboxChange(e, 'features')}
                    />
                    Database Integration
                  </label>
                  <label>
                    <input 
                      type="checkbox" 
                      value="api"
                      checked={formData.features.includes('api')}
                      onChange={(e) => handleCheckboxChange(e, 'features')}
                    />
                    API Development
                  </label>
                  <label>
                    <input 
                      type="checkbox" 
                      value="payment"
                      checked={formData.features.includes('payment')}
                      onChange={(e) => handleCheckboxChange(e, 'features')}
                    />
                    Payment Integration
                  </label>
                  <label>
                    <input 
                      type="checkbox" 
                      value="admin-panel"
                      checked={formData.features.includes('admin-panel')}
                      onChange={(e) => handleCheckboxChange(e, 'features')}
                    />
                    Admin Panel
                  </label>
                </div>
              </div>
            </div>
            
            <div className="project-preview">
              <h3>Project Preview</h3>
              <div className="preview-details">
                <p><strong>Estimated Cost:</strong> ${calculateCost()}</p>
                <p><strong>Estimated Timeframe:</strong> {calculateTimeframe()}</p>
              </div>
            </div>
            
            <div className="step-actions">
              <button 
                className="btn-primary"
                onClick={() => setStep(2)}
                disabled={!formData.projectType}
              >
                Next: Details
              </button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div 
            className="step-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <h2>Technical Details</h2>
            <p>Specify your technical requirements</p>
            
            <div className="form-group">
              <label>Technical Requirements:</label>
              <textarea 
                name="techRequirements"
                value={formData.techRequirements}
                onChange={handleInputChange}
                placeholder="Describe your technical requirements..."
                rows={4}
              />
            </div>
            
            <div className="form-group">
              <label>Additional Options:</label>
              <div className="checkbox-group">
                <label>
                  <input 
                    type="checkbox" 
                    value="design"
                    checked={formData.additionalOptions.includes('design')}
                    onChange={(e) => handleCheckboxChange(e, 'additionalOptions')}
                  />
                  UI/UX Design
                </label>
                <label>
                  <input 
                    type="checkbox" 
                    value="testing"
                    checked={formData.additionalOptions.includes('testing')}
                    onChange={(e) => handleCheckboxChange(e, 'additionalOptions')}
                  />
                  Testing & QA
                </label>
                <label>
                  <input 
                    type="checkbox" 
                    value="deployment"
                    checked={formData.additionalOptions.includes('deployment')}
                    onChange={(e) => handleCheckboxChange(e, 'additionalOptions')}
                  />
                  Deployment & Hosting
                </label>
                <label>
                  <input 
                    type="checkbox" 
                    value="maintenance"
                    checked={formData.additionalOptions.includes('maintenance')}
                    onChange={(e) => handleCheckboxChange(e, 'additionalOptions')}
                  />
                  Maintenance Support
                </label>
              </div>
            </div>
            
            <div className="project-preview">
              <h3>Updated Project Preview</h3>
              <div className="preview-details">
                <p><strong>Estimated Cost:</strong> ${calculateCost()}</p>
                <p><strong>Estimated Timeframe:</strong> {calculateTimeframe()}</p>
              </div>
            </div>
            
            <div className="step-actions">
              <button 
                className="btn-secondary"
                onClick={() => setStep(1)}
              >
                Back
              </button>
              <button 
                className="btn-primary"
                onClick={() => setStep(3)}
              >
                Next: Contact
              </button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div 
            className="step-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <h2>Contact Information</h2>
            <p>Provide your details for the project</p>
            
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Full Name:</label>
                <input 
                  type="text" 
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="telegram">Telegram Username:</label>
                <input 
                  type="text" 
                  id="telegram"
                  name="telegram"
                  value={formData.telegram}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input 
                  type="email" 
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="phone">Phone:</label>
                <input 
                  type="tel" 
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="projectDescription">Project Description:</label>
                <textarea 
                  id="projectDescription"
                  name="projectDescription"
                  value={formData.projectDescription}
                  onChange={handleInputChange}
                  placeholder="Describe your project in detail..."
                  rows={4}
                  required
                />
                </textarea>
              </div>
              
              <div className="form-group">
                <label>Final Project Summary:</label>
                <div className="summary-box">
                  <p><strong>Type:</strong> {formData.projectType}</p>
                  <p><strong>Complexity:</strong> Level {formData.complexity}</p>
                  <p><strong>Features:</strong> {formData.features.length > 0 ? formData.features.join(', ') : 'None'}</p>
                  <p><strong>Options:</strong> {formData.additionalOptions.length > 0 ? formData.additionalOptions.join(', ') : 'None'}</p>
                  <p><strong>Estimated Cost:</strong> ${calculateCost()}</p>
                  <p><strong>Estimated Timeframe:</strong> {calculateTimeframe()}</p>
                </div>
              </div>
              
              <div className="step-actions">
                <button 
                  type="button"
                  className="btn-secondary"
                  onClick={() => setStep(2)}
                >
                  Back
                </button>
                <button 
                  type="submit"
                  className="btn-primary"
                >
                  Submit Project Request
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </motion.main>
      
      <ContactButton />
    </div>
  );
};

export default IndividualProject;