'use client';

import React, { useEffect, useRef } from 'react';
import './SpiderWebBackground.css';

export default function SpiderWebBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let particles = [];
    let isVisible = true;

    // Mouse tracking state
    const mouse = {
      x: null,
      y: null,
      active: false,
      radius: 160
    };

    // Check for reduced motion preference
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Detect touch / fine pointer
    const isFinePointer =
      typeof window !== 'undefined' &&
      window.matchMedia('(pointer: fine)').matches;

    // Calculate particle count and connection parameters based on viewport
    const getConfig = (w, h) => {
      if (w < 768) {
        // Mobile
        return {
          count: Math.min(32, Math.max(20, Math.floor((w * h) / 26000))),
          maxDist: 135,
          mouseRadius: 0,
          maxLineAlpha: 0.35,
          lineWidth: 1.25,
          speedMult: 0.7
        };
      }
      if (w < 1024) {
        // Tablet
        return {
          count: Math.min(50, Math.max(34, Math.floor((w * h) / 20000))),
          maxDist: 150,
          mouseRadius: isFinePointer ? 150 : 0,
          maxLineAlpha: 0.38,
          lineWidth: 1.35,
          speedMult: 0.85
        };
      }
      // Desktop
      return {
        count: Math.min(80, Math.max(52, Math.floor((w * h) / 17500))),
        maxDist: 165,
        mouseRadius: isFinePointer ? 180 : 0,
        maxLineAlpha: 0.42,
        lineWidth: 1.42,
        speedMult: 1.0
      };
    };

    // Initialize or resize particles
    const initParticles = (targetCount, speedMult) => {
      const newParticles = [];
      for (let i = 0; i < targetCount; i++) {
        const speed = (0.12 + Math.random() * 0.16) * speedMult * (prefersReducedMotion ? 0.2 : 1);
        const angle = Math.random() * Math.PI * 2;
        newParticles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius: 2.0 + Math.random() * 0.5, // 2.0px - 2.5px (clearly visible nodes)
          baseAlpha: 0.60 + Math.random() * 0.25, // 0.60 - 0.85
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: 0.015 + Math.random() * 0.02
        });
      }
      particles = newParticles;
    };

    // Resize canvas with DPI scaling
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      const config = getConfig(width, height);
      mouse.radius = config.mouseRadius;

      // Adjust particle count or re-initialize
      if (particles.length === 0 || Math.abs(particles.length - config.count) > 15) {
        initParticles(config.count, config.speedMult);
      } else {
        // Clamp existing particles to new viewport bounds
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          if (p.x > width) p.x = Math.random() * width;
          if (p.y > height) p.y = Math.random() * height;
        }
      }
    };

    // Pointer move listener
    const onPointerMove = (e) => {
      // Disregard touch events for hover web filaments to prevent mobile scrolling interference
      if (e.pointerType === 'touch') return;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };

    // Pointer leave listener
    const onPointerLeave = () => {
      mouse.active = false;
      mouse.x = null;
      mouse.y = null;
    };

    // Visibility change handler (pauses loop when tab is hidden)
    const onVisibilityChange = () => {
      if (document.hidden) {
        isVisible = false;
        cancelAnimationFrame(animationFrameId);
      } else {
        isVisible = true;
        cancelAnimationFrame(animationFrameId);
        animationFrameId = requestAnimationFrame(render);
      }
    };

    // Initial setup
    handleResize();

    // Render loop
    const render = () => {
      if (!isVisible) return;

      const config = getConfig(width, height);
      const { maxDist, maxLineAlpha, lineWidth } = config;

      ctx.clearRect(0, 0, width, height);

      const pCount = particles.length;

      // ── 1. Update and Draw Particles ──
      for (let i = 0; i < pCount; i++) {
        const p = particles[i];

        // Move particle
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around boundaries smoothly with small margin
        if (p.x < -10) p.x = width + 10;
        else if (p.x > width + 10) p.x = -10;

        if (p.y < -10) p.y = height + 10;
        else if (p.y > height + 10) p.y = -10;

        // Gentle cursor interaction
        if (mouse.active && mouse.x !== null && mouse.radius > 0) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.hypot(dx, dy);

          if (dist < mouse.radius && dist > 1) {
            const forceRatio = 1 - dist / mouse.radius;

            // Organic, gentle spring deflection
            p.x += (dx / dist) * forceRatio * 0.55;
            p.y += (dy / dist) * forceRatio * 0.55;

            // Spider web filament connecting to cursor
            const mouseLineAlpha = forceRatio * 0.55;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(152, 112, 194, ${mouseLineAlpha.toFixed(3)})`;
            ctx.lineWidth = lineWidth + 0.25;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }

        // Pulse alpha
        p.pulse += p.pulseSpeed;
        const currentAlpha = Math.max(0.40, Math.min(0.95, p.baseAlpha + Math.sin(p.pulse) * 0.12));

        // Draw soft glowing particle
        ctx.beginPath();
        ctx.fillStyle = `rgba(152, 112, 194, ${currentAlpha.toFixed(3)})`;
        ctx.shadowBlur = 5;
        ctx.shadowColor = 'rgba(152, 112, 194, 0.45)';
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Reset shadow for line drawing performance
      ctx.shadowBlur = 0;

      // ── 2. Draw Spider Web Connecting Lines ──
      for (let i = 0; i < pCount - 1; i++) {
        const p1 = particles[i];

        for (let j = i + 1; j < pCount; j++) {
          const p2 = particles[j];

          const dx = p1.x - p2.x;
          // Quick bounding box rejection
          if (Math.abs(dx) > maxDist) continue;

          const dy = p1.y - p2.y;
          if (Math.abs(dy) > maxDist) continue;

          const dist = Math.hypot(dx, dy);

          if (dist < maxDist) {
            const alphaRatio = 1 - dist / maxDist;
            let lineAlpha = alphaRatio * maxLineAlpha;

            // When mouse is near either particle, brighten the connection smoothly up to 0.55
            if (mouse.active && mouse.x !== null && mouse.radius > 0) {
              const d1 = Math.hypot(p1.x - mouse.x, p1.y - mouse.y);
              const d2 = Math.hypot(p2.x - mouse.x, p2.y - mouse.y);
              const minD = Math.min(d1, d2);
              if (minD < mouse.radius) {
                const boost = (1 - minD / mouse.radius) * 0.16;
                lineAlpha = Math.min(0.55, lineAlpha + boost);
              }
            }

            ctx.beginPath();
            ctx.strokeStyle = `rgba(152, 112, 194, ${lineAlpha.toFixed(3)})`;
            ctx.lineWidth = lineWidth;
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    // Start loop
    animationFrameId = requestAnimationFrame(render);

    // Event listeners
    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerleave', onPointerLeave, { passive: true });
    document.addEventListener('visibilitychange', onVisibilityChange);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerleave', onPointerLeave);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, []);

  return (
    <div className="spider-web-bg-container" aria-hidden="true">
      <div className="spider-web-ambient-glow" />
      <canvas ref={canvasRef} className="spider-web-canvas" />
    </div>
  );
}

