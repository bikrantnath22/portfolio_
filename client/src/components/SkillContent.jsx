import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import {
  FaJs,
  FaCuttlefish,
  FaPython,
  FaDatabase,
  FaReact,
  FaNodeJs,
} from "react-icons/fa";
import {
  SiMysql,
  SiMongodb,
  SiPostgresql,
  SiNextdotjs,
  SiTailwindcss,
} from "react-icons/si";
import StarsBackground from "./StarBackGround";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";

const skillCategories = {
  Language: [
    { name: "JavaScript", icon: <FaJs className="text-yellow-400 text-3xl" /> },
    { name: "C", icon: <FaCuttlefish className="text-blue-500 text-3xl" /> },
    { name: "Python", icon: <FaPython className="text-blue-300 text-3xl" /> },
  ],
  Database: [
    { name: "MySQL", icon: <SiMysql className="text-blue-500 text-3xl" /> },
    {
      name: "MongoDB",
      icon: <SiMongodb className="text-green-400 text-3xl" />,
    },
    {
      name: "PostgreSQL",
      icon: <SiPostgresql className="text-blue-300 text-3xl" />,
    },
  ],
  "Framework/Library": [
    { name: "React", icon: <FaReact className="text-blue-400 text-3xl" /> },
    {
      name: "Next.js",
      icon: <SiNextdotjs className="text-gray-200 text-3xl" />,
    },
    {
      name: "Tailwind CSS",
      icon: <SiTailwindcss className="text-teal-400 text-3xl" />,
    },
    { name: "Node.js", icon: <FaNodeJs className="text-green-500 text-3xl" /> },
  ],
};

const SkillsContactPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("Language");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    description: "",
  });

  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);  // Show loader when submitting

    try {
        const response = await axios.post("http://localhost:5000/send-email", formData);
        setMessage(response.data.message);
        setFormData({ name: "", email: "", description: "" });
    } catch (error) {
        setMessage("Failed to send message. Try again.");
    } finally {
        setLoading(false);  // Hide loader after response
    }
};

  return (
    <div>
      <StarsBackground />
      <div className="flex flex-col md:flex-row justify-center items-center h-screen  text-white p-3 md:p-10">
        {/* Left - Skills Section */}
        <motion.div
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="w-full md:w-1/2 md:p-8"
        >
          <h2 className="text-3xl font-bold mb-4 text-green-400">My Skills</h2>

          {/* Skill Category Tabs */}
          <div className="flex md:justify-normal justify-evenly md:space-x-4 mb-4">
            {Object.keys(skillCategories).map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg  ${
                  selectedCategory === category
                    ? "bg-green-500 text-black"
                    : "bg-transparent text-white hover:bg-slate-900"
                } transition`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Animated Skill List with Icons */}
          <motion.ul
            className="grid grid-cols-2 md:gap-4 text-lg"
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.2 } },
            }}
          >
            <AnimatePresence mode="wait">
              {skillCategories[selectedCategory].map((skill) => (
                <motion.li
                  key={skill.name}
                  className="flex items-center space-x-2  p-3 rounded"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  {skill.icon}
                  <span>{skill.name}</span>
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        </motion.div>

        {/* Right - Contact Form */}
        <motion.div
          initial={{ x: 200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="w-full md:w-1/2 md:p-8  rounded-lg shadow-xl mt-6 md:mt-0"
        >
          <h2 className="text-3xl font-bold mb-4 text-blue-400">Contact Me</h2>
          
          <form className="flex flex-col space-y-4 " onSubmit={handleSubmit}>
            <input
            type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required
              className="p-3 rounded bg-slate-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
            type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required
              className="p-3 rounded bg-slate-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <textarea
              rows="4"
              name="description" placeholder="Your Message" value={formData.description} onChange={handleChange} required
              className="p-3 rounded bg-slate-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            ></textarea>
            {message && <p className="mb-2">{message}</p>}
            <button
            type="submit" disabled={loading}
              
              className="p-3 bg-blue-500 text-white rounded hover:bg-blue-600 w-full h-12 flex items-center justify-center"
            >
            {loading ? <ClipLoader/> : "Send Message"}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default SkillsContactPage;
