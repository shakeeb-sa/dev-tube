import React from 'react';
import { Play, Bookmark, Clock, Eye } from 'lucide-react';
import { useBookmarks } from '../context/BookmarkContext'; // Import hook

const VideoCard = ({ video }) => {
  const { toggleBookmark, isBookmarked } = useBookmarks();
  const isSaved = isBookmarked(video.videoId);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="group relative bg-slate-850 rounded-xl overflow-hidden border border-slate-800 hover:border-primary-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary-500/10 hover:-translate-y-1">
      
      {/* Thumbnail Section */}
      <div className="aspect-video relative overflow-hidden bg-slate-900">
        <img 
          src={`https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`} 
          alt={video.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-90 group-hover:opacity-100"
          onError={(e) => {
            e.target.src = `https://img.youtube.com/vi/${video.videoId}/mqdefault.jpg`;
          }}
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-60" />

        <div className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-sm text-xs font-medium text-white px-2 py-1 rounded-md flex items-center gap-1">
            <Clock className="w-3 h-3 text-primary-400" />
            {video.duration}
        </div>

        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30 backdrop-blur-[2px]">
            <div className="bg-primary-500 text-white p-3 rounded-full shadow-lg transform scale-50 group-hover:scale-100 transition-transform duration-300">
                <Play className="w-6 h-6 fill-current" />
            </div>
        </div>

        {/* Save Button (INTERACTIVE NOW) */}
        <button 
            onClick={(e) => {
                e.preventDefault(); // Prevent opening the video link
                e.stopPropagation();
                toggleBookmark(video.videoId);
            }}
            className={`absolute top-2 right-2 p-2 rounded-full backdrop-blur-md transition-all duration-200 z-30
                ${isSaved 
                    ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/40' 
                    : 'bg-black/40 text-white hover:bg-primary-500'
                }`}
        >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
        </button>
      </div>

      <div className="p-4">
        <div className="mb-2 flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary-400 bg-primary-500/10 px-2 py-1 rounded-full border border-primary-500/20">
                {video.category}
            </span>
        </div>

        <h3 className="text-base font-semibold text-slate-100 leading-snug line-clamp-2 mb-2 group-hover:text-primary-400 transition-colors">
            {video.title}
        </h3>

        <div className="flex items-center text-slate-500 text-xs font-medium gap-3 mt-3 border-t border-slate-800 pt-3">
            <div className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                <span>{video.views}</span>
            </div>
            <div className="flex items-center gap-1">
                <span className="w-1 h-1 bg-slate-600 rounded-full"></span>
                <span>{formatDate(video.date)}</span>
            </div>
        </div>
      </div>

      <a 
        href={`https://www.youtube.com/watch?v=${video.videoId}`} 
        target="_blank" 
        rel="noopener noreferrer"
        className="absolute inset-0 z-10"
      />
    </div>
  );
};

export default VideoCard;