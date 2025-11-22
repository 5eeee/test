import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTelegram } from '@twa-dev/sdk';
import Navigation from '../components/Navigation';
import ContactButton from '../components/ContactButton';
import ProjectModal from '../components/ProjectModal';

interface Project {
  id: number;
  title: string;
  description: string;
  fullDescription: string;
  functionality: string[];
  technologies: string[];
  images: string[]; // In a real app, these would be actual image URLs
  category: string;
  developmentTime: string;
  article: string;
}

const Portfolio = () => {
  const { webApp } = useTelegram();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Sample portfolio data
  const projects: Project[] = [
    {
      id: 1,
      title: "E-commerce Platform",
      description: "Full-featured online store with payment integration",
      fullDescription: "A comprehensive e-commerce solution with product management, user accounts, payment processing, and order tracking.",
      functionality: [
        "Product catalog with filtering",
        "User authentication and profiles",
        "Shopping cart and checkout",
        "Payment gateway integration",
        "Order management system"
      ],
      technologies: ["React", "Node.js", "MongoDB", "Stripe", "AWS"],
      images: ["img1", "img2", "img3"], // Placeholder values
      category: "Websites",
      developmentTime: "8 weeks",
      article: "EC-001"
    },
    {
      id: 2,
      title: "Telegram Bot for CRM",
      description: "Customer relationship management bot",
      fullDescription: "A Telegram bot that helps businesses manage customer interactions, track leads, and automate follow-ups.",
      functionality: [
        "Lead tracking system",
        "Automated reminders",
        "Customer data management",
        "Integration with external tools",
        "Analytics dashboard"
      ],
      technologies: ["Python", "Telegraf", "PostgreSQL", "Redis"],
      images: ["img1", "img2"], // Placeholder values
      category: "Telegram Bots",
      developmentTime: "6 weeks",
      article: "TB-002"
    },
    {
      id: 3,
      title: "Task Management App",
      description: "Collaborative task management solution",
      fullDescription: "A web-based application for teams to manage projects, assign tasks, and track progress in real-time.",
      functionality: [
        "Project creation and management",
        "Task assignment and tracking",
        "Team collaboration tools",
        "Progress reporting",
        "Notifications system"
      ],
      technologies: ["React", "Express", "PostgreSQL", "Socket.io"],
      images: ["img1", "img2", "img3", "img4"], // Placeholder values
      category: "Web Apps",
      developmentTime: "10 weeks",
      article: "TM-003"
    },
    {
      id: 4,
      title: "Mini App Game",
      description: "Interactive game within Telegram",
      fullDescription: "A fun, engaging game that runs directly in Telegram, with user accounts and leaderboards.",
      functionality: [
        "Game mechanics and logic",
        "User accounts and profiles",
        "Leaderboard system",
        "Achievement tracking",
        "Social sharing features"
      ],
      technologies: ["React", "TypeScript", "WebGL", "Telegram API"],
      images: ["img1"], // Placeholder values
      category: "Mini Apps",
      developmentTime: "5 weeks",
      article: "MG-004"
    }
  ];

  const openProjectModal = (project: Project) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  return (
    <div className="page-container">
      <Navigation />
      
      <motion.main 
        className="portfolio-content"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="portfolio-header">
          <h1>Our Portfolio</h1>
          <p>Explore our recent projects and case studies</p>
        </div>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="project-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              onClick={() => openProjectModal(project)}
            >
              <div className="project-preview">
                <div className="project-image-placeholder">
                  {/* In a real app, this would show actual project images */}
                  <div className="image-placeholder">Project Preview</div>
                </div>
                <div className="project-info">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.main>
      
      {selectedProject && (
        <ProjectModal 
          project={selectedProject} 
          onClose={closeModal} 
        />
      )}
      
      <ContactButton />
    </div>
  );
};

export default Portfolio;