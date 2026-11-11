'use client';

import React from 'react';
import { educationData } from '../data/education';
import { GraduationCap, Calendar, Award, Building2 } from 'lucide-react';
import './Education.css';

export default function Education() {
  return (
    <section id="education" className="section education-section">
      <div className="container">
        {/* Section Header */}
        <div className="education-header reveal-on-scroll">
          <div className="section-tag">
            <GraduationCap size={15} />
            <span>05 / Education</span>
          </div>

          <h2 className="section-title">
            Academic <span className="edu-title-accent">Background.</span>
          </h2>

          <p className="section-description">
            Educational foundation in engineering, analytical problem solving, and computational principles.
          </p>
        </div>

        {/* ── Premium Academic Timeline ── */}
        <div className="education-timeline-wrap reveal-on-scroll">
          <div className="education-track-line" aria-hidden="true" />

          <div className="education-items-list">
            {educationData.map((item, idx) => (
              <div key={item.id} className="education-timeline-item">
                {/* Academic Dot Marker */}
                <div className="education-marker-node" aria-hidden="true">
                  <div className="marker-cap-box">
                    <GraduationCap size={14} />
                  </div>
                </div>

                {/* Academic White Card */}
                <div className="education-card">
                  <div className="edu-card-top">
                    <div className="edu-duration-pill">
                      <Calendar size={13} />
                      <span>{item.duration}</span>
                    </div>

                    {item.grade && (
                      <div className="edu-grade-pill">
                        <Award size={13} />
                        <span>{item.grade}</span>
                      </div>
                    )}
                  </div>

                  <h3 className="edu-degree">{item.degree}</h3>

                  <div className="edu-institution-row">
                    <Building2 size={15} className="edu-inst-icon" />
                    <span className="edu-institution">{item.institution}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
