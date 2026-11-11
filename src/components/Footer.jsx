'use client';

import React from 'react';
import { ArrowUp, ArrowUpRight, FileText } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './BrandIcons';
import './Footer.css';

const footerNavLinks = [
  { name: 'Home',       href: '#home' },
  { name: 'About',      href: '#about' },
  { name: 'Skills',     href: '#skills' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects',   href: '#projects' },
  { name: 'Education',  href: '#education' },
  { name: 'Contact',    href: '#contact' },
];

export default function Footer() {
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
      const top = el.getBoundingClientRect().top + window.pageYOffset - 85;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer-section">
      <div className="container footer-container">
        {/* ── Main Footer Grid ── */}
        <div className="footer-content-grid">
          {/* Brand & Summary */}
          <div className="footer-brand-col">
            <h3 className="footer-brand-title">
              <a
                href="#home"
                onClick={(e) => handleNavClick(e, '#home')}
                className="footer-brand-anchor"
              >
                <span className="brand-charcoal">Vishnu</span>{' '}
                <span className="brand-lavender">Reddy</span>
              </a>
            </h3>

            <p className="footer-brand-desc">
              Associate Software Engineer &amp; Java Full Stack Developer building secure,
              scalable enterprise applications with Java, Spring Boot, and React.js.
            </p>

            <div className="footer-status-pill">
              <span className="status-dot-green" />
              <span>Available for Opportunities</span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="footer-nav-col">
            <h4 className="footer-col-title">Navigation</h4>
            <ul className="footer-links-list">
              {footerNavLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="footer-link-item"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect / Socials */}
          <div className="footer-social-col">
            <h4 className="footer-col-title">Connect</h4>
            <div className="footer-social-links-wrap">
              <a
                href="https://github.com/vishnu-reddy-dev"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-card"
                aria-label="GitHub Profile"
              >
                <div className="social-card-left">
                  <div className="social-icon-wrapper">
                    <GithubIcon size={16} />
                  </div>
                  <span className="social-name">GitHub</span>
                </div>
                <ArrowUpRight size={14} className="social-arrow" />
              </a>

              <a
                href="https://www.linkedin.com/in/matamalavishnu/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-card"
                aria-label="LinkedIn Profile"
              >
                <div className="social-card-left">
                  <div className="social-icon-wrapper">
                    <LinkedinIcon size={16} />
                  </div>
                  <span className="social-name">LinkedIn</span>
                </div>
                <ArrowUpRight size={14} className="social-arrow" />
              </a>

              <a
                href="/resume.pdf"
                download="M_Vishnu_Vardhan_Reddy_Resume.pdf"
                className="footer-social-card"
                aria-label="Download Resume"
              >
                <div className="social-card-left">
                  <div className="social-icon-wrapper">
                    <FileText size={16} />
                  </div>
                  <span className="social-name">Resume</span>
                </div>
                <ArrowUpRight size={14} className="social-arrow" />
              </a>
            </div>
          </div>
        </div>

        {/* ── Bottom Bar: Copyright & Back To Top ── */}
        <div className="footer-bottom-bar">
          <p className="footer-copyright">
            &copy; 2026 M. Vishnu Vardhan Reddy. All rights reserved.
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            className="footer-back-to-top"
            aria-label="Scroll to top of page"
            title="Back to top"
          >
            <span>Back to top</span>
            <ArrowUp size={15} />
          </button>
        </div>
      </div>
    </footer>
  );
}
