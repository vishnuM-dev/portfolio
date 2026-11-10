import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  ArrowUpRight, 
  CheckCircle2, 
  UserCheck, 
  TrendingUp, 
  Sparkles, 
  FolderGit2, 
  Code2, 
  ChevronRight, 
  ChevronLeft,
  ExternalLink,
  Layers,
  Calendar,
  Share2
} from 'lucide-react';
import { projectsData } from '../data/projects';
import { GithubIcon } from '../components/BrandIcons';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './ProjectDetails.css';

export default function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find current project by id
  const projectId = parseInt(id, 10);
  const projectIndex = projectsData.findIndex((p) => p.id === projectId);
  const project = projectsData[projectIndex];

  // Next and Previous projects for quick navigation bottom bar
  const prevProject = projectIndex > 0 ? projectsData[projectIndex - 1] : projectsData[projectsData.length - 1];
  const nextProject = projectIndex < projectsData.length - 1 ? projectsData[projectIndex + 1] : projectsData[0];

  useEffect(() => {
    // Scroll to top when project ID changes
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [id]);

  if (!project) {
    return (
      <div className="project-not-found-page">
        <Navbar />
        <main className="container not-found-container">
          <h2>Project Not Found</h2>
          <p>The project you are looking for does not exist or has been moved.</p>
          <button 
            onClick={() => navigate('/#projects')} 
            className="btn btn-primary"
          >
            <ArrowLeft size={18} />
            <span>Back to Portfolio</span>
          </button>
        </main>
        <Footer />
      </div>
    );
  }

  const {
    number,
    title,
    description,
    technologies = [],
    image,
    features = [],
    contribution,
    businessImpact,
    demoUrl,
    githubUrl,
    categories = []
  } = project;

  const handleBackToProjects = (e) => {
    e.preventDefault();
    navigate('/');
    setTimeout(() => {
      const projectsElem = document.getElementById('projects');
      if (projectsElem) {
        const navbarOffset = 85;
        const elementPosition = projectsElem.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
          top: elementPosition - navbarOffset,
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: project.title,
        text: project.description,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Project link copied to clipboard!');
    }
  };

  return (
    <div className="project-details-wrapper">
      <Navbar />

      <main className="project-details-page">
        {/* Top Header & Breadcrumbs */}
        <section className="project-details-header-section">
          <div className="container">
            {/* Top Navigation & Breadcrumb */}
            <div className="project-top-nav">
              <a 
                href="/#projects" 
                onClick={handleBackToProjects} 
                className="back-btn"
              >
                <ArrowLeft size={18} />
                <span>Back to Portfolio</span>
              </a>

              <nav className="breadcrumbs" aria-label="Breadcrumb">
                <Link to="/" onClick={handleBackToProjects} className="breadcrumb-link">Portfolio</Link>
                <ChevronRight size={14} className="breadcrumb-separator" />
                <span className="breadcrumb-link" onClick={handleBackToProjects}>Projects</span>
                <ChevronRight size={14} className="breadcrumb-separator" />
                <span className="breadcrumb-current">{title}</span>
              </nav>
            </div>

            {/* Project Title & Category Meta */}
            <div className="project-hero-content">
              <div className="project-meta-badges">
                <span className="project-hero-number">{number}</span>
                {categories.map((cat) => (
                  <span key={cat} className="project-hero-tag">
                    {cat}
                  </span>
                ))}
              </div>

              <h1 className="project-hero-title">{title}</h1>
              <p className="project-hero-description">{description}</p>

              {/* Action Buttons Header */}
              <div className="project-hero-actions">
                {demoUrl && (
                  <a
                    href={demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    <span>Live Demo</span>
                    <ArrowUpRight size={18} />
                  </a>
                )}

                {githubUrl && (
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary"
                  >
                    <GithubIcon size={18} />
                    <span>View Repository</span>
                  </a>
                )}

                <button 
                  type="button" 
                  onClick={handleShare} 
                  className="btn btn-icon"
                  title="Share this project"
                  aria-label="Share this project"
                >
                  <Share2 size={18} />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Project Showcase Image */}
        <section className="project-showcase-section">
          <div className="container">
            <div className="project-image-hero-frame">
              <img
                src={image}
                alt={title}
                className="project-details-image"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop';
                }}
              />
              <div className="project-image-hero-overlay" />
            </div>
          </div>
        </section>

        {/* Main Content Details Grid */}
        <section className="project-main-info-section">
          <div className="container">
            <div className="project-details-grid">
              
              {/* Left Column: Comprehensive Information */}
              <div className="project-details-main">
                
                {/* Key Features */}
                {features.length > 0 && (
                  <div className="details-card">
                    <h2 className="details-card-title">
                      <Sparkles size={20} className="card-title-icon" />
                      <span>Key Features & Functional Highlights</span>
                    </h2>
                    <ul className="features-grid">
                      {features.map((feature, idx) => (
                        <li key={idx} className="feature-grid-item">
                          <div className="feature-icon-wrapper">
                            <CheckCircle2 size={18} className="feature-check-icon" />
                          </div>
                          <span className="feature-text">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Role & Technical Contribution */}
                {contribution && (
                  <div className="details-card highlight-card contribution-card">
                    <h2 className="details-card-title">
                      <UserCheck size={20} className="card-title-icon" />
                      <span>My Role & Architecture Contribution</span>
                    </h2>
                    <p className="card-body-text">{contribution}</p>
                  </div>
                )}

                {/* Business & Technical Impact */}
                {businessImpact && (
                  <div className="details-card highlight-card impact-card">
                    <h2 className="details-card-title">
                      <TrendingUp size={20} className="card-title-icon" />
                      <span>Business Value & Technical Impact</span>
                    </h2>
                    <p className="card-body-text">{businessImpact}</p>
                  </div>
                )}
              </div>

              {/* Right Column: Metadata & Tech Specs */}
              <aside className="project-details-sidebar">
                
                {/* Tech Stack Card */}
                <div className="sidebar-card">
                  <h3 className="sidebar-card-title">
                    <Code2 size={18} />
                    <span>Technologies Used</span>
                  </h3>
                  <div className="tech-stack-flex">
                    {technologies.map((tech, idx) => (
                      <span key={idx} className="tech-badge">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Project Specs Overview */}
                <div className="sidebar-card">
                  <h3 className="sidebar-card-title">
                    <Layers size={18} />
                    <span>Project Specs</span>
                  </h3>
                  <div className="specs-list">
                    <div className="spec-item">
                      <span className="spec-label">Project No.</span>
                      <span className="spec-value">{number}</span>
                    </div>
                    <div className="spec-item">
                      <span className="spec-label">Category</span>
                      <span className="spec-value">{categories.join(', ')}</span>
                    </div>
                    <div className="spec-item">
                      <span className="spec-label">Architecture</span>
                      <span className="spec-value">Modular Clean Architecture</span>
                    </div>
                  </div>
                </div>

                {/* Quick Actions Card */}
                <div className="sidebar-card cta-sidebar-card">
                  <h4>Want to see more work?</h4>
                  <p>Explore other full-stack projects or reach out for custom development.</p>
                  <a
                    href="/#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate('/');
                      setTimeout(() => {
                        const contactElem = document.getElementById('contact');
                        if (contactElem) {
                          const navbarOffset = 85;
                          const elementPosition = contactElem.getBoundingClientRect().top + window.pageYOffset;
                          window.scrollTo({ top: elementPosition - navbarOffset, behavior: 'smooth' });
                        }
                      }, 100);
                    }}
                    className="btn btn-primary w-full"
                  >
                    <span>Get In Touch</span>
                    <ArrowUpRight size={16} />
                  </a>
                </div>

              </aside>
            </div>
          </div>
        </section>

        {/* Next & Previous Project Navigation Footer Bar */}
        <section className="project-footer-nav-section">
          <div className="container">
            <div className="project-pagination-grid">
              
              {/* Previous Project Card Link */}
              <Link 
                to={`/project/${prevProject.id}`} 
                className="pagination-card prev-card"
                title={`Previous: ${prevProject.title}`}
              >
                <div className="pagination-arrow">
                  <ChevronLeft size={18} />
                </div>
                <div className="pagination-info">
                  <span className="pagination-label">Previous</span>
                  <span className="pagination-title">{prevProject.title}</span>
                </div>
              </Link>

              {/* Center Back Button */}
              <a 
                href="/#projects" 
                onClick={handleBackToProjects} 
                className="center-back-btn"
              >
                <FolderGit2 size={16} />
                <span>All Projects</span>
              </a>

              {/* Next Project Card Link */}
              <Link 
                to={`/project/${nextProject.id}`} 
                className="pagination-card next-card"
                title={`Next: ${nextProject.title}`}
              >
                <div className="pagination-info text-right">
                  <span className="pagination-label">Next</span>
                  <span className="pagination-title">{nextProject.title}</span>
                </div>
                <div className="pagination-arrow">
                  <ChevronRight size={18} />
                </div>
              </Link>

            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
