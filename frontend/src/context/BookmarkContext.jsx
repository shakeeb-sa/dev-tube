import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const BookmarkContext = createContext();

export const BookmarkProvider = ({ children }) => {
  const { user, setUser, token } = useAuth();
  const [savedIds, setSavedIds] = useState([]);

  // 1. Initial Sync: When user logs in, set the savedIds from their profile
  useEffect(() => {
    if (user && user.bookmarks) {
      setSavedIds(user.bookmarks);
    } else {
      setSavedIds([]);
    }
  }, [user]);

  // 2. Toggle Bookmark with instant UI update
  const toggleBookmark = async (videoId) => {
    if (!token) {
      alert("Please sign in to save videos.");
      return;
    }

    // Optimistic Update: Update the UI immediately so it doesn't feel laggy
    const isCurrentlySaved = savedIds.includes(videoId);
    const newSavedIds = isCurrentlySaved 
      ? savedIds.filter(id => id !== videoId) 
      : [...savedIds, videoId];
    
    setSavedIds(newSavedIds);

    try {
      const { data } = await axios.put('http://localhost:5000/api/auth/bookmark', 
        { videoId }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      // Update the actual user object in AuthContext so everything is in sync
      const updatedUser = { ...user, bookmarks: data };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
    } catch (err) {
      console.error("Sync failed, rolling back UI");
      setSavedIds(savedIds); // Rollback if the database call fails
    }
  };

  const isBookmarked = (videoId) => savedIds.includes(videoId);

  return (
    <BookmarkContext.Provider value={{ savedIds, toggleBookmark, isBookmarked }}>
      {children}
    </BookmarkContext.Provider>
  );
};

export const useBookmarks = () => useContext(BookmarkContext);