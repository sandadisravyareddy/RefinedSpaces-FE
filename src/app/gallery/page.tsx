'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DesignCard from '@/components/DesignCard';
import FilterBar from '@/components/FilterBar';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [designs, setDesigns] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    setLoading(true);
    await Promise.all([fetchDesigns(), fetchCategories()]);
    setLoading(false);
  };

  const fetchDesigns = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/designs');
      const data = await response.json();
      setDesigns(data);
    } catch (err) {
      console.error("Error fetching gallery designs:", err);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/categories');
      const data = await response.json();
      setCategories(data.map((c: any) => c.name));
    } catch (err) {
      console.error("Error fetching categories:", err);
      // Fallback if API fails
      setCategories(["Kitchen", "Living Room", "Bedroom", "Wardrobe", "Pooja Room", "Door Design", "Bathroom", "Office", "Hall"]);
    }
  };

  const filteredDesigns = activeCategory === 'All'
    ? designs
    : designs.filter(d => d.category === activeCategory);

  return (
    <main className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <section className="py-24 bg-brand-light relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-bronze/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="text-brand-bronze text-sm font-bold uppercase tracking-[0.3em] mb-4 block">Selected Portfolio</span>
          <h1 className="text-6xl font-bold text-brand-dark mb-6 tracking-tight uppercase font-playfair">
            Our <span className="italic text-brand-bronze">Work</span>
          </h1>
          <p className="max-w-2xl mx-auto text-gray-600 text-lg leading-relaxed">
            A bespoke collection of interior transformations, each one uniquely crafted to tell a story of luxury and comfort.
          </p>
        </div>
      </section>

      <section className="py-20 flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FilterBar 
            categories={categories} 
            activeCategory={activeCategory} 
            onCategoryChange={setActiveCategory} 
          />

          {loading ? (
            <div className="flex flex-col items-center justify-center py-40 gap-4">
              <Loader2 className="h-10 w-10 animate-spin text-brand-bronze" />
              <p className="text-gray-400 font-medium">Loading our finest works...</p>
            </div>
          ) : (
            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10"
            >
              <AnimatePresence mode="popLayout">
                {filteredDesigns.map((design) => (
                  <motion.div
                    key={design.id}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  >
                    {/* Using the standard DesignCard but mapping imageUrl from backend */}
                    <DesignCard 
                      title={design.title} 
                      category={design.category} 
                      image={design.imageUrl} 
                      price={design.budget}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
          
          {!loading && filteredDesigns.length === 0 && (
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               className="text-center py-32 bg-gray-50 rounded-[40px] border border-gray-100"
            >
              <p className="text-gray-400 text-xl font-medium italic">Our gallery in this category is being curated. Check back soon!</p>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
