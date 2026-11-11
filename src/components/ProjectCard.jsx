'use client';

import React from 'react';
import Link from 'next/link';
import {
  Coffee, Database, Atom, Palette, Layers,
  ArrowUpRight, Play, ExternalLink
} from 'lucide-react';
import { GithubIcon } from './BrandIcons';
import './ProjectCard.css';

// Brand badge icons
function JsBadgeIcon({ size = 12, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <rect width="16" height="16" rx="3.5" fill="#9870C2" />
      <text x="8" y="11.5" textAnchor="middle" fill="#FFFFFF" fontSize="8.5" fontWeight="800" fontFamily="sans-serif">JS</text>
    </svg>
  );
}

function CodeAngleIcon({ size = 12, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

function SpringLeafIcon({ size = 12, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
  );
}

function getTechBadgeIcon(tech) {
  if (tech === 'Java') return Coffee;
  if (tech === 'Spring Boot') return SpringLeafIcon;
  if (tech === 'REST APIs' || tech === 'HTML/CSS/JS') return CodeAngleIcon;
  if (tech === 'Spring MVC' || tech === 'Servlets') return Layers;
  if (tech === 'MySQL' || tech === 'JDBC') return Database;
  if (tech === 'React.js') return Atom;
  if (tech === 'JavaScript') return JsBadgeIcon;
  if (tech === 'HTML5/CSS3') return Palette;
  return CodeAngleIcon;
}

export default function ProjectCard({ project, index = 0 }) {
  const { id, number, title, description, image, technologies = [], demoUrl, githubUrl } = project;

  return (
    <div className="project-card">
      {/* ── 1. Image Showcase Area ── */}
      <Link href={`/project/${id}`} className="project-card-image-wrap" aria-label={`View ${title}`}>
        <div className="image-aspect-box">
          <img
            src={image}
            alt={title}
            className="project-cover-image"
            onError={(e) => {
              // Fallback if needed
              e.target.onerror = null;
            }}
          />
          <div className="image-overlay-tint" aria-hidden="true" />
          <span className="project-card-number">{number}</span>
        </div>
      </Link>

      {/* ── 2. Content Body ── */}
      <div className="project-card-body">
        {/* Title */}
        <h3 className="project-card-title">
          <Link href={`/project/${id}`} className="project-title-link">
            {title}
          </Link>
        </h3>

        {/* Short Description */}
        <p className="project-card-desc">{description}</p>

        {/* Tech Stack Badges */}
        <div className="project-tech-badges">
          {technologies.map((tech, idx) => {
            const IconComp = getTechBadgeIcon(tech);
            return (
              <span key={idx} className="project-tech-pill">
                <IconComp size={12} className="tech-pill-icon" />
                <span>{tech}</span>
              </span>
            );
          })}
        </div>

        {/* ── 3. Bottom Action Buttons ── */}
        <div className="project-card-actions">
          {demoUrl && (
            <a
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-action-btn btn-demo"
              aria-label={`Live Demo of ${title}`}
            >
              <Play size={12} fill="currentColor" />
              <span>Live Demo</span>
              <ArrowUpRight size={13} className="action-arrow" />
            </a>
          )}

          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-action-btn btn-github"
              aria-label={`GitHub Code for ${title}`}
            >
              <GithubIcon size={14} />
              <span>Code</span>
              <ArrowUpRight size={13} className="action-arrow" />
            </a>
          )}

          <Link
            href={`/project/${id}`}
            className="project-action-btn btn-details"
            aria-label={`View Details of ${title}`}
          >
            <span>View Details</span>
            <ArrowUpRight size={14} className="action-arrow" />
          </Link>
        </div>
      </div>
    </div>
  );
}
