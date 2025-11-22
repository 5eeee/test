import { motion } from 'framer-motion';

const ContactButton = () => {
  const handleContact = () => {
    // In a real app, this would open Telegram chat with the manager
    alert('Contact manager functionality would be implemented here');
  };

  return (
    <motion.button
      className="contact-button"
      onClick={handleContact}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.5, type: "spring", stiffness: 300, damping: 20 }}
    >
      Contact Manager
    </motion.button>
  );
};

export default ContactButton;