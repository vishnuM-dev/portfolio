'use client';

import React, { useRef, useState, useEffect } from 'react';

export default function DeveloperIllustration() {
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
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    // Gentle 3D tilt: max ~6-8 degrees
    setTilt({
      x: -(y * 9),
      y: x * 11
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      ref={containerRef}
      className="developer-illustration-container"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-hidden="true"
    >
      {/* Subtle Purple Ambient Glow Behind Laptop */}
      <div className="illustration-ambient-aura" />

      {/* 3D Tilt Wrapper */}
      <div
        className="illustration-tilt-wrapper"
        style={{
          transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
        }}
      >
        <svg
          viewBox="0 0 460 320"
          className="illustration-svg"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Screen Inner Display Gradient */}
            <linearGradient id="screenDisplayGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1E0D33" />
              <stop offset="50%" stopColor="#351458" />
              <stop offset="100%" stopColor="#1B0930" />
            </linearGradient>

            {/* Screen Outer Bezel Gradient */}
            <linearGradient id="screenFrameGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2E1B48" />
              <stop offset="100%" stopColor="#180A28" />
            </linearGradient>

            {/* Laptop Base Surface Gradient */}
            <linearGradient id="baseDeckGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="40%" stopColor="#F5EDFB" />
              <stop offset="100%" stopColor="#E5D6F2" />
            </linearGradient>

            {/* Keyboard Recessed Deck */}
            <linearGradient id="kbDeckGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D9C7EB" />
              <stop offset="100%" stopColor="#C6AFDE" />
            </linearGradient>

            {/* 3D Purple Floating Card Gradient */}
            <linearGradient id="purpleCardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#B27BC3" />
              <stop offset="100%" stopColor="#88469F" />
            </linearGradient>

            {/* Code Window Card Gradient */}
            <linearGradient id="codeWindowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#341A52" />
              <stop offset="100%" stopColor="#230E39" />
            </linearGradient>

            {/* Drop Shadow for Floating 3D Elements */}
            <filter id="softShadow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#4B1E6D" floodOpacity="0.25" />
            </filter>

            {/* Neon Glow on Screen Code */}
            <filter id="codeSymbolGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="3.5" floodColor="#C8A8E9" floodOpacity="0.75" />
            </filter>
          </defs>

          {/* ── Floor Base Drop Shadow ── */}
          <ellipse
            cx="245"
            cy="270"
            rx="135"
            ry="28"
            fill="rgba(90, 45, 120, 0.16)"
            filter="url(#softShadow)"
          />

          {/* ── Floating Laptop Group (Continuous Slow Gentle Float) ── */}
          <g className="laptop-float-group">
            {/* Laptop Base Bevels (Thickness / 3D Edge) */}
            {/* Front Lip */}
            <polygon
              points="120,225 285,255 285,264 120,234"
              fill="#BCA6D6"
            />
            {/* Left Edge Thickness */}
            <polygon
              points="120,225 186,164 186,170 120,234"
              fill="#A992C6"
            />
            {/* Right Edge Thickness */}
            <polygon
              points="285,255 352,185 352,192 285,264"
              fill="#9D85BC"
            />

            {/* Laptop Base Surface (Top Face) */}
            <polygon
              points="120,225 285,255 352,185 186,164"
              fill="url(#baseDeckGrad)"
              stroke="#DBC9EF"
              strokeWidth="0.8"
            />

            {/* Keyboard Recessed Well */}
            <polygon
              points="145,212 268,234 326,183 203,168"
              fill="url(#kbDeckGrad)"
            />

            {/* Keyboard Key Strips (Isometric Key Rows) */}
            <g opacity="0.9">
              {/* Row 1 */}
              <polygon points="152,206 262,226 265,223 155,203" fill="#FFFFFF" opacity="0.8" />
              {/* Row 2 */}
              <polygon points="160,198 276,218 280,215 164,195" fill="#FFFFFF" opacity="0.75" />
              {/* Row 3 */}
              <polygon points="172,189 292,209 296,206 176,186" fill="#FFFFFF" opacity="0.7" />
              {/* Row 4 */}
              <polygon points="186,179 308,199 312,196 190,176" fill="#FFFFFF" opacity="0.65" />
              {/* Function Row */}
              <polygon points="198,171 320,190 323,188 201,169" fill="#FFFFFF" opacity="0.55" />
            </g>

            {/* Trackpad */}
            <polygon
              points="174,233 226,242 233,235 181,226"
              fill="#FAF5FD"
              stroke="#BEA8DB"
              strokeWidth="0.8"
            />

            {/* Laptop Screen Casing Back (Thickness) */}
            <polygon
              points="184,48 368,68 368,74 184,54"
              fill="#180B28"
            />
            <polygon
              points="368,68 352,185 348,187 368,74"
              fill="#120620"
            />

            {/* Laptop Screen Outer Bezel */}
            <polygon
              points="184,50 366,70 350,186 168,166"
              fill="url(#screenFrameGrad)"
              stroke="#442168"
              strokeWidth="1.2"
            />

            {/* Laptop Screen Display Area */}
            <polygon
              points="194,62 356,80 342,176 180,158"
              fill="url(#screenDisplayGrad)"
            />

            {/* Subtle Screen Bevel Gloss Line */}
            <line
              x1="195"
              y1="63"
              x2="355"
              y2="81"
              stroke="#6B3A9B"
              strokeWidth="1"
              opacity="0.6"
            />

            {/* Glowing < / > Code Symbol on Laptop Screen */}
            <g filter="url(#codeSymbolGlow)">
              {/* Left bracket < */}
              <path
                d="M 244 109 L 228 119 L 244 129"
                stroke="#FFFFFF"
                strokeWidth="4.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
              {/* Slash / */}
              <line
                x1="274"
                y1="102"
                x2="258"
                y2="136"
                stroke="#FFFFFF"
                strokeWidth="4.5"
                strokeLinecap="round"
              />
              {/* Right bracket > */}
              <path
                d="M 288 109 L 304 119 L 288 129"
                stroke="#FFFFFF"
                strokeWidth="4.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </g>
          </g>

          {/* ── Floating 3D Icon 1: Settings Gear (Left) ── */}
          <g className="float-icon-gear" filter="url(#softShadow)">
            <g transform="translate(70, 75)">
              {/* Gear Body Circle */}
              <circle cx="20" cy="20" r="16" fill="url(#purpleCardGrad)" />
              {/* Gear Teeth */}
              <rect x="17" y="1" width="6" height="5" rx="1.5" fill="#B27BC3" />
              <rect x="17" y="34" width="6" height="5" rx="1.5" fill="#88469F" />
              <rect x="1" y="17" width="5" height="6" rx="1.5" fill="#B27BC3" />
              <rect x="34" y="17" width="5" height="6" rx="1.5" fill="#88469F" />
              {/* Diagonal Teeth */}
              <rect x="7" y="7" width="5" height="5" rx="1.5" transform="rotate(45 9.5 9.5)" fill="#B27BC3" />
              <rect x="29" y="7" width="5" height="5" rx="1.5" transform="rotate(45 31.5 9.5)" fill="#88469F" />
              <rect x="7" y="29" width="5" height="5" rx="1.5" transform="rotate(45 9.5 31.5)" fill="#88469F" />
              <rect x="29" y="29" width="5" height="5" rx="1.5" transform="rotate(45 31.5 31.5)" fill="#713786" />
              {/* Center Axle Hole */}
              <circle cx="20" cy="20" r="6" fill="#F7F3FC" />
            </g>
          </g>

          {/* ── Floating 3D Icon 2: Code Badge </> (Center Above Screen) ── */}
          <g className="float-icon-code" filter="url(#softShadow)">
            <g transform="translate(205, 18)">
              {/* 3D Rounded Card */}
              <rect
                x="0"
                y="0"
                width="46"
                height="46"
                rx="12"
                fill="url(#purpleCardGrad)"
                stroke="#C8A8E9"
                strokeWidth="1.2"
              />
              {/* Inner Brackets */}
              <path
                d="M 17 17 L 11 23 L 17 29"
                stroke="#FFFFFF"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
              <line
                x1="26"
                y1="14"
                x2="20"
                y2="32"
                stroke="#FFFFFF"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M 29 17 L 35 23 L 29 29"
                stroke="#FFFFFF"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </g>
          </g>

          {/* ── Floating 3D Icon 3: Cloud Upload Badge (Top-Right) ── */}
          <g className="float-icon-cloud" filter="url(#softShadow)">
            <g transform="translate(375, 55)">
              {/* 3D Rounded Card */}
              <rect
                x="0"
                y="0"
                width="46"
                height="46"
                rx="12"
                fill="url(#purpleCardGrad)"
                stroke="#C8A8E9"
                strokeWidth="1.2"
              />
              {/* Cloud Path */}
              <path
                d="M 15 28 C 12.8 28 11 26.2 11 24 C 11 22 12.5 20.3 14.5 20.1 C 15.3 16.6 18.4 14 22 14 C 26.2 14 29.7 17.2 30 21.3 C 32.2 21.8 34 23.7 34 26 C 34 28.8 31.8 31 29 31 L 16 31"
                stroke="#FFFFFF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
              {/* Upload Arrow inside cloud */}
              <path
                d="M 22.5 27 L 22.5 20 M 19.5 22.5 L 22.5 19.5 L 25.5 22.5"
                stroke="#FFFFFF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </g>

          {/* ── Floating 3D Icon 4: Code Window Card (Bottom-Right) ── */}
          <g className="float-icon-window" filter="url(#softShadow)">
            <g transform="translate(345, 195) rotate(-3)">
              {/* Terminal Window Card Frame */}
              <rect
                x="0"
                y="0"
                width="88"
                height="62"
                rx="10"
                fill="url(#codeWindowGrad)"
                stroke="rgba(200, 168, 233, 0.4)"
                strokeWidth="1.2"
              />
              {/* Window Header Dots */}
              <circle cx="12" cy="12" r="2.8" fill="#F6BCBA" />
              <circle cx="20" cy="12" r="2.8" fill="#E3AADD" />
              <circle cx="28" cy="12" r="2.8" fill="#C8A8E9" />
              <line x1="8" y1="21" x2="80" y2="21" stroke="rgba(200, 168, 233, 0.2)" strokeWidth="0.8" />
              
              {/* Glowing Code Lines */}
              <rect x="12" y="28" width="48" height="4.5" rx="2" fill="#E3AADD" opacity="0.85" />
              <rect x="12" y="37" width="60" height="4.5" rx="2" fill="#C8A8E9" opacity="0.8" />
              <rect x="12" y="46" width="36" height="4.5" rx="2" fill="#F6BCBA" opacity="0.75" />
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}

