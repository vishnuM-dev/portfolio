'use client';

import React, { useState, useRef, useEffect } from 'react';
import { projectsData } from '../data/projects';
import ProjectCard from './ProjectCard';
import ProjectsIllustration from './ProjectsIllustration';
import {
  Layers, Star, LayoutGrid, Monitor, Coffee, Atom
} from 'lucide-react';
import './Projects.css';

// Custom inline code icon for badge & stat box
function CodeAngleIcon({ size = 15, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

const filterOptions = [
  { key: 'ALL', label: 'All', icon: LayoutGrid },
  { key: 'WEB', label: 'Web', icon: Monitor },
  { key: 'FULL STACK', label: 'Full Stack', icon: Layers },
  { key: 'JAVA', label: 'Java', icon: Coffee },
  { key: 'REACT', label: 'React', icon: Atom }
];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);

  const [headerVisible, setHeaderVisible] = useState(false);
  const [cardsVisible, setCardsVisible] = useState(false);

  useEffect(() => {
    // Header Entrance Observer (triggers once)
    const headerObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setHeaderVisible(true);
            headerObserver.disconnect();
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    if (headerRef.current) {
      headerObserver.observe(headerRef.current);
    }

    // Grid Entrance Observer (triggers once)
    const gridObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCardsVisible(true);
            gridObserver.disconnect();
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -50px 0px' }
    );

    if (gridRef.current) {
      gridObserver.observe(gridRef.current);
    }

    return () => {
      headerObserver.disconnect();
      gridObserver.disconnect();
    };
  }, []);

  const filteredProjects = activeCategory === 'ALL'
    ? projectsData
    : projectsData.filter((project) => project.categories.includes(activeCategory));

  return (
    <section id="projects" ref={sectionRef} className="section projects-section">
      {/* Decorative Lavender Top Wave Pattern */}
      <div className="projects-bg-decorative-waves" aria-hidden="true">
        <svg viewBox="0 0 1200 400" fill="none" preserveAspectRatio="none" className="projects-wave-svg">
          <path
            d="M-50,0 C220,90 340,-30 620,70 C900,170 1060,50 1250,100 L1250,-100 L-50,-100 Z"
            fill="url(#projectsWaveFill)"
          />
          <defs>
            <linearGradient id="projectsWaveFill" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E6DCEC" stopOpacity="0.55" />
              <stop offset="60%" stopColor="#F1E9F7" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#F7F3FC" stopOpacity="0.05" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Subtle Background Animated Radial Gradients (18-25s slow ambient movement) */}
      <div className="projects-bg-glow-1" aria-hidden="true" />
      <div className="projects-bg-glow-2" aria-hidden="true" />

      <div className="container projects-container">
        {/* ── Section Header Row: Content on Left, Desk Illustration in Middle, Stats on Right ── */}
        <div ref={headerRef} className="projects-header-row">
          {/* Left Column: Tag, Title, Description, Filter Pills */}
          <div className="projects-header-left">
            <div className={`projects-tag ${headerVisible ? 'is-revealed' : ''}`}>
              <CodeAngleIcon size={14} className="tag-code-icon" />
              <span>My Projects</span>
            </div>

            <h2 className={`projects-heading ${headerVisible ? 'is-revealed' : ''}`}>
              Selected{' '}
              <span className="title-underline-wrapper">
                <span className="shimmer-text">Projects</span>
                <svg className="curved-underline-svg" viewBox="0 0 160 16" fill="none" aria-hidden="true">
                  <path
                    d="M3 12C45 4 115 4 157 12"
                    stroke="url(#underlinePurpleGrad)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="underlinePurpleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#88469F" />
                      <stop offset="50%" stopColor="#C8A8E9" />
                      <stop offset="100%" stopColor="#B27BC3" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </h2>

            <p className={`projects-description ${headerVisible ? 'is-revealed' : ''}`}>
              A collection of scalable full-stack applications, enterprise Java services, and modern React interfaces built with clean architecture.
            </p>

            {/* Filter Categories */}
            <div
              className={`project-filters ${headerVisible ? 'is-revealed' : ''}`}
              role="tablist"
              aria-label="Project Category Filters"
            >
              {filterOptions.map(({ key, label, icon: FilterIcon }) => {
                const isActive = activeCategory === key;
                return (
                  <button
                    key={key}
                    role="tab"
                    aria-selected={isActive}
                    className={`filter-btn ${isActive ? 'active' : ''}`}
                    onClick={() => setActiveCategory(key)}
                  >
                    <FilterIcon size={14} className="filter-btn-icon" />
                    <span>{label}</span>
                    {key === 'ALL' && <span className="filter-count">({projectsData.length})</span>}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Middle: 3D Developer Desk Scene Illustration */}
          <div className={`projects-illustration-col ${headerVisible ? 'is-revealed' : ''}`}>
            <ProjectsIllustration />
          </div>

          {/* Far Right: Vertical Project Statistics Area */}
          <div className={`projects-stats-col ${headerVisible ? 'is-revealed' : ''}`}>
            {/* Stat 1: 5 Projects */}
            <div className="stat-card">
              <div className="stat-icon-box" aria-hidden="true">
                <Layers size={18} strokeWidth={2.2} />
              </div>
              <div className="stat-text">
                <span className="stat-value">5</span>
                <span className="stat-label">Projects</span>
              </div>
            </div>

            {/* Stat 2: Full-Stack Development */}
            <div className="stat-card">
              <div className="stat-icon-box" aria-hidden="true">
                <CodeAngleIcon size={18} />
              </div>
              <div className="stat-text">
                <span className="stat-value">Full-Stack</span>
                <span className="stat-label">Development</span>
              </div>
            </div>

            {/* Stat 3: Real-World Solutions */}
            <div className="stat-card">
              <div className="stat-icon-box" aria-hidden="true">
                <Star size={18} strokeWidth={2.2} />
              </div>
              <div className="stat-text">
                <span className="stat-value">Real-World</span>
                <span className="stat-label">Solutions</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── 6-Column Responsive Projects Grid: Row 1 (3 Cards) + Row 2 (2 Centered Cards) ── */}
        <div ref={gridRef} className={`projects-grid ${activeCategory === 'ALL' ? 'filter-all' : 'filter-custom'}`}>
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              isRevealed={cardsVisible}
            />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="projects-empty">
            <p>No projects found in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
}
