import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import Card from "../components/Card";
import projects from "../data/projects.json";

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

  // Validate and process projects data
  useEffect(() => {
    try {
      // Check if projects data is valid
      if (!projects || !Array.isArray(projects)) {
        throw new Error('Projects data is not a valid array');
      }

      // Validate each project object
      const validatedProjects = projects.map((project, index) => {
        if (!project || typeof project !== 'object') {
          throw new Error(`Project at index ${index} is not a valid object`);
        }

        const requiredFields = ['title', 'desc', 'categories'];
        const missingFields = requiredFields.filter(field => !project[field]);

        if (missingFields.length > 0) {
          logProjectsError('INVALID_PROJECT_STRUCTURE', new Error(`Project at index ${index} missing required fields`), {
            severity: 'HIGH',
            impact: 'Project may not display correctly',
            projectIndex: index,
            missingFields,
            projectData: project,
            solution: 'Ensure each project has title, desc, and categories fields'
          });
        }

        // Validate categories array
        if (!Array.isArray(project.categories)) {
          logProjectsError('INVALID_CATEGORIES', new Error(`Project "${project.title}" has invalid categories`), {
            severity: 'MEDIUM',
            impact: 'Project filtering may not work correctly',
            projectTitle: project.title,
            categoriesValue: project.categories,
            solution: 'Categories should be an array of strings'
          });
        }

        // Validate URLs if present
        if (project.gitLink && typeof project.gitLink !== 'string') {
          logProjectsError('INVALID_GIT_LINK', new Error(`Project "${project.title}" has invalid gitLink`), {
            severity: 'MEDIUM',
            impact: 'GitHub link may not work',
            projectTitle: project.title,
            gitLinkValue: project.gitLink,
            solution: 'Git link should be a valid URL string'
          });
        }

        if (project.liveLink && typeof project.liveLink !== 'string') {
          logProjectsError('INVALID_LIVE_LINK', new Error(`Project "${project.title}" has invalid liveLink`), {
            severity: 'MEDIUM',
            impact: 'Live demo link may not work',
            projectTitle: project.title,
            liveLinkValue: project.liveLink,
            solution: 'Live link should be a valid URL string'
          });
        }

        return project;
      });

      setProjectsData(validatedProjects);
      console.log(`✅ Successfully loaded ${validatedProjects.length} projects`);

    } catch (error) {
      logProjectsError('DATA_VALIDATION_ERROR', error, {
        severity: 'CRITICAL',
        impact: 'Projects page cannot display data',
        projectsData: projects,
        solution: 'Check projects.json file structure and ensure it contains valid project objects'
      });

      setDataError(error.message);
      setProjectsData([]);
    }
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
          <div className="flex mt-[10vh] mb-10">
            <h1 className="font-head z-2 text-5xl">My Projects</h1>
          </div>
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
                filteredTools.map((tool, i) => {
                  try {
                    return (
                      <Card
                        key={`${tool.title}-${i}`}
                        title={tool.title}
                        desc={tool.desc}
                        gitLink={tool.gitLink}
                        liveLink={tool.liveLink}
                        variant="project"
                      />
                    );
                  } catch (error) {
                    logProjectsError('CARD_RENDER_ERROR', error, {
                      severity: 'HIGH',
                      impact: 'Project card failed to render',
                      projectIndex: i,
                      projectData: tool,
                      solution: 'Check project data structure and Card component'
                    });

                    return (
                      <div key={`error-${i}`} className="p-4 border border-red-500 rounded-lg bg-red-900/20">
                        <h3 className="text-red-400 font-semibold">Error rendering project</h3>
                        <p className="text-red-300 text-sm">{tool.title || 'Unknown project'}</p>
                      </div>
                    );
                  }
                })
              )}
            </div>
          )}
      </div>
    </section>
    </>
  );
};
export default Projects;
