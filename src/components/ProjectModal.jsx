'use client';

import React, { useEffect } from 'react';
import { X, ArrowUpRight, CheckCircle2, UserCheck, TrendingUp, Sparkles } from 'lucide-react';
import { GithubIcon } from './BrandIcons';
import './ProjectModal.css';

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    if (!project) return;

    // Prevent background scrolling while modal is open
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Close on Escape key press
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

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

  return (
    <div
      className="project-modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="project-modal-card"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close project modal"
        >
          <X size={20} />
        </button>

        {/* Large Project Hero Image */}
        <div className="modal-image-wrapper">
          <img
            src={image}
            alt={title}
            className="modal-image"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop';
            }}
          />
          <div className="modal-image-overlay" />
          <div className="modal-number-badge">{number}</div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="modal-body">
          {/* Header */}
          <div className="modal-header">
            {categories.length > 0 && (
              <div className="modal-categories">
                {categories.map((cat) => (
                  <span key={cat} className="modal-category-tag">
                    {cat}
                  </span>
                ))}
              </div>
            )}
            <h2 id="modal-title" className="modal-title">{title}</h2>
          </div>

          {/* Description */}
          <div className="modal-section">
            <p className="modal-description">{description}</p>
          </div>

          {/* Key Features */}
          {features.length > 0 && (
            <div className="modal-section">
              <h3 className="modal-section-title">
                <Sparkles size={16} className="section-icon" />
                <span>Key Features</span>
              </h3>
              <ul className="modal-features-list">
                {features.map((feature, idx) => (
                  <li key={idx} className="modal-feature-item">
                    <CheckCircle2 size={16} className="feature-icon" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Role & Contribution */}
          {contribution && (
            <div className="modal-section modal-highlight-box">
              <h3 className="modal-section-title">
                <UserCheck size={16} className="section-icon" />
                <span>My Role & Contribution</span>
              </h3>
              <p className="modal-highlight-text">{contribution}</p>
            </div>
          )}

          {/* Business Impact */}
          {businessImpact && (
            <div className="modal-section modal-highlight-box impact">
              <h3 className="modal-section-title">
                <TrendingUp size={16} className="section-icon" />
                <span>Business & Technical Impact</span>
              </h3>
              <p className="modal-highlight-text impact">{businessImpact}</p>
            </div>
          )}

          {/* Technologies Used */}
          {technologies.length > 0 && (
            <div className="modal-section">
              <h3 className="modal-section-title">Technologies Used</h3>
              <div className="modal-tech-stack">
                {technologies.map((tech, idx) => (
                  <span key={idx} className="badge">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action Links */}
          {(demoUrl || githubUrl) && (
            <div className="modal-actions">
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
                  <span>Source Code</span>
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
