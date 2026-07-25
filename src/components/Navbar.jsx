import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react"; // hamburger + close icons
export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: "Tools", path: "/tools" },
    { name: "Uses", path: "/uses" },
    { name: "Gallery", path: "/gallery" },
  ];

  return (
    // desktop navigation bar
    <nav className="fixed top-0 left-0 py-5 px-5">
      <div className="w-fit mx-auto hidden md:flex justify-center border px-4 border-white/30 rounded-full backdrop-blur-xl">
        <ul className="flex gap-6">
          {navLinks.map((link) => (
            <li key={link.name} className="uppercase font-sub-head">
              <Link
                to={link.path}
                aria-current={pathname === link.path ? "page" : undefined}
                className={`cursor-target text-sm font-medium transition-colors hover:text-bright-purple hover:font-bold ${
                  pathname === link.path
                    ? "text-bright-purple font-bold"
                    : "text-neutral-300"
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      {/* mobile sidebar */}
      <div className="md:hidden flex items-end">
        <button className="cursor-target p-2 backdrop-blur-3xl rounded-full"
        onClick={() => setIsOpen(true)}>
          <Menu className="size-10"></Menu>
        </button>
      </div>
      {/* sidebar */}
      {isOpen && (
        <>
          <div
            className={`fixed md:hidden top-0 left-0 h-full w-full bg-black/50  backdrop-blur-2xl z-40 p-6 ${
              isOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="flex items-end">
              <button className="cursor-target" onClick={() => setIsOpen(false)}>
                <X className="size-10"></X>
                </button>
            </div>
            <ul className="flex flex-col w-full gap-4">
              {navLinks.map((link) => (

                <li key={link.name} className="uppercase text-6xl sm:text-7xl">
                  <Link
                    to={link.path}
                    aria-current={pathname === link.path ? "page" : undefined}
                    className={`cursor-target font-medium transition-colors hover:text-bright-purple hover:font-bold ${
                      pathname === link.path
                        ? "text-bright-purple font-bold"
                        : "text-neutral-300"
                    }`}
                    onClick={() => setIsOpen(false)} // close after navigation
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </nav>
  );
};
