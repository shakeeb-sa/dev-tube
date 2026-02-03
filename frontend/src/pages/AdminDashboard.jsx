import React, { useState, useEffect } from 'react'; // ADDED useEffect
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
// Added Trash2, Clock, and Eye to the list below
import { PlusCircle, Youtube, Tag, Type, List, Trash2, Clock, Eye } from 'lucide-react'; 

const AdminDashboard = () => {
    const { token } = useAuth();
    const [formData, setFormData] = useState({
        videoId: '', title: '', category: 'js', duration: '', views: ''
    });
    const [adminVideos, setAdminVideos] = useState([]); // ADDED

    // Fetch videos for management
    const fetchAdminVideos = async () => {
        const res = await axios.get('http://localhost:5000/api/videos');
        setAdminVideos(res.data);
    };

    useEffect(() => {
        fetchAdminVideos();
    }, []);

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

        const deleteVideo = async (id) => {
        if (!window.confirm("Are you sure you want to remove this video?")) return;
        try {
            await axios.delete(`http://localhost:5000/api/videos/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setAdminVideos(adminVideos.filter(v => v._id !== id));
        } catch (err) {
            alert("Delete failed");
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

                            {/* --- VIDEO MANAGEMENT TABLE --- */}
                <div className="mt-12 bg-slate-850 rounded-2xl border border-slate-700 overflow-hidden shadow-xl">
                    <div className="p-6 border-b border-slate-700 bg-slate-800/50">
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            <List className="text-primary-400 w-5 h-5" /> Manage Library ({adminVideos.length})
                        </h2>
                    </div>
                    <div className="max-h-[500px] overflow-y-auto custom-scrollbar">
                        <table className="w-full text-left border-collapse">
                            <thead className="sticky top-0 bg-slate-800 text-[10px] font-black uppercase text-slate-500 tracking-widest border-b border-slate-700">
                                <tr>
                                    <th className="px-6 py-4">Tutorial</th>
                                    <th className="px-6 py-4">Category</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800">
                                {adminVideos.map((v) => (
                                    <tr key={v._id} className="hover:bg-slate-800/30 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-semibold text-slate-200 line-clamp-1">{v.title}</span>
                                                <span className="text-[10px] text-slate-500 font-mono uppercase">{v.videoId}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-400 text-[10px] font-bold border border-slate-700 uppercase">
                                                {v.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button 
    onClick={() => deleteVideo(v._id)}
    className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
    title="Delete Video"
>
    <Trash2 size={16} />
</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
        </div>
    );
};

export default AdminDashboard;