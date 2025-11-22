import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { initTMA, useTelegram } from '@twa-dev/sdk';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import './App.css';

// Import page components
import Home from './pages/Home';
import Services from './pages/Services';
import Cart from './pages/Cart';
import IndividualProject from './pages/IndividualProject';
import Portfolio from './pages/Portfolio';
import About from './pages/About';
import WebsiteDevelopment from './pages/WebsiteDevelopment';
import AdminPanel from './pages/AdminPanel';

// Initialize Telegram Mini App
initTMA();

function App() {
  const { initData, webApp, themeParams, colorScheme } = useTelegram();

  useEffect(() => {
    // Apply theme based on Telegram settings
    if (themeParams) {
      document.documentElement.style.setProperty('--tg-theme-bg-color', themeParams.bg_color || '#ffffff');
      document.documentElement.style.setProperty('--tg-theme-text-color', themeParams.text_color || '#000000');
      document.documentElement.style.setProperty('--tg-theme-hint-color', themeParams.hint_color || '#888888');
      document.documentElement.style.setProperty('--tg-theme-link-color', themeParams.link_color || '#2481cc');
    }
    
    // Set color scheme class
    if (colorScheme) {
      document.body.className = colorScheme;
    }
  }, [themeParams, colorScheme]);

  return (
    <Router>
      <motion.div 
        className="app-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/individual-project" element={<IndividualProject />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/about" element={<About />} />
          <Route path="/website-development" element={<WebsiteDevelopment />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </motion.div>
    </Router>
  );
}

export default App;
