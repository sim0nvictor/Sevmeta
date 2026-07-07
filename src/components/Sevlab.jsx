import StarField from "./StarField";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Rocket,
  Brain,
  Building2,
  Gem,
  Globe,
  Users,
  CheckCircle2,
  Clock3,
  Hammer,
} from "lucide-react";

import Nimble from "../assets/image/Nimble.png";
import KeluCalls from "../assets/image/kelucalls.png";

const featuredProducts = [
  {
    name: "KéluCalls",
    description:
      "Crypto intelligence for traders. Discover, analyze, and track crypto call channels with transparent rankings, performance analytics, and community-driven insights.",
    status: "Active Development",
    statusColor:
      "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    image: KeluCalls,
    features: [
      "Call channel rankings",
      "Performance analytics",
      "Project discovery",
      "Community reviews",
      "Trending calls",
    ],
    primary: "Visit Website",
    secondary: "Learn More",
  },
  {
    name: "Nimble",
    description:
      "AI-powered social commerce platform for modern businesses.Nimble helps merchants manage products, engage customers, and grow their businesses through AI-powered automation. The platform combines a React web dashboard, a React Native mobile app, and a Node.js backend into one seamless experience.",
    status: "Coming Soon",
    statusColor: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    image: Nimble,
    features: [
      "AI Assistant",
      "AI-powered product recognition from images",
      "Smart product catalog management",
      "AI-generated marketing content for WhatsApp, Instagram, and TikTok",
      "Customer chat management with quick replies",
      "Business analytics and multi-currency support",
      "Task Management",

    ],
    primary: "Join Waitlist",
    secondary: "Learn More",
  },
];

const projects = [
  {
    name: "SEV Lab",
    description: "Web3 marketing agency helping ambitious crypto projects grow.",
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
  {
    value: "7+",
    label: "Products Built",
  },
  {
    value: "3",
    label: "Currently Building",
  },
  {
    value: "20+",
    label: "Technologies",
  },
  {
    value: "∞",
    label: "Ideas Ahead",
  },
];

export default function Sevlab() {
  return (
    <section
      id="products"
      className="relative overflow-hidden py-24"
    >
      <StarField />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* HERO */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-400">
            <Hammer className="mr-2 h-4 w-4" />
            Building products for the internet
          </div>

          <h2 className="text-5xl font-bold tracking-tight text-white md:text-6xl">
            Products
          </h2>

          <p className="mt-8 text-lg leading-8 text-gray-400">
            I enjoy building software that solves real problems. Every project
            is an opportunity to learn, experiment, and create something people
            genuinely enjoy using.
          </p>
        </div>

        {/* FEATURED */}
        <div className="mt-24 space-y-10">
          {featuredProducts.map((product) => {
            const Icon = product.icon;

            return (
              <div
                key={product.name}
                className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur transition-all duration-300 hover:border-cyan-500/30"
              >
                <div className="grid gap-12 lg:grid-cols-2">
                  {/* Screenshot */}
                  <div className="flex items-center justify-center p-10">
                    <div className="flex aspect-video w-full items-center justify-center rounded-2xl border border-dashed border-cyan-500/20 bg-gradient-to-br from-cyan-500/5 to-transparent">
                      <div className="text-center">
                        <img src={product.image} alt={product.image} className="full h-auto w-full rounded-lg" />
                        <p className="text-gray-500">
                          {product.name}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col justify-center p-10">
                    <div
                      className={`mb-6 inline-flex w-fit rounded-full border px-4 py-1 text-sm ${product.statusColor}`}
                    >
                      {product.status}
                    </div>

                    <h3 className="text-4xl font-bold text-white">
                      {product.name}
                    </h3>

                    <p className="mt-6 leading-8 text-gray-400">
                      {product.description}
                    </p>

                    <div className="mt-8 grid gap-3 sm:grid-cols-2">
                      {product.features.map((feature) => (
                        <div
                          key={feature}
                          className="flex items-center text-gray-300"
                        >
                          <CheckCircle2 className="mr-3 h-5 w-5 text-cyan-400" />
                          {feature}
                        </div>
                      ))}
                    </div>

                    <div className="mt-10 flex flex-wrap gap-4">
                      <button className="rounded-xl bg-cyan-500 px-6 py-3 font-medium text-black transition hover:bg-cyan-400">
                        {product.primary}
                      </button>

                      <button className="flex items-center rounded-xl border border-white/10 px-6 py-3 text-white transition hover:border-cyan-400">
                        {product.secondary}
                        <ArrowUpRight className="ml-2 h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* MORE PROJECTS */}
        <div className="mt-28">
          <h3 className="mb-10 text-center text-3xl font-bold text-white">
            More Projects
          </h3>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {projects.map((project) => {
              const Icon = project.icon;

              return (
                <div
                  key={project.name}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition hover:-translate-y-2 hover:border-cyan-500/30"
                >
                  <Icon className={`mb-6 h-10 w-10 ${project.color}`} />

                  <h4 className="text-xl font-semibold text-white">
                    {project.name}
                  </h4>

                  <p className="mt-3 text-sm leading-7 text-gray-400">
                    {project.description}
                  </p>

                  <div className="mt-6 flex items-center text-sm text-gray-500">
                    <Clock3 className="mr-2 h-4 w-4" />
                    {project.status}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* PHILOSOPHY */}
        <div className="mx-auto mt-32 max-w-4xl rounded-3xl border border-cyan-500/10 bg-gradient-to-r from-cyan-500/5 to-transparent p-12 text-center">
          <h3 className="text-3xl font-bold text-white">
            Building Philosophy
          </h3>

          <p className="mt-8 text-lg leading-9 text-gray-300">
            I don't build products just to launch them.
          </p>

          <p className="mt-4 text-lg leading-9 text-gray-400">
            I build software that solves problems I'd personally want solved.
            Every project teaches me something new about engineering, design,
            marketing, and creating experiences that people genuinely enjoy.
          </p>
        </div>

        {/* STATS */}
        <div className="mt-24 grid gap-6 md:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center"
            >
              <h4 className="text-5xl font-bold text-cyan-400">
                {stat.value}
              </h4>

              <p className="mt-4 text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mx-auto mt-32 max-w-4xl text-center">
          <h3 className="text-4xl font-bold text-white">
            Interested in working together?
          </h3>

          <p className="mt-6 text-lg leading-8 text-gray-400">
            Whether it's building software, collaborating on a startup, or
            discussing new ideas, I'm always excited to connect with other
            builders.
          </p>
          <div>
            <Link to="/contact" className="mt-8 inline-flex items-center rounded-lg bg-cyan-500 px-6 py-3 text-lg font-medium text-black transition hover:bg-cyan-400">
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}