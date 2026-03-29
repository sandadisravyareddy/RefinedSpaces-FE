'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users, Layout, Hammer, CheckCircle, Home,
  ArrowRight, ChevronDown, ShieldCheck, Clock,
  Settings, PenTool, Sparkles, Plus, Minus
} from 'lucide-react';
import Link from 'next/link';

const phases = [
  {
    name: "Phase 1: Design & Planning",
    bgColor: "bg-brand-bronze/[0.03]",
    steps: [
      {
        number: "01",
        title: "Meet the Consultant",
        description: "Begin with a personal strategy session. We define your lifestyle needs and spatial requirements to create a roadmap for your home.",
        icon: <Users className="h-7 w-7" />,
        accent: "bg-brand-bronze",
        cardBg: "hover:bg-brand-bronze/[0.02]"
      },
      {
        number: "02",
        title: "3D Design Concept",
        description: "Visualize your future home with high-fidelity 3D renders. Finalize materials, finishes, and layouts before execution begins.",
        icon: <Layout className="h-7 w-7" />,
        accent: "bg-brand-purple",
        milestone: "Design Approval",
        cardBg: "hover:bg-brand-purple/[0.02]"
      }
    ]
  },
  {
    name: "Phase 2: Execution & Progress",
    bgColor: "bg-brand-purple/[0.03]",
    steps: [
      {
        number: "03",
        title: "Execution Begins",
        description: "Our skilled craftsmen bring designs to life on-site. We manage procurement, logistics, and quality control with zero compromises.",
        icon: <Hammer className="h-7 w-7" />,
        accent: "bg-brand-bronze",
        milestone: "Execution Commencement",
        cardBg: "hover:bg-brand-bronze/[0.02]"
      },
      {
        number: "04",
        title: "Quality Check",
        description: "Rigorous inspection of every finish. We conduct a detailed 145-point quality check to ensure absolute perfection.",
        icon: <CheckCircle className="h-7 w-7" />,
        accent: "bg-brand-purple",
        cardBg: "hover:bg-brand-purple/[0.02]"
      }
    ]
  },
  {
    name: "Phase 3: Handover",
    bgColor: "bg-white",
    steps: [
      {
        number: "05",
        title: "Move In",
        description: "The handover of your refined sanctuary. Experience the lifestyle you've always dreamed of with our post-move support.",
        icon: <Home className="h-7 w-7" />,
        accent: "bg-brand-bronze",
        milestone: "Final Handover",
        cardBg: "hover:bg-brand-bronze/[0.02]"
      }
    ]
  }
];

const faqs = [
  {
    question: "How long does the entire process take?",
    answer: "Our standard delivery timeline is 45 days from the date of design finalization. However, complex full-home projects may take 60-75 days depending on the scope of work."
  },
  {
    question: "Do you offer a warranty on your services?",
    answer: "Yes, we provide a comprehensive 10-year warranty on modular furniture and a 1-year service warranty on all civil and finishing works."
  },
  {
    question: "Can I customize the designs or do you have fixed templates?",
    answer: "Every Refined Spaces home is 100% bespoke. While we have a library of inspirations, all designs are tailored to your unique requirements and space."
  },
  {
    question: "How are the payments structured?",
    answer: "We follow a milestone-based payment plan: 10% on booking, 40% on design finalization, 45% before execution begins, and the final 5% on handover."
  }
];

const FAQItem = ({ faq }: { faq: typeof faqs[0] }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-brand-bronze/10 last:border-0 hover:bg-brand-bronze/[0.01] transition-colors rounded-lg px-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex justify-between items-center text-left hover:text-brand-bronze transition-colors group"
      >
        <span className="text-lg font-bold font-playfair text-brand-dark group-hover:text-brand-bronze">{faq.question}</span>
        {isOpen ? <Minus className="h-5 w-5 text-brand-bronze" /> : <Plus className="h-5 w-5 text-brand-bronze/50" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-gray-500 font-inter leading-relaxed">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function HowItWorks() {
  return (
    <main className="min-h-screen flex flex-col bg-white selection:bg-brand-bronze selection:text-white">
      <Navbar />

      {/* Vibrant Hero Section */}
      <section className="relative py-32 overflow-hidden bg-brand-dark overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-brand-bronze/20 rounded-full blur-[120px]" />
          <div className="absolute top-1/2 -right-40 w-[500px] h-[500px] bg-brand-purple/20 rounded-full blur-[100px]" />
        </div>

        {/* Decorative Grid */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#6B4423 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 bg-brand-bronze/10 border border-brand-bronze/30 px-6 py-2 rounded-full mb-8"
          >
            <Sparkles className="h-4 w-4 text-brand-bronze" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-bronze">The Master Plan</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-bold text-white mb-8 font-playfair tracking-tighter"
          >
            <span className="text-brand-bronze italic">Your Vision</span>
            <br /> <span className="text-brand-bronze italic">Defined.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto text-xl text-gray-400 leading-relaxed font-inter font-light"
          >
            Experience a journey where every detail is deliberate, and every step is a milestone toward your refined sanctuary.
          </motion.p>
        </div>
      </section>

      {/* Phased Process with Colored Backgrounds */}
      <section className="relative">
        {phases.map((phase, phaseIdx) => (
          <div key={phase.name} className={`py-32 ${phase.bgColor} border-b border-gray-100`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row items-center justify-between mb-20 gap-8">
                <div className="max-w-xl">
                  <span className="text-brand-bronze font-black text-xs uppercase tracking-[0.4em] block mb-4">MOMENTUM {phaseIdx + 1}</span>
                  <h2 className="text-4xl md:text-5xl font-bold text-brand-dark font-playfair">{phase.name}</h2>
                </div>
                <div className="hidden lg:block h-px flex-grow bg-brand-bronze/20 mx-12" />
                <div className="text-2xl font-playfair italic text-brand-bronze">
                  {phaseIdx === 0 && "Inspiration."}
                  {phaseIdx === 1 && "Creation."}
                  {phaseIdx === 2 && "Realization."}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {phase.steps.map((step, stepIdx) => (
                  <motion.div
                    key={step.number}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: stepIdx * 0.1 }}
                    className={`group relative bg-white p-12 rounded-[40px] border border-gray-100 shadow-[0_15px_60px_-15px_rgba(107,68,35,0.05)] ${step.cardBg} transition-all duration-500 overflow-hidden`}
                  >
                    {/* Floating Color Blob */}
                    <div className={`absolute top-0 right-0 w-32 h-32 ${step.accent}/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-150 transition-transform duration-700`} />

                    {step.milestone && (
                      <div className="absolute top-8 right-8 bg-brand-bronze text-white text-[8px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-full shadow-lg z-10">
                        {step.milestone}
                      </div>
                    )}

                    <div className="flex justify-between items-start mb-12 relative z-10">
                      <div className={`p-5 rounded-3xl bg-brand-light text-brand-bronze group-hover:bg-brand-bronze group-hover:text-white group-hover:rotate-12 transition-all duration-500 shadow-sm`}>
                        {step.icon}
                      </div>
                      <span className="text-7xl font-black text-brand-bronze/[0.04] group-hover:text-brand-bronze/[0.08] transition-colors duration-500 font-playfair translate-x-4 -translate-y-4">
                        {step.number}
                      </span>
                    </div>

                    <div className="relative z-10">
                      <h3 className="text-3xl font-bold text-brand-dark mb-6 font-playfair tracking-tight">
                        {step.title}
                      </h3>
                      <p className="text-gray-500 text-lg leading-relaxed font-inter font-light">
                        {step.description}
                      </p>

                      <div className={`mt-10 w-16 h-1.5 ${step.accent} rounded-full opacity-20 group-hover:w-32 group-hover:opacity-100 transition-all duration-700`} />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Vibrant Feature Highlight Section */}
      <section className="py-24 bg-brand-bronze text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
            <div className="bg-white/10 backdrop-blur-md p-10 rounded-4xl border border-white/20 text-center hover:bg-white/20 transition-all cursor-default">
              <ShieldCheck className="h-10 w-10 mx-auto mb-6 text-white" />
              <h3 className="text-2xl font-bold font-playfair mb-4">Elite 10yr Warranty</h3>
              <p className="text-brand-light/70 text-sm leading-relaxed">Built with precision to last generations.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-10 rounded-4xl border border-white/20 text-center hover:bg-white/20 transition-all cursor-default scale-110 shadow-2xl z-10">
              <Clock className="h-10 w-10 mx-auto mb-6 text-white" />
              <h3 className="text-2xl font-bold font-playfair mb-4">45-Day Commitment</h3>
              <p className="text-brand-light/70 text-sm leading-relaxed">Punctuality is the cornerstone of luxury.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-10 rounded-4xl border border-white/20 text-center hover:bg-white/20 transition-all cursor-default">
              <Settings className="h-10 w-10 mx-auto mb-6 text-white" />
              <h3 className="text-2xl font-bold font-playfair mb-4">145 Point Audit</h3>
              <p className="text-brand-light/70 text-sm leading-relaxed">Rigorous checks at every cubic inch.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Colorful FAQ Section */}
      <section className="py-32 bg-brand-light relative">
        {/* Floating circles */}
        <div className="absolute top-1/4 right-0 w-64 h-64 bg-brand-purple/5 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute bottom-1/4 left-0 w-48 h-48 bg-brand-bronze/5 rounded-full blur-[60px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <div className="text-center mb-24">
            <span className="text-brand-bronze text-xs font-black uppercase tracking-[0.4em] mb-4 block">Knowledge Base</span>
            <h2 className="text-5xl font-bold font-playfair text-brand-dark">Curated Responses</h2>
          </div>

          <div className="bg-white p-12 rounded-[50px] shadow-[0_30px_100px_-30px_rgba(107,68,35,0.1)] border border-brand-bronze/5">
            {faqs.map((faq, index) => (
              <FAQItem key={index} faq={faq} />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-32 bg-brand-dark relative overflow-hidden text-white text-center">
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <h2 className="text-5xl md:text-7xl font-bold font-playfair mb-10 tracking-tight">
            The path to refined living awaits.
          </h2>
          <Link href="/contact" className="group relative inline-flex items-center justify-center px-12 py-6 font-black text-white transition-all duration-300 bg-brand-bronze rounded-full hover:scale-105 active:scale-95 shadow-[0_20px_50px_-15px_rgba(107,68,35,0.4)]">
            <span className="relative z-10 flex items-center gap-4 text-xl">
              Initiate Consultation
              <ArrowRight className="h-6 w-6 group-hover:translate-x-2 transition-transform" />
            </span>
          </Link>
        </div>

        {/* Artistic background element */}
        <div className="absolute -bottom-1/2 -left-1/4 w-[800px] h-[800px] bg-brand-bronze/5 rounded-full blur-[150px] pointer-events-none" />
      </section>

      <Footer />
    </main>
  );
}
