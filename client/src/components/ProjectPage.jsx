import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import StarsBackground from "./StarBackGround";
import { ArrowRightOutlined, ArrowLeftOutlined } from "@ant-design/icons";

const projects = [
  {
    id: 1,
    title: "Project 1",
    image:
      "https://th.bing.com/th/id/OIP.5lgvHjtEF7VAX6sQVVszeQHaFe?rs=1&pid=ImgDetMain",
    link: "#",
    description: "Description for Project 1",
  },
  {
    id: 2,
    title: "Project 2",
    image:
      "https://th.bing.com/th/id/OIP.5lgvHjtEF7VAX6sQVVszeQHaFe?rs=1&pid=ImgDetMain",
    link: "#",
    description: "Description for Project 2",
  },
  {
    id: 3,
    title: "Project 3",
    image:
      "https://th.bing.com/th/id/OIP.5lgvHjtEF7VAX6sQVVszeQHaFe?rs=1&pid=ImgDetMain",
    link: "#",
    description: "Description for Project 3",
  },
  {
    id: 4,
    title: "Project 4",
    image:
      "https://th.bing.com/th/id/OIP.5lgvHjtEF7VAX6sQVVszeQHaFe?rs=1&pid=ImgDetMain",
    link: "#",
    description: "Description for Project 4",
  },
  {
    id: 5,
    title: "Project 5",
    image:
      "https://th.bing.com/th/id/OIP.5lgvHjtEF7VAX6sQVVszeQHaFe?rs=1&pid=ImgDetMain",
    link: "#",
    description: "Description for Project 5",
  },
  {
    id: 6,
    title: "Project 6",
    image:
      "https://th.bing.com/th/id/OIP.5lgvHjtEF7VAX6sQVVszeQHaFe?rs=1&pid=ImgDetMain",
    link: "#",
    description: "Description for Project 6",
  },
  {
    id: 7,
    title: "Project 7",
    image:
      "https://th.bing.com/th/id/OIP.5lgvHjtEF7VAX6sQVVszeQHaFe?rs=1&pid=ImgDetMain",
    link: "#",
    description: "Description for Project 7",
  },
  {
    id: 8,
    title: "Project 8",
    image:
      "https://th.bing.com/th/id/OIP.5lgvHjtEF7VAX6sQVVszeQHaFe?rs=1&pid=ImgDetMain",
    link: "#",
    description: "Description for Project 8",
  },
  {
    id: 9,
    title: "Project 9",
    image:
      "https://th.bing.com/th/id/OIP.5lgvHjtEF7VAX6sQVVszeQHaFe?rs=1&pid=ImgDetMain",
    link: "#",
    description: "Description for Project 9",
  },
  {
    id: 10,
    title: "Project 10",
    image:
      "https://th.bing.com/th/id/OIP.5lgvHjtEF7VAX6sQVVszeQHaFe?rs=1&pid=ImgDetMain",
    link: "#",
    description: "Description for Project 10",
  },
];

const ProjectPage = ({ setIsPaginating }) => {
  const [page, setPage] = useState(0);
  const projectsPerPage = 3;

  const handleNext = () => {
    if ((page + 1) * projectsPerPage < projects.length) {
      setIsPaginating(true); // Prevent accidental scroll nav
      setPage(page + 1);
      setTimeout(() => setIsPaginating(false), 500); // Allow scroll after animation
    }
  };

  const handlePrev = () => {
    if (page > 0) {
      setIsPaginating(true);
      setPage(page - 1);
      setTimeout(() => setIsPaginating(false), 500);
    }
  };

  return (
    <>
      <div className="">
        <StarsBackground />

        <div>
          <div className="flex flex-col items-center justify-center text-white p-4 mt-12">
            <div className="flex justify-between items-center w-full max-w-4xl">
              <h1 className="text-md md:mt-4 text-gray-200 font-extralight italic mt-4 ml-4">
                My Projects
              </h1>
              <div className="flex space-x-6 mt-4 text-sm text-gray-300">
                {page > 0 && (
                  <button
                    onClick={handlePrev}
                    className="  hover:text-green-500  rounded-full"
                  >
                    <ArrowLeftOutlined /> <span>Previous</span>
                  </button>
                )}
                {(page + 1) * projectsPerPage < projects.length && (
                  <button
                    onClick={handleNext}
                    className=" hover:text-green-500  rounded-full"
                  >
                    <span>Next</span> <ArrowRightOutlined />
                  </button>
                )}
              </div>
            </div>
            <div className="w-full max-w-4xl">
              {projects
                .slice(page * projectsPerPage, (page + 1) * projectsPerPage)
                .map((project, index) => (
                  <motion.div
                    key={`project-${page}-${project.id}`}
                    initial={{ x: index % 2 === 0 ? -200 : 200, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="flex items-center justify-between  rounded-lg shadow-lg p-6 mb-5"
                    style={{
                      position: "relative",
                    }}
                  >
                    {/* Odd-indexed project (1,3,5..) - Image on Left, Text on Right */}
                    {index % 2 === 0 ? (
                      <>
                        <img
                          src={project.image}
                          alt={project.title}
                          className="md:h-52 object-cover md:w-2/3 rounded-lg  w-1/2"
                        />
                        <div className="w-1/2 ml-6">
                          <h2 className="text-2xl font-semibold">
                            {project.title}
                          </h2>
                          <p className="text-gray-400">{project.description}</p>
                          <a
                            href={project.link}
                            className="mt-2 inline-block text-blue-400 hover:text-blue-300"
                          >
                            View Project
                          </a>
                        </div>
                      </>
                    ) : (
                      /* Even-indexed project (2,4,6..) - Image on Right, Text on Left */
                      <>
                        <div className="w-1/2 mr-6 ">
                          <h2 className="text-2xl font-semibold">
                            {project.title}
                          </h2>
                          <p className="text-gray-400">{project.description}</p>
                          <a
                            href={project.link}
                            className="mt-2 inline-block text-blue-400 hover:text-blue-300"
                          >
                            View Project
                          </a>
                        </div>
                        <img
                          src={project.image}
                          alt={project.title}
                          className=" md:h-52 object-cover md:w-2/3 rounded-lg  w-1/2"
                        />
                      </>
                    )}
                  </motion.div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectPage;
