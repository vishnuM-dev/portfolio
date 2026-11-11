'use client';

import React from 'react';
import { skillsData } from '../data/skills';
import {
  Code, Palette, FileCode, Atom,
  Coffee, Cpu, Layers, Network, Database,
  Server, HardDrive, GitBranch, Terminal,
  Box, Send, Wrench, CheckCircle2, ShieldCheck, Key,
  Cloud, Sparkles, Monitor, UploadCloud, Info
} from 'lucide-react';
import { GithubIcon } from './BrandIcons';
import './Skills.css';

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
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

// Category icons map
const categoryIcons = {
  'Languages': CodeAngleIcon,
  'Frameworks': Layers,
  'Backend': Server,
  'Frontend': Monitor,
  'Security': ShieldCheck,
  'Databases': Database,
  'Tools & Build': Wrench,
  'Deployment': UploadCloud
};

// Concise single-line subtitles (max one line)
const categorySubtitles = {
  'Languages': 'Core programming languages',
  'Frameworks': 'Enterprise Java frameworks',
  'Backend': 'RESTful architecture & APIs',
  'Frontend': 'Modern UI & responsive web',
  'Security': 'Authentication & access control',
  'Databases': 'Relational schema & persistence',
  'Tools & Build': 'Development tools & build automation',
  'Deployment': 'Cloud platforms & app servers'
};

// Map skills to icons
function getSkillIcon(skillName, originalIconKey) {
  if (skillName.includes('JavaScript')) return JsBadgeIcon;
  if (skillName === 'Maven') return MavenBadgeIcon;
  if (skillName === 'Spring Boot') return SpringLeafIcon;
  if (skillName.startsWith('Core Java')) return Coffee;
  if (skillName === 'REST APIs' || skillName === 'JSON' || skillName === 'HTML5') return CodeAngleIcon;
  if (skillName === 'GitHub') return GithubIcon;
  if (skillName === 'Git') return GitBranch;
  if (skillName === 'React.js') return Atom;
  if (skillName === 'MySQL' || skillName === 'PostgreSQL' || skillName === 'Oracle SQL' || skillName === 'JDBC') return Database;
  if (skillName === 'Spring Security') return ShieldCheck;
  if (skillName === 'JWT Authentication') return Key;
  if (skillName.includes('Tomcat')) return Server;
  if (skillName === 'Railway' || skillName === 'Render' || skillName === 'Vercel' || skillName === 'Netlify') return Cloud;
  if (skillName === 'VS Code' || skillName === 'Eclipse' || skillName === 'Spring Tool Suite (STS)') return Terminal;
  if (skillName === 'Postman' || skillName === 'Bruno') return Send;

  const fallbackMap = {
    Coffee, Cpu, Layers, Network, Database, Server, HardDrive: Database,
    GitBranch, Terminal, Box, Send, CheckCircle2, ShieldCheck, Key, Cloud, Atom, Palette, FileCode
  };
  return fallbackMap[originalIconKey] || CheckCircle2;
}

// Normalize skill for compact display while preserving full info via tooltip
function normalizeSkill(skill) {
  const name = skill.name;
  if (name.startsWith('Core Java')) {
    return {
      displayName: 'Core Java',
      tooltip: 'OOPs · Collections · Exception Handling · Multithreading',
      fullName: name,
      hasDetails: true
    };
  }
  return {
    displayName: name,
    tooltip: null,
    fullName: name,
    hasDetails: false
  };
}

export default function Skills() {
  return (
    <section id="skills" className="section skills-section">
      <div className="container">
        {/* Section Header */}
        <div className="skills-header reveal-on-scroll">
          <div className="section-tag">
            <Sparkles size={14} />
            <span>02 / Skills &amp; Tech</span>
          </div>

          <h2 className="section-title">
            Technical <span className="skills-title-accent">Skills &amp; Ecosystem.</span>
          </h2>

          <p className="section-description">
            Enterprise technologies, Java frameworks, databases, modern frontend, and deployment
            tooling mastered through production application development.
          </p>
        </div>

        {/* ── Compact 3-Column Natural-Height Grid ── */}
        <div className="skills-grid reveal-on-scroll">
          {skillsData.map((categoryGroup, index) => {
            const CatIcon = categoryIcons[categoryGroup.category] || CodeAngleIcon;
            const subtitle = categorySubtitles[categoryGroup.category] || categoryGroup.description;

            return (
              <div key={index} className="skills-compact-card">
                {/* Clean Category Header */}
                <div className="card-header-row">
                  <div className="card-icon-square" aria-hidden="true">
                    <CatIcon size={17} />
                  </div>
                  <div className="card-title-wrap">
                    <h3 className="card-title-text">{categoryGroup.category}</h3>
                    {subtitle && (
                      <span className="card-subtitle-text">{subtitle}</span>
                    )}
                  </div>
                </div>

                {/* Compact Interactive Skill Chips (Horizontal Wrap) */}
                <div className="card-chips-wrap">
                  {categoryGroup.skills.map((skill, sIdx) => {
                    const SkillIcon = getSkillIcon(skill.name, skill.icon);
                    const { displayName, tooltip, fullName, hasDetails } = normalizeSkill(skill);

                    return (
                      <div
                        key={sIdx}
                        className={`skill-chip ${hasDetails ? 'has-tooltip' : ''}`}
                        title={tooltip ? `${displayName}: ${tooltip}` : fullName}
                        tabIndex={0}
                        role="button"
                        aria-label={tooltip ? `${displayName} - ${tooltip}` : fullName}
                      >
                        <SkillIcon size={13} className="chip-tech-icon" />
                        <span className="chip-name">{displayName}</span>
                        {hasDetails && (
                          <span className="chip-info-indicator" aria-hidden="true">
                            <Info size={11} />
                          </span>
                        )}

                        {/* Rich Hover / Focus Tooltip */}
                        {tooltip && (
                          <div className="chip-floating-tooltip" role="tooltip">
                            <span className="tooltip-title">{displayName} Topics:</span>
                            <span className="tooltip-desc">{tooltip}</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
