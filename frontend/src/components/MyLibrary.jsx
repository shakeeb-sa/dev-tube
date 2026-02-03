import React from 'react';
import { useBookmarks } from '../context/BookmarkContext';
import VideoCard from './VideoCard';
import { Bookmark, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const MyLibrary = ({ videos }) => { // 1. Accept videos as prop
  const { savedIds } = useBookmarks();

  // 2. FIX: Filter from the database videos list
  const myVideos = videos.filter(video => savedIds.includes(video.videoId));

  return (
    <div>
      {/* Header */}
      <div className="mb-8 border-b border-slate-800 pb-8">
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <Bookmark className="w-8 h-8 text-primary-500 fill-current" />
          My Library
        </h1>
        <p className="text-slate-400">
          You have saved <span className="text-white font-bold">{myVideos.length}</span> videos to watch later.
        </p>
      </div>

      {/* Grid or Empty State */}
      {myVideos.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {myVideos.map((video) => (
            <VideoCard key={video.videoId} video={video} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24 border border-dashed border-slate-700 rounded-xl bg-slate-800/30">
          <div className="bg-slate-800 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Search className="w-10 h-10 text-slate-500" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Your library is empty</h3>
          <p className="text-slate-400 max-w-md mx-auto mb-8">
            Start building your personal playlist by clicking the bookmark icon on any video card.
          </p>
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-500 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Browse Videos
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyLibrary;