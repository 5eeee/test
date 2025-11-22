import { motion } from 'framer-motion';
import { useTelegram } from '@twa-dev/sdk';
import Navigation from '../components/Navigation';
import ContactButton from '../components/ContactButton';

const Home = () => {
  const { webApp } = useTelegram();
  
  // Get user's first name from Telegram
  const firstName = webApp?.initDataUnsafe?.user?.first_name || 'User';

  return (
    <div className="page-container">
      <Navigation />
      
      <motion.main 
        className="home-content"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="ascii-art">
          <pre className="ascii-text">
{`  ____              _     _      ____              _       
 |  _ \\            | |   | |    |  _ \\            | |      
 | |_) | __ _ _ __ | |_  | |    | |_) | __ _ _ __ | |_ ___ 
 |  _ < / _\` | '_ \\| __| | |    |  _ < / _\` | '_ \\| __/ _ \\
 | |_) | (_| | | | | |_  | |____| |_) | (_| | | | | ||  __/
 |____/ \\__,_|_| |_|\\__| |______|____/ \\__,_|_| |_|\\__\\___|
`}
          </pre>
        </div>
        
        <div className="welcome-section">
          <h1 className="greeting">Welcome to Studio &lt;4:30/&gt;</h1>
          <p className="user-greeting">Hello, {firstName}!</p>
          <p className="subtitle">We create exceptional digital experiences</p>
        </div>
        
        <div className="features-grid">
          <div className="feature-card">
            <h3>Telegram Bots</h3>
            <p>Custom bots for your business needs</p>
          </div>
          <div className="feature-card">
            <h3>Mini Apps</h3>
            <p>Engaging mini applications in Telegram</p>
          </div>
          <div className="feature-card">
            <h3>Web Development</h3>
            <p>Modern websites and web applications</p>
          </div>
          <div className="feature-card">
            <h3>API Integration</h3>
            <p>Seamless data exchange solutions</p>
          </div>
        </div>
      </motion.main>
      
      <ContactButton />
    </div>
  );
};

export default Home;