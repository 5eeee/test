import { motion } from 'framer-motion';
import { useTelegram } from '@twa-dev/sdk';
import Navigation from '../components/Navigation';
import ContactButton from '../components/ContactButton';

const About = () => {
  const { webApp } = useTelegram();

  return (
    <div className="page-container">
      <Navigation />
      
      <motion.main 
        className="about-content"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="about-header">
          <h1>About Studio &lt;4:30/&gt;</h1>
          <p>Your trusted partner for digital solutions</p>
        </div>

        <div className="about-section">
          <h2>Our Story</h2>
          <p>
            Studio &lt;4:30/&gt; was founded with a vision to create exceptional digital experiences 
            that help businesses grow and thrive in the digital age. Our name reflects our commitment 
            to precision and attention to detail - just like the golden ratio, we strive for perfection 
            in every project we undertake.
          </p>
        </div>

        <div className="about-section">
          <h2>Our Mission</h2>
          <p>
            Our mission is to empower businesses with innovative digital solutions that solve real-world 
            problems. We believe in creating products that are not only functional but also beautiful, 
            intuitive, and impactful.
          </p>
        </div>

        <div className="about-section">
          <h2>Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <h3>Innovation</h3>
              <p>We constantly explore new technologies and methodologies to deliver cutting-edge solutions.</p>
            </div>
            <div className="value-card">
              <h3>Quality</h3>
              <p>We maintain the highest standards in everything we do, ensuring excellence in every project.</p>
            </div>
            <div className="value-card">
              <h3>Integrity</h3>
              <p>We believe in transparent communication and ethical business practices.</p>
            </div>
            <div className="value-card">
              <h3>Excellence</h3>
              <p>We strive for perfection in every detail, delivering solutions that exceed expectations.</p>
            </div>
          </div>
        </div>

        <div className="about-section">
          <h2>Our Approach</h2>
          <p>
            We follow a user-centered design approach, combining creativity with technical expertise to 
            deliver solutions that truly make a difference. Our team of experienced developers, designers, 
            and strategists work together to ensure every project is a success.
          </p>
        </div>

        <div className="about-section">
          <h2>Target Audience</h2>
          <p>
            We work with businesses of all sizes, from startups to enterprises, who are looking to 
            leverage technology to grow their business. Whether you need a simple Telegram bot or a 
            complex web application, we have the expertise to bring your vision to life.
          </p>
        </div>
      </motion.main>
      
      <ContactButton />
    </div>
  );
};

export default About;