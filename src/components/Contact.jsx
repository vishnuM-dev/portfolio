'use client';

import React, { useState } from 'react';
import { Mail, Phone, Send, MessageSquare, CheckCircle, AlertCircle, ArrowRight, Loader2 } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './BrandIcons';
import './Contact.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message cannot be empty.';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === 'submitting') return;
    if (!validateForm()) return;

    setStatus('submitting');

    const accessKey =
      process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ||
      process.env.VITE_WEB3FORMS_ACCESS_KEY ||
      'fddb70b8-f73f-46d6-8da9-db2c070000ba';

    try {
      const web3FormData = new FormData();
      web3FormData.append('access_key', accessKey);
      web3FormData.append('name', formData.name.trim());
      web3FormData.append('email', formData.email.trim());
      web3FormData.append('subject', formData.subject.trim() || `New Portfolio Message from ${formData.name.trim()}`);
      web3FormData.append('message', formData.message.trim());
      web3FormData.append('from_name', formData.name.trim());

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: web3FormData
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setStatus('idle'), 6000);
      } else {
        console.error('Web3Forms submit error:', data);
        setStatus('error');
      }
    } catch (err) {
      console.error('Submission error:', err);
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="section contact-section">
      {/* Subtle Ambient Radial Lighting */}
      <div className="contact-bg-glow contact-bg-glow-left" aria-hidden="true" />
      <div className="contact-bg-glow contact-bg-glow-right" aria-hidden="true" />

      <div className="container contact-container">
        <div className="contact-editorial-grid">

          {/* 1. Left Editorial Intro Area (~45% on desktop, 1st on mobile) */}
          <div className="contact-intro-block reveal-on-scroll">
            <div className="contact-tag">
              <MessageSquare size={13} className="contact-tag-icon" />
              <span>07 / CONTACT</span>
            </div>

            <h2 className="contact-heading">
              Let&apos;s build something{' '}
              <span className="contact-heading-accent">meaningful.</span>
            </h2>
          </div>

          {/* 2. Right Column — Floating Contact Form Card (~55% on desktop, 2nd on mobile) */}
          <div className="contact-form-block reveal-on-scroll">
            <div className="contact-form-card">
              <div className="contact-form-header">
                <h3 className="contact-form-title">Send a Message</h3>
                <p className="contact-form-subtitle">
                  Got an inquiry or project? Drop your message below.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="contact-form-element" noValidate>
                {status === 'success' && (
                  <div className="contact-alert contact-alert-success" role="alert">
                    <CheckCircle size={18} className="alert-icon" />
                    <span>Message sent successfully! I&apos;ll get back to you soon.</span>
                  </div>
                )}

                {status === 'error' && (
                  <div className="contact-alert contact-alert-error" role="alert">
                    <AlertCircle size={18} className="alert-icon" />
                    <span>Unable to send your message. Please try again or email directly.</span>
                  </div>
                )}

                {/* Name & Email Row (Side by side on desktop) */}
                <div className="contact-form-row-dual">
                  <div className="contact-field-group">
                    <label htmlFor="contact-name" className="contact-field-label">
                      Your Name <span className="required-star">*</span>
                    </label>
                    <input
                      type="text"
                      id="contact-name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. John Doe"
                      className={`contact-input ${errors.name ? 'has-error' : ''}`}
                      disabled={status === 'submitting'}
                      autoComplete="name"
                    />
                    {errors.name && (
                      <span className="contact-field-error">
                        <AlertCircle size={13} />
                        {errors.name}
                      </span>
                    )}
                  </div>

                  <div className="contact-field-group">
                    <label htmlFor="contact-email" className="contact-field-label">
                      Your Email <span className="required-star">*</span>
                    </label>
                    <input
                      type="email"
                      id="contact-email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. john@example.com"
                      className={`contact-input ${errors.email ? 'has-error' : ''}`}
                      disabled={status === 'submitting'}
                      autoComplete="email"
                    />
                    {errors.email && (
                      <span className="contact-field-error">
                        <AlertCircle size={13} />
                        {errors.email}
                      </span>
                    )}
                  </div>
                </div>

                {/* Subject Field (Full Width) */}
                <div className="contact-field-group">
                  <label htmlFor="contact-subject" className="contact-field-label">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="contact-subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="e.g. Job Opportunity / Project Discussion"
                    className="contact-input"
                    disabled={status === 'submitting'}
                  />
                </div>

                {/* Message Field (Full Width) */}
                <div className="contact-field-group">
                  <label htmlFor="contact-message" className="contact-field-label">
                    Your Message <span className="required-star">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project, timeline, or job opportunity..."
                    className={`contact-input contact-textarea ${errors.message ? 'has-error' : ''}`}
                    disabled={status === 'submitting'}
                  />
                  {errors.message && (
                    <span className="contact-field-error">
                      <AlertCircle size={13} />
                      {errors.message}
                    </span>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="contact-submit-btn"
                  aria-label="Send Message"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 size={18} className="btn-spinner" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send size={16} className="btn-send-icon" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* 3. Minimal Interactive Contact Rows (Left column row 2 on desktop, 3rd on mobile) */}
          <div className="contact-links-block reveal-on-scroll">
            <div className="contact-links-list">
              {/* Email Row */}
              <a
                href="mailto:vishnumatamala10@gmail.com"
                className="contact-row-link"
                aria-label="Email Vishnu"
              >
                <div className="contact-row-left">
                  <div className="contact-row-icon-box">
                    <Mail size={18} />
                  </div>
                  <div className="contact-row-meta">
                    <span className="contact-row-label">Email</span>
                    <span className="contact-row-value">vishnumatamala10@gmail.com</span>
                  </div>
                </div>
                <ArrowRight size={17} className="contact-row-arrow" />
              </a>

              {/* Phone Row */}
              <a
                href="tel:+918074407095"
                className="contact-row-link"
                aria-label="Call Vishnu"
              >
                <div className="contact-row-left">
                  <div className="contact-row-icon-box">
                    <Phone size={18} />
                  </div>
                  <div className="contact-row-meta">
                    <span className="contact-row-label">Phone</span>
                    <span className="contact-row-value">+91 80744 07095</span>
                  </div>
                </div>
                <ArrowRight size={17} className="contact-row-arrow" />
              </a>

              {/* LinkedIn Row */}
              <a
                href="https://www.linkedin.com/in/matamalavishnu/"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-row-link"
                aria-label="LinkedIn Profile"
              >
                <div className="contact-row-left">
                  <div className="contact-row-icon-box">
                    <LinkedinIcon size={18} />
                  </div>
                  <div className="contact-row-meta">
                    <span className="contact-row-label">LinkedIn</span>
                    <span className="contact-row-value">linkedin.com/in/matamalavishnu</span>
                  </div>
                </div>
                <ArrowRight size={17} className="contact-row-arrow" />
              </a>

              {/* GitHub Row */}
              <a
                href="https://github.com/vishnu-reddy-dev"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-row-link"
                aria-label="GitHub Profile"
              >
                <div className="contact-row-left">
                  <div className="contact-row-icon-box">
                    <GithubIcon size={18} />
                  </div>
                  <div className="contact-row-meta">
                    <span className="contact-row-label">GitHub</span>
                    <span className="contact-row-value">github.com/vishnu-reddy-dev</span>
                  </div>
                </div>
                <ArrowRight size={17} className="contact-row-arrow" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
