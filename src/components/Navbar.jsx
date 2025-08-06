// 2. Navbar Component
export const Navbar = () => {
  const navLinks = ['Home','Projects', 'Tools','Uses','Gallery', 'Contact'];
  return (
    <nav className="fixed z-40 top-0 left-0 py-5 px-5 ">
        <div className="w-fit mx-auto hidden md:flex justify-center border-1 px-4 border-[#454545] rounded-full backdrop-blur-xl ">
           <ul>
          {navLinks.map((link) => (
            <li key={link} className="z-10 uppercase font-sub-head">
              <a href={`#${link.toLowerCase()}`} className="text-sm font-medium text-neutral-300 transition-colors hover:text-bright-purple hover:font-bold ">
                {link}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};
