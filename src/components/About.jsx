'use client';

import React from 'react';
import { UserCheck, Server, ShieldCheck, Atom, Database, Sparkles, CheckCircle2 } from 'lucide-react';
import { getExperienceDuration } from '../utils/experience';
import './About.css';

export default function About() {
  const duration = getExperienceDuration("2025-04-03");

  const infoCards = [
    {
      icon: Server,
      title: "Backend & RESTful Services",
      desc: "Architecting high-throughput RESTful APIs, Spring Boot microservices, and Hibernate/JPA persistent layers with clean object-oriented design."
    },
    {
      icon: ShieldCheck,
      title: "Security & Multi-Tenancy",
      desc: "Implementing Spring Security, JWT authentication, role-based access control (RBAC), and tenant data isolation for scalable SaaS platforms."
    },
    {
      icon: Atom,
      title: "Frontend & React.js UI",
      desc: "Developing responsive, component-driven interfaces using React.js, modern JavaScript (ES6+), hooks, and fluid state management."
    },
    {
      icon: Database,
      title: "Databases & Performance",
      desc: "Designing normalized schemas, complex relational queries, and performance tuning across MySQL and PostgreSQL environments."
    }
  ];

  return (
    <section id="about" className="section about-section">
      <div className="container">
        <div className="about-editorial-grid">
          {/* ── Left Column: Editorial Summary & Background ── */}
          <div className="about-editorial-left reveal-on-scroll">
            <div className="section-tag">
              <UserCheck size={15} />
              <span>01 / About Me</span>
            </div>

            <h2 className="about-headline">
              Architecting Scalable <br />
              <span className="about-headline-accent">Enterprise Systems.</span>
            </h2>

            <div className="about-text-blocks">
              <p className="about-lead">
                Java Full Stack Developer with <strong>{duration.full}</strong> of professional
                experience designing, building, and deploying enterprise-grade web applications.
              </p>

              <p className="about-body">
                Specialized in Core Java, Spring Boot, Spring MVC, Spring Data JPA, and Hibernate,
                engineering high-throughput REST APIs and multi-tenant SaaS architectures.
                Experienced with relational database design and query optimization across MySQL and
                PostgreSQL, coupled with modern React.js frontend development.
              </p>

              <p className="about-body">
                Dedicated to clean object-oriented architecture, strict security protocols
                (Spring Security, JWT), testable components, and reliable production releases in
                collaborative Agile environments.
              </p>
            </div>

            {/* Highlights Pills */}
            <div className="about-highlights-row">
              <div className="about-highlight-pill">
                <CheckCircle2 size={15} className="highlight-check-icon" />
                <span>{duration.short} Professional Experience</span>
              </div>
              <div className="about-highlight-pill">
                <CheckCircle2 size={15} className="highlight-check-icon" />
                <span>Enterprise SaaS Architecture</span>
              </div>
              <div className="about-highlight-pill">
                <CheckCircle2 size={15} className="highlight-check-icon" />
                <span>Agile &amp; Production Delivery</span>
              </div>
            </div>
          </div>

          {/* ── Right Column: Information Cards ── */}
          <div className="about-editorial-right reveal-on-scroll">
            <div className="about-cards-grid">
              {infoCards.map((card, idx) => {
                const IconComp = card.icon;
                return (
                  <div key={idx} className="about-info-card">
                    <div className="about-card-icon-box">
                      <IconComp size={22} />
                    </div>
                    <h3 className="about-card-title">{card.title}</h3>
                    <p className="about-card-desc">{card.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
