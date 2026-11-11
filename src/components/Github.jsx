'use client';

import React, { useState, useEffect } from 'react';
import { BookOpen, ExternalLink, GitBranch, Star } from 'lucide-react';
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
    description: "Real-time typing test with WPM, accuracy tracking, leaderboards, and dynamic DOM feedback.",
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
            <GithubIcon size={14} />
            <span>06 / Open Source</span>
          </div>

          <h2 className="section-title">
            GitHub &amp; <span className="github-title-accent">Repositories.</span>
          </h2>

          <p className="section-description">
            Explore code repositories, architectural implementations, and software development modules.
          </p>
        </div>

        {/* GitHub Overview Box */}
        <div className="github-overview-card reveal-on-scroll">
          <div className="github-profile-row">
            <div className="github-user-group">
              <div className="github-icon-circle">
                <GithubIcon size={26} />
              </div>
              <div>
                <h3 className="profile-handle">@{profile.login}</h3>
                <p className="profile-bio">{profile.bio}</p>
              </div>
            </div>

            <a
              href={profile.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary github-profile-btn"
              aria-label="View Vishnu's GitHub Profile"
            >
              <span>View Profile</span>
              <ExternalLink size={15} />
            </a>
          </div>
        </div>

        {/* Repositories Grid */}
        <div className="repos-grid reveal-on-scroll">
          {repos.map((repo, idx) => (
            <a
              key={idx}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="repo-card"
              aria-label={`Repository ${repo.name}`}
            >
              <div className="repo-header">
                <BookOpen size={16} className="repo-icon" />
                <h4 className="repo-name">{repo.name}</h4>
                <ExternalLink size={14} className="repo-external-icon" />
              </div>

              <p className="repo-desc">{repo.description}</p>

              <div className="repo-footer">
                <span className="repo-lang-pill">
                  <span className="lang-dot" />
                  <span>{repo.language}</span>
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
