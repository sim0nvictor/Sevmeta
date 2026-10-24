import StarField from "./StarField";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Building2,
  Gem,
  Globe,
  Users,
  CheckCircle2,
  Clock3,
  Hammer,
} from "lucide-react";
import { useI18n } from "../lib/i18n-context";

import Nimble from "../assets/image/Nimble.png";
import KeluCalls from "../assets/image/kelucalls.png";

const featuredProducts = [
  {
    name: "KeluCalls",
    description:
      "Sevmeta’s flagship crypto intelligence product. Discover, analyze, and track crypto call channels with transparent rankings, performance analytics, and community-driven insights.",
    status: "Active Development",
    statusColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    image: KeluCalls,
    features: [
      "Call channel rankings",
      "Performance analytics",
      "Project discovery",
      "Community reviews",
      "Trending calls",
    ],
    primary: "Visit Website",
    primaryLink: "https://kelucalls.com",
    secondary: "Learn More",
    secondaryLink: "https://kelucalls.com/help",
  },
  {
    name: "Nimble",
    description:
      "An AI-powered workspace for builders that combines notes, tasks, AI assistance, project organization, and collaboration into one seamless experience.",
    status: "Coming Soon",
    statusColor: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    image: Nimble,
    features: [
      "AI Assistant",
      "Smart Notes",
      "Task Management",
      "Project Organization",
      "Team Collaboration",
    ],
    primary: "Join Waitlist",
    primaryLink: null,
    secondary: "Learn More",
    secondaryLink: null,
  },
];

const projects = [
  {
    name: "SEV Lab",
    description: "A flagship Sevmeta product platform helping ambitious crypto projects grow.",
    icon: Building2,
    status: "Live",
    color: "text-emerald-400",
  },
  {
    name: "Coin Towncrier",
    description: "Community-driven crypto listing and discovery platform.",
    icon: Globe,
    status: "Planning",
    color: "text-amber-400",
  },
  {
    name: "GEM Sniper",
    description: "Find trending meme coins and early-stage crypto gems.",
    icon: Gem,
    status: "Planning",
    color: "text-amber-400",
  },
  {
    name: "Arcadia Network",
    description: "A community for builders, thinkers, and creators.",
    icon: Users,
    status: "Building",
    color: "text-sky-400",
  },
];

const stats = [
  { value: "7+", label: "Products Built" },
  { value: "3", label: "Currently Building" },
  { value: "20+", label: "Technologies" },
  { value: "∞", label: "Ideas Ahead" },
];

function ProductButton({ label, link, variant }) {
  const baseClasses =
    variant === "primary"
      ? "rounded-xl bg-cyan-500 px-6 py-3 font-medium text-black transition hover:bg-cyan-400"
      : "flex items-center rounded-xl border border-white/10 px-6 py-3 text-white transition hover:border-cyan-400";

  if (link) {
    return (
      <a href={link} target="_blank" rel="noopener noreferrer" className={baseClasses}>
        {label}
        {variant === "secondary" && <ArrowUpRight className="ml-2 h-4 w-4" />}
      </a>
    );
  }

  return (
    <button className={baseClasses}>
      {label}
      {variant === "secondary" && <ArrowUpRight className="ml-2 h-4 w-4" />}
    </button>
  );
}

export default function Sevlab() {
  const { t } = useI18n();

  return (
    <section id="products" className="relative overflow-hidden py-24">
      <StarField />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-400">
            <Hammer className="mr-2 h-4 w-4" />
            {t("products.portfolio")}
          </div>

          <h2 className="text-5xl font-bold tracking-tight text-white md:text-6xl">{t("products.title")}</h2>
          <p className="mt-8 text-lg leading-8 text-gray-400">{t("products.description")}</p>
        </div>

        <div className="mt-24 space-y-10">
          {featuredProducts.map((product, index) => (
            <div key={product.name} className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur transition-all duration-300 hover:border-cyan-500/30">
              <div className="grid gap-12 lg:grid-cols-2">
                <div className="flex items-center justify-center p-10">
                  <div className="flex aspect-video w-full items-center justify-center rounded-2xl border border-dashed border-cyan-500/20 bg-gradient-to-br from-cyan-500/5 to-transparent">
                    <div className="text-center">
                      <img src={product.image} alt={product.name} className="h-auto w-full rounded-lg" />
                      <p className="text-gray-500">{product.name}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-center p-10">
                  <div className={`mb-6 inline-flex w-fit rounded-full border px-4 py-1 text-sm ${product.statusColor}`}>
                    {t("products.statuses")[index] || product.status}
                  </div>

                  <h3 className="text-4xl font-bold text-white">{product.name}</h3>
                  <p className="mt-6 leading-8 text-gray-400">{product.description}</p>

                  <div className="mt-8 grid gap-3 sm:grid-cols-2">
                    {product.features.map((feature, featureIndex) => (
                      <div key={feature} className="flex items-center text-gray-300">
                        <CheckCircle2 className="mr-3 h-5 w-5 text-cyan-400" />
                        {t("products.features")[featureIndex] || feature}
                      </div>
                    ))}
                  </div>

                  <div className="mt-10 flex flex-wrap gap-4">
                    <ProductButton label={index === 0 ? t("products.visit") : t("products.joinWaitlist")} link={product.primaryLink} variant="primary" />
                    <ProductButton label={t("products.learnMore")} link={product.secondaryLink} variant="secondary" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-28">
          <h3 className="mb-10 text-center text-3xl font-bold text-white">{t("products.moreProjects")}</h3>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {projects.map((project, index) => {
              const Icon = project.icon;
              return (
                <div key={project.name} className="rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition hover:-translate-y-2 hover:border-cyan-500/30">
                  <Icon className={`mb-6 h-10 w-10 ${project.color}`} />
                  <h4 className="text-xl font-semibold text-white">{project.name}</h4>
                  <p className="mt-3 text-sm leading-7 text-gray-400">{project.description}</p>
                  <div className="mt-6 flex items-center text-sm text-gray-500">
                    <Clock3 className="mr-2 h-4 w-4" />
                    {t("products.statuses")[index] || project.status}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mx-auto mt-32 max-w-4xl rounded-3xl border border-cyan-500/10 bg-gradient-to-r from-cyan-500/5 to-transparent p-12 text-center">
          <h3 className="text-3xl font-bold text-white">{t("products.philosophy")}</h3>
          <p className="mt-8 text-lg leading-9 text-gray-300">{t("products.philosophyLead")}</p>
          <p className="mt-4 text-lg leading-9 text-gray-400">{t("products.philosophyBody")}</p>
        </div>

        <div className="mt-24 grid gap-6 md:grid-cols-4">
          {t("products.stats").map((stat, index) => (
            <div key={stat} className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center">
              <h4 className="text-5xl font-bold text-cyan-400">{stats[index]?.value ?? ""}</h4>
              <p className="mt-4 text-gray-400">{stat}</p>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-32 max-w-4xl text-center">
          <h3 className="text-4xl font-bold text-white">{t("products.interested")}</h3>
          <p className="mt-6 text-lg leading-8 text-gray-400">{t("products.connect")}</p>
          <div>
            <Link to="/contact" className="mt-8 inline-flex items-center rounded-lg bg-cyan-500 px-6 py-3 text-lg font-medium text-black transition hover:bg-cyan-400">{t("products.contact")}</Link>
          </div>
        </div>
      </div>
    </section>
  );
}