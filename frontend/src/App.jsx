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

  // 1. Fetch Videos from MongoDB
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/videos');
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
      <div className="h-screen bg-slate-900 flex flex-col items-center justify-center text-white">
        <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-slate-400 font-medium animate-pulse">Loading Workspace...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-slate-900 text-slate-100 overflow-hidden">
      
      {/* Sidebar with Mobile State */}
      <Sidebar 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
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
            
            {/* Global Search Bar (Sticky at top of content) */}
            <div className="mb-8 relative">
              <div className="relative max-w-xl">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search tutorials (e.g., 'React', 'API', 'Docker')..."
                  className="block w-full pl-10 pr-3 py-3 border border-slate-700 rounded-xl leading-5 bg-slate-800 text-slate-100 placeholder-slate-400 focus:outline-none focus:bg-slate-800 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition duration-150 ease-in-out sm:text-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
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