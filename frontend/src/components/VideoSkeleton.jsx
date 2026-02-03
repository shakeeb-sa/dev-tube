import React from 'react';

const VideoSkeleton = () => {
  return (
    <div className="bg-slate-850 rounded-xl overflow-hidden border border-slate-800 p-0">
      <div className="aspect-video w-full skeleton" />
      <div className="p-4 space-y-3">
        <div className="h-2 w-16 skeleton rounded-full" />
        <div className="h-4 w-full skeleton rounded-md" />
        <div className="h-4 w-2/3 skeleton rounded-md" />
        <div className="flex gap-3 pt-2">
            <div className="h-3 w-12 skeleton rounded-md" />
            <div className="h-3 w-12 skeleton rounded-md" />
        </div>
      </div>
    </div>
  );
};

export default VideoSkeleton;