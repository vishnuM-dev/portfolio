'use client';

import React, { useState, useEffect } from 'react';
import './TypewriterText.css';

export default function TypewriterText({
  texts = ["Associate Software Engineer | Java Full Stack Developer"],
  speed = 65,
  deleteSpeed = 35,
  pauseDuration = 2200,
  loop = true,
  showCursor = false,
  cursorChar = "",
  className = "",
  as: Component = "span"
}) {
  const textArray = Array.isArray(texts) ? texts : [texts];
  const [displayedText, setDisplayedText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Respect prefers-reduced-motion for accessibility
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    // If reduced motion is preferred, render full text immediately without animated reveal
    if (prefersReducedMotion) {
      setDisplayedText(textArray[textIndex] || "");
      return;
    }

    const currentFullText = textArray[textIndex] || "";
    let timeoutId;

    if (!isDeleting) {
      // Typing phase
      if (displayedText.length < currentFullText.length) {
        timeoutId = setTimeout(() => {
          setDisplayedText(currentFullText.slice(0, displayedText.length + 1));
        }, speed);
      } else if (loop && textArray.length > 1) {
        // Pause at the end of phrase before deleting
        timeoutId = setTimeout(() => {
          setIsDeleting(true);
        }, pauseDuration);
      }
    } else {
      // Deleting phase
      if (displayedText.length > 0) {
        timeoutId = setTimeout(() => {
          setDisplayedText(currentFullText.slice(0, displayedText.length - 1));
        }, deleteSpeed);
      } else {
        // Move to next phrase after deletion
        setIsDeleting(false);
        setTextIndex((prevIndex) => (prevIndex + 1) % textArray.length);
      }
    }

    return () => clearTimeout(timeoutId);
  }, [displayedText, isDeleting, textIndex, textArray, speed, deleteSpeed, pauseDuration, loop, prefersReducedMotion]);

  const fullCurrentText = textArray[textIndex] || "";

  return (
    <Component 
      className={`typewriter-container ${className}`}
      aria-label={fullCurrentText}
    >
      <span className="typewriter-text" aria-hidden="true">
        {displayedText}
      </span>
      {showCursor && cursorChar && (
        <span className="typewriter-cursor" aria-hidden="true">
          {cursorChar}
        </span>
      )}
    </Component>
  );
}
