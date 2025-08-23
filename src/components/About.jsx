import MagneticButton from "./MagneticButton";
import SocialIcon from "./socialMediaIcons";
import { useState } from "react";
import { motion } from "framer-motion";

export const About = () => {
  const [activeTab, setActiveTab] = useState("education");
  const educationContent = (
    <ul className="text-sm text-gray-300 space-y-9 text-start">
      <li className="text-base ">
        Institute of Technical Research and Education, Bhubaneshwar
        (2024–present) — GPA: 9.68/10, B.Tech
      </li>
      <li className="text-base ">
        Mother's Public School, Bhubaneshwar (Higher Secondary CBSE) — 86%
      </li>
      <li className="text-base ">
        Don Bosco Academy, Patna (Secondary ICSE) — 96%
      
      </li>
    </ul>
  );

  const experienceContent = (
    <ul className="text-sm text-gray-300 space-y-9 text-start">
      <li className="text-base ">
        Developer Intern — XYZ Tech Solutions (3 months)
      </li>
      <li className="text-base">
        Contributed to open-source projects on GitHub related to React and
        Tailwind
      </li>
      <li className="text-base">
        Built personal portfolio and several small automation tools using Python
      </li>
    </ul>
  );
  const cardClasses =
    "bg-[#D9D9D9]/5 border-1 px-4 border-[#454545] hover:bg-[#D9D9D9]/25 hover:border-2 hover:border-bright-purple transition-all duration:500 rounded-xl hover:backdrop-blur-xl p-4 flex items-center justify-center text-white ";
  return (
    <section
      id="about"
      className="flex flex-col justify-center items-center min-h-screen w-full px-5 text-center bg-transparent"
    >
      <h2 className="text-4xl md:text-8xl z-2 mb-6">About Me</h2>
      <div className="md:w-[60vw] lg:w-60vw w-100vw z-2">
        <div className="grid grid-cols-8 grid-rows-4  gap-2 ">
          <div
            className={`${cardClasses} flex flex-col items-start col-span-3`}
          >
            <h2 className="text-xl font-bold">Nishant Kumar</h2>
            <p className="text-sm text-bright-purple">
              Student & Frontend Developer
            </p>
            <a className="text-sm text-gray-400">Odisha, India</a>
          </div>
          <div className={cardClasses}>
            <MagneticButton>
              <SocialIcon
                className="invert h-10 w-10"
                href={"https://github.com/R3Nexe"}
                src={"icons/github.svg"}
              ></SocialIcon>
            </MagneticButton>
          </div>
          <div className={cardClasses}>
            <MagneticButton>
              <SocialIcon
                className="invert h-10 w-10"
                href={"https://www.linkedin.com/in/nishant-kumar-b91a96325/"}
                src={"icons/linkedin.svg"}
              ></SocialIcon>
            </MagneticButton>
          </div>
          <div
            className={`${cardClasses} pt-5 col-span-3 row-span-4 flex flex-col place-content-end gap-7`}
          ></div>
          <div className={`${cardClasses} col-span-2 row-span-2`}>
            <MagneticButton>
              <SocialIcon
                className=" h-50 w-50"
                href={"https://www.instagram.com/notsoshaant_/"}
                src={"icons/Favicon.svg"}
              ></SocialIcon>
            </MagneticButton>
          </div>
          <div className={`${cardClasses} col-span-3 row-span-2`}>
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
          <div className={`${cardClasses} col-span-5 flex-row gap-10`}>
            <MagneticButton>
              <SocialIcon
                className="h-10 w-10"
                src={"icons/html.png"}
              ></SocialIcon>
            </MagneticButton>
            <MagneticButton>
              <SocialIcon
                className="h-10 w-10"
                src={"icons/css.png"}
              ></SocialIcon>
            </MagneticButton>
            <MagneticButton>
              <SocialIcon
                className="h-10 w-10"
                src={"icons/js.png"}
              ></SocialIcon>
            </MagneticButton>
            <MagneticButton>
              <SocialIcon
                className="h-10 w-10"
                src={"icons/python.png"}
              ></SocialIcon>
            </MagneticButton>
            <MagneticButton>
              <SocialIcon
                className="h-10 w-10"
                src={"icons/java.png"}
              ></SocialIcon>
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
};
