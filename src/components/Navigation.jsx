import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Globe, Menu, Moon, Sun, X } from "lucide-react";
import { useI18n, supportedLanguages } from "../lib/i18n-context";
import Sev from "../assets/image/sev.png";
import SV from "../assets/image/SVE.png";

const navLinks = [
  { key: "home", href: "#home", id: "home" },
  { key: "about", href: "#about", id: "about" },
  { key: "projects", href: "#projects", id: "projects" },
  { key: "skills", href: "#skills", id: "skills" },
  { key: "blog", href: "#blog", id: "blog" },
  { key: "newsletter", href: "#newsletter", id: "newsletter" },
  { key: "websiteService", href: "#website-as-service", id: "website-as-service" },
  { key: "communities", href: "#communities", id: "communities" },
  { key: "contact", href: "#contacts", id: "contacts" },
];

export default function Navigation({ theme, onThemeToggle }) {
  const { language, setLanguage, t } = useI18n();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const languageMenuRef = useRef(null);
  const isDark = theme === "dark";

  const currentSection = location.pathname === "/" && !location.hash
    ? "home"
    : location.hash.slice(1) || activeSection;

  const currentLanguageName = useMemo(
    () => supportedLanguages.find((entry) => entry.code === language)?.name ?? "English",
    [language]
  );

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
      }
    }
  }, [location.hash, location.pathname]);

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (languageMenuRef.current && !languageMenuRef.current.contains(event.target)) {
        setLanguageMenuOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setLanguageMenuOpen(false);
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const closeMenu = () => {
    setOpen(false);
    setLanguageMenuOpen(false);
  };

  const renderLanguageDropdown = (mobile = false) => (
    <div className="relative" ref={languageMenuRef}>
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={languageMenuOpen}
        aria-label={t("nav.selectLanguage")}
        onClick={() => setLanguageMenuOpen((current) => !current)}
        className={[
          isDark
            ? "border-white/10 bg-white/5 text-gray-200 hover:border-violet-400/60 hover:text-violet-300"
            : "border-slate-200 bg-white/80 text-slate-700 hover:border-violet-300 hover:text-violet-600",
          "inline-flex items-center gap-2 rounded-full border transition",
          mobile ? "w-full justify-between px-3 py-2.5 text-left" : "px-2.5 py-2 sm:px-3",
        ].join(" ")}
      >
        <span className="flex items-center gap-2">
          <Globe className="h-4 w-4" aria-hidden="true" />
          {!mobile && <span className="hidden sm:inline">{currentLanguageName}</span>}
        </span>
        {!mobile && <ChevronDown className={`h-4 w-4 transition ${languageMenuOpen ? "rotate-180" : ""}`} aria-hidden="true" />}
      </button>

      {languageMenuOpen && (
        <div
          role="menu"
          aria-label={t("nav.language")}
          className={[
            "absolute z-50 mt-2 overflow-hidden rounded-2xl border shadow-2xl shadow-violet-500/10",
            isDark ? "border-white/10 bg-[#111317]" : "border-slate-200 bg-white",
            mobile ? "left-0 right-0" : "right-0 min-w-44",
          ].join(" ")}
        >
          {supportedLanguages.map((option) => (
            <button
              key={option.code}
              type="button"
              role="menuitemradio"
              aria-checked={language === option.code}
              onClick={() => {
                setLanguage(option.code);
                setLanguageMenuOpen(false);
              }}
              className={[
                "flex w-full items-center justify-between gap-4 px-4 py-3 text-left text-sm transition",
                language === option.code
                  ? isDark
                    ? "bg-violet-500/10 text-violet-200"
                    : "bg-violet-100 text-violet-700"
                  : isDark
                    ? "text-gray-200 hover:bg-white/5"
                    : "text-slate-700 hover:bg-slate-100",
              ].join(" ")}
            >
              <span>{option.name}</span>
              {language === option.code && <span className="text-violet-300">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <nav
      className={[
        "fixed top-0 left-0 right-0 z-50 w-full border-b backdrop-blur-md",
        isDark ? "border-white/10 bg-black/80" : "border-slate-200 bg-white/80",
      ].join(" ")}
    >
      <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-8">
        <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 py-3 sm:gap-4 md:gap-6">
          <Link to="/#home" aria-label="Go to home" onClick={closeMenu} className="justify-self-start">
            <img src={Sev} alt="SEV logo" className="h-9 w-auto object-contain sm:h-11" />
          </Link>

          <div className="flex min-w-0 items-center justify-center">
            <img
              src={SV}
              alt="SV shape"
              className="h-10 w-auto rounded-xl object-contain shadow-[0_4px_16px_rgba(99,102,241,0.24)] ring-1 ring-violet-400/20 transition-shadow duration-300 hover:shadow-[0_6px_22px_rgba(99,102,241,0.35)] sm:h-14"
            />
          </div>

          <div className="flex items-center justify-self-end gap-2 sm:gap-3">
            <div className="hidden items-center gap-2 md:flex md:gap-3">
              {renderLanguageDropdown(false)}
              <button
                type="button"
                onClick={onThemeToggle}
                aria-label={theme === "dark" ? t("nav.switchToLight") : t("nav.switchToDark")}
                aria-pressed={theme === "dark"}
                title={theme === "dark" ? t("nav.switchToLight") : t("nav.switchToDark")}
                className={[
                  "rounded-full border p-2.5 transition",
                  isDark
                    ? "border-white/10 bg-white/5 text-gray-200 hover:border-violet-400/60 hover:text-violet-300"
                    : "border-slate-200 bg-slate-100 text-slate-700 hover:border-violet-300 hover:text-violet-600",
                ].join(" ")}
              >
                {theme === "dark" ? <Sun className="h-4 w-4" aria-hidden="true" /> : <Moon className="h-4 w-4" aria-hidden="true" />}
              </button>
              <Link
                to="/#contacts"
                onClick={closeMenu}
                className={[
                  "hidden rounded-full border px-4 py-2 text-sm font-medium transition lg:inline-flex",
                  isDark
                    ? "border-violet-500/70 bg-violet-500/10 text-violet-200 hover:bg-violet-500 hover:text-white"
                    : "border-violet-300 bg-violet-100 text-violet-700 hover:bg-violet-600 hover:text-white",
                ].join(" ")}
              >
                {t("nav.contact")}
              </Link>
            </div>

            <div className="flex items-center gap-2 md:hidden">
              <button
                type="button"
                onClick={onThemeToggle}
                aria-label={theme === "dark" ? t("nav.switchToLight") : t("nav.switchToDark")}
                aria-pressed={theme === "dark"}
                className={[
                  "rounded-full border p-2 transition",
                  isDark
                    ? "border-white/10 bg-white/5 text-gray-200 hover:border-violet-400/60 hover:text-violet-300"
                    : "border-slate-200 bg-slate-100 text-slate-700 hover:border-violet-300 hover:text-violet-600",
                ].join(" ")}
              >
                {theme === "dark" ? <Sun className="h-4 w-4" aria-hidden="true" /> : <Moon className="h-4 w-4" aria-hidden="true" />}
              </button>
              <button
                type="button"
                onClick={() => setOpen((current) => !current)}
                className={[
                  "rounded-full border p-2 transition",
                  isDark
                    ? "border-white/10 bg-white/5 text-gray-200 hover:border-violet-400/60 hover:text-violet-300"
                    : "border-slate-200 bg-slate-100 text-slate-700 hover:border-violet-300 hover:text-violet-600",
                ].join(" ")}
                aria-label={open ? t("nav.closeMenu") : t("nav.openMenu")}
                aria-expanded={open}
              >
                {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
              </button>
            </div>
          </div>
        </div>

        {open && (
          <div className={[
            "border-t md:hidden",
            isDark ? "border-white/10 bg-black/95" : "border-slate-200 bg-white/95",
          ].join(" ")}>
            <div className="space-y-3 px-4 py-5 text-base">
              <div className="pb-2">{renderLanguageDropdown(true)}</div>

              {navLinks.map(({ key, href, id }) => (
                <Link
                  key={id}
                  to={href.startsWith("#") ? `/${href}` : href}
                  onClick={closeMenu}
                  className={[
                    "block rounded-xl px-3 py-2 transition",
                    currentSection === id
                      ? isDark
                        ? "bg-violet-500/10 font-semibold text-violet-200"
                        : "bg-violet-100 font-semibold text-violet-700"
                      : isDark
                        ? "text-gray-200 hover:bg-white/5 hover:text-violet-200"
                        : "text-slate-700 hover:bg-slate-100 hover:text-violet-700",
                  ].join(" ")}
                >
                  {t(`nav.${key}`)}
                </Link>
              ))}

              <Link
                to="/#contacts"
                onClick={closeMenu}
                className={[
                  "mt-2 inline-flex w-full items-center justify-center rounded-full border px-5 py-3 text-sm font-medium transition",
                  isDark
                    ? "border-violet-500/70 bg-violet-500/10 text-violet-200 hover:bg-violet-500 hover:text-white"
                    : "border-violet-300 bg-violet-100 text-violet-700 hover:bg-violet-600 hover:text-white",
                ].join(" ")}
              >
                {t("nav.contact")}
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
