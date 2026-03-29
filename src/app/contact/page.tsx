'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Phone, Mail, MapPin, Send, Clock, Loader2, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceCategory: 'Complete Home Interior',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send message. Please try again later.');
      }

      setSubmitted(true);

      // Automatic WhatsApp Redirect
      const whatsappMsg = encodeURIComponent(
        `*New Inquiry from Refined Spaces*\n\n` +
        `*Name:* ${formData.name}\n` +
        `*Email:* ${formData.email}\n` +
        `*Service:* ${formData.serviceCategory}\n` +
        `*Message:* ${formData.message}`
      );

      // Delay slightly so the user sees the "Sent" state first
      setTimeout(() => {
        window.open(`https://wa.me/919121813423?text=${whatsappMsg}`, '_blank');
      }, 1000);

    } catch (err: any) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <main className="min-h-screen flex flex-col">
        <Navbar />
        <section className="flex-grow flex items-center justify-center py-20 bg-brand-light px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md w-full bg-white p-12 rounded-3xl shadow-2xl text-center border border-brand-bronze/20"
          >
            <div className="flex justify-center mb-6">
              <div className="bg-green-100 p-4 rounded-full">
                <CheckCircle2 className="h-12 w-12 text-green-600" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-brand-dark mb-4">Message Sent!</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Thank you for reaching out, <span className="font-bold text-brand-dark">{formData.name}</span>. We've received your inquiry for <span className="italic">{formData.serviceCategory}</span> and will get back to you shortly.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="w-full btn-primary py-4 rounded-xl font-bold tracking-wide"
            >
              Send Another Message
            </button>
          </motion.div>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      <section className="py-20 bg-brand-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-brand-bronze text-sm font-bold uppercase tracking-widest">Connect With Us</span>
          <h1 className="text-5xl font-bold mt-4 text-brand-dark mb-6">Let's Create Your <span className="italic">Dream Space</span></h1>
          <p className="max-w-2xl mx-auto text-gray-600">
            Have a project in mind? We'd love to hear from you. Fill out the form or use our contact details to reach out.
          </p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-12"
            >
              <div>
                <h2 className="text-3xl font-bold text-brand-dark mb-8 font-playfair">Get in Touch</h2>
                <div className="space-y-8">
                  <div className="flex items-start space-x-6">
                    <div className="bg-brand-bronze/10 p-4 rounded-xl">
                      <Phone className="h-6 w-6 text-brand-bronze" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-1">Call Us Directly</p>
                      <p className="text-xl font-bold text-brand-dark">+91 9177778838</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-6">
                    <div className="bg-brand-bronze/10 p-4 rounded-xl">
                      <Mail className="h-6 w-6 text-brand-bronze" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-1">Email Inquiry</p>
                      <p className="text-xl font-bold text-brand-dark">sravyareddy.sandhadi@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-6">
                    <div className="bg-brand-bronze/10 p-4 rounded-xl">
                      <MapPin className="h-6 w-6 text-brand-bronze" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-1">Our Studio</p>
                      <p className="text-lg font-bold text-brand-dark leading-relaxed max-w-xs">
                        Plot No.843, Vasanth Nagar, Road No.12, Kukatpally, Hyderabad - 500085.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-6">
                    <div className="bg-brand-bronze/10 p-4 rounded-xl">
                      <Clock className="h-6 w-6 text-brand-bronze" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-1">Business Hours</p>
                      <p className="text-lg font-bold text-brand-dark">Monday - Saturday <br /> 10:00 AM - 08:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Sharat Reddy"
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-brand-bronze focus:ring-1 focus:ring-brand-bronze outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="email@example.com"
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-brand-bronze focus:ring-1 focus:ring-brand-bronze outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-brand-bronze focus:ring-1 focus:ring-brand-bronze outline-none transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Service Category</label>
                  <select
                    name="serviceCategory"
                    value={formData.serviceCategory}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-brand-bronze focus:ring-1 focus:ring-brand-bronze outline-none transition-all"
                  >
                    <option>Complete Home Interior</option>
                    <option>Kitchen Renovation</option>
                    <option>Wardrobes & Storage</option>
                    <option>Office Spaces</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Your Message</label>
                  <textarea
                    name="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project..."
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-brand-bronze focus:ring-1 focus:ring-brand-bronze outline-none transition-all resize-none"
                  ></textarea>
                </div>

                {error && <p className="text-red-500 text-sm font-semibold bg-red-50 p-3 rounded-lg border border-red-100">{error}</p>}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-primary py-4 flex items-center justify-center space-x-3 text-lg disabled:opacity-70 disabled:cursor-not-allowed transition-all"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="h-5 w-5" />
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
