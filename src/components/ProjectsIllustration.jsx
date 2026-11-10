'use client';

import React, { useRef, useState, useEffect } from 'react';

export default function ProjectsIllustration() {
  const containerRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth > 900 && !window.matchMedia('(hover: none)').matches);
    };
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  const handleMouseMove = (e) => {
    if (!isDesktop || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      x: -(y * 8),
      y: x * 10
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      ref={containerRef}
      className="projects-illustration-container"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-hidden="true"
    >
      {/* Ambient Purple Lighting Glow Behind Scene */}
      <div className="projects-ambient-aura" />

      {/* 3D Tilt Wrapper */}
      <div
        className="projects-tilt-wrapper"
        style={{
          transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
        }}
      >
        <svg
          viewBox="0 0 460 320"
          className="projects-illustration-svg"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Screen Inner Display Gradient */}
            <linearGradient id="projScreenDisplayGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1E0D33" />
              <stop offset="50%" stopColor="#351458" />
              <stop offset="100%" stopColor="#1B0930" />
            </linearGradient>

            {/* Screen Outer Bezel Gradient */}
            <linearGradient id="projScreenFrameGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2E1B48" />
              <stop offset="100%" stopColor="#180A28" />
            </linearGradient>

            {/* Laptop Base Surface Gradient */}
            <linearGradient id="projBaseDeckGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="40%" stopColor="#F5EDFB" />
              <stop offset="100%" stopColor="#E5D6F2" />
            </linearGradient>

            {/* Floating Code Panel Gradient */}
            <linearGradient id="projCodePanelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4A2072" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#2D114B" stopOpacity="0.95" />
            </linearGradient>

            {/* Plant Pot Gradient */}
            <linearGradient id="potGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E6DCEC" />
              <stop offset="100%" stopColor="#C8A8E9" />
            </linearGradient>

            {/* Plant Leaf Gradient */}
            <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#B27BC3" />
              <stop offset="100%" stopColor="#712B88" />
            </linearGradient>

            {/* Coffee Mug Gradient */}
            <linearGradient id="mugGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#E6D6F4" />
            </linearGradient>

            {/* Book 1 (Purple) */}
            <linearGradient id="bookPurpleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#B27BC3" />
              <stop offset="100%" stopColor="#88469F" />
            </linearGradient>

            {/* Book 2 (White/Lavender) */}
            <linearGradient id="bookWhiteGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#F0E3F8" />
            </linearGradient>

            {/* Soft Shadow Filter */}
            <filter id="projSoftShadow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#4B1E6D" floodOpacity="0.22" />
            </filter>

            {/* Neon Glow Filter */}
            <filter id="projNeonGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="3.5" floodColor="#C8A8E9" floodOpacity="0.8" />
            </filter>
          </defs>

          {/* ── Floor Base Drop Shadows ── */}
          <ellipse cx="230" cy="272" rx="140" ry="24" fill="rgba(80, 35, 110, 0.14)" filter="url(#projSoftShadow)" />
          <ellipse cx="85" cy="268" rx="35" ry="12" fill="rgba(80, 35, 110, 0.12)" filter="url(#projSoftShadow)" />
          <ellipse cx="360" cy="268" rx="45" ry="14" fill="rgba(80, 35, 110, 0.12)" filter="url(#projSoftShadow)" />

          {/* ── Plant in Pot (Left of Laptop) ── */}
          <g className="proj-float-plant">
            {/* Plant Pot */}
            <polygon points="70,225 100,225 94,260 76,260" fill="url(#potGrad)" stroke="#BFA5DA" strokeWidth="1" />
            <ellipse cx="85" cy="225" rx="15" ry="4" fill="#9C77C4" />
            
            {/* Plant Leaves */}
            {/* Center Leaf */}
            <path d="M 85 225 C 80 195 85 170 85 160 C 90 175 95 195 85 225 Z" fill="url(#leafGrad)" />
            {/* Left Leaf */}
            <path d="M 83 223 C 65 205 55 185 52 170 C 68 178 80 200 83 223 Z" fill="url(#leafGrad)" opacity="0.9" />
            {/* Right Leaf */}
            <path d="M 87 223 C 105 205 115 185 118 170 C 102 178 90 200 87 223 Z" fill="url(#leafGrad)" opacity="0.9" />
            {/* Upper Leaves */}
            <path d="M 84 210 C 70 190 68 165 72 152 C 82 165 86 188 84 210 Z" fill="url(#leafGrad)" opacity="0.85" />
            <path d="M 86 210 C 100 190 102 165 98 152 C 88 165 84 188 86 210 Z" fill="url(#leafGrad)" opacity="0.85" />
          </g>

          {/* ── Coffee Mug (Between Plant and Laptop) ── */}
          <g className="proj-float-mug">
            {/* Mug Body */}
            <rect x="118" y="235" width="22" height="24" rx="4" fill="url(#mugGrad)" stroke="#D4C1E8" strokeWidth="0.8" />
            <ellipse cx="129" cy="235" rx="11" ry="3.5" fill="#EADBF6" />
            {/* Coffee liquid */}
            <ellipse cx="129" cy="235.5" rx="9" ry="2.8" fill="#58296D" />
            {/* Mug Handle */}
            <path d="M 140 240 C 146 240 146 252 140 252" stroke="#D4C1E8" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            {/* Steam Wisp */}
            <path d="M 127 228 C 125 223 130 219 127 215" stroke="#C8A8E9" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.75" />
          </g>

          {/* ── Floating Code Window / Terminal Panel (Behind Laptop) ── */}
          <g className="proj-float-code-panel" filter="url(#projSoftShadow)">
            <g transform="translate(290, 70) rotate(-4)">
              {/* Window Card Frame */}
              <rect x="0" y="0" width="115" height="78" rx="10" fill="url(#projCodePanelGrad)" stroke="rgba(200, 168, 233, 0.45)" strokeWidth="1.2" />
              {/* Header Dots */}
              <circle cx="14" cy="14" r="3" fill="#F6BCBA" />
              <circle cx="23" cy="14" r="3" fill="#E3AADD" />
              <circle cx="32" cy="14" r="3" fill="#C8A8E9" />
              <line x1="10" y1="24" x2="105" y2="24" stroke="rgba(200, 168, 233, 0.25)" strokeWidth="0.8" />
              {/* Glowing Code Lines */}
              <rect x="14" y="32" width="60" height="4.5" rx="2" fill="#E3AADD" opacity="0.9" />
              <rect x="14" y="42" width="78" height="4.5" rx="2" fill="#C8A8E9" opacity="0.85" />
              <rect x="14" y="52" width="45" height="4.5" rx="2" fill="#F6BCBA" opacity="0.8" />
              <rect x="14" y="62" width="68" height="4.5" rx="2" fill="#C3C7F4" opacity="0.75" />
            </g>
          </g>

          {/* ── The 3D Laptop (Continuous Slow Gentle Float) ── */}
          <g className="proj-float-laptop">
            {/* Laptop Base Front Edge / Thickness */}
            <polygon points="155,225 310,252 310,261 155,234" fill="#BCA6D6" />
            <polygon points="155,225 215,168 215,174 155,234" fill="#A992C6" />
            <polygon points="310,252 370,188 370,195 310,261" fill="#9D85BC" />

            {/* Laptop Base Surface (Top Face) */}
            <polygon points="155,225 310,252 370,188 215,168" fill="url(#projBaseDeckGrad)" stroke="#DBC9EF" strokeWidth="0.8" />

            {/* Keyboard Recessed Well */}
            <polygon points="178,213 294,233 346,186 230,172" fill="#D2BEE6" />

            {/* Keyboard Chiclet Keys */}
            <polygon points="184,207 288,225 291,222 187,204" fill="#FFFFFF" opacity="0.85" />
            <polygon points="191,199 299,217 303,214 195,196" fill="#FFFFFF" opacity="0.8" />
            <polygon points="202,190 312,208 316,205 206,187" fill="#FFFFFF" opacity="0.75" />
            <polygon points="214,181 326,199 330,196 218,178" fill="#FFFFFF" opacity="0.7" />

            {/* Trackpad */}
            <polygon points="204,233 252,241 258,235 210,227" fill="#FAF5FD" stroke="#BEA8DB" strokeWidth="0.8" />

            {/* Laptop Screen Casing Back (Thickness) */}
            <polygon points="212,56 384,74 384,80 212,62" fill="#180B28" />
            <polygon points="384,74 370,188 366,190 384,80" fill="#120620" />

            {/* Laptop Screen Outer Bezel */}
            <polygon points="212,58 382,76 368,189 198,170" fill="url(#projScreenFrameGrad)" stroke="#442168" strokeWidth="1.2" />

            {/* Laptop Screen Display Area */}
            <polygon points="222,69 373,85 360,179 209,163" fill="url(#projScreenDisplayGrad)" />

            {/* Glowing < / > Code Symbol on Screen */}
            <g filter="url(#projNeonGlow)">
              <path d="M 270 115 L 255 125 L 270 135" stroke="#FFFFFF" strokeWidth="4.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <line x1="298" y1="109" x2="284" y2="141" stroke="#FFFFFF" strokeWidth="4.2" strokeLinecap="round" />
              <path d="M 312 115 L 327 125 L 312 135" stroke="#FFFFFF" strokeWidth="4.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </g>
          </g>

          {/* ── Stack of Two Books (Right of Laptop) ── */}
          <g className="proj-float-books">
            {/* Book 1 (Bottom Purple Book) */}
            <g transform="translate(325, 230)">
              <polygon points="10,24 68,34 76,26 18,16" fill="url(#bookPurpleGrad)" stroke="#7B3A9B" strokeWidth="0.8" />
              <polygon points="10,24 68,34 68,41 10,31" fill="#783492" />
              <polygon points="68,34 76,26 76,33 68,41" fill="#F1E9F7" />
              <line x1="12" y1="26" x2="66" y2="36" stroke="#C8A8E9" strokeWidth="1" opacity="0.6" />
            </g>

            {/* Book 2 (Top White Book) */}
            <g transform="translate(330, 218)">
              <polygon points="10,24 65,34 72,26 17,16" fill="url(#bookWhiteGrad)" stroke="#D5C2E8" strokeWidth="0.8" />
              <polygon points="10,24 65,34 65,39 10,29" fill="#E4D3F3" />
              <polygon points="65,34 72,26 72,31 65,39" fill="#F7F3FC" />
              <line x1="14" y1="26" x2="63" y2="36" stroke="#88469F" strokeWidth="1.2" />
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}

