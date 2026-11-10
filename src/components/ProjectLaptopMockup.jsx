'use client';

import React from 'react';

// Left Decorative Stage Foliage/Plant SVG matching reference design
function StagePlant({ type = 'potted' }) {
  if (type === 'potted') {
    return (
      <svg className="stage-decor-svg stage-decor-plant" viewBox="0 0 64 85" fill="none" aria-hidden="true">
        {/* Pot */}
        <path d="M19 56 L23 79 C23.5 81 25 82 27 82 L39 82 C41 82 42.5 81 43 79 L47 56 Z" fill="#E6DCEC" stroke="#C8A8E9" strokeWidth="1.6" />
        <ellipse cx="33" cy="56" rx="14" ry="4" fill="#D5C2E2" />
        {/* Pot Rim Highlight */}
        <path d="M21 58 Q33 63 45 58" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
        {/* Leaves */}
        <path d="M33 54 C28 36 12 37 9 24 C17 24 28 35 33 50" fill="url(#decorLeafGrad1)" opacity="0.95" />
        <path d="M33 51 C31 32 20 23 18 10 C26 12 34 27 34 47" fill="url(#decorLeafGrad2)" />
        <path d="M34 50 C40 30 50 25 53 12 C55 25 46 38 35 50" fill="url(#decorLeafGrad1)" />
        <path d="M35 53 C44 38 54 40 56 27 C56 38 45 48 35 54" fill="url(#decorLeafGrad2)" opacity="0.95" />
        <defs>
          <linearGradient id="decorLeafGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C8A8E9" />
            <stop offset="100%" stopColor="#88469F" />
          </linearGradient>
          <linearGradient id="decorLeafGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E3AADD" />
            <stop offset="100%" stopColor="#712B88" />
          </linearGradient>
        </defs>
      </svg>
    );
  }
  return (
    <svg className="stage-decor-svg stage-decor-leaves" viewBox="0 0 54 85" fill="none" aria-hidden="true">
      <path d="M38 78 Q29 52 21 26" stroke="#C8A8E9" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M23 62 C13 57 11 47 18 43 C26 43 27 52 23 62 Z" fill="url(#decorLeafGrad1)" />
      <path d="M28 49 C39 45 41 35 34 30 C26 32 26 41 28 49 Z" fill="url(#decorLeafGrad2)" />
      <path d="M19 37 C10 30 8 20 15 16 C23 18 24 27 19 37 Z" fill="url(#decorLeafGrad1)" />
      <path d="M22 25 C28 17 31 9 26 5 C20 7 20 16 22 25 Z" fill="url(#decorLeafGrad2)" />
      <defs>
        <linearGradient id="decorLeafGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C8A8E9" />
          <stop offset="100%" stopColor="#88469F" />
        </linearGradient>
        <linearGradient id="decorLeafGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E3AADD" />
          <stop offset="100%" stopColor="#712B88" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// Right Decorative Books SVG matching Card 03 in reference design
function StageBooks() {
  return (
    <svg className="stage-decor-svg stage-decor-books" viewBox="0 0 58 46" fill="none" aria-hidden="true">
      {/* Bottom Book */}
      <g transform="translate(2, 23)">
        <path d="M4 14 L38 14 L50 8 L16 8 Z" fill="#6A2E80" />
        <path d="M4 14 L4 19 L38 19 L38 14 Z" fill="#88469F" />
        <path d="M38 14 L38 19 L50 13 L50 8 Z" fill="#FAF5FD" />
      </g>
      {/* Middle Book */}
      <g transform="translate(4, 14)">
        <path d="M4 12 L36 12 L47 7 L15 7 Z" fill="#9C4DB3" />
        <path d="M4 12 L4 16 L36 16 L36 12 Z" fill="#B265C8" />
        <path d="M36 12 L36 16 L47 11 L47 7 Z" fill="#FAF5FD" />
      </g>
      {/* Top Book */}
      <g transform="translate(6, 4)">
        <path d="M4 10 L34 10 L44 5 L14 5 Z" fill="#712B88" />
        <path d="M4 10 L4 14 L34 14 L34 10 Z" fill="#88469F" />
        <path d="M34 10 L34 14 L44 9 L44 5 Z" fill="#FAF5FD" />
        {/* Hanging Bookmark ribbon */}
        <path d="M38 10 L40 18 L42 16 L44 18 L42 10 Z" fill="#E3AADD" />
      </g>
    </svg>
  );
}

export default function ProjectLaptopMockup({ image, title, projectId = 1 }) {
  const isPotted = projectId === 1;
  const showBooks = projectId === 3 || projectId === 5;

  return (
    <div className="project-laptop-wrapper" aria-hidden="true">
      {/* Left Stage Foliage Decoration */}
      <div className={`laptop-stage-decor-left decor-type-${isPotted ? 'potted' : 'leaves'}`}>
        <StagePlant type={isPotted ? 'potted' : 'leaves'} />
      </div>

      {/* Ambient Purple Underglow Beneath Laptop Base */}
      <div className="laptop-ambient-glow" />

      {/* 3D Angled Laptop Shell */}
      <div className="laptop-chassis-3d">
        {/* Screen Display Lid */}
        <div className="laptop-lid-frame">
          <div className="laptop-camera-notch" />
          <div className="laptop-screen-viewport">
            <img
              src={image}
              alt={title}
              className="laptop-screen-image"
              loading="lazy"
            />
            {/* Glossy Diagonal Glare Effect */}
            <div className="laptop-screen-sheen" />
          </div>
        </div>

        {/* Laptop Keyboard Base Tray */}
        <div className="laptop-base-tray">
          <div className="laptop-base-top-deck" />
          <div className="laptop-base-front-edge" />
          <div className="laptop-base-thumb-notch" />
        </div>
      </div>

      {/* Right Stage Books Decoration */}
      {showBooks && (
        <div className="laptop-stage-decor-right">
          <StageBooks />
        </div>
      )}
    </div>
  );
}
