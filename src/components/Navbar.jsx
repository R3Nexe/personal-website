// 2. Navbar Component
export const Navbar = () => {
  const navLinks = ['Projects', 'Tools','Uses', 'Contact'];
  return (
    <nav className="fixed z-5 top-0 left-0 py-5 px-5">
      <div className="container flex flex-col justify-items-center md:flex-row border-1 border-[#454545] rounded-3xl backdrop-blur-xl px-4">
        <a href="/" className="text-2xl font-jura font-bold text-bright-purple tracking-tighter" >
          Notsoshant
        </a>
        <ul>
          {navLinks.map((link) => (
            <li key={link} className="z-10 p-1 uppercase">
              <a href={`#${link.toLowerCase()}`} className="text-sm font-medium  text-neutral-300 transition-colors hover:text-white">
                {link}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};
