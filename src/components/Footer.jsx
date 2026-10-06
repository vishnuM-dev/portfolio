import React from 'react';
import { ArrowUp, FileDown } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './BrandIcons';
import './Footer.css';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="container footer-container">

        {/* ── Main Grid ── */}
        <div className="footer-grid">

          {/* Column 1 — Brand */}
          <div className="footer-col footer-col-brand">
            <a
              href="#home"
              onClick={(e) => { e.preventDefault(); scrollToTop(); }}
              className="footer-brand"
            >
              Vishnu Reddy
            </a>
            <p className="footer-bio">
              Java Full Stack Developer building scalable web applications with
              Java, Spring Boot, React &amp; REST APIs.
            </p>
            {/* Availability badge — same style as hero badge */}
            <div className="footer-status-badge">
              <span className="pulse-indicator" />
              <span>Available for Opportunities</span>
            </div>
          </div>

          {/* Column 2 — Connect */}
          <div className="footer-col">
            <h3 className="footer-col-heading">Connect</h3>
            <div className="footer-connect-links">
              <a
                href="https://github.com/vishnu-reddy-dev"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-connect-item"
                aria-label="GitHub Profile"
              >
                <GithubIcon size={18} />
                <span>GitHub</span>
              </a>

              <a
                href="https://www.linkedin.com/in/matamalavishnu/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-connect-item"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon size={18} />
                <span>LinkedIn</span>
              </a>

              <a
                href="/resume.pdf"
                download="M_Vishnu_Vardhan_Reddy_Resume.pdf"
                className="footer-connect-item"
                aria-label="Download Resume"
              >
                <FileDown size={18} />
                <span>Resume</span>
              </a>
            </div>
          </div>

        </div>

        {/* ── Bottom Bar ── */}
        <div className="footer-bottom">
          <p className="copyright-text">
            &copy; 2026 M. Vishnu Vardhan Reddy. All rights reserved.
          </p>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="btn-icon scroll-top-btn"
            aria-label="Scroll to top of page"
            title="Back to top"
          >
            <ArrowUp size={18} />
          </button>
        </div>

      </div>
    </footer>
  );
}
