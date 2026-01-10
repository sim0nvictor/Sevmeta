import { useState, useEffect } from "react";
import Sev from "../assets/image/sev.png";

const navLinks = [
  { label: "Home", href: "#home", id: "home" },
  { label: "About", href: "#about", id: "about" },
  { label: "Projects", href: "#projects", id: "projects" },
  { label: "Skills", href: "#skills", id: "skills" },
  { label: "Communities", href: "#communities", id: "communities" },
  { label: "Contact", href: "#contacts", id: "contacts" },
];

export default function Navigation() {
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
      }
    );

    navLinks.forEach(({ id }) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="fixed top-0 z-50 w-full backdrop-blur-md bg-black/30 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <a href="#home" className="group flex items-center gap-2 hover:scale-95 transition">
          <img src={Sev} alt="SEV logo" className="w-6 h-6" />
          <span className="text-xl font-bold text-primary">SEV</span>
        </a>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-8 text-sm text-gray-300">
          {navLinks.map(({ label, href, id }) => (
            <li key={id}>
              <a
                href={href}
                className={`transition-all duration-300 hover:text-primary hover:scale-95
                  ${
                    activeSection === id
                      ? "text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-500 drop-shadow-[0_0_8px_rgba(168,85,247,0.5)] font-bold"
                      : ""
                  }
                  `}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="#contacts"
          className="hidden md:block border border-primary text-primary px-4 py-2 rounded-full hover:bg-primary hover:text-purple-400 transition"
        >
          Reach me out
        </a>

        {/* Mobile Toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden">
          <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden px-6 pb-6 pt-2 space-y-4 text-gray-300">
          {navLinks.map(({ label, href, id }) => (
            <a
              key={id}
              href={href}
              onClick={() => setOpen(false)}
              className={`block transition-all hover:scale-95
                ${
                  activeSection === id
                  ? "text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-500 drop-shadow-[0_0_8px_rgba(168,85,247,0.5)] font-bold"
                  : ""
                }
              `}
            >
              {label}
            </a>
          ))}

          <a
            href="#contacts"
            onClick={() => setOpen(false)}
            className="block mt-4 text-center border border-primary text-primary px-4 py-2 rounded-full"
          >
            Book a Call
          </a>
        </div>
      )}
    </nav>
  );
}

