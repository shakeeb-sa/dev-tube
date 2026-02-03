import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useBookmarks } from '../context/BookmarkContext';
import { 
  ChevronLeft, Bookmark, Save, Clock, 
  BookOpen, CheckCircle, Info
} from 'lucide-react';

const VideoPlayer = ({ videos }) => {
  const { videoId } = useParams();
  const { token, user } = useAuth();
  const { toggleBookmark, isBookmarked } = useBookmarks();
  
  const [video, setVideo] = useState(null);
  const [note, setNote] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');

  // 1. Initial Data Load
  useEffect(() => {
    const currentVideo = videos.find(v => v.videoId === videoId);
    setVideo(currentVideo);
    if (token) fetchNote();
  }, [videoId, videos, token]);

  // 2. AUTO-SAVE LOGIC (Debouncing)
  useEffect(() => {
    if (!note || !token) return;

    const delayDebounceFn = setTimeout(() => {
      handleSaveNote(); // Triggers save 1.5s after typing stops
    }, 1500);

    return () => clearTimeout(delayDebounceFn);
  }, [note]); // Only re-run if note text changes

  const fetchNote = async () => {
    try {
      const { data } = await axios.get(`http://localhost:5000/api/notes/${videoId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNote(data.content);
    } catch (err) {
      console.error("Failed to fetch notes");
    }
  };

  const handleSaveNote = async () => {
    if (!token) return;
    setSaveStatus('Saving...'); // Added feedback
    try {
      await axios.post('http://localhost:5000/api/notes', 
        { videoId, content: note },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSaveStatus('Changes synced');
      setTimeout(() => setSaveStatus(''), 2000);
    } catch (err) {
      setSaveStatus('Offline - Saving failed');
    }
  };

  if (!video) return <div className="p-20 text-center text-white">Video not found...</div>;

  return (
    <div className="flex flex-col h-screen bg-slate-950 text-white overflow-hidden">
      
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between p-4 bg-slate-900 border-b border-slate-800">
        <Link to="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
          <ChevronLeft className="w-5 h-5" />
          <span className="font-medium">Back to Workspace</span>
        </Link>
        <div className="flex items-center gap-4">
            {saveStatus && <span className="text-xs text-green-400 font-medium">{saveStatus}</span>}
            <button 
                onClick={() => toggleBookmark(videoId)}
                className={`p-2 rounded-lg border ${isBookmarked(videoId) ? 'bg-primary-600 border-primary-500' : 'border-slate-700 hover:bg-slate-800'}`}
            >
                <Bookmark className={`w-4 h-4 ${isBookmarked(videoId) ? 'fill-current' : ''}`} />
            </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
        
        {/* LEFT SIDE: Video Player & Info */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-8 custom-scrollbar">
          <div className="max-w-5xl mx-auto">
            {/* The Player */}
            <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-2xl bg-black border border-slate-800">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${videoId}?rel=0&showinfo=0&modestbranding=1`}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            {/* Video Meta Info */}
            <div className="mt-8 pb-12">
              <div className="flex items-center gap-2 mb-4">
                 <span className="px-3 py-1 rounded-full bg-primary-500/10 text-primary-400 text-xs font-bold uppercase tracking-widest border border-primary-500/20">
                    {video.category}
                 </span>
                 <span className="flex items-center gap-1 text-slate-500 text-xs font-medium ml-4">
                    <Clock className="w-3 h-3" /> {video.duration}
                 </span>
              </div>
              <h1 className="text-2xl lg:text-3xl font-bold mb-4">{video.title}</h1>
              <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-xl">
                 <h3 className="flex items-center gap-2 text-sm font-bold text-slate-300 mb-2 uppercase tracking-wider">
                    <Info className="w-4 h-4" /> Lesson Description
                 </h3>
                 <p className="text-slate-400 leading-relaxed text-sm lg:text-base">
                    This is a curated professional tutorial covering {video.category}. Master the core concepts and implement them in your real-world projects.
                 </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: Professional Notepad */}
        <div className="w-full lg:w-96 bg-slate-900 border-l border-slate-800 flex flex-col shadow-2xl">
          <div className="p-6 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary-500" />
                <h2 className="font-bold">Study Notes</h2>
            </div>
            <button 
                onClick={handleSaveNote}
                disabled={isSaving || !token}
                className="flex items-center gap-2 bg-primary-600 hover:bg-primary-500 disabled:opacity-50 text-white text-xs font-bold px-3 py-2 rounded-lg transition-all"
            >
                <Save className="w-3 h-3" /> {isSaving ? 'Saving...' : 'Save'}
            </button>
          </div>

          <div className="flex-1 p-0 relative">
            {!token && (
                <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm z-10 flex items-center justify-center p-8 text-center">
                    <div>
                        <p className="text-slate-300 mb-4">Please sign in to take notes for this lesson.</p>
                        <Link to="/login" className="text-primary-400 font-bold hover:underline">Sign In</Link>
                    </div>
                </div>
            )}
            <textarea
              className="w-full h-full bg-transparent p-6 text-slate-300 placeholder-slate-600 focus:outline-none resize-none leading-relaxed text-sm"
              placeholder="Start typing your code snippets or study notes here..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
            ></textarea>
          </div>
          
          <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center gap-2 text-[10px] text-slate-500 font-medium">
             <CheckCircle className="w-3 h-3 text-green-500" />
             Notes are synced to your cloud account.
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;