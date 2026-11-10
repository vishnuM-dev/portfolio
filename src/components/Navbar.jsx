'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import './Navbar.css';

const navLinks = [
  { name: 'Home',       href: '#home' },
  { name: 'About',      href: '#about' },
  { name: 'Skills',     href: '#skills' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects',   href: '#projects' },
  { name: 'Education',  href: '#education' },
];

export default function Navbar() {
  const [isScrolled,      setIsScrolled]      = useState(false);
  const [mobileMenuOpen,  setMobileMenuOpen]  = useState(false);
  const [activeSection,   setActiveSection]   = useState('home');
  const router   = useRouter();
  const pathname = usePathname();

  /* ── Scroll detection for shadow & blur elevation ── */
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* ── Active section highlight observer ── */
  useEffect(() => {
    if (pathname !== '/') {
      setActiveSection('');
      return;
    }
    const sections = [
      ...navLinks.map(link => document.querySelector(link.href)),
      document.querySelector('#contact')
    ].filter(Boolean);

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            setActiveSection(e.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -55% 0px', threshold: 0 }
    );
    sections.forEach(s => observer.observe(s));
    return () => sections.forEach(s => observer.unobserve(s));
  }, [pathname]);

  /* ── Close mobile menu on resize to desktop ── */
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1040 && mobileMenuOpen) {
        setMobileMenuOpen(false);
        document.body.style.overflow = '';
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileMenuOpen]);

  /* ── Lock background scroll while mobile menu is open ── */
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  /* ── Close mobile menu on ESC ── */
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
        document.body.style.overflow = '';
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const toggleMobileMenu = () => setMobileMenuOpen(prev => !prev);

  const handleNavClick = (href) => {
    setMobileMenuOpen(false);
    document.body.style.overflow = '';
    if (pathname !== '/') {
      router.push('/' + href);
      return;
    }
    const el = document.querySelector(href);
    if (el) {
      const targetTop = href === '#home' ? 0 : el.getBoundingClientRect().top + window.pageYOffset - 85;
      window.scrollTo({
        top: targetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header className={`navbar-wrapper ${isScrolled ? 'is-scrolled' : ''}`}>
      {/* ── Main Floating Glassmorphism Pill ── */}
      <div className="navbar-floating-pill">
        {/* Brand Logo */}
        <Link
          href="/#home"
          className="navbar-brand"
          onClick={(e) => { e.preventDefault(); handleNavClick('#home'); }}
          aria-label="Vishnu Reddy - Home"
        >
          <span className="brand-name">Vishnu Reddy</span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          <ul className="nav-list">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className={`nav-link ${isActive ? 'active' : ''}`}
                    onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                  >
                    <span>{link.name}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Right Actions: Contact Me button & Mobile Toggle */}
        <div className="navbar-actions">
          <a
            href="#contact"
            className={`nav-contact-pill desktop-only ${activeSection === 'contact' ? 'active' : ''}`}
            onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }}
          >
            <span>Contact Me</span>
            <ArrowUpRight size={15} className="contact-arrow-icon" />
          </a>

          <button
            type="button"
            className="mobile-toggle"
            onClick={toggleMobileMenu}
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* ── Mobile Glassmorphism Dropdown Menu ── */}
      <div
        className={`mobile-glass-dropdown ${mobileMenuOpen ? 'is-open' : ''}`}
        aria-hidden={!mobileMenuOpen}
      >
        <ul className="mobile-dropdown-list">
          {navLinks.map((link, idx) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <li key={link.name}>
                <a
                  href={link.href}
                  className={`mobile-dropdown-link ${isActive ? 'active' : ''}`}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                >
                  <span className="mobile-link-num">0{idx + 1}.</span>
                  <span className="mobile-link-text">{link.name}</span>
                </a>
              </li>
            );
          })}
        </ul>

        <div className="mobile-dropdown-footer">
          <a
            href="#contact"
            className="mobile-contact-pill-btn"
            onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }}
          >
            <span>Contact Me</span>
            <ArrowUpRight size={16} />
          </a>
        </div>
      </div>

      {/* Mobile Backdrop Click Shield */}
      {mobileMenuOpen && (
        <div
          className="mobile-backdrop"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </header>
  );
}
