import { useState, useEffect, useCallback } from 'react';

const useResponsiveDrawer = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const currentIsMobile = window.innerWidth < breakpoint;
      setIsMobile(currentIsMobile);
      setIsOpen(!currentIsMobile);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint]);

  const toggleDrawer = useCallback(() => {
    setIsOpen((prevState) => !prevState);
  }, []);

  return { isMobile, isOpen, toggleDrawer };
};

export default useResponsiveDrawer;
