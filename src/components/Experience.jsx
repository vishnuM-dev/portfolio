'use client';

import React, { useRef, useState, useEffect } from 'react';
import { experienceData } from '../data/experience';
import { getExperienceDuration } from '../utils/experience';
import ExperienceIllustration from './ExperienceIllustration';
import {
  Briefcase, Calendar, Clock, CheckCircle2, Layers,
  Coffee, Database, Server, ShieldCheck, Key, Atom,
  Palette, GitBranch, Settings
} from 'lucide-react';
import { GithubIcon } from './BrandIcons';
import './Experience.css';

// Custom inline brand icons matching reference design
function JsBadgeIcon({ size = 13, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <rect width="16" height="16" rx="3.5" fill="#88469F" />
      <text x="8" y="11.5" textAnchor="middle" fill="#FFFFFF" fontSize="8.5" fontWeight="800" fontFamily="sans-serif">JS</text>
    </svg>
  );
}

function MavenBadgeIcon({ size = 13, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <rect width="16" height="16" rx="3.5" fill="#88469F" />
      <text x="8" y="11.5" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="800" fontFamily="sans-serif">M</text>
    </svg>
  );
}

function CodeAngleIcon({ size = 13, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

function SpringLeafIcon({ size = 13, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
  );
}

// Speshway stylized "S" company logo
function SpeshwayLogo({ size = 42 }) {
  return (
    <div className="company-logo-box" aria-hidden="true">
      <svg width={size * 0.58} height={size * 0.58} viewBox="0 0 24 24" fill="none">
        <path
          d="M19.5 6C18.2 4 15.5 2.5 12 2.5C7.2 2.5 4 5.2 4 9C4 13.8 20 12.5 20 17C20 20.2 16.8 22 12 22C7.2 22 4.5 19.8 3.5 17.5"
          stroke="#FFFFFF"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

// Tech icon mapper
function getTechBadgeIcon(tech) {
  if (tech === 'Java') return Coffee;
  if (tech === 'Spring Boot') return SpringLeafIcon;
  if (tech === 'Spring MVC' || tech === 'Hibernate') return Layers;
  if (tech === 'Spring Data JPA' || tech === 'MySQL') return Database;
  if (tech === 'REST APIs') return CodeAngleIcon;
  if (tech === 'Spring Security') return ShieldCheck;
  if (tech === 'JWT Authentication') return Key;
  if (tech === 'PostgreSQL') return Server;
  if (tech === 'React.js') return Atom;
  if (tech === 'JavaScript') return JsBadgeIcon;
  if (tech === 'HTML5' || tech === 'CSS3') return Palette;
  if (tech === 'Git') return GitBranch;
  if (tech === 'GitHub') return GithubIcon;
  if (tech === 'Maven') return MavenBadgeIcon;
  return CodeAngleIcon;
}

export default function Experience() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const timelineRef = useRef(null);

  const [headerVisible, setHeaderVisible] = useState(false);
  const [timelineVisible, setTimelineVisible] = useState(false);

  // Dynamic experience duration from April 2025
  const duration = getExperienceDuration('2025-04-03');
  const expItem = experienceData[0] || {};

  useEffect(() => {
    // Header Observer
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

    // Timeline Observer
    const timelineObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimelineVisible(true);
            timelineObserver.disconnect();
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    if (timelineRef.current) {
      timelineObserver.observe(timelineRef.current);
    }

    return () => {
      headerObserver.disconnect();
      timelineObserver.disconnect();
    };
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="section experience-section">
      {/* Decorative Lavender Wave Pattern (Top & Bottom Curves) */}
      <div className="experience-bg-decorative-waves" aria-hidden="true">
        <svg viewBox="0 0 1200 400" fill="none" preserveAspectRatio="none" className="experience-wave-svg">
          <path
            d="M-50,0 C220,85 340,-35 620,65 C900,165 1060,45 1250,95 L1250,-100 L-50,-100 Z"
            fill="url(#expWaveLavenderFill)"
          />
          <defs>
            <linearGradient id="expWaveLavenderFill" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E6DCEC" stopOpacity="0.55" />
              <stop offset="60%" stopColor="#F1E9F7" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#F7F3FC" stopOpacity="0.05" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Subtle Background Animated Radial Gradients (18-25s slow ambient movement) */}
      <div className="experience-bg-glow-1" aria-hidden="true" />
      <div className="experience-bg-glow-2" aria-hidden="true" />

      <div className="container experience-container">
        {/* ── Section Header Row: Content on Left, Developer Workspace on Right ── */}
        <div ref={headerRef} className="experience-header-row">
          <div className="experience-header-left">
            <div className={`experience-tag ${headerVisible ? 'is-revealed' : ''}`}>
              <Briefcase size={14} className="tag-briefcase-icon" />
              <span>Work Experience</span>
            </div>

            <h2 className={`experience-heading ${headerVisible ? 'is-revealed' : ''}`}>
              Professional{' '}
              <span className="title-underline-wrapper">
                <span className="shimmer-text">Experience</span>
                <svg className="curved-underline-svg" viewBox="0 0 180 16" fill="none" aria-hidden="true">
                  <path
                    d="M3 12C50 4 130 4 177 12"
                    stroke="url(#underlineExpPurpleGrad)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="underlineExpPurpleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#88469F" />
                      <stop offset="50%" stopColor="#C8A8E9" />
                      <stop offset="100%" stopColor="#B27BC3" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </h2>

            {/* Description with thin vertical purple accent line beside it */}
            <div className={`experience-desc-wrapper ${headerVisible ? 'is-revealed' : ''}`}>
              <span className="experience-vertical-line" aria-hidden="true" />
              <p className="experience-description">
                Industry experience engineering enterprise Java applications, REST APIs, and scalable web solutions.
              </p>
            </div>
          </div>

          <div className={`experience-illustration-wrapper ${headerVisible ? 'is-revealed' : ''}`}>
            <ExperienceIllustration />
          </div>
        </div>

        {/* ── Professional Timeline Layout ── */}
        <div ref={timelineRef} className={`experience-timeline-layout ${timelineVisible ? 'is-revealed' : ''}`}>
          {/* Timeline Left: Date & Dynamic Duration Badges */}
          <div className="timeline-sidebar-col">
            <div className="timeline-date-card">
              <span className="timeline-date-month">Apr 2025</span>
              <span className="timeline-date-status">– Present</span>
            </div>

            <div className="timeline-duration-badge">
              <Clock size={12} className="duration-clock-icon" />
              <span>{duration.full}</span>
            </div>
          </div>

          {/* Timeline Center: Vertical Purple Line with Glowing Marker */}
          <div className="timeline-spine-col" aria-hidden="true">
            <div className="timeline-vertical-line" />
            <div className="timeline-glowing-marker">
              <span className="marker-outer-ring" />
              <span className="marker-core-dot" />
            </div>
          </div>

          {/* Timeline Right: Large Premium Experience Card */}
          <div className="timeline-card-col">
            <div className="experience-glass-card">
              {/* Decorative subtle lavender corner accent */}
              <div className="exp-card-corner-accent" aria-hidden="true" />

              {/* Surface highlight sweep on hover */}
              <div className="exp-card-shine" aria-hidden="true" />

              {/* Card Header: Company Logo, Role, Metadata */}
              <div className="exp-card-header">
                <div className="exp-card-company-group">
                  <SpeshwayLogo size={46} />
                  <div className="exp-company-text">
                    <h3 className="exp-role-title">{expItem.role || 'Associate Software Engineer'}</h3>
                    <h4 className="exp-company-name">{expItem.company || 'Speshway Solutions Pvt. Ltd.'}</h4>
                  </div>
                </div>

                <div className="exp-card-meta-group">
                  <span className="exp-meta-badge">
                    <Calendar size={14} className="meta-icon" />
                    <span>{expItem.period || 'April 2025 – Present'}</span>
                  </span>

                  <span className="exp-meta-badge">
                    <Clock size={14} className="meta-icon" />
                    <span>{duration.full}</span>
                  </span>

                  <span className="exp-type-pill">
                    {expItem.type || 'Full-time'}
                  </span>
                </div>
              </div>

              {/* Professional Summary Line */}
              <p className="exp-summary-text">
                {expItem.description ||
                  'Engineered and maintained enterprise-level Java Full Stack applications supporting core business operations.'}
              </p>

              {/* Responsibilities Block */}
              <div className="exp-responsibilities-section">
                <div className="exp-block-label">
                  <Settings size={15} className="label-settings-icon" />
                  <span>Key Responsibilities &amp; Engineering Contributions</span>
                </div>

                <ul className="exp-responsibilities-list">
                  {(expItem.responsibilities || []).map((resp, idx) => (
                    <li key={idx} className="exp-resp-item">
                      <CheckCircle2 size={16} className="exp-check-icon" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Divider Line */}
              <div className="exp-card-divider" aria-hidden="true" />

              {/* Technology Stack Section */}
              <div className="exp-tech-stack-row">
                <div className="exp-tech-label-col">
                  <Layers size={22} className="tech-stack-layers-icon" />
                  <div className="tech-stack-text">
                    <span>Tech</span>
                    <span>Stack</span>
                  </div>
                </div>

                <div className="exp-tech-badges-grid">
                  {(expItem.technologies || []).map((tech, idx) => {
                    const IconComp = getTechBadgeIcon(tech);
                    return (
                      <span key={idx} className="exp-tech-pill">
                        <IconComp size={13} className="exp-tech-icon" />
                        <span>{tech}</span>
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
