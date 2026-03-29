'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';
import Link from 'next/link';

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center overflow-hidden bg-brand-light">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-bronze/5 -skew-x-12 transform translate-x-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8"
        >
          <div className="inline-flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-sm">
            <Star className="h-4 w-4 text-brand-bronze fill-brand-bronze" />
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-dark">Premium Interior Solutions</span>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold leading-tight text-brand-dark">
            Refine Your <br />
            <span className="gradient-text italic">Living Space</span>
          </h1>

          <p className="text-lg text-gray-600 max-w-lg leading-relaxed font-inter">
            Bespoke kitchens, custom wardrobes, and elegant living spaces designed to match your personality. Experience the perfect blend of style and comfort.
          </p>

          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 pt-4">
            <Link href="/gallery" className="btn-primary flex items-center justify-center space-x-2 text-lg px-8 py-4">
              <span>Explore Designs</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link href="/contact" className="px-8 py-4 border-2 border-brand-bronze text-brand-bronze font-semibold rounded-md hover:bg-brand-bronze hover:text-white transition-all flex items-center justify-center">
              Book Consultation
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-8 pt-8">
            <div>
              <p className="text-3xl font-bold text-brand-dark">100+</p>
              <p className="text-xs uppercase tracking-widest text-gray-500">Happy Clients</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-brand-dark">200+</p>
              <p className="text-xs uppercase tracking-widest text-gray-500">Unique Designs</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-brand-dark">100%</p>
              <p className="text-xs uppercase tracking-widest text-gray-500">Satisfaction</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative hidden lg:block"
        >
          <div className="relative z-10 w-full h-[600px] rounded-2xl overflow-hidden shadow-2xl">
            {/* Using a premium placeholder image for interior design */}
            <img
              src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=2000"
              alt="Luxury Interior Design"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Decorative element */}
          <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-brand-purple/10 rounded-full blur-3xl" />
          <div className="absolute top-20 -right-10 w-40 h-40 bg-brand-bronze/10 rounded-full blur-2xl" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
