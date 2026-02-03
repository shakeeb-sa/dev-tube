import React, { createContext, useContext, useState, useEffect } from 'react';

const BookmarkContext = createContext();

export const BookmarkProvider = ({ children }) => {
  // Load initial state from LocalStorage
  const [savedIds, setSavedIds] = useState(() => {
    const saved = localStorage.getItem('mySavedVideos');
    return saved ? JSON.parse(saved) : [];
  });

  // Save to LocalStorage whenever the list changes
  useEffect(() => {
    localStorage.setItem('mySavedVideos', JSON.stringify(savedIds));
  }, [savedIds]);

  // Function to toggle save state
  const toggleBookmark = (videoId) => {
    setSavedIds(prev => {
      if (prev.includes(videoId)) {
        return prev.filter(id => id !== videoId); // Remove
      } else {
        return [...prev, videoId]; // Add
      }
    });
  };

  // Check if a specific video is saved
  const isBookmarked = (videoId) => savedIds.includes(videoId);

  return (
    <BookmarkContext.Provider value={{ savedIds, toggleBookmark, isBookmarked }}>
      {children}
    </BookmarkContext.Provider>
  );
};

// Custom hook to use this easily in other files
export const useBookmarks = () => useContext(BookmarkContext);