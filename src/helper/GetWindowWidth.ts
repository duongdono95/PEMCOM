import { useState, useEffect } from 'react';

const GetWindowWidth = () => {
  // Initialize state with undefined to consider server-side rendering
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : undefined);

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window's width to state
      setWindowWidth(window.innerWidth);
    }

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);

  }, []); // Empty array means this effect runs once on mount and cleanup on unmount

  return windowWidth;
}

export default GetWindowWidth;