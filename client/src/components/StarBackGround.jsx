import { useEffect } from "react";
import "tailwindcss/tailwind.css";

const StarsBackground = () => {
  useEffect(() => {
    const canvas = document.getElementById("starsCanvas");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const stars = [];

    let count = window.innerWidth <= 800 ? 80 : 100;
    for (let i = 0; i < count; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const brightness = Math.random();
      const velocityX = (Math.random() - 0.5) * 0.5;
      const velocityY = (Math.random() - 0.5) * 0.6;
      const size = Math.random() * 2 + 1; // Adjusted for more visible size
      stars.push({ x, y, brightness, velocityX, velocityY, size });
    }

    const animate = () => {
      // Create a gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, "rgb(10, 10, 10)"); // Dark black
      gradient.addColorStop(1, "rgb(10, 10, 25)"); // Lighter black
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star) => {
        star.x += star.velocityX;
        star.y += star.velocityY;

        if (star.x < 0) star.x = canvas.width;
        else if (star.x > canvas.width) star.x = 0;
        if (star.y < 0) star.y = canvas.height;
        else if (star.y > canvas.height) star.y = 0;

        ctx.beginPath();

        // Randomly assign color: 80% white, 20% neon green
        const isGreen = Math.random() < 0.2; // 20% chance to be green
        ctx.fillStyle = isGreen ? "rgb(57, 255, 20)" : "white"; // White or neon green

        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return <canvas id="starsCanvas" className="fixed top-0 left-0 w-full h-full -z-10"></canvas>;
}

export default StarsBackground;
