import React, { useState, useRef, useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import axios from 'axios'; // ADDED
import Sidebar from './components/Sidebar';
import MobileHeader from './components/MobileHeader';
import VideoCard from './components/VideoCard';
import CategoryFeed from './components/CategoryFeed';
import MyLibrary from './components/MyLibrary';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard'; // ADDED
import VideoPlayer from './pages/VideoPlayer'; // ADD THIS
import VideoSkeleton from './components/VideoSkeleton'; // ADDED
import { useAuth } from './context/AuthContext';
import { Search } from 'lucide-react';
// Note: We removed videoData import because we now use MongoDB

function App() {
  const { user } = useAuth(); // ADDED
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [videos, setVideos] = useState([]); // ADDED
  const [loading, setLoading] = useState(true); // ADDED
  
  const mainContentRef = useRef(null);
  const location = useLocation();

   useEffect(() => {
    const fetchVideos = async () => {
      // Logic to pick Local or Live API
      const url = window.location.hostname === 'localhost' 
        ? 'http://localhost:5000/api/videos' 
        : 'https://dev-tube-self.vercel.app/api/videos';

      try {
        const res = await axios.get(url);
        setVideos(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Fetch error:", err);
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  useEffect(() => {
    if (mainContentRef.current) {
      mainContentRef.current.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [location.pathname]);

  // 2. Filter using the "videos" state (from DB)
  const filteredVideos = videos.filter(video => 
    video.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex h-screen bg-slate-900 text-slate-100 overflow-hidden">
        <Sidebar isOpen={false} onClose={() => {}} />
        <div className="flex-1 flex flex-col h-screen w-full relative">
          <main className="flex-1 overflow-y-auto p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
              <div className="h-12 w-64 skeleton rounded-xl mb-12" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map(i => <VideoSkeleton key={i} />)}
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-slate-900 text-slate-100 overflow-hidden">
      
      {/* Sidebar with Mobile State */}
      <Sidebar 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)}
        videos={videos} // ADD THIS PROP 
      />

      {/* Main Layout */}
      <div className="flex-1 flex flex-col h-screen w-full relative">
        
        {/* Mobile Header */}
        <MobileHeader onMenuClick={() => setIsMobileMenuOpen(true)} />

        {/* Scrollable Content Area */}
        {/* Added ref={mainContentRef} here to control scrolling */}
        <main 
          ref={mainContentRef}
          className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth"
        >
          <div className="max-w-7xl mx-auto">
            
            {/* Global Search Bar (SaaS Style) */}
            <div className="mb-12 relative">
              <div className="relative max-w-2xl group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-slate-500 group-focus-within:text-primary-400 transition-colors" />
                </div>
                <input
                  type="text"
                  placeholder="Search 85+ tutorials... (Try 'React' or 'MERN')"
                  className="block w-full pl-12 pr-12 py-4 border border-slate-800 rounded-2xl leading-5 bg-slate-850 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-all shadow-xl"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                   <span className="hidden sm:block text-[10px] font-bold text-slate-600 border border-slate-700 px-1.5 py-0.5 rounded-md">CTRL /</span>
                </div>
              </div>
            </div>

            <Routes>
              {/* HOME PAGE */}
              <Route path="/" element={
                <div>
                  <div className="mb-6">
                    <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                      {searchTerm ? `Results for "${searchTerm}"` : "Welcome Back, Coder"}
                    </h1>
                    <p className="text-slate-400 text-sm md:text-base">
                      {searchTerm 
                        ? `Found ${filteredVideos.length} matching videos.` 
                        : "Here are your recommended videos for today."}
                    </p>
                  </div>
                  
                  {filteredVideos.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                      {filteredVideos.map((video) => (
                        <VideoCard key={video.videoId} video={video} />
                      ))}
                    </div>
                  ) : (
                    <div className="py-20 text-center text-slate-500">
                      <p className="text-xl">No videos found matching "{searchTerm}"</p>
                      <button 
                        onClick={() => setSearchTerm("")}
                        className="mt-4 text-primary-500 hover:text-primary-400 font-medium"
                      >
                        Clear Search
                      </button>
                    </div>
                  )}
                </div>
              } />
              
              <Route path="/library" element={<MyLibrary videos={videos} />} />
              <Route path="/category/:categoryId" element={<CategoryFeed videos={videos} />} />
              <Route path="/watch/:videoId" element={<VideoPlayer videos={videos} />} /> {/* ADD THIS */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* PROTECTED ADMIN ROUTE */}
              <Route 
                path="/admin" 
                element={user?.role === 'admin' ? <AdminDashboard /> : <Navigate to="/" />} 
              />
              
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;