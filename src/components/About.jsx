import MagneticButton from "./MagneticButton";
import SocialIcon from "./socialMediaIcons";
import TelemetryBlock from "./TelemetryBlock";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { fetchTechStack } from "../lib/dataService";
import { publicUrl } from "../lib/assets";

// Error logging utility for About component
const logAboutError = (context, error, additionalInfo = {}) => {
  const timestamp = new Date().toISOString();
  const errorInfo = {
    timestamp,
    context,
    error: error.message || error,
    stack: error.stack,
    ...additionalInfo
  };

  console.error(`👤 ABOUT ERROR [${context}]:`, errorInfo);
};

export const About = () => {
  const [techData, setTechData] = useState({
    language: [],
    library: [],
    framework: [],
    software: []
  });
  // Fetch tech stack from Supabase
  useEffect(() => {
    fetchTechStack()
      .then((items) => {
        const language = items.filter((t) => t.type === "language");
        const library = items.filter((t) => t.type === "library");
        const framework = items.filter((t) => t.type === "framework");
        const software = items.filter((t) => t.type === "software");
        setTechData({ language, library, framework, software });
        console.log(`✅ Tech stack loaded from Supabase: ${items.length} items`);
      })
      .catch((error) => {
        logAboutError('SUPABASE_FETCH_ERROR', error, {
          severity: 'CRITICAL',
          impact: 'About section cannot display tech stack',
          solution: 'Check Supabase connection and techstack table'
        });
        setTechData({ language: [], library: [], framework: [], software: [] });
      });
  }, []);

  const { language, library, framework, software } = techData;

  const moduleCount = language.length + library.length + framework.length + software.length;

  // Helper component for tech icons with error handling
  const TechIcon = ({ tech, className }) => {
    const [imageError, setImageError] = useState(false);

    const handleImageError = () => {
      logAboutError('TECH_ICON_LOAD_ERROR', new Error(`Failed to load icon for ${tech.name}`), {
        severity: 'MEDIUM',
        impact: 'Tech icon will not display',
        techName: tech.name,
        iconPath: tech.icon,
        solution: 'Check if icon file exists in Supabase storage and verify path'
      });
      setImageError(true);
    };

    if (imageError) {
      return (
        <div
          className={`${className} bg-gray-600 flex items-center justify-center text-xs text-white`}
          title={`${tech.name} - Icon not available`}
        >
          {tech.name.charAt(0)}
        </div>
      );
    }

    return (
      <img
        src={publicUrl(tech.icon)}
        alt={tech.name}
        title={tech.desc}
        className={className}
        onError={handleImageError}
        loading="lazy"
      />
    );
  };

  const [activeTab, setActiveTab] = useState("education");
  const educationContent = (
    <ul className="text-sm text-gray-300 space-y-3 text-start">
      <li className="text-base">
        - Institute of Technical Research and Education, Bhubaneshwar (2024–present) <span className="text-base text-green font-semibold">GPA: 9.68/10, B.Tech</span>
      </li>
      <li className="text-base">
        - Mother's Public School, Bhubaneshwar, Higher Secondary CBSE (2022-2024) <span className="text-base text-green font-semibold">86%</span>
      </li>
      <li className="text-base">
        - Don Bosco Academy, Patna, Secondary ICSE <br /><span className="text-base text-green font-semibold">96%</span>
      </li>
    </ul>
  );

  const experienceContent = (
    <ul className="text-sm text-gray-300 space-y-2 text-start">
      <li className="text-base ">
        - Machine Learning Intern at Elevate labs (45 days)
      </li>
      <li className="text-base">

      </li>
      <li className="text-base">

      </li>
    </ul>
  );
  const cardClasses =
    "group relative border border-white/10 backdrop-blur-sm bg-[#1a1a1a]/40 hover:bg-gradient-to-br hover:from-[#9A70F5]/2 hover:via-[#1a1a1a]/90 hover:to-[#9A70F5]/25 hover:backdrop-blur-xl p-4 flex items-center justify-center hover:shadow-bright-purple/50 inset-0 shadow-xl transform transition-all duration-500 ease-out hover:scale-102";
  const barClasses =
    "group relative border border-white/10 backdrop-blur-sm bg-[#1a1a1a]/40 hover:backdrop-blur-xl inset-0 shadow-xl transform transition-all duration-500 ease-out";
  const targetLock = (
    <>
      <span className="card-target card-target--tl" />
      <span className="card-target card-target--br" />
    </>
  );
  return (
    <section
      id="about"
      className="relative flex flex-col justify-center items-center min-h-screen w-full px-4 mb-8 sm:px-5 text-center"
    >
      <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl z-2 mb-6">About Me</h2>
      <div className="w-full max-w-7xl z-2">
        {/* Mobile Layout */}
        <div className="block lg:hidden space-y-4">
          {/* Profile Bar */}
          <div className={`${barClasses} flex flex-col`}>
            {targetLock}
            <div className="flex flex-col items-start px-6 py-4">
              <h2 className="text-xl sm:text-2xl text-bright-purple font-bold mb-2">
                Nishant Kumar
              </h2>
              <p className="text-sm sm:text-base text-white mb-2">Student & Frontend Developer</p>
              <a className="text-sm text-gray-400">Odisha, India</a>
            </div>
            <div className="flex border-t border-white/10">
              <div className="flex-1 flex items-center justify-center py-4 border-r border-white/10">
                <MagneticButton>
                  <SocialIcon
                    className="invert h-8 w-8 sm:h-10 sm:w-10"
                    href={"https://github.com/R3Nexe"}
                    src={publicUrl("icons/github.svg")}
                  ></SocialIcon>
                </MagneticButton>
              </div>
              <div className="flex-1 flex items-center justify-center py-4">
                <MagneticButton>
                  <SocialIcon
                    className="invert h-8 w-8 sm:h-10 sm:w-10"
                    href={"https://www.linkedin.com/in/nishant-kumar-b91a96325/"}
                    src={publicUrl("icons/linkedin.svg")}
                  ></SocialIcon>
                </MagneticButton>
              </div>
            </div>
          </div>

          {/* Tech Stack */}
          <div className={`${cardClasses} p-6`}>
            {targetLock}
            <div className="text-start text-lg sm:text-xl flex flex-col gap-4 sm:gap-6">
              {/* Language */}
              <section>
                <h2 className="font-medium font-head text-base sm:text-lg">Languages</h2>
                <div className="pt-3 sm:pt-4 flex flex-wrap gap-4 sm:gap-6">
                  {language.map((tech, i) => (
                    <MagneticButton key={i}>
                      <TechIcon
                        tech={tech}
                        className="w-10 h-10 sm:w-12 sm:h-12"
                      />
                    </MagneticButton>
                  ))}
                </div>
              </section>
              <hr />
              {/* Library */}
              <section>
                <h2 className="font-medium font-head text-base sm:text-lg">Libraries</h2>
                <div className="pt-3 sm:pt-4 flex flex-wrap gap-4 sm:gap-6">
                  {library.map((tech, i) => (
                    <MagneticButton key={i}>
                      <TechIcon
                        tech={tech}
                        className="w-10 h-10 sm:w-12 sm:h-12"
                      />
                    </MagneticButton>
                  ))}
                </div>
              </section>
              <hr />
              {/* Framework */}
              <section>
                <h2 className="font-medium font-head text-base sm:text-lg">Frameworks</h2>
                <div className="pt-3 sm:pt-4 flex flex-wrap gap-4 sm:gap-6">
                  {framework.map((tech, i) => (
                     <MagneticButton key={i}>
                       <TechIcon
                         tech={tech}
                         className="w-10 h-10 sm:w-12 sm:h-12"
                       />
                     </MagneticButton>
                  ))}
                </div>
              </section>
              <hr />
              {/* Software */}
              <section>
                <h2 className="font-medium font-head text-base sm:text-lg">Software</h2>
                <div className="pt-3 sm:pt-4 flex flex-wrap gap-4 sm:gap-6">
                  {software.map((tech, i) => (
                     <MagneticButton key={i}>
                       <TechIcon
                         tech={tech}
                         className="w-10 h-10 sm:w-12 sm:h-12"
                       />
                     </MagneticButton>
                  ))}
                </div>
              </section>
            </div>
          </div>

          {/* Education/Experience Tabs */}
          <div className={`${cardClasses} p-6`}>
            {targetLock}
            <div className="flex flex-col h-full">
              {/* Tabs */}
              <div className="w-full flex justify-center gap-2 pb-3 mb-3">
                <button
                  onClick={() => setActiveTab("education")}
                  className={`px-3 py-2 rounded-full text-sm font-semibold ${
                    activeTab === "education"
                      ? "bg-bright-purple"
                      : "bg-white/10"
                  }`}
                >
                  Education
                </button>
                <button
                  onClick={() => setActiveTab("experience")}
                  className={`px-3 py-2 rounded-full text-sm font-semibold ${
                    activeTab === "experience"
                      ? "bg-bright-purple"
                      : "bg-white/10"
                  }`}
                >
                  Experience
                </button>
              </div>

              {/* Fixed height content area */}
              <motion.div
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex-col"
                style={{ minHeight: "120px" }}
              >
                {activeTab === "education"
                  ? educationContent
                  : experienceContent}
              </motion.div>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:grid grid-cols-8 grid-rows-4 gap-2">
          <div className={`${barClasses} flex flex-row items-stretch col-span-5`}>
            {targetLock}
            <div className="flex-1 flex flex-col items-start justify-center px-6 py-4">
              <h2 className="text-xl text-bright-purple font-bold">
                Nishant Kumar
              </h2>
              <p className="text-sm text-white">Student & Frontend Developer</p>
              <a className="text-sm text-gray-400">Odisha, India</a>
            </div>
            <div className="flex items-center justify-center gap-5 px-6 border-l border-white/10">
              <MagneticButton>
                <SocialIcon
                  className="invert h-7 w-7"
                  href={"https://github.com/R3Nexe"}
                  src={publicUrl("icons/github.svg")}
                ></SocialIcon>
              </MagneticButton>
              <MagneticButton>
                <SocialIcon
                  className="invert h-7 w-7"
                  href={"https://www.linkedin.com/in/nishant-kumar-b91a96325/"}
                  src={publicUrl("icons/linkedin.svg")}
                ></SocialIcon>
              </MagneticButton>
            </div>
            <div className="flex-1 items-center justify-center px-6 border-l border-white/10 hidden lg:flex">
              <TelemetryBlock
                lines={[
                  ["SYS.PAGE", "ABOUT.ME"],
                  ["SYS.MODULES", `${moduleCount} LOADED`],
                ]}
              />
            </div>
          </div>
          <div
            className={`${cardClasses} grid-row-1 items-start pt-8 col-span-3 row-span-4`}
          >
            {targetLock}
            <div className="techstack">
              <section>
                <h2 className="techstack-label">Languages</h2>
                <div className="techstack-icon-row">
                  {language.map((tech, i) => (
                    <MagneticButton key={i}>
                      <div className="techstack-icon-tile">
                        <TechIcon tech={tech} className="techstack-icon-img" />
                      </div>
                    </MagneticButton>
                  ))}
                </div>
              </section>
              <section>
                <h2 className="techstack-label">Libraries</h2>
                <div className="techstack-icon-row">
                  {library.map((tech, i) => (
                    <MagneticButton key={i}>
                      <div className="techstack-icon-tile">
                        <TechIcon tech={tech} className="techstack-icon-img" />
                      </div>
                    </MagneticButton>
                  ))}
                </div>
              </section>
              <section>
                <h2 className="techstack-label">Frameworks</h2>
                <div className="techstack-icon-row">
                  {framework.map((tech, i) => (
                    <MagneticButton key={i}>
                      <div className="techstack-icon-tile">
                        <TechIcon tech={tech} className="techstack-icon-img" />
                      </div>
                    </MagneticButton>
                  ))}
                </div>
              </section>
              <section>
                <h2 className="techstack-label">Software</h2>
                <div className="techstack-icon-row">
                  {software.map((tech, i) => (
                    <MagneticButton key={i}>
                      <div className="techstack-icon-tile">
                        <TechIcon tech={tech} className="techstack-icon-img" />
                      </div>
                    </MagneticButton>
                  ))}
                </div>
              </section>
            </div>
          </div>

          <div className={`${cardClasses} col-span-5 row-span-3`}>
            {targetLock}
            <div className="flex flex-col h-full">
              {/* Tabs */}
              <div className="w-full flex-center gap-2 pb-2 mb-2">
                <button
                  onClick={() => setActiveTab("education")}
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    activeTab === "education"
                      ? "bg-bright-purple"
                      : "bg-white/10"
                  }`}
                >
                  Education
                </button>
                <button
                  onClick={() => setActiveTab("experience")}
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    activeTab === "experience"
                      ? "bg-bright-purple"
                      : "bg-white/10"
                  }`}
                >
                  Experience
                </button>
              </div>

              {/* Fixed height content area */}
              <motion.div
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex-col"
                style={{ minHeight: "120px" }}
              >
                {activeTab === "education"
                  ? educationContent
                  : experienceContent}
              </motion.div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
