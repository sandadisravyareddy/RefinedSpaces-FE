import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import DesignCard from '@/components/DesignCard';
import { CheckCircle, Award, Users, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const featuredDesigns = [
    {
      title: "Modern Minimalist Kitchen",
      category: "Kitchen",
      image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=800",
    },
    {
      title: "Luxury Master Bedroom",
      category: "Bedroom",
      image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=800",
    },
    {
      title: "Contemporary Living Room",
      category: "Living Room",
      image: "https://images.unsplash.com/photo-1583847268964-b28dc2f51ac9?auto=format&fit=crop&q=80&w=800",
    },
    {
      title: "Elegant Walk-in Closet",
      category: "Wardrobe",
      image: "https://images.unsplash.com/photo-1558997519-53bb890929a3?auto=format&fit=crop&q=80&w=800",
    }
  ];

  return (
    <main className="flex-grow">
      <Navbar />
      <Hero />

      {/* Featured Designs */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <span className="text-brand-bronze text-xs font-bold uppercase tracking-widest">Our Portfolio</span>
              <h2 className="text-4xl font-bold mt-2 text-brand-dark">Featured Creations</h2>
            </div>
            <Link href="/gallery" className="mt-4 md:mt-0 flex items-center text-brand-bronze font-semibold hover:underline group">
              View All Designs <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredDesigns.map((design, index) => (
              <DesignCard key={index} {...design} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-brand-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-brand-bronze text-xs font-bold uppercase tracking-widest">The Refined Edge</span>
            <h2 className="text-4xl font-bold mt-2 text-brand-dark">Why Choose Refined Spaces?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: <Award className="h-10 w-10 text-brand-bronze" />,
                title: "Premium Materials",
                description: "We source only the finest materials to ensure durability and a luxurious finish that lasts a lifetime."
              },
              {
                icon: <Users className="h-10 w-10 text-brand-bronze" />,
                title: "Expert Designers",
                description: "Our team of award-winning designers works closely with you to bring your dream vision to life."
              },
              {
                icon: <CheckCircle className="h-10 w-10 text-brand-bronze" />,
                title: "Timely Delivery",
                description: "We respect your time. Our streamlined process ensures your project is completed on schedule, every time."
              }
            ].map((feature, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <div className="mb-6">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-4 text-brand-dark font-playfair">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-brand-dark relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
          <img 
            src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=2000" 
            alt="Interiors" 
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold font-playfair mb-8">Ready to transform your home into a masterpiece?</h2>
          <p className="text-xl text-gray-300 mb-12 font-inter leading-relaxed">
            Let's discuss your project and create something extraordinary together.
          </p>
          <Link href="/contact" className="btn-primary text-lg px-12 py-4 shadow-lg shadow-brand-bronze/20">
            Get a Free Consultation
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
