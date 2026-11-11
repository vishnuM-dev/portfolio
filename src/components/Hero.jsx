'use client';

import React from 'react';
import { ArrowDown, ArrowUpRight, FileText, Sparkles } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './BrandIcons';
import DownloadResumeButton from './DownloadResumeButton';
import './Hero.css';

export default function Hero() {
  return (
    <section id="home" className="hero-section">
      {/* Decorative Soft Lavender Shapes */}
      <div className="hero-ambient-shape hero-ambient-shape-1" aria-hidden="true" />
      <div className="hero-ambient-shape hero-ambient-shape-2" aria-hidden="true" />

      <div className="container hero-container">
        {/* ── Left Column: Developer Headline & Intro ── */}
        <div className="hero-left-col">
          {/* Small Java Full Stack Developer Badge */}
          <div className="hero-badge reveal-on-scroll">
            <span className="hero-badge-dot" />
            <Sparkles size={13} className="hero-badge-sparkle" />
            <span>Java Full Stack Developer</span>
          </div>

          {/* Large Bold Developer Name */}
          <h1 className="hero-heading reveal-on-scroll">
            <span className="hero-name-charcoal">M. Vishnu Vardhan</span>{' '}
            <span className="hero-name-lavender-wrap">
              <span className="hero-name-lavender">Reddy</span>
              <svg
                className="hero-underline-svg"
                viewBox="0 0 170 14"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M3 10.5C45 3.5 125 3.5 167 10.5"
                  stroke="#9870C2"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          {/* Professional Introduction */}
          <p className="hero-intro-text reveal-on-scroll">
            Associate Software Engineer specializing in building secure, scalable enterprise web
            applications using Java, Spring Boot, REST APIs, MySQL, PostgreSQL, and React.js.
            Focused on robust backend architecture, clean code, and production reliability.
          </p>

          {/* Availability Indicator */}
          <div className="hero-availability reveal-on-scroll">
            <span className="availability-pulse-container" aria-hidden="true">
              <span className="availability-pulse-ring" />
              <span className="availability-pulse-dot" />
            </span>
            <span className="availability-text">Available for Opportunities</span>
          </div>

          {/* CTAs: View Projects & Download Resume */}
          <div className="hero-cta-row reveal-on-scroll">
            <a href="#projects" className="btn btn-primary hero-btn-projects">
              <span>View Projects</span>
              <ArrowDown size={17} className="btn-arrow-down" />
            </a>

            <DownloadResumeButton className="hero-btn-resume" />
          </div>
        </div>

        {/* ── Right Column: Professional Connection Card ── */}
        <div className="hero-right-col reveal-on-scroll">
          <div className="hero-connection-card">
            {/* Card Header */}
            <div className="card-profile-header">
              <div className="card-avatar-wrapper">
                <img
                  src="/images/hero-vishnu.png"
                  alt="M. Vishnu Vardhan Reddy"
                  className="card-avatar-img"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/images/profile-vishnu.png';
                  }}
                />
                <span className="card-avatar-online" title="Online / Active" />
              </div>

              <div className="card-profile-info">
                <h2 className="card-profile-name">M. Vishnu Vardhan Reddy</h2>
                <p className="card-profile-role">Associate Software Engineer</p>
                <span className="card-profile-location">Andhra Pradesh, India</span>
              </div>
            </div>

            {/* Connection Rows */}
            <div className="card-connections-group">
              {/* GitHub Row */}
              <a
                href="https://github.com/vishnu-reddy-dev"
                target="_blank"
                rel="noopener noreferrer"
                className="connection-row"
                aria-label="GitHub Profile"
              >
                <div className="connection-row-left">
                  <div className="connection-icon-box github-icon-box">
                    <GithubIcon size={17} />
                  </div>
                  <div className="connection-row-details">
                    <span className="connection-label">GitHub</span>
                    <span className="connection-value">vishnu-reddy-dev</span>
                  </div>
                </div>
                <ArrowUpRight size={16} className="connection-arrow" />
              </a>

              {/* LinkedIn Row */}
              <a
                href="https://www.linkedin.com/in/matamalavishnu/"
                target="_blank"
                rel="noopener noreferrer"
                className="connection-row"
                aria-label="LinkedIn Profile"
              >
                <div className="connection-row-left">
                  <div className="connection-icon-box linkedin-icon-box">
                    <LinkedinIcon size={17} />
                  </div>
                  <div className="connection-row-details">
                    <span className="connection-label">LinkedIn</span>
                    <span className="connection-value">matamalavishnu</span>
                  </div>
                </div>
                <ArrowUpRight size={16} className="connection-arrow" />
              </a>

              {/* Resume Row */}
              <a
                href="/resume.pdf"
                download="M_Vishnu_Vardhan_Reddy_Resume.pdf"
                className="connection-row"
                aria-label="Download Resume PDF"
              >
                <div className="connection-row-left">
                  <div className="connection-icon-box resume-icon-box">
                    <FileText size={17} />
                  </div>
                  <div className="connection-row-details">
                    <span className="connection-label">Resume</span>
                    <span className="connection-value">PDF Download</span>
                  </div>
                </div>
                <ArrowUpRight size={16} className="connection-arrow" />
              </a>
            </div>

            {/* Bottom Key Tech Pills */}
            <div className="card-footer-stack">
              <span className="stack-label">Core Focus:</span>
              <div className="stack-pills-list">
                <span className="stack-pill">Java</span>
                <span className="stack-pill">Spring Boot</span>
                <span className="stack-pill">REST APIs</span>
                <span className="stack-pill">MySQL</span>
                <span className="stack-pill">React.js</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
