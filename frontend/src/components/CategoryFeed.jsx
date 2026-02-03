import React from 'react';
import { useParams } from 'react-router-dom';
import VideoCard from './VideoCard';
import { videoData, categories } from '../data/videos';
import { FolderOpen } from 'lucide-react';

const CategoryFeed = ({ videos }) => { // Accept videos as a prop
  const { categoryId } = useParams();

  // 1. Find category info
  const categoryInfo = categories.find(c => c.id === categoryId) || { label: categoryId.toUpperCase() };

  // 2. Filter from the MERN database videos instead of the static file
  const filteredVideos = videos.filter(
    (video) => video.category.toLowerCase() === categoryId.toLowerCase()
  );

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <span className="text-primary-500">#</span> {categoryInfo.label}
        </h1>
        <p className="text-slate-400">
          {filteredVideos.length} {filteredVideos.length === 1 ? 'video' : 'videos'} curated for you.
        </p>
      </div>

      {/* Grid or Empty State */}
      {filteredVideos.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {filteredVideos.map((video) => (
            <VideoCard key={video.videoId} video={video} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 border border-dashed border-slate-700 rounded-xl bg-slate-800/30">
          <div className="bg-slate-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <FolderOpen className="w-8 h-8 text-slate-500" />
          </div>
          <h3 className="text-xl font-semibold text-white">No videos found</h3>
          <p className="text-slate-400 mt-2">
            We haven't added videos for <span className="text-primary-400">{categoryInfo.label}</span> yet.
          </p>
        </div>
      )}
    </div>
  );
};

export default CategoryFeed;