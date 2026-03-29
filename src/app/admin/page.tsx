'use client';

import React, { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Layout, Plus, Trash2, LogIn, Loader2, Image as ImageIcon, X, Settings, Tag, Upload } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [designs, setDesigns] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  // Tabs
  const [activeTab, setActiveTab] = useState<'designs' | 'categories'>('designs');

  // New Design Form
  const [showAddModal, setShowAddModal] = useState(false);
  const [newDesign, setNewDesign] = useState({
    title: '',
    category: '',
    description: '',
    budget: ''
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // New Category Form
  const [newCatName, setNewCatName] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      setIsLoggedIn(true);
      fetchInitialData();
    }
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
    } catch (err) { console.error(err); }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/categories');
      const data = await response.json();
      setCategories(data);
      if (data.length > 0 && !newDesign.category) {
        setNewDesign(prev => ({ ...prev, category: data[0].name }));
      }
    } catch (err) { console.error(err); }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Login failed');
      if (data.user.role !== 'admin') throw new Error('Access denied. Admin only.');
      localStorage.setItem('adminToken', data.token);
      setIsLoggedIn(true);
      fetchInitialData();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsLoggedIn(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  // Design Management
  const handleCreateDesign = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
        alert("Please select an image file to upload");
        return;
    }
    setLoading(true);
    const token = localStorage.getItem('adminToken');
    
    const formData = new FormData();
    formData.append('title', newDesign.title);
    formData.append('category', newDesign.category);
    formData.append('description', newDesign.description);
    formData.append('budget', newDesign.budget);
    formData.append('image', selectedFile);

    try {
      const response = await fetch('http://localhost:5000/api/designs', {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`
        },
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to create design');

      setShowAddModal(false);
      setNewDesign({ title: '', category: categories[0]?.name || '', description: '', budget: '' });
      setSelectedFile(null);
      setPreviewUrl(null);
      fetchDesigns();
    } catch (err: any) { alert(err.message); }
    finally { setLoading(false); }
  };

  const handleDeleteDesign = async (id: number) => {
    if (!confirm("Delete this design?")) return;
    const token = localStorage.getItem('adminToken');
    try {
      await fetch(`http://localhost:5000/api/designs/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchDesigns();
    } catch (err) { alert("Delete failed"); }
  };

  // Category Management
  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName) return;
    const token = localStorage.getItem('adminToken');
    try {
      await fetch('http://localhost:5000/api/categories', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name: newCatName }),
      });
      setNewCatName('');
      fetchCategories();
    } catch (err) { alert("Failed to add category"); }
  };

  const handleDeleteCategory = async (id: number) => {
    if (!confirm("Delete this category?")) return;
    const token = localStorage.getItem('adminToken');
    try {
      await fetch(`http://localhost:5000/api/categories/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchCategories();
    } catch (err) { alert("Delete failed"); }
  };

  if (!isLoggedIn) {
    return (
      <main className="min-h-screen flex flex-col bg-brand-light">
        <Navbar />
        <div className="flex-grow flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md w-full bg-white p-10 rounded-3xl shadow-2xl border border-brand-bronze/20">
            <div className="text-center mb-8">
              <div className="bg-brand-bronze/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <LogIn className="text-brand-bronze h-8 w-8" />
              </div>
              <h1 className="text-3xl font-bold text-brand-dark font-playfair">Designer Login</h1>
              <p className="text-gray-500 mt-2">Access restricted to authorized designers</p>
            </div>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Admin Email</label>
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@refinedspaces.com" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-bronze outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Password</label>
                <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-bronze outline-none" />
              </div>
              {error && <p className="text-red-500 text-sm font-semibold">{error}</p>}
              <button type="submit" disabled={loading} className="w-full btn-primary py-4 rounded-xl font-bold flex items-center justify-center gap-2">
                {loading ? <Loader2 className="animate-spin h-5 w-5" /> : "Verify Identity"}
              </button>
            </form>
          </motion.div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <header className="bg-white border-b border-gray-200 pt-10 pb-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-brand-dark font-playfair">Control Center</h1>
              <p className="text-gray-500">Manage designs and categorization</p>
            </div>
            <div className="flex gap-4">
              <button onClick={() => setShowAddModal(true)} className="bg-brand-dark text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-brand-bronze transition-all hover:scale-105">
                <Plus className="h-5 w-5" /> New Upload
              </button>
              <button onClick={handleLogout} className="text-gray-400 font-bold hover:text-red-500 transition-colors uppercase text-xs tracking-widest">Logout</button>
            </div>
          </div>
          
          <div className="flex gap-8 border-b border-gray-100">
            <button 
              onClick={() => setActiveTab('designs')}
              className={`pb-4 px-2 font-bold text-sm tracking-widest uppercase transition-all flex items-center gap-2 ${activeTab === 'designs' ? 'text-brand-bronze border-b-2 border-brand-bronze' : 'text-gray-400'}`}
            >
              <Layout className="h-4 w-4" /> Gallery Management
            </button>
            <button 
              onClick={() => setActiveTab('categories')}
              className={`pb-4 px-2 font-bold text-sm tracking-widest uppercase transition-all flex items-center gap-2 ${activeTab === 'categories' ? 'text-brand-bronze border-b-2 border-brand-bronze' : 'text-gray-400'}`}
            >
              <Settings className="h-4 w-4" /> Room Categories
            </button>
          </div>
        </div>
      </header>

      <section className="py-12 flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {loading ? (
            <div className="flex justify-center py-20"><Loader2 className="animate-spin h-10 w-10 text-brand-bronze" /></div>
          ) : activeTab === 'designs' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence>
                {designs.map((design) => (
                  <motion.div key={design.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 group">
                    <div className="aspect-video relative overflow-hidden">
                      <img src={design.imageUrl} alt={design.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      <button onClick={() => handleDeleteDesign(design.id)} className="absolute top-4 right-4 bg-red-500 text-white p-2.5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-2">
                         <span className="text-[10px] uppercase font-bold text-brand-bronze bg-brand-bronze/10 px-2.5 py-1 rounded-lg">{design.category}</span>
                         <span className="text-xs font-bold text-gray-400">{design.budget}</span>
                      </div>
                      <h3 className="text-lg font-bold text-brand-dark mb-1">{design.title}</h3>
                      <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">{design.description}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <div className="max-w-2xl mx-auto space-y-8">
              <div className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold text-brand-dark mb-6 flex items-center gap-2">
                  <Tag className="text-brand-bronze h-5 w-5" /> Add New Room Option
                </h3>
                <form onSubmit={handleAddCategory} className="flex gap-4">
                  <input value={newCatName} onChange={(e) => setNewCatName(e.target.value)} placeholder="e.g. Hall, Living Lounge, Prayer Space" className="flex-grow px-6 py-4 rounded-2xl border border-gray-200 outline-none focus:border-brand-bronze text-lg font-medium" />
                  <button type="submit" className="btn-primary px-8 rounded-2xl font-bold">Add</button>
                </form>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {categories.map((cat) => (
                  <div key={cat.id} className="bg-white px-8 py-5 rounded-3xl flex justify-between items-center shadow-sm border border-gray-50 hover:border-brand-bronze/20 transition-all">
                    <span className="text-lg font-bold text-gray-700">{cat.name}</span>
                    <button onClick={() => handleDeleteCategory(cat.id)} className="text-gray-300 hover:text-red-500 transition-colors p-2"><Trash2 className="h-5 w-5" /></button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white w-full max-w-2xl rounded-[40px] overflow-hidden shadow-2xl">
            <div className="p-10 border-b border-gray-50 flex justify-between items-center bg-brand-light">
              <h2 className="text-3xl font-bold text-brand-dark font-playfair">Create New Entry</h2>
              <button 
                onClick={() => { setShowAddModal(false); setPreviewUrl(null); setSelectedFile(null); }} 
                className="text-gray-400 hover:text-brand-dark bg-white p-2 rounded-full shadow-sm"
              >
                <X />
              </button>
            </div>
            <form onSubmit={handleCreateDesign} className="p-10 space-y-6 bg-white overflow-y-auto max-h-[70vh]">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Project Title</label>
                  <input required value={newDesign.title} onChange={e => setNewDesign({...newDesign, title: e.target.value})} placeholder="Master Bed transformation" className="w-full px-5 py-3.5 rounded-2xl border border-gray-200 font-medium" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Category</label>
                  <select value={newDesign.category} onChange={e => setNewDesign({...newDesign, category: e.target.value})} className="w-full px-5 py-3.5 rounded-2xl border border-gray-200 font-bold text-brand-dark">
                    {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                  </select>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Upload Project Photo</label>
                <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-gray-200 rounded-3xl p-8 flex flex-col items-center justify-center gap-4 cursor-pointer hover:border-brand-bronze transition-all bg-gray-50 group h-48 relative overflow-hidden"
                >
                    {previewUrl ? (
                        <>
                            <img src={previewUrl} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <p className="text-white font-bold flex items-center gap-2"><Upload className="h-4 w-4" /> Change Photo</p>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="bg-brand-bronze/10 p-4 rounded-full">
                                <ImageIcon className="text-brand-bronze h-8 w-8" />
                            </div>
                            <div className="text-center">
                                <p className="text-brand-dark font-bold">Click to upload photo</p>
                                <p className="text-gray-400 text-xs">PNG, JPG, JPEG (Max 10MB)</p>
                            </div>
                        </>
                    )}
                </div>
                <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileChange} 
                    accept="image/*" 
                    className="hidden" 
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Estimated Price</label>
                  <input value={newDesign.budget} onChange={e => setNewDesign({...newDesign, budget: e.target.value})} placeholder="e.g. ₹2L" className="w-full px-5 py-3.5 rounded-2xl border border-gray-200 font-medium" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Project Narrative</label>
                <textarea value={newDesign.description} onChange={e => setNewDesign({...newDesign, description: e.target.value})} rows={3} placeholder="Describe the materials and style..." className="w-full px-5 py-3.5 rounded-2xl border border-gray-200 resize-none font-medium"></textarea>
              </div>
              <button type="submit" className="w-full btn-primary py-5 rounded-2xl font-bold text-xl shadow-xl shadow-brand-bronze/20">
                {loading ? <Loader2 className="animate-spin h-6 w-6 mx-auto" /> : "Confirm & Publish"}
              </button>
            </form>
          </motion.div>
        </div>
      )}

      <Footer />
    </main>
  );
}
