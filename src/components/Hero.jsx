import SV from "../assets/image/SV.png";
import emenike from "../assets/image/emenike.png";
import { Link } from "react-router-dom";
import { useI18n } from "../lib/i18n-context";
import { XIcon } from "../assets/icons.jsx";
import { ArrowUpRight, BriefcaseBusiness, Layers3, UserRound } from "lucide-react";

export default function Hero() {
  const { t } = useI18n();
  const cards = [
    {
      title: t("hero.websiteCardTitle"),
      description: t("hero.websiteCardDescription"),
      href: "/website-as-service",
      icon: <BriefcaseBusiness aria-hidden="true" className="h-5 w-5" />,
      asLink: true,
    },
    {
      title: t("hero.productsCardTitle"),
      description: t("hero.productsCardDescription"),
      href: "#products",
      icon: <Layers3 aria-hidden="true" className="h-5 w-5" />,
    },
    {
      title: t("hero.aboutCardTitle"),
      description: t("hero.aboutCardDescription"),
      href: "#about",
      icon: <UserRound aria-hidden="true" className="h-5 w-5" />,
    },
  ];

  return (
    <section id="home" className="relative min-h-[calc(100vh-72px)] flex items-center overflow-hidden px-4 md:px-8 py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(139,92,246,0.22),transparent_36%)]" />
      <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center text-center">
        <div className="flex items-center gap-3">
          <Link to="/sevlab" className="group">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-200 shadow-sm shadow-violet-500/10 duration-300 hover:scale-95">
              <img
                src={SV}
                alt="SV logo"
                className="rounded-full w-5 h-8 object-contain transition duration-300 group-hover:drop-shadow-[0_0_8px_rgba(99,102,241,0.6)]"
              />
              <span className="bg-primary text-black text-xs px-2 py-1 rounded-full">lab</span>
              <span className="text-sm text-gray-300 transition duration-300 group-hover:text-white">
                {t("hero.viewProjects")}
              </span>
              <span>SEVLab</span>
            </div>
          </Link>
          <a
            href="https://x.com/sevmeta?s=20"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit Sevmeta on X"
            className="hero-glass-button inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white shadow-sm shadow-violet-500/10 transition hover:border-violet-400 hover:bg-white/10"
          >
            <XIcon className="h-4 w-4" />
          </a>
        </div>

        <h1 className="mt-8 text-5xl md:text-7xl font-extrabold leading-tight">
          {t("hero.build")}
          <br />
          <span className="block text-primary mt-2">{t("hero.systems")}</span>
        </h1>

        <p className="mt-6 text-gray-400 flex items-center justify-center gap-2">
          <span className="text-sm text-gray-300">{t("hero.hello")}</span>

          <span className="bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent font-semibold">
            SEV
          </span>

          <span className="relative inline-flex items-center justify-center">
            <span className="absolute inset-0 rounded-full blur-sm opacity-70 bg-[conic-gradient(from_0deg,#8b5cf6,#6366f1,#8b5cf6)] transition-all duration-300 group-hover:scale-125 group-hover:opacity-105"></span>
            <div className="group">
              <img
                src={emenike}
                alt="Simon Emenike, SEV"
                className="relative w-8 h-8 sm:w-12 sm:h-12 rounded-full object-cover transition-transform duration-300 group-hover:scale-150"
              />
            </div>
          </span>

          <span className="text-sm text-gray-300">{t("hero.role")}</span>
        </p>

        <p className="mt-4 max-w-2xl text-base text-gray-400 md:text-lg">
          {t("hero.description")}
        </p>

        <div className="mt-10 grid w-full max-w-5xl grid-cols-1 gap-4 text-left sm:grid-cols-3 sm:gap-5">
          {cards.map(({ title, description, href, icon, asLink }, index) => {
            const className = `hero-entry-card group relative flex min-h-36 flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-white shadow-lg shadow-black/10 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:border-violet-400/50 hover:bg-violet-500/[0.08] hover:shadow-xl hover:shadow-violet-950/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-400 sm:min-h-48 sm:p-6 hero-entry-card-${index + 1}`;
            const content = (
              <>
                <span className="flex items-center justify-between">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-violet-300/20 bg-violet-400/10 text-violet-300 transition duration-300 group-hover:scale-110 group-hover:bg-violet-400/20">
                    {icon}
                  </span>
                  <ArrowUpRight aria-hidden="true" className="h-5 w-5 text-gray-500 transition duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-violet-300" />
                </span>
                <span className="mt-5">
                  <span className="block text-lg font-semibold tracking-tight text-gray-100 sm:text-xl">{title}</span>
                  <span className="mt-2 block text-sm leading-relaxed text-gray-400">{description}</span>
                </span>
              </>
            );

            return asLink ? (
              <Link key={title} to={href} className={className}>
                {content}
              </Link>
            ) : (
              <a key={title} href={href} className={className}>
                {content}
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
