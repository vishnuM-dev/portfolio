'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function NotFound() {
  return (
    <div className="portfolio-app" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <main
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '8rem 1.5rem',
        }}
      >
        <div className="container" style={{ maxWidth: '600px' }}>
          <span
            style={{
              fontSize: '4.5rem',
              fontWeight: '800',
              background: 'var(--accent-gradient)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'block',
              lineHeight: 1,
              marginBottom: '1rem',
            }}
          >
            404
          </span>
          <h1 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
            Page Not Found
          </h1>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '1.05rem' }}>
            The page you are looking for doesn't exist, has been removed, or is temporarily unavailable.
          </p>
          <Link
            href="/"
            className="btn btn-primary"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.75rem',
              borderRadius: '9999px',
              textDecoration: 'none',
              fontWeight: '600',
            }}
          >
            <ArrowLeft size={18} />
            <span>Return to Portfolio</span>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
