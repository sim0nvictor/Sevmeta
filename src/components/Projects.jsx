import { Link } from "react-router-dom";
import Sevlab from "../assets/image/SV.png";

const projects = [
    {
        title: "SEV Lab",
        image: Sevlab,
        description:
            "SEVLab is a community-driven platform for creators, founders, and builders turning ideas into reality. We empower self-taught engineers and independent builders with guidance, mentorship, collaboration, and practical support to overcome challenges, learn faster, and build products that make an impact.",
        highlights: [
            "Ship better products faster through rapid experimentation",
            "Master AI tools that actually accelerate your workflow",
            "Build better products and grow faster with collective intelligence",
        ],
        techStack: ["React", "TypeScript", "Node.js", "AI APIs"],
        buttonList: [
            { label: "See other projects", to: "/sevlab", external: false },
            { label: "Join SEV Lab", to: "https://sevlabx.xyz", external: true },
        ],
    },
];

export default function Projects() {
    return (
        <section id="projects" className="relative py-24">
            <div className="relative mx-auto max-w-6xl px-6 text-center">
                <h2 className="bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent text-4xl font-bold tracking-tight md:text-5xl">
                    Sevmeta Portfolio
                </h2>

                <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-300">
                    Explore the portfolio products and projects built by SEV.
                </p>
            </div>

            <div className="mx-auto mt-16 flex max-w-6xl flex-col gap-8 px-6">
                {projects.map((project) => (
                    <ProjectsCard key={project.title} {...project} />
                ))}
            </div>
        </section>
    );
}

function ProjectsCard({ title, image, description, highlights, techStack, buttonList }) {
    return (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_0_40px_rgba(139,92,246,0.08)] backdrop-blur transition duration-300 hover:-translate-y-1 hover:bg-white/10">
            <div className="flex flex-col gap-8 md:flex-row">
                <div className="md:w-1/2">
                    <img
                        src={image}
                        alt={title}
                        className="h-auto w-full rounded-xl border border-white/10 object-cover"
                    />
                </div>

                <div className="flex flex-col justify-center md:w-1/2">
                    <h3 className="text-2xl font-bold text-white">{title}</h3>

                    <p className="mt-4 text-gray-300">{description}</p>

                    <div className="mt-6">
                        <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
                            Highlights
                        </h4>
                        <ul className="mt-3 space-y-2 text-left text-sm text-gray-300">
                            {highlights.map((item) => (
                                <li key={item} className="flex items-start gap-2">
                                    <span className="mt-1 text-cyan-400">•</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-2">
                        {techStack.map((item) => (
                            <span
                                key={item}
                                className="rounded-full border border-purple-400/30 bg-purple-500/10 px-3 py-1 text-sm text-purple-200"
                            >
                                {item}
                            </span>
                        ))}
                    </div>

                    <div className="mt-8 flex flex-wrap gap-4">
                        {buttonList.map((button) =>
                            button.external ? (
                                <a
                                    key={button.label}
                                    href={button.to}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="rounded-full border border-cyan-400 px-5 py-2 text-cyan-400 transition hover:bg-cyan-400 hover:text-black"
                                >
                                    {button.label}
                                </a>
                            ) : (
                                <Link
                                    key={button.label}
                                    to={button.to}
                                    className="rounded-full border border-cyan-400 px-5 py-2 text-cyan-400 transition hover:bg-cyan-400 hover:text-black"
                                >
                                    {button.label}
                                </Link>
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}