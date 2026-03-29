'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Calculator, CheckCircle2, Loader2, Home, Layout, IndianRupee, Map, Send } from 'lucide-react';
import { motion } from 'framer-motion';

const propertyTypes = ["Apartment", "Villa", "Independent House", "Office", "Renovation"];
const budgetOptions = ["₹1L - ₹5L", "₹5L - ₹10L", "₹10L - ₹15L", "₹15L - ₹25L", "₹25L+"];

export default function GetQuote() {
  const [roomOptions, setRoomOptions] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    propertyType: 'Apartment',
    rooms: [] as string[],
    budget: '₹5L - ₹10L',
    areaSqFt: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/categories');
      const data = await response.json();
      setRoomOptions(data.map((c: any) => c.name));
    } catch (err) {
      console.error(err);
      // Fallback
      setRoomOptions(["Kitchen", "Living Room", "Bedroom", "Hall", "Pooja Room", "Door Design"]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoomToggle = (room: string) => {
    const updatedRooms = formData.rooms.includes(room)
      ? formData.rooms.filter(r => r !== room)
      : [...formData.rooms, room];
    setFormData({ ...formData, rooms: updatedRooms });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.rooms.length === 0) {
      setError('Please select at least one area.');
      return;
    }
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to submit quote request.');

      setSubmitted(true);

      const whatsappMsg = encodeURIComponent(
        `*New Quote Request from Refined Spaces*\n\n` +
        `*Name:* ${formData.name}\n` +
        `*Property:* ${formData.propertyType}\n` +
        `*Rooms:* ${formData.rooms.join(", ")}\n` +
        `*Budget:* ${formData.budget}\n` +
        `*Area:* ${formData.areaSqFt} sq ft`
      );

      setTimeout(() => {
        window.open(`https://wa.me/919121813423?text=${whatsappMsg}`, '_blank');
      }, 1500);

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
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-md w-full bg-white p-12 rounded-3xl shadow-2xl text-center border border-brand-bronze/20">
            <div className="flex justify-center mb-6"><div className="bg-green-100 p-4 rounded-full"><CheckCircle2 className="h-12 w-12 text-green-600" /></div></div>
            <h2 className="text-3xl font-bold text-brand-dark mb-4">Request Received!</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">Thank you, <span className="font-bold text-brand-dark">{formData.name}</span>. Our experts will get back to you within 24 hours.</p>
            <button onClick={() => setSubmitted(false)} className="w-full btn-primary py-4 rounded-xl font-bold tracking-wide">Request Another Quote</button>
          </motion.div>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      <section className="py-16 bg-brand-light">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center space-x-2 bg-brand-bronze/10 text-brand-bronze px-4 py-2 rounded-full mb-6">
            <Calculator className="h-4 w-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Quote Estimator</span>
          </div>
          <h1 className="text-5xl font-bold text-brand-dark mb-4 font-playfair uppercase tracking-tight">Get a Personalized <span className="italic text-brand-bronze">Quote</span></h1>
          <p className="text-gray-600 max-w-xl mx-auto">Select the areas you want us to design and get an immediate project breakdown.</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-8 md:p-12 rounded-[40px] shadow-2xl border border-gray-50"
          >
            <form onSubmit={handleSubmit} className="space-y-12">
              <div className="space-y-8">
                <h3 className="text-xl font-bold text-brand-dark border-b pb-4 border-gray-100 uppercase tracking-widest flex items-center gap-3">
                  <span className="bg-brand-dark text-white w-8 h-8 rounded-full flex items-center justify-center text-xs">01</span>
                  Project Details
                </h3>

                <div className="space-y-4">
                  <label className="text-sm font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                    <Layout className="h-4 w-4 text-brand-bronze" /> Areas to be designed
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {roomOptions.map(room => (
                      <button
                        key={room}
                        type="button"
                        onClick={() => handleRoomToggle(room)}
                        className={`px-4 py-4 rounded-2xl border-2 text-[10px] font-bold uppercase tracking-widest transition-all text-center ${formData.rooms.includes(room)
                            ? 'bg-brand-dark text-white border-brand-dark shadow-lg shadow-brand-dark/20'
                            : 'bg-white border-gray-100 text-gray-400 hover:border-brand-bronze/30 shadow-sm'
                          }`}
                      >
                        {room}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <label className="text-sm font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                      Property Type
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {propertyTypes.map(type => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setFormData({ ...formData, propertyType: type })}
                          className={`px-3 py-3 rounded-xl border text-xs font-bold transition-all ${formData.propertyType === type
                              ? 'bg-brand-bronze text-white border-brand-bronze shadow-md shadow-brand-bronze/20'
                              : 'border-gray-200 text-gray-600 hover:border-brand-bronze'
                            }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-sm font-bold text-gray-500 uppercase tracking-widest">
                      Estimated Budget
                    </label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:border-brand-bronze outline-none font-bold text-brand-dark text-sm bg-gray-50"
                    >
                      {budgetOptions.map(b => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-500 uppercase tracking-widest">Approximate Area (Sq Ft)</label>
                    <input type="number" name="areaSqFt" value={formData.areaSqFt} onChange={handleChange} placeholder="e.g. 1200" className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:border-brand-bronze outline-none font-medium text-sm" />
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <h3 className="text-xl font-bold text-brand-dark border-b pb-4 border-gray-100 uppercase tracking-widest flex items-center gap-3">
                  <span className="bg-brand-dark text-white w-8 h-8 rounded-full flex items-center justify-center text-xs">02</span>
                  Your Identity
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em]">Your Name</label>
                    <input type="text" name="name" required value={formData.name} onChange={handleChange} placeholder="First Last Name" className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:border-brand-bronze outline-none text-sm" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em]">Email Address</label>
                    <input type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="you@example.com" className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:border-brand-bronze outline-none text-sm" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em]">Contact Number</label>
                    <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} placeholder="+91 XXXXX XXXXX" className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:border-brand-bronze outline-none text-sm" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em]">Additional Vision Notes</label>
                <textarea name="message" value={formData.message} onChange={handleChange} rows={3} placeholder="Tell us more about your design dream..." className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:border-brand-bronze outline-none resize-none text-sm"></textarea>
              </div>

              {error && <p className="text-red-500 text-xs font-bold bg-red-50 p-4 rounded-2xl border border-red-100">{error}</p>}

              <button type="submit" disabled={loading} className="w-full btn-primary py-6 rounded-2xl flex items-center justify-center space-x-3 text-xl font-bold shadow-2xl shadow-brand-bronze/30 transition-all hover:scale-[1.01] hover:shadow-brand-bronze/50 active:scale-95">
                {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : <><Send className="h-6 w-6" /> <span>Generate Estimate</span></>}
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
