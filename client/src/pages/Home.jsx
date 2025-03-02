import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "tailwindcss/tailwind.css";
import ProfileCard from "../components/Profile";
import StarsBackground from "../components/StarBackGround";
import BottomNavBar from "../components/BottomNav";

const App = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [lastScrollY, setLastScrollY] = useState(0);

  // Check if device is mobile
  const isMobile = window.innerWidth <= 768; // Adjust breakpoint if needed

  // Reset Scroll Position when Page Changes
  useEffect(() => {
    window.scrollTo(0, 0); // Reset scroll to top on navigation
  }, [location.pathname]);

  useEffect(() => {
    if (isMobile) return; // 🚫 Stop scroll-based navigation on mobile

    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const viewportHeight = window.innerHeight;
      const totalPageHeight = document.documentElement.scrollHeight;

      // **🟢 Scroll Down → Move to Next Page**
      if (scrollY > lastScrollY && scrollY + viewportHeight >= totalPageHeight - 20) {
        if (location.pathname === "/") {
          setTimeout(() => navigate("/project"), 300);
        } else if (location.pathname === "/project") {
          setTimeout(() => navigate("/abouts"), 300);
        }
      } 
      // **🔴 Scroll Up → Go Back**
      else if (scrollY < lastScrollY && scrollY <= 0) {
        if (location.pathname === "/abouts") {
          setTimeout(() => navigate("/project"), 300);
        } else if (location.pathname === "/project") {
          setTimeout(() => navigate("/"), 300);
        }
      }

      setLastScrollY(scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, navigate, location.pathname, isMobile]);

  return (
    <div className="overflow-auto min-h-screen">
      <StarsBackground />
      <div className="relative z-1 flex flex-col items-center justify-center min-h-screen text-white text-2xl">
        <ProfileCard />
      </div>
      <div className="md:h-[2vh]"></div> {/* Adds enough space for scrolling */}
      {children}
      
    </div>
  );
};

export default App;
