// src/components/Gallery.jsx
import { useEffect, useState } from "react";
import { getPublicUrl } from "../lib/imageFetch";
import galleryData from "../data/gallery.json";

const categories = ["Show all", "Photos", "Sketches", "3D Renders"];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("Show all");
  const [galleryItems, setGalleryItems] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    // Map JSON items to include public URLs
    const itemsWithUrls = galleryData.map((item) => ({
      ...item,
      publicUrl: getPublicUrl(item.img),
    }));
    setGalleryItems(itemsWithUrls);

    // Debug: check generated URLs
    console.log("✅ Gallery items with URLs:", itemsWithUrls);
  }, []);

  // Filter from galleryItems (not raw galleryData)
  const filteredTools =
    activeCategory === "Show all"
      ? galleryItems
      : galleryItems.filter((t) => t.categories.includes(activeCategory));

  return (
    <section className="flex flex-col z-10 top-0 justify-start items-center min-h-screen mx-auto p-3">
      <div className="p-6z-10">
        <h1 className="font-head text-center text-5xl mt-[10vh] mb-10">My Gallery</h1>

        {/* Category filter */}
        <div className="fixed mt-[70vh] p-3 flex flex-wrap w-full  z-3 gap-2 justify-center">
          <div className=" py-4 backdrop-blur-3xl bg-black/60 px-5 text-sm md:text-base rounded-3xl drop-shadow-2xl">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1 z-2 mx-1 rounded-3xl border-white/50 ${
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

        {/* Masonry layout */}
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
          {filteredTools.map((item, idx) => (
            <div
              key={idx}
              className="break-inside-avoid cursor-pointer"
              onClick={() => setSelectedImage(item.publicUrl)}
            >
              <img
                src={item.publicUrl}
                alt={item.title}
                className="mb-4 w-full rounded-xl shadow-md hover:opacity-70 transition"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* Modal overlay */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md"
            onClick={() => setSelectedImage(null)}
          >
            <img
              src={selectedImage}
              className="max-h-[80vh] max-w-[90vw] rounded-xl shadow-lg transform transition-transform scale-100 hover:scale-105"
            />
          </div>
        )}
      </div>
    </section>
  );
}
