import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import Card from "../components/Card";
import PageHeader from "../components/PageHeader";
import { fetchProjects } from "../lib/dataService";

// Error logging utility for projects page
const logProjectsError = (context, error, additionalInfo = {}) => {
  const timestamp = new Date().toISOString();
  const errorInfo = {
    timestamp,
    context,
    error: error.message || error,
    stack: error.stack,
    ...additionalInfo
  };

  console.error(`📁 PROJECTS ERROR [${context}]:`, errorInfo);
};

const categories = [
  "All",
  "Web",
  "Machine Learning",
  "Computer Vision",
];

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [projectsData, setProjectsData] = useState([]);
  const [dataError, setDataError] = useState(null);

  // Fetch projects from Supabase
  useEffect(() => {
    fetchProjects()
      .then((data) => {
        setProjectsData(data);
        console.log(`✅ Successfully loaded ${data.length} projects from Supabase`);
      })
      .catch((error) => {
        logProjectsError('SUPABASE_FETCH_ERROR', error, {
          severity: 'CRITICAL',
          impact: 'Projects page cannot display data',
          solution: 'Check Supabase connection and table configuration'
        });
        setDataError(error.message);
        setProjectsData([]);
      });
  }, []);

  const filteredTools =
    activeCategory === "All"
      ? projectsData
      : projectsData.filter((project) => {
          if (!Array.isArray(project.categories)) {
            logProjectsError('FILTER_ERROR', new Error(`Cannot filter project "${project.title}" - invalid categories`), {
              severity: 'MEDIUM',
              impact: 'Project may not appear in filtered results',
              projectTitle: project.title,
              categories: project.categories,
              activeCategory,
              solution: 'Fix categories array in project data'
            });
            return false;
          }
          return project.categories.includes(activeCategory);
        });

  return (
    <>
    <section className="flex flex-col top-0 justify-start items-center min-h-screen mx-auto">
        <div className="p-6">
          <PageHeader eyebrow="Project Log" title="My Projects" />
          {/* Category filter */}
          <div className="flex w-full z-3 mb-10 justify-center">
            <div className="py-4 backdrop-blur-3xl bg-black/60 px-5 text-sm md:text-base rounded-3xl drop-shadow-2xl flex flex-wrap justify-center gap-2">
              {categories.map((cat) => (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 z-2 mx-1 rounded-3xl border border-transparent ${
                    activeCategory === cat
                      ? "bg-bright-purple text-white"
                      : "text-white hover:bg-white/60 hover:text-black transition-all duration-300"
                  }`}
                >
                  {cat}
                </motion.button>
              ))}
            </div>
          </div>
          {dataError ? (
            <div className="text-center text-red-400 p-8">
              <h3 className="text-xl font-semibold mb-2">⚠️ Error Loading Projects</h3>
              <p className="text-sm">{dataError}</p>
              <p className="text-xs mt-2 text-gray-400">Check the console for more details</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 w-[80vw] gap-6 space-y-3 mx-auto">
              {filteredTools.length === 0 ? (
                <div className="col-span-2 text-center text-gray-400 p-8">
                  <h3 className="text-xl font-semibold mb-2">No projects found</h3>
                  <p className="text-sm">No projects match the selected category "{activeCategory}"</p>
                </div>
              ) : (
                filteredTools.map((tool, i) => (
                  <Card
                    key={`${tool.title}-${i}`}
                    title={tool.title}
                    desc={tool.desc}
                    gitLink={tool.git_link}
                    liveLink={tool.live_link}
                    tag={Array.isArray(tool.categories) ? tool.categories[0] : undefined}
                    variant="project"
                  />
                ))
              )}
            </div>
          )}
      </div>
    </section>
    </>
  );
};
export default Projects;
