import { useState, useEffect, useCallback } from "react";

const useResponsiveDrawer = (breakpoint = 768) => {
  // Initialize states without accessing `window`
  const [isMobile, setIsMobile] = useState(false); // Assume desktop first, or use a different initial state as needed
  const [isOpen, setIsOpen] = useState(true); // Default state, adjust as needed

  useEffect(() => {
    // Define handleResize inside useEffect to ensure it's only used client-side
    const handleResize = () => {
      const currentIsMobile = window.innerWidth < breakpoint;
      setIsMobile(currentIsMobile);
      // Automatically close or open the drawer based on the screen width
      setIsOpen(!currentIsMobile);
    };

    // Call handleResize on component mount to set the initial state
    handleResize();

    // Setup event listener for future resize events
    window.addEventListener("resize", handleResize);

    // Cleanup function to remove event listener
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]); // Depend on breakpoint to re-run this effect if the breakpoint changes

  const toggleDrawer = useCallback(() => {
    setIsOpen((prevState) => !prevState);
  }, []);

  return { isMobile, isOpen, toggleDrawer };
};

export default useResponsiveDrawer;
