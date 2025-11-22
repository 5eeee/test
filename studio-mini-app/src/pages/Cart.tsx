import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTelegram } from '@twa-dev/sdk';
import Navigation from '../components/Navigation';
import ContactButton from '../components/ContactButton';

// Define cart item type
interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
}

const Cart = () => {
  const { webApp } = useTelegram();
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: 1, title: "Telegram Bot Development", price: 499, quantity: 1 },
    { id: 2, title: "Mini App Development", price: 799, quantity: 1 }
  ]);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) return;
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity } : item
    ));
  };

  const handleCheckout = () => {
    setShowConfirmation(true);
  };

  const confirmOrder = () => {
    // In a real app, this would process the payment
    alert('Order confirmed! In a real app, this would redirect to payment.');
    setShowConfirmation(false);
  };

  if (showConfirmation) {
    return (
      <div className="page-container">
        <Navigation />
        
        <motion.main 
          className="confirmation-content"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1>Confirm Your Order</h1>
          
          <div className="order-summary">
            <h2>Order Summary</h2>
            <div className="summary-items">
              {cartItems.map(item => (
                <div key={item.id} className="summary-item">
                  <span>{item.title}</span>
                  <span>${item.price} × {item.quantity}</span>
                  <span>${item.price * item.quantity}</span>
                </div>
              ))}
            </div>
            <div className="total-row">
              <strong>Total: ${total}</strong>
            </div>
          </div>
          
          <div className="confirmation-steps">
            <div className="step">
              <input type="checkbox" id="offer-agreement" />
              <label htmlFor="offer-agreement">I agree to the offer agreement</label>
            </div>
            <div className="step">
              <input type="checkbox" id="privacy-policy" />
              <label htmlFor="privacy-policy">I agree to the privacy policy</label>
            </div>
            <div className="step">
              <input type="checkbox" id="contract-agreement" />
              <label htmlFor="contract-agreement">I agree to the contract terms</label>
            </div>
          </div>
          
          <div className="confirmation-actions">
            <button 
              className="btn-secondary"
              onClick={() => setShowConfirmation(false)}
            >
              Back
            </button>
            <button 
              className="btn-primary"
              onClick={confirmOrder}
              disabled={!document.getElementById('offer-agreement') || !(document.getElementById('offer-agreement') as HTMLInputElement).checked}
            >
              Proceed to Payment
            </button>
          </div>
        </motion.main>
        
        <ContactButton />
      </div>
    );
  }

  return (
    <div className="page-container">
      <Navigation />
      
      <motion.main 
        className="cart-content"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1>Your Cart</h1>
        
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty</p>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map(item => (
                <motion.div 
                  key={item.id}
                  className="cart-item"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="item-info">
                    <h3>{item.title}</h3>
                    <p>${item.price}</p>
                  </div>
                  
                  <div className="quantity-controls">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  
                  <div className="item-total">
                    ${item.price * item.quantity}
                  </div>
                  
                  <button 
                    className="remove-item"
                    onClick={() => removeItem(item.id)}
                  >
                    Remove
                  </button>
                </motion.div>
              ))}
            </div>
            
            <div className="cart-summary">
              <div className="total">
                <h3>Total: ${total}</h3>
              </div>
              
              <div className="cart-actions">
                <button 
                  className="btn-secondary"
                  onClick={() => {
                    // In a real app, this would contact the manager
                    alert('Contact manager functionality would be implemented here');
                  }}
                >
                  Contact Manager
                </button>
                <button 
                  className="btn-primary"
                  onClick={handleCheckout}
                >
                  Proceed to Payment
                </button>
              </div>
            </div>
          </>
        )}
      </motion.main>
      
      <ContactButton />
    </div>
  );
};

export default Cart;