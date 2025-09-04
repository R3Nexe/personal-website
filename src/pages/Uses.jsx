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
  const [hoveredCard, setHoveredCard] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const IMAGE_SIZE = 512; // px, matches w-16 h-16

  const handleMouseMove = (e, cardIndex) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setHoveredCard(cardIndex);

    let x = e.clientX - rect.left + 10; // offset
    let y = e.clientY - rect.top + 10;

    // Cursor position in viewport
    const globalX = e.clientX + 10;
    const globalY = e.clientY + 10;

    // Prevent overflow right
    if (globalX + IMAGE_SIZE > window.innerWidth) {
      x -= IMAGE_SIZE + 20; // flip to left side of cursor
    }

    // Prevent overflow bottom
    if (globalY + IMAGE_SIZE > window.innerHeight) {
      y -= IMAGE_SIZE + 20; // flip above cursor
    }

    setPosition({ x, y });
  };


  const filteredTools =
    activeCategory === "Show all"
      ? tools
      : tools.filter((t) => t.categories.includes(activeCategory));

  return (
    <section className="flex flex-col z-10 top-0 justify-start items-center min-h-screen mx-auto">
      <div className="p-6 z-10">
        <h1 className="font-head text-5xl mt-[10vh] mb-10">My Daily Drive</h1>

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
            <div
              key={i}
              className="relative"
              onMouseEnter={() => setHoveredCard(i)}
              onMouseLeave={() => setHoveredCard(null)}
              onMouseMove={(e) => handleMouseMove(e, i)}
            >
              <Card
                title={tool.title}
                desc={tool.desc}
                websiteLink={tool.link}
                variant="use"
              />

              {/* Cursor-follow image */}
              {hoveredCard === i && tool.img && (
                <motion.img
                  initial={{scale:.5}}
                  animate={{scale:1}}
                  src={tool.img}
                  alt={tool.title}
                  className="absolute z-10 pointer-events-none border-2 border-white/30 rounded-4xl"
                  style={{
                    left: position.x + 10,
                    top: position.y + 10,
                  }}

                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
