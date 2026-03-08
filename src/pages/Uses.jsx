import { useState, useEffect } from "react";
import Card from "../components/Card";
import { motion } from "framer-motion";
import { publicUrl } from "../lib/assets";
import { fetchUses } from "../lib/dataService";
const categories = [
  "Show all",
  "Hardware",
  "Software",
  "Development",
  "EveryDay Carry",
  "Productivity",
];

export default function Uses() {
  const [activeCategory, setActiveCategory] = useState("Show all");
  const [tools, setTools] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    fetchUses()
      .then(setTools)
      .catch((err) => console.error('Failed to load uses:', err.message));
  }, []);

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
        <div className="flex w-full z-3 mb-10 justify-center">
          <div className="py-4 backdrop-blur-3xl bg-black/60 px-5 text-sm md:text-base rounded-3xl drop-shadow-2xl flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 z-2 mx-1 rounded-3xl border border-transparent ${
                  activeCategory === cat
                   ? "bg-bright-purple text-white"
                    : "text-white hover:bg-white/60 hover:text-black transition-all duration-300"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
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
                  src={publicUrl(tool.img)}
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
