'use client';

import React from 'react';
import { ArrowUp, ArrowUpRight, FileText } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './BrandIcons';
import './Footer.css';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      {/* ── Ambient Background Decorations ── */}
      <div className="footer-bg-glow footer-bg-glow-left" aria-hidden="true" />
      <div className="footer-bg-glow footer-bg-glow-right" aria-hidden="true" />

      {/* Decorative Dot Grid on Far Right */}
      <div className="footer-decor-dot-grid" aria-hidden="true">
        <svg width="74" height="42" viewBox="0 0 74 42" fill="none">
          {[0, 1, 2].map((row) =>
            [0, 1, 2, 3, 4, 5].map((col) => (
              <circle
                key={`${row}-${col}`}
                cx={col * 13 + 4}
                cy={row * 15 + 6}
                r="1.8"
                fill="#C8A8E9"
                opacity="0.65"
              />
            ))
          )}
        </svg>
      </div>

      <div className="container footer-container">
        {/* ── Main Two-Column Layout ── */}
        <div className="footer-main-grid">

          {/* 1. Left Column — Personal Branding */}
          <div className="footer-col footer-col-brand">
            <h2 className="footer-brand-title">
              <a
                href="#home"
                onClick={(e) => { e.preventDefault(); scrollToTop(); }}
                className="footer-brand-link"
              >
                <span className="brand-first">Vishnu</span>{' '}
                <span className="brand-last">Reddy</span>
              </a>
            </h2>

            <p className="footer-bio">
              Java Full Stack Developer building scalable web applications with
              Java, Spring Boot, React &amp; REST APIs.
            </p>

            <div className="footer-badge-wrapper">
              <div className="footer-status-badge">
                <span className="footer-status-dot" />
                <span>Available for Opportunities</span>
              </div>
              {/* Small decorative purple sphere dot */}
              <span className="footer-decor-sphere" aria-hidden="true" />
            </div>
          </div>

          {/* 2. Right Column — Let's Connect */}
          <div className="footer-col footer-col-connect">
            <h3 className="footer-col-heading">LET&apos;S CONNECT</h3>
            <div className="footer-connect-cards-list">
              {/* Card 1: GitHub */}
              <a
                href="https://github.com/vishnu-reddy-dev"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-connect-card"
                aria-label="GitHub Profile"
              >
                <div className="connect-card-left">
                  <div className="connect-icon-box github-icon-box">
                    <GithubIcon size={18} />
                  </div>
                  <span className="connect-card-label">GitHub</span>
                </div>
                <ArrowUpRight size={16} className="connect-arrow-icon" />
              </a>

              {/* Card 2: LinkedIn */}
              <a
                href="https://www.linkedin.com/in/matamalavishnu/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-connect-card"
                aria-label="LinkedIn Profile"
              >
                <div className="connect-card-left">
                  <div className="connect-icon-box linkedin-icon-box">
                    <LinkedinIcon size={18} />
                  </div>
                  <span className="connect-card-label">LinkedIn</span>
                </div>
                <ArrowUpRight size={16} className="connect-arrow-icon" />
              </a>

              {/* Card 3: Resume */}
              <a
                href="/resume.pdf"
                download="Vishnu_Vardhan_Reddy_Resume.pdf"
                className="footer-connect-card"
                aria-label="Download Resume"
              >
                <div className="connect-card-left">
                  <div className="connect-icon-box resume-icon-box">
                    <FileText size={18} />
                  </div>
                  <span className="connect-card-label">Resume</span>
                </div>
                <ArrowUpRight size={16} className="connect-arrow-icon" />
              </a>
            </div>
          </div>

        </div>

        {/* ── Bottom Bar: Divider, Copyright & Back to Top ── */}
        <div className="footer-bottom-bar">
          <p className="footer-copyright-text">
            &copy; 2026 M. Vishnu Vardhan Reddy. All rights reserved.
          </p>

          <button
            onClick={scrollToTop}
            className="footer-back-to-top-btn"
            aria-label="Scroll to top of page"
            title="Back to top"
          >
            <ArrowUp size={18} className="back-to-top-arrow" />
          </button>
        </div>

      </div>
    </footer>
  );
}
