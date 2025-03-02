import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import StarsBackground from "../components/StarBackGround";
import SkillsContactPage from "../components/SkillContent";

const Abouts = ({ children }) => {
  const navigate = useNavigate();
  const lastScrollYRef = useRef(window.scrollY);
  const hasScrolledDownRef = useRef(false); // Prevents auto-navigation on load

  useEffect(() => {
    if (window.innerWidth < 768) return;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // If the user scrolls down at least 50px, enable scrolling up navigation
      if (!hasScrolledDownRef.current && currentScrollY > 50) {
        hasScrolledDownRef.current = true;
      }

      // Navigate only if the user has previously scrolled down
      if (hasScrolledDownRef.current && currentScrollY < lastScrollYRef.current && currentScrollY <= 5) {
        console.log("Navigating to /projects");
        navigate("/project");
      }

      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navigate]);

  return (
    <div className="overflow-auto min-h-screen">
      <StarsBackground />
      <div className="relative z-1">
        <SkillsContactPage />
      </div>
      <div className="md:h-[10vh]"></div>
      {children}
    </div>
  );
};

export default Abouts;
