import { Link } from "react-router-dom";

export const Navbar = () => {
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: "Tools", path: "/tools" },
    { name: "Uses", path: "/uses" },
    { name: "Gallary", path: "/gallary" },
  ];

  return (
    <nav className="fixed z-40 top-0 left-0 py-5 px-5">
      <div className="w-fit mx-auto hidden md:flex justify-center border px-4 border-[#454545] rounded-full backdrop-blur-xl">
        <ul className="flex gap-6">
          {navLinks.map((link) => (
            <li key={link.name} className="uppercase font-sub-head">
              <Link
                to={link.path}
                className="text-sm font-medium text-neutral-300 transition-colors hover:text-bright-purple hover:font-bold"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};
