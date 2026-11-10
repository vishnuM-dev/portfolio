import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Experience from '../components/Experience';
import Projects from '../components/Projects';
import Education from '../components/Education';
import Github from '../components/Github';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function Home() {
  // Initialize IntersectionObserver scroll reveal animations
  useScrollReveal();

  useEffect(() => {
    // Check if there is a hash in the URL to scroll to (e.g. #projects)
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      const elem = document.getElementById(id);
      if (elem) {
        setTimeout(() => {
          const navbarOffset = 85;
          const elementPosition = elem.getBoundingClientRect().top + window.pageYOffset;
          window.scrollTo({
            top: elementPosition - navbarOffset,
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  }, []);

  return (
    <div className="portfolio-app">
      <Navbar />
      <main id="main-content">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Github />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
