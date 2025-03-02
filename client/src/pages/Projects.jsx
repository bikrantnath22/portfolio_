import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import StarsBackground from "../components/StarBackGround";
import ProjectPage from "../components/ProjectPage";

const Projects = ({ children }) => {
  const navigate = useNavigate();
  const lastScrollYRef = useRef(0);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isPaginating, setIsPaginating] = useState(false); // Track button clicks

  useEffect(() => {
    if (window.innerWidth < 768) return; // Disable for mobile
  
    const handleScroll = () => {
      if (isPaginating) return; // Skip navigation check while changing pages
  
      const currentScrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
  
      // Ensure the user has manually scrolled before enabling navigation
      if (!hasScrolled && currentScrollY > 50) {
        setHasScrolled(true);
      }
  
      // Prevent accidental triggers when documentHeight changes dynamically
      if (hasScrolled) {
        const nearTop = currentScrollY < 5 && lastScrollYRef.current > 50;
        const nearBottom = currentScrollY + windowHeight >= documentHeight - 100; // Increased threshold
  
        if (nearTop) {
          console.log("Navigating to Home");
          setTimeout(() => navigate("/"), 200);
        } else if (nearBottom) {
          console.log("Navigating to Abouts");
          setTimeout(() => navigate("/abouts"), 200);
        }
      }
  
      lastScrollYRef.current = currentScrollY;
    };
  
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navigate, hasScrolled, isPaginating]);
  

  return (
    <div className="overflow-auto min-h-screen md:overflow-hidden md:min-h-[100vh]">
      <StarsBackground />
      <div className="relative z-1 md:min-h-screen text-white">
        <ProjectPage setIsPaginating={setIsPaginating} />
      </div>

      {/* Adds extra padding to prevent auto-scrolling on last page */}
      <div className="md:h-[30vh]"></div>
      {children}
    </div>
  );
};

export default Projects;
