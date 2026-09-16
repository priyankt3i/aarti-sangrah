import { useState, useEffect, useRef, useCallback } from 'react';

export function useAutoScroll(speedLevel: number, isEnabled: boolean) {
  const [isScrolling, setIsScrolling] = useState(false);
  const [isPausedByManualScroll, setIsPausedByManualScroll] = useState(false);
  const scrollRafRef = useRef<number | null>(null);
  const lastScrollTimeRef = useRef<number | null>(null);
  const fractionalScrollRef = useRef<number>(0);
  
  // speed 1 to 3 mapped to pixels per second (Slow, Medium, Fast)
  const speedMap: Record<number, number> = {
    1: 20, // Slow
    2: 35, // Medium
    3: 50, // Fast
  };

  const startScroll = useCallback(() => {
    setIsScrolling(true);
    setIsPausedByManualScroll(false);
    lastScrollTimeRef.current = null;
  }, []);

  const pauseScroll = useCallback(() => {
    setIsScrolling(false);
    if (scrollRafRef.current) {
      cancelAnimationFrame(scrollRafRef.current);
    }
  }, []);

  const resumeScroll = useCallback(() => {
    startScroll();
  }, [startScroll]);

  const toggleScroll = useCallback(() => {
    if (isScrolling) {
      pauseScroll();
    } else {
      startScroll();
    }
  }, [isScrolling, pauseScroll, startScroll]);

  // Handle actual scrolling animation
  useEffect(() => {
    if (!isEnabled || !isScrolling) return;

    const scrollStep = (timestamp: number) => {
      if (!lastScrollTimeRef.current) {
        lastScrollTimeRef.current = timestamp;
      }
      
      const deltaTime = timestamp - lastScrollTimeRef.current;
      lastScrollTimeRef.current = timestamp;
      
      const pixelsPerSecond = speedMap[speedLevel] || speedMap[2];
      const pixelsToScroll = (pixelsPerSecond * deltaTime) / 1000 + fractionalScrollRef.current;
      
      const intPixels = Math.floor(pixelsToScroll);
      fractionalScrollRef.current = pixelsToScroll - intPixels;

      if (intPixels > 0) {
        window.scrollBy({ top: intPixels, behavior: 'instant' });
      }

      // Check if we hit the bottom
      const scrolledToBottom = Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight;
      
      if (scrolledToBottom) {
        setIsScrolling(false);
        return;
      }

      scrollRafRef.current = requestAnimationFrame(scrollStep);
    };

    scrollRafRef.current = requestAnimationFrame(scrollStep);

    return () => {
      if (scrollRafRef.current) {
        cancelAnimationFrame(scrollRafRef.current);
      }
    };
  }, [isScrolling, isEnabled, speedLevel]);

  // Handle manual scroll interrupt
  useEffect(() => {
    let scrollTimeout: number;
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (!isScrolling) return;
      
      // If the scroll was triggered by the user (significant difference from what auto-scroll would do)
      // Actually, detecting programmatic vs manual scroll is tricky.
      // A simple approach: if scroll delta is large, or just any wheel/touch event
      setIsPausedByManualScroll(true);
      setIsScrolling(false);
    };

    const handleWheelOrTouch = () => {
      if (isScrolling) {
        setIsPausedByManualScroll(true);
        setIsScrolling(false);
      }
    };

    window.addEventListener('wheel', handleWheelOrTouch, { passive: true });
    window.addEventListener('touchstart', handleWheelOrTouch, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheelOrTouch);
      window.removeEventListener('touchstart', handleWheelOrTouch);
    };
  }, [isScrolling]);

  // Stop if disabled
  useEffect(() => {
    if (!isEnabled) {
      pauseScroll();
    }
  }, [isEnabled, pauseScroll]);

  return {
    isScrolling,
    isPausedByManualScroll,
    toggleScroll,
    resumeScroll,
    pauseScroll
  };
}
