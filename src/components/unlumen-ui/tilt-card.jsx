'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import './tilt-card.css';

/**
 * ClippedCircle - Radial Shine Reveal Overlay
 */
export function ClippedCircle() {
  return <div className="tilt-card-shine" aria-hidden="true" />;
}

/**
 * Tilt - 3D Spring Tilt Primitive Wrapper
 */
export function Tilt({ children, rotationFactor = 11, className = "", ...props }) {
  const cardRef = useRef(null);
  const [transformStyle, setTransformStyle] = useState({});

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    const rotateX = (y - 0.5) * -rotationFactor;
    const rotateY = (x - 0.5) * rotationFactor;

    // Update CSS custom properties for radial shine cursor tracking
    cardRef.current.style.setProperty('--shine-x', `${x * 100}%`);
    cardRef.current.style.setProperty('--shine-y', `${y * 100}%`);

    setTransformStyle({
      transform: `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`
    });
  };

  const handleMouseLeave = () => {
    setTransformStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
    });
  };

  return (
    <div className={`tilt-card-container ${className}`} {...props}>
      <div
        ref={cardRef}
        className="tilt-card-wrapper"
        style={transformStyle}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </div>
    </div>
  );
}

/**
 * TiltCard Component
 */
export function TiltCard({
  title,
  description,
  price,
  badgeLabel,
  badgeVariant = "success",
  imageSrc,
  imageAlt = "",
  href,
  tiltProps = {},
  children,
  className = ""
}) {
  const rotationFactor = tiltProps.rotationFactor ?? 11;

  const cardContent = (
    <div className={`tilt-card-inner ${className}`}>
      <ClippedCircle />

      {/* Floating Preview Image */}
      {imageSrc && (
        <div className="tilt-floating-image-wrapper">
          <img
            src={imageSrc}
            alt={imageAlt || title}
            className="tilt-floating-image"
            loading="lazy"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop';
            }}
          />
        </div>
      )}

      <div className="tilt-card-content">
        {/* Top Header & Split Badge Pill */}
        <div className="tilt-card-header">
          {(price || badgeLabel) && (
            <div className="tilt-split-badge">
              {price && <span className="tilt-badge-left">{price}</span>}
              {badgeLabel && (
                <span className={`tilt-badge-right variant-${badgeVariant}`}>
                  {badgeLabel}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Main Body Info */}
        <div className="tilt-card-body">
          <h3 className="tilt-card-title">{title}</h3>
          {description && <p className="tilt-card-description">{description}</p>}
        </div>

        {/* Custom Children (Feature lists, CTAs, Tech stack badges) */}
        {children && <div className="tilt-card-children">{children}</div>}
      </div>
    </div>
  );

  const wrappedCard = href ? (
    href.startsWith('/') && !href.startsWith('//') ? (
      <Link href={href} className="tilt-card-wrapper" aria-label={title}>
        {cardContent}
      </Link>
    ) : (
      <a href={href} className="tilt-card-wrapper" aria-label={title}>
        {cardContent}
      </a>
    )
  ) : (
    cardContent
  );

  return (
    <Tilt rotationFactor={rotationFactor} {...tiltProps}>
      {wrappedCard}
    </Tilt>
  );
}

export default TiltCard;
