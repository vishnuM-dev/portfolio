'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Coffee, Database, Atom, Palette, Layers,
  Bookmark, ArrowUpRight, Play
} from 'lucide-react';
import { GithubIcon } from './BrandIcons';
import ProjectLaptopMockup from './ProjectLaptopMockup';
import './ProjectCard.css';

// Custom inline brand icons matching reference design
function JsBadgeIcon({ size = 13, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <rect width="16" height="16" rx="3.5" fill="#88469F" />
      <text x="8" y="11.5" textAnchor="middle" fill="#FFFFFF" fontSize="8.5" fontWeight="800" fontFamily="sans-serif">JS</text>
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

// Icon mapper for tech badges
function getTechBadgeIcon(tech) {
  if (tech === 'Java') return Coffee;
  if (tech === 'Spring Boot') return SpringLeafIcon;
  if (tech === 'REST APIs' || tech === 'HTML/CSS/JS') return CodeAngleIcon;
  if (tech === 'Spring MVC') return Layers;
  if (tech === 'MySQL' || tech === 'JDBC') return Database;
  if (tech === 'React.js') return Atom;
  if (tech === 'JavaScript') return JsBadgeIcon;
  if (tech === 'HTML5/CSS3') return Palette;
  return CodeAngleIcon;
}

// Format technologies to show primary tags and an overflow badge if needed
function getDisplayTechnologies(projectId, technologies = []) {
  if (projectId === 1) {
    return {
      visible: ['Java', 'Spring Boot', 'REST APIs'],
      overflow: '+3'
    };
  }
  if (projectId === 2) {
    return {
      visible: ['Java', 'Spring Boot', 'Spring MVC'],
      overflow: '+2'
    };
  }
  if (projectId === 3) {
    return {
      visible: ['Java', 'MySQL', 'REST APIs'],
      overflow: '+2'
    };
  }
  if (projectId === 4) {
    return {
      visible: ['Java', 'Spring Boot', 'MySQL', 'HTML/CSS/JS'],
      overflow: null
    };
  }
  if (projectId === 5) {
    return {
      visible: ['React.js', 'JavaScript', 'HTML5/CSS3', 'REST APIs'],
      overflow: null
    };
  }
  return {
    visible: technologies.slice(0, 4),
    overflow: technologies.length > 4 ? `+${technologies.length - 4}` : null
  };
}

export default function ProjectCard({ project, index = 0, isRevealed = true }) {
  const { id, number, title, image, technologies = [], demoUrl } = project;
  const { visible, overflow } = getDisplayTechnologies(id, technologies);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Stagger reveal delay: 110ms between cards
  const staggerDelay = `${index * 110}ms`;

  const handleBookmarkClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsBookmarked((prev) => !prev);
  };

  return (
    <div
      className={`project-card-container ${isRevealed ? 'is-revealed' : ''} project-card-id-${id}`}
      style={{
        transitionDelay: isRevealed ? staggerDelay : '0ms'
      }}
    >
      <div className="project-card-inner">
        {/* Soft Highlight Shine travelling across card surface on hover */}
        <div className="project-card-shine" aria-hidden="true" />

        {/* 1. Top Bar: Project Number (Left) & Bookmark Control (Right) */}
        <div className="project-card-top-bar">
          <span className="project-number-badge">{number}</span>
          <button
            type="button"
            className={`project-bookmark-btn ${isBookmarked ? 'is-active' : ''}`}
            onClick={handleBookmarkClick}
            aria-label={isBookmarked ? `Remove bookmark for ${title}` : `Bookmark ${title}`}
            title={isBookmarked ? "Bookmarked" : "Bookmark project"}
          >
            <Bookmark
              size={18}
              className="project-bookmark-icon"
              fill={isBookmarked ? "#88469F" : "none"}
            />
          </button>
        </div>

        {/* 2. Full-Width Project Image Stage (Aspect ~16:10, visually prominent) */}
        <Link
          href={`/project/${id}`}
          className="project-image-stage-link"
          aria-label={`View details of ${title}`}
        >
          <div className="project-image-stage">
            <ProjectLaptopMockup image={image} title={title} projectId={id} />
          </div>
        </Link>

        {/* 3. Details Body: Title, Badges, Action Buttons (Clean & Minimal without description) */}
        <div className="project-card-details">
          {/* Complete Title - Bold with Natural Word Boundary Wrapping */}
          <h3 className="project-card-title">
            <Link href={`/project/${id}`} className="project-title-link">
              {title}
            </Link>
          </h3>

          {/* 4. Horizontal Technology Badges Row */}
          <div className="project-tech-badges-row">
            {visible.map((tech) => {
              const IconComponent = getTechBadgeIcon(tech);
              return (
                <span key={tech} className="project-tech-pill">
                  <IconComponent size={13} className="project-pill-icon" />
                  <span>{tech}</span>
                </span>
              );
            })}

            {overflow && (
              <span className="project-tech-pill project-pill-overflow">
                {overflow}
              </span>
            )}
          </div>

          {/* 5. Bottom Action: Live Demo (if link exists) & View Details */}
          <div className={`project-card-footer-cta ${demoUrl ? 'has-demo' : 'details-only'}`}>
            {demoUrl && (
              <a
                href={demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="project-action-btn project-btn-demo"
                aria-label={`Live Demo of ${title}`}
              >
                <Play size={12} className="btn-icon-play" fill="currentColor" />
                <span>Live Demo</span>
                <ArrowUpRight size={13} className="action-arrow-icon" />
              </a>
            )}

            <Link
              href={`/project/${id}`}
              className="project-action-btn project-btn-details"
              aria-label={`View Details of ${title}`}
            >
              <GithubIcon size={14} className="btn-icon-github" />
              <span>View Details</span>
              <ArrowUpRight size={13} className="action-arrow-icon" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
