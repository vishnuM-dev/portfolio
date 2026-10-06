import React, { useRef } from 'react';
import { skillsData } from '../data/skills';
import {
  Code, Palette, FileCode, Atom, Layout,
  Coffee, Cpu, Layers, Network, Database,
  Server, HardDrive, GitBranch, Terminal,
  Box, Send, Wrench, CheckCircle2, ShieldCheck, Key,
  Cloud, RefreshCw, Users
} from 'lucide-react';
import { GithubIcon } from './BrandIcons';
import './Skills.css';

// Map icon names to Lucide Icon components
const iconMap = {
  Code, Palette, FileCode, Atom, Layout,
  Coffee, Cpu, Layers, Network, Database,
  Server, HardDrive, GitBranch, Github: GithubIcon, Terminal,
  Box, Send, CheckCircle2, ShieldCheck, Key,
  Cloud, RefreshCw, Users
};

// Interactive Mouse-Following Glow Skill Chip
function GlowSkillChip({ name, icon: IconComp }) {
  const chipRef = useRef(null);

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
    chip.style.setProperty('--button-glow', `rgba(${r}, ${g}, ${b}, 0.4)`);
  };

  return (
    <div
      ref={chipRef}
      className="skill-chip glow-button"
      onPointerMove={handlePointerMove}
    >
      <div className="gradient" aria-hidden="true" />
      <IconComp size={16} className="skill-chip-icon" />
      <span className="skill-chip-name">{name}</span>
    </div>
  );
}

// Interactive Mouse-Following Glow Skill Category Card
function GlowCategoryCard({ categoryGroup }) {
  const cardRef = useRef(null);

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

  return (
    <div
      ref={cardRef}
      className="skill-category-card glow-button reveal-on-scroll"
      onPointerMove={handlePointerMove}
    >
      <div className="gradient" aria-hidden="true" />
      
      <div className="category-header">
        <h3 className="category-title">{categoryGroup.category}</h3>
        <p className="category-desc">{categoryGroup.description}</p>
      </div>

      <div className="skills-chips-grid">
        {categoryGroup.skills.map((skill, skillIdx) => {
          const IconComp = iconMap[skill.icon] || CheckCircle2;
          return (
            <GlowSkillChip
              key={skillIdx}
              name={skill.name}
              icon={IconComp}
            />
          );
        })}
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="section skills-section">
      <div className="container">
        {/* Section Header */}
        <div className="skills-header reveal-on-scroll">
          <div className="section-tag">
            <Wrench size={16} />
            <span>02 / Technical Skills</span>
          </div>
          <h2 className="section-title">Skills &amp; Tech Stack.</h2>
          <p className="section-description">
            Technical skills and tools from my resume, categorized across full-stack development, database management, and cloud deployment.
          </p>
        </div>

        {/* Skill Category Cards */}
        <div className="skills-categories-grid">
          {skillsData.map((categoryGroup, index) => (
            <GlowCategoryCard
              key={index}
              categoryGroup={categoryGroup}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
