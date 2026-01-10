import { Code2, Brain, Box, Palette, AudioLines } from "lucide-react";
import StarField from "./StarField";
import sevmetax from "../assets/image/sevmetax.png"


export default function Skills() {
  return (
    <section id="skills" className="relative py-24">
      {/* Backgrounds */}
      <StarField />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(139,92,246,0.25),transparent_60%)]" />

      <div className="relative mx-auto max-w-6xl px-6 text-center">
        <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
          My <span className="text-purple-500">Skills</span>
        </h2>

        <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-300">
           Curiosity driven and constantly learning new skills 
           Building cool stuff all along the way.
           <span className="text-pink-400">Study The Art of Science and Study the Science of Art</span>
        </p>

        {/* Animated Cards */}
        <div
          className="mt-16 grid gap-8 md:grid-cols-3"
        >
          <SkillsCard
            icon={<Code2 className="h-6 w-6 text-purple-400" />}
            title="Frontend Development"
            tags={["Html", "CSS", "JavaScript", "Tailwind Css", "React"]}
          />

          <SkillsCard
            icon={<Brain className="h-6 w-6 text-green-400" />}
            title="AI & Machine Learning"
            tags={["Prompt Engineering", "Python", "Data Analysis", "ML Fundamentals"]}
          />

           <SkillsCard
            icon={<Palette className="h-6 w-6 text-pink-400" />}
            title="Design and Marketing"
            tags={["UI/UX Design", "Graphic Design", "Content Creation", "Community Building"]}
          />

          <SkillsCard
            icon={<AudioLines className="h-6 w-6 text-blue-400" />}
            title="Spaces Host on Twitter"
            image={sevmetax}
            buttonLabel={"@sevmetaX"}
            buttonHref={"https://x.com/sevmetaX?s=20"}
          />

          <SkillsCard
            icon={<Box className="h-6 w-6 text-purple-400" />}
            title="Web3 & Blockchain"
            tags={["Solidity", "Web3.js", "NFTs", "Smart Contract", "DApp"]}
          />
        </div>
      </div>
    </section>
  );
}

function SkillsCard({ icon, title, buttonLabel, buttonHref, tags = [], image }) {
  return (
    <div
      className="rounded-2xl border border-white/10 bg-white/5 p-8 text-left backdrop-blur
                 transition hover:border-purple-500/40 hover:bg-white/10"
    >
      {/* Icon */}
      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10">
        {icon}
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold text-white">{title}</h3>

      {/* Pills */}
      <div className="mt-4 flex flex-wrap gap-3">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="rounded-full border border-purple-500/30
                       bg-purple-500/10 px-4 py-1 text-sm
                       text-purple-300 transition
                       hover:bg-purple-500/20 hover:text-purple-200"
          >
            {tag}
          </span>
        ))}
      </div>

      {image && (
        <div className="mb-6 overflow-hidden rounded-xl flex justify-center">
          <img src={image} alt={title} className="
          h-10 w-10 object-cover 
          transition-transform duration-300 
          hover:scale-105 rounded-full object-cover" />
        </div>
      )}

      <div className="flex justify-center">
      {buttonLabel && (
        <a
          href={buttonHref}
          className="mt-6 inline-flex w-fit items-center justify-center rounded-lg
                     border border-yellow-500/40 bg-yellow-500/10 px-4 py-2
                     text-sm font-medium text-yellow-300 transition
                     hover:bg-yellow-500/20 hover:text-yellow-200"
        >
          {buttonLabel}
        </a>
      )}
      </div>
    </div>
  );
}
