import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // "smooth" scrolling looks nice, but sometimes "auto" is better for page changes.
    // Let's use instant scrolling so the user sees the header immediately.
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", 
    });
  }, [pathname]); // Run this everytime the URL path changes

  return null;
};

export default ScrollToTop;