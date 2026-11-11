'use client';

import React from 'react';
import {
  Code2,
  ChevronRight,
  Send,
  Calendar,
  ArrowUp,
  Mail
} from 'lucide-react';
import { GithubIcon, LinkedinIcon, XIcon } from './BrandIcons';
import './Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (e, href) => {
    e.preventDefault();
    if (href === '#home') {
      scrollToTop();
      return;
    }
    const el = document.querySelector(href);
    if (el) {
      const navbarOffset = 85;
      const top = el.getBoundingClientRect().top + window.pageYOffset - navbarOffset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer-section">
      {/* ── Background Decorative Lavender Waves (Exact Reference Flow) ── */}
      <div className="footer-waves-wrap" aria-hidden="true">
        {/* Top-left curved soft wave */}
        <svg
          className="footer-wave-top-left"
          viewBox="0 0 450 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M-50,-20 C60,40 160,110 280,85 C370,65 410,20 460,-10 L-50,-20 Z"
            fill="url(#footerTopWaveGrad)"
          />
          <defs>
            <linearGradient id="footerTopWaveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E9D9F7" stopOpacity="0.5" />
              <stop offset="65%" stopColor="#F3EDF9" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#FCFBFF" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>

        {/* Bottom flowing layered waves */}
        <svg
          className="footer-wave-bottom"
          viewBox="0 0 1440 180"
          fill="none"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Layer 1: Back subtle wave */}
          <path
            d="M0,110 C220,60 420,150 680,105 C940,60 1160,135 1440,85 L1440,180 L0,180 Z"
            fill="url(#footerBottomWaveGrad1)"
          />
          {/* Layer 2: Front undulating wave */}
          <path
            d="M0,135 C180,95 380,160 620,120 C880,75 1120,145 1440,115 L1440,180 L0,180 Z"
            fill="url(#footerBottomWaveGrad2)"
          />
          <defs>
            <linearGradient id="footerBottomWaveGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E9D9F7" stopOpacity="0.45" />
              <stop offset="50%" stopColor="#F3EDF9" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#E9D9F7" stopOpacity="0.35" />
            </linearGradient>
            <linearGradient id="footerBottomWaveGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F3EDF9" stopOpacity="0.75" />
              <stop offset="60%" stopColor="#EFE5FA" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#F3EDF9" stopOpacity="0.7" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="container footer-container">
        {/* ── 4-Column Main Layout ── */}
        <div className="footer-main-grid">
          {/* ── Column 1: Developer Branding ── */}
          <div className="footer-col-brand">
            <div className="footer-brand-header">
              <div className="footer-brand-icon-box" aria-hidden="true">
                <Code2 size={22} className="footer-code-icon" />
              </div>
              <div className="footer-brand-identity">
                <h3 className="footer-brand-name">
                  Vishnu Vardhan <span className="brand-name-purple">Reddy</span>
                </h3>
                <p className="footer-brand-role">Full Stack Developer</p>
              </div>
            </div>

            <p className="footer-brand-tagline">
              Building scalable, high-performance web applications with clean code and modern technologies.
            </p>

            {/* 4 Rounded-Square Social Media Icons */}
            <div className="footer-social-row">
              <a
                href="https://github.com/vishnu-reddy-dev"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-btn"
                aria-label="GitHub Profile"
              >
                <GithubIcon size={18} />
              </a>

              <a
                href="https://www.linkedin.com/in/matamalavishnu/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-btn"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon size={18} />
              </a>

              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-btn"
                aria-label="X Profile"
              >
                <XIcon size={16} />
              </a>

              <a
                href="mailto:vishnumatamala10@gmail.com"
                className="footer-social-btn"
                aria-label="Email Me"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* ── Column 2: Quick Links ── */}
          <div className="footer-col-nav">
            <h4 className="footer-column-heading">Quick Links</h4>
            <div className="footer-heading-underline" aria-hidden="true" />
            <ul className="footer-nav-list">
              <li>
                <a
                  href="#home"
                  onClick={(e) => handleNavClick(e, '#home')}
                  className="footer-nav-link"
                >
                  <ChevronRight size={14} className="nav-chevron-icon" />
                  <span>Home</span>
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  onClick={(e) => handleNavClick(e, '#about')}
                  className="footer-nav-link"
                >
                  <ChevronRight size={14} className="nav-chevron-icon" />
                  <span>About</span>
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  onClick={(e) => handleNavClick(e, '#projects')}
                  className="footer-nav-link"
                >
                  <ChevronRight size={14} className="nav-chevron-icon" />
                  <span>Projects</span>
                </a>
              </li>
              <li>
                <a
                  href="#skills"
                  onClick={(e) => handleNavClick(e, '#skills')}
                  className="footer-nav-link"
                >
                  <ChevronRight size={14} className="nav-chevron-icon" />
                  <span>Skills</span>
                </a>
              </li>
            </ul>
          </div>

          {/* ── Column 3: More ── */}
          <div className="footer-col-nav">
            <h4 className="footer-column-heading">More</h4>
            <div className="footer-heading-underline" aria-hidden="true" />
            <ul className="footer-nav-list">
              <li>
                <a
                  href="#experience"
                  onClick={(e) => handleNavClick(e, '#experience')}
                  className="footer-nav-link"
                >
                  <ChevronRight size={14} className="nav-chevron-icon" />
                  <span>Experience</span>
                </a>
              </li>
              <li>
                <a
                  href="#education"
                  onClick={(e) => handleNavClick(e, '#education')}
                  className="footer-nav-link"
                >
                  <ChevronRight size={14} className="nav-chevron-icon" />
                  <span>Education</span>
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, '#contact')}
                  className="footer-nav-link"
                >
                  <ChevronRight size={14} className="nav-chevron-icon" />
                  <span>Contact</span>
                </a>
              </li>
            </ul>
          </div>

          {/* ── Column 4: Premium Glassmorphism Contact Card ── */}
          <div className="footer-col-contact-card">
            <div className="footer-contact-card">
              <div className="contact-card-top-row">
                <div className="contact-card-icon-box" aria-hidden="true">
                  <Send size={18} className="contact-card-send-icon" />
                </div>
                <div className="contact-card-title-group">
                  <span className="contact-card-title-prefix">Let&apos;s Build</span>
                  <span className="contact-card-title-highlight">Something Great!</span>
                </div>
              </div>

              <p className="contact-card-desc">
                Have a project in mind or want to collaborate? I&apos;d love to hear from you.
              </p>

              <div className="contact-card-btn-wrap">
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, '#contact')}
                  className="contact-card-cta-button"
                >
                  <span>Get in Touch</span>
                  <span className="cta-arrow-symbol" aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ── Horizontal Divider Line ── */}
        <div className="footer-bottom-divider" aria-hidden="true" />

        {/* ── Bottom Bar ── */}
        <div className="footer-bottom-bar">
          {/* Left: Dynamic Copyright */}
          <div className="footer-bottom-left">
            <p className="footer-copyright-text">
              &copy; {currentYear} Vishnu Vardhan Reddy. All Rights Reserved.
            </p>
          </div>

          {/* Right: Availability Badge + Book a Call + Back to Top */}
          <div className="footer-bottom-right">
            {/* Availability Badge */}
            <div className="footer-availability-badge">
              <span className="availability-status-dot" aria-hidden="true" />
              <span>Available for New Opportunities</span>
            </div>

            {/* Vertical Separator */}
            <span className="footer-bottom-vertical-sep" aria-hidden="true" />

            {/* Book a Call */}
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="footer-book-call-link"
            >
              <Calendar size={15} className="book-call-icon" />
              <span>Book a Call</span>
            </a>

            {/* Circular Back-to-Top Button */}
            <button
              type="button"
              onClick={scrollToTop}
              className="footer-back-to-top-circle"
              aria-label="Back to top"
              title="Back to top"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
