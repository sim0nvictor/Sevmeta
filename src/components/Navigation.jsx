import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Sev from "../assets/image/sev.png";
import SV from "../assets/image/SVE.png";

const navLinks = [
  { label: "Home", href: "#home", id: "home" },
  { label: "About", href: "#about", id: "about" },
  { label: "Projects", href: "#projects", id: "projects" },
  { label: "Skills", href: "#skills", id: "skills" },
  { label: "Blog", href: "#blog", id: "blog" },
  { label: "Newsletter", href: "#newsletter", id: "newsletter" },
  { label: "Communities", href: "#communities", id: "communities" },
  { label: "Contact", href: "#contacts", id: "contacts" },
];

export default function Navigation() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-40% 0px -40% 0px",
        threshold: 0.1,
      }
    );

    navLinks.forEach(({ id }) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const hash = location.hash.replace("#", "");
    if (hash) {
      const target = document.getElementById(hash);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        setActiveSection(hash);
      }
    } else if (location.pathname === "/") {
      setActiveSection("home");
    }
  }, [location.hash, location.pathname]);

  const closeMenu = () => setOpen(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full backdrop-blur-md bg-black/90 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
          {/* Top Row: SEV Logo (Left) + SV Shape (Center) */}
          <div className="flex items-center justify-between py-4">
            
              {/* Left: SEV Logo - Aligned with SV */}
              <Link
                to="/#home"
                aria-label="Go to home"
            onClick={closeMenu}
          >
            <img
              src={Sev}
              alt="SEV logo"
              className="h-11 w-auto object-contain drop-shadow-lg"
            />
          </Link>

          {/* Center: SV Shape */}
          <div className="absolute left-1/2 top-4 -translate-x-1/2 md:static md:translate-x-0 md:top-auto">
            <img 
              src={SV} 
              alt="SV shape" 
              className="h-14 w-auto object-contain transition-transformation duration-300 hover:scale-110" 
            />
          </div>

          {/* Right Side: Navigation + CTA */}
          <div className="flex items-center gap-8">
            {/* Desktop Navigation */}
            <ul className="hidden md:flex items-center gap-8 text-sm text-gray-300">
              {navLinks.map(({ label, href, id }) => (
                <li key={id}>
                  <Link
                    to={`/${href}`}
                    onClick={closeMenu}
                    className={`transition-all duration-300 hover:text-purple-400 hover:scale-95
                      ${
                        activeSection === id
                          ? "text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-violet-500 to-indigo-500 font-semibold drop-shadow-[0_0_10px_rgba(168,85,247,0.6)]"
                          : ""
                      }`}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Desktop CTA Button */}
            <Link
              to="/#contacts"
              className="hidden md:block border border-purple-500 text-purple-400 px-5 py-2.5 rounded-full text-sm font-medium hover:bg-purple-500 hover:text-white transition-all duration-300"
              onClick={closeMenu}
            >
              Reach me out
            </Link>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden p-2 text-white"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {open ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden px-6 pb-8 pt-4 bg-black/95 border-t border-white/10">
            <div className="flex flex-col space-y-6 text-lg">
              {navLinks.map(({ label, href, id }) => (
                <Link
                  key={id}
                  to={`/${href}`}
                  onClick={closeMenu}
                  className={`transition-all hover:text-purple-400
                    ${
                      activeSection === id
                        ? "text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-violet-500 to-indigo-500 font-semibold"
                        : "text-gray-300"
                    }`}
                >
                  {label}
                </Link>
              ))}

              <Link
                to="/#contacts"
                onClick={closeMenu}
                className="mt-4 text-center border border-purple-500 text-purple-400 px-6 py-3 rounded-full hover:bg-purple-500 hover:text-white transition-all font-medium"
              >
                Book a Call
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}