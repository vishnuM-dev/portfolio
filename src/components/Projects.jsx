'use client';

import React, { useState } from 'react';
import { projectsData } from '../data/projects';
import ProjectCard from './ProjectCard';
import {
  FolderGit2, LayoutGrid, Monitor, Layers, Coffee, Atom
} from 'lucide-react';
import './Projects.css';

const filterOptions = [
  { key: 'ALL', label: 'All Projects', icon: LayoutGrid },
  { key: 'FULL STACK', label: 'Full Stack', icon: Layers },
  { key: 'JAVA', label: 'Java', icon: Coffee },
  { key: 'REACT', label: 'React.js', icon: Atom },
  { key: 'WEB', label: 'Web', icon: Monitor }
];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('ALL');

  const filteredProjects = activeCategory === 'ALL'
    ? projectsData
    : projectsData.filter((project) => project.categories.includes(activeCategory));

  return (
    <section id="projects" className="section projects-section">
      <div className="container">
        {/* Section Header */}
        <div className="projects-header reveal-on-scroll">
          <div className="section-tag">
            <FolderGit2 size={14} />
            <span>04 / Portfolio</span>
          </div>

          <h2 className="section-title">
            Featured <span className="projects-title-accent">Projects.</span>
          </h2>

          <p className="section-description">
            Production-grade systems, enterprise SaaS solutions, and interactive full stack
            applications showcasing Java, Spring Boot, REST APIs, and React.js.
          </p>

          {/* Filter Pills */}
          <div className="projects-filter-bar">
            {filterOptions.map((filter) => {
              const FilterIcon = filter.icon;
              const isActive = activeCategory === filter.key;
              return (
                <button
                  key={filter.key}
                  type="button"
                  onClick={() => setActiveCategory(filter.key)}
                  className={`project-filter-pill ${isActive ? 'is-active' : ''}`}
                  aria-pressed={isActive}
                >
                  <FilterIcon size={14} />
                  <span>{filter.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2-Column Responsive Grid */}
        <div className="projects-grid reveal-on-scroll">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
