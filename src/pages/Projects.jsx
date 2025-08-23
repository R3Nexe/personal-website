import { useState } from "react";
import { motion } from "framer-motion";

import Card from "../components/Card";
import projects from "../data/projects.json";

const categories = [
  "All",
  "Web",
  "Machine Learning",
  "Computer Vision",
];

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredTools =
    activeCategory === "All"
      ? projects
      : projects.filter((project) => project.categories.includes(activeCategory));

  return (
    <>
    <section className="flex flex-col top-0 justify-start items-center min-h-screen mx-auto">
        <div className="p-6">
          <div className="flex mt-[10vh] mb-10">
            <h1 className="font-head z-2 text-5xl">My Projects</h1>
          </div>
          <div className="flex flex-wrap w-[60vw] z-3 gap-2 mb-6">
            {categories.map((cat) => (
              <motion.button
                whileHover={{ scale: 1.05 }}
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1 z-2 rounded-full border  ${
                  activeCategory === cat
                    ? "bg-bright-purple text-white"
                    : " text-white hover:bg-gray-300 hover:text-bright-purple transition-all duration-300"
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </div>
          <div className="grid md:grid-cols-2 w-[80vw] gap-6 space-y-3 mx-auto">
            {filteredTools.map((tool, i) => (
              <Card
                key={i}
                title={tool.title}
                desc={tool.desc}
                gitLink={tool.gitLink}
                liveLink={tool.liveLink}
                variant="project"
              />
            ))}
          </div>
      </div>
    </section>
    </>
  );
};
export default Projects;
