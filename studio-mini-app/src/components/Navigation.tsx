import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import CartButton from './CartButton';

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/services', label: 'Services' },
    { path: '/portfolio', label: 'Portfolio' },
    { path: '/about', label: 'About' },
    { path: '/website-development', label: 'Websites' },
  ];

  return (
    <nav className="navigation">
      <div className="nav-container">
        {navItems.map((item, index) => (
          <motion.div
            key={item.path}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="nav-item-wrapper"
          >
            <Link 
              to={item.path} 
              className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
            >
              {item.label}
            </Link>
          </motion.div>
        ))}
      </div>
      <CartButton />
    </nav>
  );
};

export default Navigation;