import Sevlab from "../assets/image/SV.png";
export default function Projects() {
    return (
        <section id="projects" className="relative py-24">
            <div className="relative mx-auto max-w-6xl px-6 text-center">
                <h2 className="bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent text-4xl font-bold tracking-tight md:text-5xl">Projects.</h2>
                <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-300">
                    Check out my works
                </p>
            </div>
            <ProjectsCard 
            title="Sevlab"
            image={Sevlab}
            description="See my Works"
            buttonLabel="Visit Sevlab"
            buttonHref="https://x.com/Sevlabx?s=20"
            />
        </section>

    )
}
function ProjectsCard({ title, image, description, buttonLabel, buttonHref }) {
    return (
        <div className="mt-16 mx-auto max-w-4xl rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/2">
                    <img src={image} alt={title} className="w-full h-auto rounded-lg" />
                </div>
                <div className="md:w-1/2">
                    <h3 className="text-xl font-bold text-white">{title}</h3>
                    <p className="mt-4 text-gray-300">{description}</p>
                    <a href={buttonHref} className="mt-6 inline-block border border-primary text-primary px-4 py-2 rounded-full hover:bg-primary hover:text-black transition">
                        {buttonLabel}
                    </a>
                </div>
            </div>
        </div>
    )
}