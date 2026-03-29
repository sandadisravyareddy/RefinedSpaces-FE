import React from 'react';
import { Phone, Mail, MapPin, Instagram, Facebook, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-brand-dark text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold font-playfair tracking-tight">
              REFINED <span className="text-brand-bronze">SPACES</span>
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Crafting premium interiors that blend luxury with functionality. Kitchens, wardrobes, and living spaces tailored uniquely for you.
            </p>
          </div>

          {/* Contact info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold font-playfair">Contact Us</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-center space-x-3 hover:text-white transition-colors">
                <Phone className="h-4 w-4 text-brand-bronze" />
                <span>+91 91777 78838</span>
              </li>
              <li className="flex items-center space-x-3 hover:text-white transition-colors">
                <Mail className="h-4 w-4 text-brand-bronze" />
                <span>contact@refinedspaces.in</span>
              </li>
              <li className="flex items-start space-x-3 hover:text-white transition-colors">
                <MapPin className="h-4 w-4 text-brand-bronze mt-1" />
                <span>Plot No.843, Vasanth Nagar, Road No.12, Kukatpally, Hyderabad - 500085.</span>
              </li>
            </ul>
          </div>

          {/* Quick links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold font-playfair">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="/" className="hover:text-brand-bronze transition-colors">Home</a></li>
              <li><a href="/gallery" className="hover:text-brand-bronze transition-colors">Designs Gallery</a></li>
              <li><a href="/about" className="hover:text-brand-bronze transition-colors">About Us</a></li>
              <li><a href="/contact" className="hover:text-brand-bronze transition-colors">Get Started</a></li>
            </ul>
          </div>

          {/* Social connections */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold font-playfair">Follow us</h4>
            <div className="flex space-x-4">
              <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-brand-bronze transition-colors"><Instagram className="h-5 w-5" /></a>
              <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-brand-bronze transition-colors"><Facebook className="h-5 w-5" /></a>
              <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-brand-bronze transition-colors"><Linkedin className="h-5 w-5" /></a>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-800 text-center text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Refined Spaces. All rights reserved. | Designed for Excellence.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
