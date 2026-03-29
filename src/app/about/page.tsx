'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Shield, Lightbulb } from 'lucide-react';

export default function About() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="py-24 bg-brand-light relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-brand-bronze text-sm font-bold uppercase tracking-widest"
          >
            Our Story
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-bold mt-4 text-brand-dark mb-8 font-playfair"
          >
            Crafting Spaces That <br /> <span className="italic text-brand-bronze">Inspire Life</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-3xl mx-auto text-lg text-gray-600 leading-relaxed font-inter"
          >
            At Refined Spaces, we believe that your home is more than just a place—it's a reflection of your soul. With over 15 years of excellence, we specialize in delivering high-end, custom interior solutions that transform houses into bespoke sanctuaries.
          </motion.p>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-brand-bronze/5 rounded-full blur-3xl opacity-50" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-brand-purple/5 rounded-full blur-3xl opacity-50" />
      </section>

      {/* Philosophy Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative rounded-3xl overflow-hidden shadow-2xl h-[500px]"
            >
              <img
                src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1200"
                alt="Designing Process"
                className="w-full h-full object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-4xl font-bold text-brand-dark font-playfair">Our Design Philosophy</h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                We combine traditional craftsmanship with modern innovation. Every project starts with a deep understanding of our client's lifestyle. Whether it's a gourmet kitchen or a walk-in wardrobe, we ensure elegance and efficiency go hand-in-hand.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-brand-bronze font-bold uppercase tracking-widest text-xs">
                    <Sparkles className="h-4 w-4" />
                    <span>Innovation</span>
                  </div>
                  <p className="text-sm text-gray-500">Pushing boundaries with unique textures and smart home integrations.</p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-brand-bronze font-bold uppercase tracking-widest text-xs">
                    <Shield className="h-4 w-4" />
                    <span>Quality</span>
                  </div>
                  <p className="text-sm text-gray-500">Only the highest grade architectural materials and finishes.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-brand-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-brand-dark font-playfair mb-16">The Values We Live By</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: <Heart className="h-10 w-10" />,
                title: "Passion Driven",
                description: "We love what we do, and it shows in every meticulous detail of our work."
              },
              {
                icon: <Lightbulb className="h-10 w-10" />,
                title: "Client-Centric",
                description: "Your vision is our blueprint. We listen, adapt, and exceed expectations."
              },
              {
                icon: <Shield className="h-10 w-10" />,
                title: "Integrity",
                description: "Honest communication and transparent pricing are the foundation of our trust."
              }
            ].map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-10 rounded-2xl shadow-sm hover:shadow-xl transition-all"
              >
                <div className="text-brand-bronze mb-6 flex justify-center">{value.icon}</div>
                <h3 className="text-xl font-bold mb-4 text-brand-dark font-playfair">{value.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
