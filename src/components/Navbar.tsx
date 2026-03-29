'use client';

import React from 'react';
import Link from 'next/link';
import { Menu, X, Phone, Mail } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link href="/" className="flex flex-col">
              <span className="text-2xl font-bold tracking-tight text-brand-dark font-playfair">
                REFINED <span className="text-brand-bronze">SPACES</span>
              </span>
              <span className="text-[10px] uppercase tracking-widest text-brand-bronze/80 font-medium -mt-1 italic">
                Kitchens, Wardrobes & More
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-sm font-medium text-gray-700 hover:text-brand-bronze transition-colors">Home</Link>
            <Link href="/gallery" className="text-sm font-medium text-gray-700 hover:text-brand-bronze transition-colors">Designs</Link>
            <Link href="/about" className="text-sm font-medium text-gray-700 hover:text-brand-bronze transition-colors">About Us</Link>
            <Link href="/how-it-works" className="text-sm font-medium text-gray-700 hover:text-brand-bronze transition-colors">How It Works</Link>
            <Link href="/contact" className="text-sm font-medium text-gray-700 hover:text-brand-bronze transition-colors">Contact</Link>
            <Link href="/get-quote" className="btn-primary text-xs uppercase tracking-widest">
              Get Quote
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-brand-bronze">Home</Link>
            <Link href="/gallery" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-brand-bronze">Designs</Link>
            <Link href="/about" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-brand-bronze">About Us</Link>
            <Link href="/how-it-works" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-brand-bronze">How It Works</Link>
            <Link href="/contact" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-brand-bronze">Contact</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
