import React from 'react';
import { ArrowRight, Star } from 'lucide-react';
import Link from 'next/link';

interface DesignCardProps {
  title: string;
  category: string;
  image: string;
  price?: string;
}

const DesignCard: React.FC<DesignCardProps> = ({ title, category, image, price }) => {
  return (
    <div className="group relative overflow-hidden rounded-xl bg-white shadow-md hover:shadow-xl transition-all duration-300">
      <div className="aspect-[4/5] overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
        <span className="text-brand-bronze text-xs font-semibold uppercase tracking-widest mb-1">{category}</span>
        <h3 className="text-white text-xl font-bold font-playfair mb-4">{title}</h3>
        <Link href="/gallery" className="inline-flex items-center text-white text-sm font-semibold hover:underline">
          View Details <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
      <div className="p-4 bg-white md:group-hover:opacity-0 transition-opacity">
        <span className="text-brand-bronze text-[10px] uppercase font-bold tracking-widest">{category}</span>
        <h3 className="text-brand-dark font-semibold mt-1">{title}</h3>
      </div>
    </div>
  );
};

export default DesignCard;
