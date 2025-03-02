import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { GithubOutlined, LinkedinOutlined } from "@ant-design/icons";
import "./styles.css";
const ProfileCard = () => {
  const descriptions = [
    "Hello, my name is Vikrant",
    "I am a Freelancer.",
    "Hello World.",
  ];
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (charIndex < descriptions[index].length) {
      const timeout = setTimeout(() => {
        setText(descriptions[index].slice(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }, 100);
      return () => clearTimeout(timeout);
    } else {
      setTimeout(() => {
        setText(" ");
        setCharIndex(0);
        setIndex((prevIndex) => (prevIndex + 1) % descriptions.length);
      }, 2000);
    }
  }, [charIndex, index, descriptions]);

  return (
    <div className="flex flex-col-reverse md:flex-row justify-center items-center w-full max-w-6xl mx-auto p-4 text-white font-poppins">
      
      {/* Developer Details */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="w-full md:w-1/2 text-center md:text-left px-4"
      >
        <motion.h1
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-white"
          animate={{ textShadow: ["0px 0px 10px #006400", "0px 0px 10px #004d00"] }}
          transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
        >
          My name is Vikrant
        </motion.h1>

        <p className="text-green-500 text-lg sm:text-xl mt-2">
          {text}
          <span className="animate-blink">|</span>
        </p>

        <p className="mt-2 text-gray-400 text-sm sm:text-base italic font-openSans">
          Hello, my name is Vikrant. And I am a Lorem Ipsum is simply dummy text
          of the printing and typesetting industry.
        </p>

        {/* Button & Icons */}
        <motion.div 
          initial={{ y: 50, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ duration: 1, delay: 1 }} 
          className="mt-6 flex flex-col sm:flex-row items-center sm:items-start gap-4"
        >
        <motion.button className="button-34  border-green-500 text-green-500 hover:bg-green-500 hover:text-black"
            
        >Download CV</motion.button>

          <div className="flex gap-6 pt-1 sm:mt-0">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <GithubOutlined className="text-3xl text-white hover:text-gray-400 transition" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <LinkedinOutlined className="text-3xl text-white hover:text-gray-400 transition" />
            </a>
          </div>
        </motion.div>
      </motion.div>

      {/* Profile Image */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="w-full md:w-1/2 flex justify-center mt-8 md:mt-0"
      >
        <div
          className="w-64 h-64 sm:w-96 sm:h-96 md:w-96 md:h-96 bg-cover bg-center rounded-full"
          style={{
            backgroundImage: `url('https://wallpaperaccess.com/full/1672449.jpg')`,
              maskImage: `url('/image.png')`,
              WebkitMaskImage: `url('/image.png')`,
              maskSize: "contain", // Fits inside the div
              WebkitMaskSize: "contain",
              maskPosition: "center",
              WebkitMaskPosition: "center",
              maskRepeat: "no-repeat",
              WebkitMaskRepeat: "no-repeat",
          }}
        ></div>
      </motion.div>

    </div>
  );
};

export default ProfileCard;
