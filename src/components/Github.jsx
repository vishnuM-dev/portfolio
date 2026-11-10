'use client';

import React, { useState, useEffect } from 'react';
import { BookOpen, ExternalLink } from 'lucide-react';
import { GithubIcon } from './BrandIcons';
import './Github.css';

const fallbackProfile = {
  login: "vishnu-reddy-dev",
  name: "M. Vishnu Vardhan Reddy",
  avatar_url: "https://github.com/vishnu-reddy-dev.png",
  html_url: "https://github.com/vishnu-reddy-dev",
  bio: "Java Full Stack Developer | Spring Boot | React | REST APIs"
};

const featuredRepos = [
  {
    name: "multi-tenant-saas-crm",
    description: "Multi-tenant SaaS CRM with RBAC and tenant-specific configurations built using Java & Spring Boot.",
    language: "Java",
    url: "https://github.com/vishnu-reddy-dev"
  },
  {
    name: "smart-office-management",
    description: "Smart office platform for attendance, leave management, task assignment, and reporting.",
    language: "Java",
    url: "https://github.com/vishnu-reddy-dev"
  },
  {
    name: "library-management-system",
    description: "Library management system with cataloging, member management, issue-return workflows, REST APIs, and MySQL.",
    language: "Java",
    url: "https://github.com/vishnu-reddy-dev"
  },
  {
    name: "typing-master",
    description: "Real-time typing test with WPM, accuracy tracking, leaderboards, and difficulty levels.",
    language: "JavaScript",
    url: "https://github.com/vishnu-reddy-dev"
  }
];

export default function Github() {
  const [profile, setProfile] = useState(fallbackProfile);
  const [repos] = useState(featuredRepos);

  useEffect(() => {
    let isMounted = true;
    
    fetch('https://api.github.com/users/vishnu-reddy-dev')
      .then((res) => {
        if (!res.ok) throw new Error('API limit or user not found');
        return res.json();
      })
      .then((data) => {
        if (isMounted && data) {
          setProfile({
            login: data.login,
            name: data.name || "M. Vishnu Vardhan Reddy",
            avatar_url: data.avatar_url,
            html_url: data.html_url,
            bio: data.bio || fallbackProfile.bio
          });
        }
      })
      .catch(() => {
        // Retain verified fallback data without fake metrics
      });

    return () => { isMounted = false; };
  }, []);

  return (
    <section id="github" className="section github-section">
      <div className="container">
        {/* Section Header */}
        <div className="github-header reveal-on-scroll">
          <div className="section-tag">
            <GithubIcon size={16} />
            <span>06 / Open Source</span>
          </div>
          <h2 className="section-title">GitHub Profile &amp; Repositories.</h2>
          <p className="section-description">
            Explore code repositories, application modules, and software development projects.
          </p>
        </div>

        {/* GitHub Overview Box */}
        <div className="github-overview-card reveal-on-scroll">
          <div className="profile-badge-row">
            <div className="user-info">
              <GithubIcon size={32} className="github-brand-icon" />
              <div>
                <h3 className="profile-handle">@{profile.login}</h3>
                <p className="profile-bio">{profile.bio}</p>
              </div>
            </div>

            <a
              href={profile.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-sm"
            >
              <span>View GitHub Profile</span>
              <ExternalLink size={16} />
            </a>
          </div>
        </div>

        {/* Featured Repositories Grid */}
        <div className="github-repos-grid">
          {repos.map((repo, idx) => (
            <a
              key={idx}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="repo-card reveal-on-scroll"
            >
              <div className="repo-top">
                <h4 className="repo-name">{repo.name}</h4>
                <ExternalLink size={16} className="repo-link-icon" />
              </div>

              <p className="repo-desc">{repo.description}</p>

              <div className="repo-footer">
                <span className="repo-lang">
                  <span className={`lang-dot ${repo.language.toLowerCase()}`} />
                  {repo.language}
                </span>

                <div className="repo-metrics">
                  <span className="metric">
                    <BookOpen size={14} />
                    <span>Repository</span>
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
