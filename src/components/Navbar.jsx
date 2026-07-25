import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react"; // hamburger + close icons

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();
  const panelRef = useRef(null);
  const menuButtonRef = useRef(null);
  const closeButtonRef = useRef(null);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: "Tools", path: "/tools" },
    { name: "Uses", path: "/uses" },
    { name: "Gallery", path: "/gallery" },
  ];

  // While the mobile menu is open, treat it as a real modal: lock body scroll,
  // move focus into the panel, trap Tab within it, close on Escape, and return
  // focus to the hamburger on close.
  useEffect(() => {
    if (!isOpen) return;

    const menuButton = menuButtonRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        return;
      }
      if (e.key !== "Tab") return;
      const focusable = panelRef.current?.querySelectorAll(
        'a[href], button:not([disabled])'
      );
      if (!focusable || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      menuButton?.focus();
    };
  }, [isOpen]);

  const linkClasses = (path) =>
    `cursor-target transition-colors hover:text-bright-purple ${
      pathname === path
        ? "text-bright-purple font-bold"
        : "text-neutral-300 font-medium hover:font-bold"
    }`;

  return (
    <nav aria-label="Primary" className="fixed top-0 left-0 py-5 px-5">
      {/* desktop navigation bar */}
      <div className="w-fit mx-auto hidden md:flex justify-center border px-4 border-white/30 rounded-full backdrop-blur-xl">
        <ul className="flex gap-6">
          {navLinks.map((link) => (
            <li key={link.name} className="uppercase font-sub-head">
              <Link
                to={link.path}
                aria-current={pathname === link.path ? "page" : undefined}
                className={`text-sm ${linkClasses(link.path)}`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* mobile menu button */}
      <div className="md:hidden flex items-end">
        <button
          ref={menuButtonRef}
          type="button"
          aria-label="Open menu"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          className="cursor-target p-2 backdrop-blur-3xl rounded-full"
          onClick={() => setIsOpen(true)}
        >
          <Menu className="size-10" />
        </button>
      </div>

      {/* mobile menu — full-screen modal takeover */}
      {isOpen && (
        <div
          id="mobile-menu"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed md:hidden inset-0 h-full w-full bg-black/50 backdrop-blur-2xl z-40 p-6 flex flex-col"
        >
          {/* flex-row + w-full override the global `nav div` rule (which forces
              flex-col + items-center) so the close button lands top-right. */}
          <div className="flex flex-row justify-end w-full">
            <button
              ref={closeButtonRef}
              type="button"
              aria-label="Close menu"
              className="cursor-target p-2"
              onClick={() => setIsOpen(false)}
            >
              <X className="size-10" />
            </button>
          </div>
          <ul className="flex flex-1 flex-col justify-center w-full gap-4">
            {navLinks.map((link) => (
              <li key={link.name} className="uppercase text-6xl sm:text-7xl">
                <Link
                  to={link.path}
                  aria-current={pathname === link.path ? "page" : undefined}
                  className={linkClasses(link.path)}
                  onClick={() => setIsOpen(false)} // close after navigation
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};
