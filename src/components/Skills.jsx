'use client';

import React, { useRef, useState, useEffect } from 'react';
import { skillsData } from '../data/skills';
import {
  Code, Palette, FileCode, Atom, Layout,
  Coffee, Cpu, Layers, Network, Database,
  Server, HardDrive, GitBranch, Terminal,
  Box, Send, Wrench, CheckCircle2, ShieldCheck, Key,
  Cloud, RefreshCw, Users, Sparkles, Monitor,
  UploadCloud, Triangle
} from 'lucide-react';
import { GithubIcon } from './BrandIcons';
import DeveloperIllustration from './DeveloperIllustration';
import './Skills.css';

// ── Custom Dedicated Brand & Technology Icons Matching Reference Image ──
function JsBadgeIcon({ size = 15, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <rect width="16" height="16" rx="3.5" fill="#88469F" />
      <text x="8" y="11.5" textAnchor="middle" fill="#FFFFFF" fontSize="8.5" fontWeight="800" fontFamily="system-ui, -apple-system, sans-serif">JS</text>
    </svg>
  );
}

function MavenBadgeIcon({ size = 15, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <rect width="16" height="16" rx="3.5" fill="#88469F" />
      <text x="8" y="11.5" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="800" fontFamily="system-ui, -apple-system, sans-serif">M</text>
    </svg>
  );
}

function CodeAngleIcon({ size = 15, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

function SpringLeafIcon({ size = 15, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
  );
}

function TargetExpertiseIcon({ size = 15, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="m4.93 4.93 4.24 4.24" />
      <path d="m14.83 9.17 4.24-4.24" />
      <path d="m14.83 14.83 4.24 4.24" />
      <path d="m9.17 14.83-4.24 4.24" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
    </svg>
  );
}

// Map skill names or icon identifiers to exact visual match components
const iconMap = {
  Code: CodeAngleIcon,
  Palette,
  FileCode: JsBadgeIcon,
  Atom,
  Layout,
  Coffee,
  Cpu: SpringLeafIcon,
  Layers,
  Network: CodeAngleIcon,
  Database,
  Server,
  HardDrive: Database,
  GitBranch,
  Github: GithubIcon,
  Terminal: CodeAngleIcon,
  Box: MavenBadgeIcon,
  Send,
  CheckCircle2,
  ShieldCheck,
  Key,
  Cloud,
  RefreshCw,
  Users,
  Monitor
};

// Map each of the 8 category cards to its purple gradient header icon
const categoryIconMap = {
  'Languages': CodeAngleIcon,
  'Frameworks': Layers,
  'Backend': Server,
  'Frontend': Monitor,
  'Security': ShieldCheck,
  'Databases': Database,
  'Tools & Build': Wrench,
  'Deployment': UploadCloud
};

// Resolve specific icon overrides for skills
function getSkillIcon(skillName, originalIconKey) {
  if (skillName.includes('JavaScript')) return JsBadgeIcon;
  if (skillName === 'Maven') return MavenBadgeIcon;
  if (skillName === 'Spring Boot') return SpringLeafIcon;
  if (skillName === 'REST APIs' || skillName === 'JSON' || skillName === 'HTML5' || skillName === 'VS Code') {
    return CodeAngleIcon;
  }
  if (skillName === 'Vercel') return Triangle;
  return iconMap[originalIconKey] || CheckCircle2;
}

// ── Interactive Mouse-Following Glow Skill Chip ──
function GlowSkillChip({ name, iconKey, chipIndex = 0 }) {
  const chipRef = useRef(null);
  const IconComp = getSkillIcon(name, iconKey);

  const handlePointerMove = (e) => {
    const chip = chipRef.current;
    if (!chip) return;
    const rect = chip.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const t = Math.max(0, Math.min(1, x / (rect.width || 1)));

    // Interpolate Lavender #C8A8E9 (200, 168, 233) to Rose #F6BCBA (246, 188, 186)
    const r = Math.round(200 + (246 - 200) * t);
    const g = Math.round(168 + (188 - 168) * t);
    const b = Math.round(233 + (186 - 233) * t);

    chip.style.setProperty('--pointer-x', `${x}px`);
    chip.style.setProperty('--pointer-y', `${y}px`);
    chip.style.setProperty('--button-glow', `rgba(${r}, ${g}, ${b}, 0.35)`);
  };

  return (
    <div
      ref={chipRef}
      className="skill-chip glow-button"
      onPointerMove={handlePointerMove}
      style={{
        animationDelay: `${chipIndex * 50}ms`
      }}
    >
      <div className="gradient" aria-hidden="true" />
      <IconComp size={15} className="skill-chip-icon" />
      <span className="skill-chip-name">{name}</span>
    </div>
  );
}

// ── Interactive Mouse-Following Glow Skill Category Card ──
function GlowCategoryCard({ categoryGroup, index, isRevealed }) {
  const cardRef = useRef(null);
  const CategoryIcon = categoryIconMap[categoryGroup.category] || CodeAngleIcon;

  const handlePointerMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const t = Math.max(0, Math.min(1, x / (rect.width || 1)));

    // Interpolate Lavender #C8A8E9 (200, 168, 233) to Rose #F6BCBA (246, 188, 186)
    const r = Math.round(200 + (246 - 200) * t);
    const g = Math.round(168 + (188 - 168) * t);
    const b = Math.round(233 + (186 - 233) * t);

    card.style.setProperty('--pointer-x', `${x}px`);
    card.style.setProperty('--pointer-y', `${y}px`);
    card.style.setProperty('--button-glow', `rgba(${r}, ${g}, ${b}, 0.22)`);
  };

  // Staggered reveal delay: 110ms between cards (800-1100ms total transition)
  const staggerDelay = `${index * 110}ms`;

  return (
    <div
      ref={cardRef}
      className={`skill-category-card glow-button ${isRevealed ? 'is-revealed' : ''}`}
      style={{
        transitionDelay: isRevealed ? staggerDelay : '0ms'
      }}
      onPointerMove={handlePointerMove}
    >
      {/* Subtle lavender corner decoration from reference design */}
      <div className="card-corner-accent" aria-hidden="true" />

      {/* Soft highlight shine travelling across card surface on hover */}
      <div className="card-shine" aria-hidden="true" />

      {/* Pointer-follow radial glow */}
      <div className="gradient" aria-hidden="true" />
      
      {/* Category Header with Gradient Icon + Title */}
      <div className="category-header">
        <div className="category-header-top">
          <div className="category-icon-box" aria-hidden="true">
            <CategoryIcon size={18} strokeWidth={2.2} />
          </div>
          <h3 className="category-title">{categoryGroup.category}</h3>
        </div>
        <p className="category-desc">{categoryGroup.description}</p>
      </div>

      {/* Technology Badges Grid */}
      <div className="skills-chips-grid">
        {categoryGroup.skills.map((skill, skillIdx) => (
          <GlowSkillChip
            key={skillIdx}
            name={skill.name}
            iconKey={skill.icon}
            chipIndex={skillIdx}
          />
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);

  const [headerVisible, setHeaderVisible] = useState(false);
  const [cardsVisible, setCardsVisible] = useState(false);

  useEffect(() => {
    // Section Header Entrance Observer (triggers once)
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

    // Skill Cards Grid Entrance Observer (triggers once)
    const gridObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCardsVisible(true);
            gridObserver.disconnect();
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    if (gridRef.current) {
      gridObserver.observe(gridRef.current);
    }

    return () => {
      headerObserver.disconnect();
      gridObserver.disconnect();
    };
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="section skills-section">
      {/* Decorative Lavender Wave Pattern (Top-Left Background as seen in reference image) */}
      <div className="skills-bg-decorative-waves" aria-hidden="true">
        <svg viewBox="0 0 1200 400" fill="none" preserveAspectRatio="none" className="skills-wave-svg">
          <path
            d="M-50,0 C200,80 320,-40 600,60 C880,160 1050,40 1250,90 L1250,-100 L-50,-100 Z"
            fill="url(#waveLavenderFill)"
          />
          <defs>
            <linearGradient id="waveLavenderFill" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E6DCEC" stopOpacity="0.55" />
              <stop offset="60%" stopColor="#F1E9F7" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#F7F3FC" stopOpacity="0.05" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Subtle Background Animated Radial Gradients (15-25s slow ambient movement) */}
      <div className="skills-bg-glow-1" aria-hidden="true" />
      <div className="skills-bg-glow-2" aria-hidden="true" />

      <div className="container skills-container">
        {/* Section Header Row: Heading content on left, Developer Illustration on right */}
        <div ref={headerRef} className="skills-header-row">
          <div className="skills-header-content">
            <div className={`skills-tag ${headerVisible ? 'is-revealed' : ''}`}>
              <TargetExpertiseIcon size={15} className="tag-sparkle-icon" />
              <span>My Technical Expertise</span>
            </div>

            <h2 className={`skills-heading ${headerVisible ? 'is-revealed' : ''}`}>
              Technical <span className="shimmer-text">Skills &amp; Tools</span>
            </h2>

            <p className={`skills-description ${headerVisible ? 'is-revealed' : ''}`}>
              Technical skills and tools from my resume, categorized across full-stack development, database management, and cloud deployment.
            </p>
          </div>

          <div className={`skills-illustration-wrapper ${headerVisible ? 'is-revealed' : ''}`}>
            <DeveloperIllustration />
          </div>
        </div>

        {/* 8 Skill Category Cards Grid: 4 columns on desktop, 2 on tablet, 1 on mobile */}
        <div ref={gridRef} className="skills-categories-grid">
          {skillsData.map((categoryGroup, index) => (
            <GlowCategoryCard
              key={index}
              index={index}
              categoryGroup={categoryGroup}
              isRevealed={cardsVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
