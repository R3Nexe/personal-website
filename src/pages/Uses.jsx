import { useState } from "react";
import tools from "../data/use.json";
import Card from "../components/Card";
import { motion } from "framer-motion";


const categories = [
  "Show all",
  "Hardware",
  "Software",
  "Development",
  "EveryDay Carry",
  "Productivity",
  "Gaming",
  "Art",
  "Security",
];

export default function Uses() {
  const [activeCategory, setActiveCategory] = useState("Show all");

  const filteredTools =
    activeCategory === "Show all"
      ? tools
      : tools.filter((t) => t.categories.includes(activeCategory));

  return (
    <>
      <section className="flex flex-col z-10 top-0 justify-start items-center min-h-screen mx-auto">
        <div className="p-6 z-10">
          <h1 className="font-head  text-5xl mt-[10vh] mb-10">My Daily Drive</h1>

          {/* Category filter */}
          <div className="flex flex-wrap w-[60vw] z-3 gap-2 mb-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1 z-2 rounded-full border ${
                  activeCategory === cat
                    ? "bg-bright-purple text-white"
                    : "text-white hover:bg-gray-300 hover:text-bright-purple transition-all duration-300"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid md:grid-cols-2 w-[80vw] gap-6 space-y-3 mx-auto">
            {filteredTools.map((tool, i) => (
              <Card
                key={i}
                title={tool.title}
                desc={tool.desc}
                websiteLink={tool.link}
                variant="use"
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
