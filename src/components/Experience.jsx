'use client';

import React from 'react';
import { experienceData } from '../data/experience';
import { getExperienceDuration } from '../utils/experience';
import {
  Briefcase, Calendar, Clock, CheckCircle2, Layers,
  Coffee, Database, Server, ShieldCheck, Key, Atom,
  Palette, GitBranch, MapPin
} from 'lucide-react';
import { GithubIcon } from './BrandIcons';
import './Experience.css';

// Custom inline brand badge icons
function JsBadgeIcon({ size = 13, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <rect width="16" height="16" rx="3.5" fill="#9870C2" />
      <text x="8" y="11.5" textAnchor="middle" fill="#FFFFFF" fontSize="8.5" fontWeight="800" fontFamily="sans-serif">JS</text>
    </svg>
  );
}

function MavenBadgeIcon({ size = 13, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <rect width="16" height="16" rx="3.5" fill="#9870C2" />
      <text x="8" y="11.5" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="800" fontFamily="sans-serif">M</text>
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

function CodeAngleIcon({ size = 13, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

// Speshway company logo icon box
function SpeshwayLogo({ size = 44 }) {
  return (
    <div className="company-logo-box" aria-hidden="true">
      <svg width={size * 0.55} height={size * 0.55} viewBox="0 0 24 24" fill="none">
        <path
          d="M19.5 6C18.2 4 15.5 2.5 12 2.5C7.2 2.5 4 5.2 4 9C4 13.8 20 12.5 20 17C20 20.2 16.8 22 12 22C7.2 22 4.5 19.8 3.5 17.5"
          stroke="#9870C2"
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
  const duration = getExperienceDuration('2025-04-03');
  const expItem = experienceData[0] || {};

  return (
    <section id="experience" className="section experience-section">
      <div className="container">
        {/* Section Header */}
        <div className="experience-header reveal-on-scroll">
          <div className="section-tag">
            <Briefcase size={14} />
            <span>03 / Experience</span>
          </div>

          <h2 className="section-title">
            Professional <span className="exp-title-accent">Experience.</span>
          </h2>

          <p className="section-description">
            Career trajectory and engineering contributions delivering production Java full-stack
            systems, multi-tenant platforms, and enterprise REST APIs.
          </p>
        </div>

        {/* ── Premium Career Timeline ── */}
        <div className="experience-timeline-container reveal-on-scroll">
          {/* Vertical Track Line */}
          <div className="timeline-track" aria-hidden="true" />

          {/* Timeline Entry */}
          <div className="timeline-entry">
            {/* Marker Dot */}
            <div className="timeline-marker" aria-hidden="true">
              <span className="timeline-marker-pulse" />
              <span className="timeline-marker-dot" />
            </div>

            {/* Experience White Card */}
            <div className="experience-card">
              {/* Card Header */}
              <div className="exp-card-top">
                <div className="exp-company-group">
                  <SpeshwayLogo size={46} />
                  <div className="exp-role-info">
                    <h3 className="exp-role">{expItem.role || 'Associate Software Engineer'}</h3>
                    <h4 className="exp-company">{expItem.company || 'Speshway Solutions Pvt. Ltd.'}</h4>
                    <span className="exp-location">
                      <MapPin size={13} />
                      <span>{expItem.location || 'Andhra Pradesh, India'}</span>
                    </span>
                  </div>
                </div>

                <div className="exp-meta-pills">
                  <span className="exp-meta-badge">
                    <Calendar size={13} />
                    <span>{expItem.period || 'April 2025 – Present'}</span>
                  </span>

                  <span className="exp-meta-badge highlight-duration">
                    <Clock size={13} />
                    <span>{duration.full}</span>
                  </span>

                  <span className="exp-type-tag">
                    {expItem.type || 'Full-time'}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="exp-description">
                {expItem.description ||
                  'Engineered and maintained enterprise-level Java Full Stack applications supporting core business operations.'}
              </p>

              {/* Responsibilities & Achievements */}
              <div className="exp-block">
                <h5 className="exp-block-title">Key Responsibilities &amp; Engineering Impact:</h5>
                <ul className="exp-responsibilities-list">
                  {(expItem.responsibilities || []).map((resp, idx) => (
                    <li key={idx} className="exp-responsibility-item">
                      <CheckCircle2 size={16} className="exp-check-icon" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies */}
              <div className="exp-tech-section">
                <h5 className="exp-block-title">Technologies Used:</h5>
                <div className="exp-tech-pills-wrap">
                  {(expItem.technologies || []).map((tech, idx) => {
                    const TechIcon = getTechBadgeIcon(tech);
                    return (
                      <span key={idx} className="exp-tech-pill">
                        <TechIcon size={13} className="exp-tech-icon" />
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
