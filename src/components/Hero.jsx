import React, { useMemo } from 'react';
import { ArrowDown, FileText, Send, Mail, Code, Terminal, Sparkles } from 'lucide-react';
import { GithubIcon, LinkedinIcon, NaukriIcon } from './BrandIcons';
import BorderBeam from './BorderBeam';
import RainbowButton from './RainbowButton';
import DownloadResumeButton from './DownloadResumeButton';
import TextAnimate from './TextAnimate';
import './Hero.css';

export default function Hero() {
  const rolePhrases = [
    "Associate Software Engineer | Java Full Stack Developer",
    "Spring Boot & REST API Specialist",
    "React.js Full Stack Engineer",
    "Building Enterprise SaaS Applications"
  ];

  // Pick one role randomly on page load — stays fixed for the entire session
  const selectedRole = useMemo(
    () => rolePhrases[Math.floor(Math.random() * rolePhrases.length)],
    [] // eslint-disable-line react-hooks/exhaustive-deps
  );

  return (
    <section id="home" className="hero-section bg-grid-pattern">
      {/* Background Ambient Glow */}
      <div className="hero-glow" />

      <div className="container hero-container">
        <div className="hero-content">
          {/* Status Badge */}
          <div className="hero-badge reveal-on-scroll">
            <span className="pulse-indicator" />
            <Sparkles size={14} className="sparkle-icon" />
            <span>Available for Opportunities</span>
          </div>

          {/* Main Title */}
          <h1 className="hero-title reveal-on-scroll">
            {/* Headline: each word slides up on its own line, staggered */}
            <span className="hero-headline">
              <TextAnimate delay={0} stagger={0.12}>
                BUILDING SCALABLE SOLUTIONS.
              </TextAnimate>
            </span>
            {/* Role: starts after headline words finish */}
            <span className="hero-role" key={selectedRole}>
              <TextAnimate delay={0.5} stagger={0.07}>
                {selectedRole}
              </TextAnimate>
            </span>
          </h1>

          {/* Intro Description */}
          <p className="hero-intro reveal-on-scroll">
            Java Full Stack Developer with 1 Year 5 Months of experience building secure, scalable enterprise web applications using Java, Spring Boot, REST APIs, MySQL, PostgreSQL, and React.js.
          </p>

          {/* Action CTAs */}
          <div className="hero-actions reveal-on-scroll">
            <RainbowButton href="#projects">
              <span>View Projects</span>
              <ArrowDown size={18} />
            </RainbowButton>

            <RainbowButton href="#contact">
              <Send size={18} />
              <span>Contact Me</span>
            </RainbowButton>

            <DownloadResumeButton />
          </div>

          {/* Social Links */}
          <div className="hero-socials reveal-on-scroll">
            <span className="socials-label">Connect:</span>
            <div className="socials-group">
              <a
                href="https://github.com/vishnu-reddy-dev"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-icon"
                aria-label="GitHub Profile"
              >
                <GithubIcon size={20} />
              </a>

              <a
                href="https://www.linkedin.com/in/matamalavishnu/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-icon"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon size={20} />
              </a>

              <a
                href="https://www.naukri.com/mnjuser/profile"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-icon"
                aria-label="Naukri Profile"
              >
                <NaukriIcon size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Developer Portrait Visual Card */}
        <div className="hero-visual reveal-on-scroll">
          <div className="hero-portrait-card">
            <div className="portrait-image-wrapper">
              <img
                src="/images/hero-vishnu.png"
                alt="M. Vishnu Vardhan Reddy - Java Full Stack Developer"
                className="hero-portrait-img"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/images/hero-vishnu.jpg';
                }}
              />
              <div className="portrait-gradient-overlay" />
              
              {/* Dual Offset Border Beam Animation */}
              <BorderBeam
                duration={6}
                borderWidth={2.5}
                colorFrom="#C8A8E9"
                colorTo="#E3AADD"
                delay={0}
              />
              <BorderBeam
                duration={6}
                borderWidth={2.5}
                colorFrom="#F6BCBA"
                colorTo="#C3C7F4"
                delay={3}
              />
            </div>

            {/* Floating Tech Accent Badges */}
            <div className="floating-badge badge-top">
              <Terminal size={14} className="badge-icon" />
              <span>Spring Boot &amp; Java</span>
            </div>

            <div className="floating-badge badge-bottom">
              <Code size={14} className="badge-icon" />
              <span>React.js &amp; Frontend</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
