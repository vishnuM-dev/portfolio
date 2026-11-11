'use client';

import React, { useState } from 'react';
import { Mail, Phone, Send, MessageSquare, CheckCircle, AlertCircle, ArrowUpRight, Loader2 } from 'lucide-react';
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
      web3FormData.append('subject', formData.subject.trim() || `Portfolio Inquiry from ${formData.name.trim()}`);
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
      <div className="container">
        <div className="contact-two-col-layout">
          {/* ── Left Column: Contact Intro & Information Cards ── */}
          <div className="contact-left-col reveal-on-scroll">
            <div className="section-tag">
              <MessageSquare size={14} />
              <span>07 / Let&apos;s Connect</span>
            </div>

            <h2 className="contact-headline">
              Let&apos;s build something{' '}
              <span className="contact-headline-accent">meaningful.</span>
            </h2>

            <p className="contact-intro-desc">
              Whether you are looking for a Java Full Stack Developer, have an inquiry about
              enterprise solutions, or want to discuss a new opportunity, feel free to reach out.
            </p>

            {/* Contact Information Cards */}
            <div className="contact-cards-group">
              {/* Email Card */}
              <a
                href="mailto:vishnumatamala10@gmail.com"
                className="contact-info-card"
                aria-label="Email Vishnu"
              >
                <div className="contact-info-left">
                  <div className="contact-icon-box">
                    <Mail size={18} />
                  </div>
                  <div className="contact-info-text">
                    <span className="contact-info-label">Email Directly</span>
                    <span className="contact-info-val">vishnumatamala10@gmail.com</span>
                  </div>
                </div>
                <ArrowUpRight size={17} className="contact-card-arrow" />
              </a>

              {/* Phone Card */}
              <a
                href="tel:+918074407095"
                className="contact-info-card"
                aria-label="Call Vishnu"
              >
                <div className="contact-info-left">
                  <div className="contact-icon-box">
                    <Phone size={18} />
                  </div>
                  <div className="contact-info-text">
                    <span className="contact-info-label">Phone / WhatsApp</span>
                    <span className="contact-info-val">+91 80744 07095</span>
                  </div>
                </div>
                <ArrowUpRight size={17} className="contact-card-arrow" />
              </a>

              {/* LinkedIn Card */}
              <a
                href="https://www.linkedin.com/in/matamalavishnu/"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-info-card"
                aria-label="LinkedIn Profile"
              >
                <div className="contact-info-left">
                  <div className="contact-icon-box">
                    <LinkedinIcon size={18} />
                  </div>
                  <div className="contact-info-text">
                    <span className="contact-info-label">LinkedIn</span>
                    <span className="contact-info-val">linkedin.com/in/matamalavishnu</span>
                  </div>
                </div>
                <ArrowUpRight size={17} className="contact-card-arrow" />
              </a>

              {/* GitHub Card */}
              <a
                href="https://github.com/vishnu-reddy-dev"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-info-card"
                aria-label="GitHub Profile"
              >
                <div className="contact-info-left">
                  <div className="contact-icon-box">
                    <GithubIcon size={18} />
                  </div>
                  <div className="contact-info-text">
                    <span className="contact-info-label">GitHub</span>
                    <span className="contact-info-val">github.com/vishnu-reddy-dev</span>
                  </div>
                </div>
                <ArrowUpRight size={17} className="contact-card-arrow" />
              </a>
            </div>
          </div>

          {/* ── Right Column: Premium Contact Form Card ── */}
          <div className="contact-right-col reveal-on-scroll">
            <div className="contact-form-card">
              <div className="contact-form-header">
                <h3 className="form-card-title">Send a Message</h3>
                <p className="form-card-subtitle">
                  Fill in your details below and I will get back to you promptly.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="contact-form" noValidate>
                {/* Success Alert */}
                {status === 'success' && (
                  <div className="form-alert form-alert-success" role="alert">
                    <CheckCircle size={18} className="alert-icon" />
                    <span>Message sent successfully! I will get back to you shortly.</span>
                  </div>
                )}

                {/* Error Alert */}
                {status === 'error' && (
                  <div className="form-alert form-alert-error" role="alert">
                    <AlertCircle size={18} className="alert-icon" />
                    <span>Unable to send your message. Please try again or reach out via email directly.</span>
                  </div>
                )}

                {/* Name & Email Row */}
                <div className="form-row-dual">
                  <div className="form-group">
                    <label htmlFor="contact-name" className="form-label">
                      Your Name <span className="req-star">*</span>
                    </label>
                    <input
                      type="text"
                      id="contact-name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. John Doe"
                      className={`form-input ${errors.name ? 'is-invalid' : ''}`}
                      disabled={status === 'submitting'}
                      autoComplete="name"
                    />
                    {errors.name && (
                      <span className="field-error-msg">
                        <AlertCircle size={12} />
                        {errors.name}
                      </span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact-email" className="form-label">
                      Your Email <span className="req-star">*</span>
                    </label>
                    <input
                      type="email"
                      id="contact-email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. john@example.com"
                      className={`form-input ${errors.email ? 'is-invalid' : ''}`}
                      disabled={status === 'submitting'}
                      autoComplete="email"
                    />
                    {errors.email && (
                      <span className="field-error-msg">
                        <AlertCircle size={12} />
                        {errors.email}
                      </span>
                    )}
                  </div>
                </div>

                {/* Subject Field */}
                <div className="form-group">
                  <label htmlFor="contact-subject" className="form-label">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="contact-subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="e.g. Job Opportunity / Full Stack Discussion"
                    className="form-input"
                    disabled={status === 'submitting'}
                  />
                </div>

                {/* Message Field */}
                <div className="form-group">
                  <label htmlFor="contact-message" className="form-label">
                    Your Message <span className="req-star">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project, timeline, or position requirements..."
                    className={`form-input form-textarea ${errors.message ? 'is-invalid' : ''}`}
                    disabled={status === 'submitting'}
                  />
                  {errors.message && (
                    <span className="field-error-msg">
                      <AlertCircle size={12} />
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
                      <Send size={16} />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
