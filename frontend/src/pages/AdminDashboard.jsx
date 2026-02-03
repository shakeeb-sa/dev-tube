import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { PlusCircle, Youtube, Tag, Type, Clock, Eye } from 'lucide-react';

const AdminDashboard = () => {
    const { token } = useAuth();
    const [formData, setFormData] = useState({
        videoId: '', title: '', category: 'js', duration: '', views: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Talk to our MERN Backend
            await axios.post('http://localhost:5000/api/videos', formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert("Success! Video is now live on DevTube.");
            // Clear form
            setFormData({ videoId: '', title: '', category: 'js', duration: '', views: '' });
        } catch (err) {
            alert(err.response?.data?.message || "Failed to add video");
        }
    };

    return (
        <div className="max-w-2xl mx-auto py-12 px-4">
            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 shadow-2xl">
                <div className="flex items-center gap-3 mb-8 border-b border-slate-700 pb-6">
                    <PlusCircle className="text-primary-500 w-8 h-8" />
                    <h1 className="text-2xl font-bold text-white">Post New Tutorial</h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2 tracking-widest">YouTube Video ID</label>
                            <div className="relative">
                                <Youtube className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
                                <input type="text" required placeholder="e.g., cpoXLj24BDY" className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-white focus:ring-2 focus:ring-primary-500 outline-none transition-all" value={formData.videoId} onChange={(e)=>setFormData({...formData, videoId: e.target.value})} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2 tracking-widest">Category</label>
                            <select className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 px-4 text-white focus:ring-2 focus:ring-primary-500 outline-none cursor-pointer" value={formData.category} onChange={(e)=>setFormData({...formData, category: e.target.value})}>
                                <option value="js">JavaScript</option>
                                <option value="react">React</option>
                                <option value="wordpress">WordPress</option>
                                <option value="mern-stack">MERN Stack</option>
                                <option value="backend">Backend</option>
                                <option value="css">CSS</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2 tracking-widest">Tutorial Title</label>
                        <div className="relative">
                            <Type className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
                            <input type="text" required placeholder="Mastering MERN in 10 Minutes" className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-white focus:ring-2 focus:ring-primary-500 outline-none transition-all" value={formData.title} onChange={(e)=>setFormData({...formData, title: e.target.value})} />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2 tracking-widest">Duration</label>
                            <div className="relative">
                                <Clock className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
                                <input type="text" placeholder="10:25" className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-white outline-none" value={formData.duration} onChange={(e)=>setFormData({...formData, duration: e.target.value})} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2 tracking-widest">Display Views</label>
                            <div className="relative">
                                <Eye className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
                                <input type="text" placeholder="1.2M" className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-white outline-none" value={formData.views} onChange={(e)=>setFormData({...formData, views: e.target.value})} />
                            </div>
                        </div>
                    </div>

                    <button type="submit" className="w-full bg-primary-600 hover:bg-primary-500 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-primary-900/40 hover:-translate-y-1 active:scale-[0.98]">
                        Publish Video 🚀
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminDashboard;