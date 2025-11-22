import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const CartButton = () => {
  const [cartCount, setCartCount] = useState(0);

  // In a real app, this would come from a context or state management
  useEffect(() => {
    // Simulate cart items count
    setCartCount(0);
  }, []);

  return (
    <motion.div 
      className="cart-button-wrapper"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link to="/cart" className="cart-button">
        <div className="cart-icon">🛒</div>
        {cartCount > 0 && (
          <motion.div 
            className="cart-count"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            key={cartCount}
          >
            {cartCount}
          </motion.div>
        )}
      </Link>
    </motion.div>
  );
};

export default CartButton;