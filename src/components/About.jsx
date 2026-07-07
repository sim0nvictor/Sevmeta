import { Code2, Brain, Rocket } from "lucide-react";
import StarField from "./StarField";
import simon from "../assets/image/simon.png";

export default function About() {
  return (
    <section id="about" className="relative py-24">

      {/* Starfield background */}
      <StarField />

      {/* Glow background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(139,92,246,0.25),transparent_60%)]"/>

        <div className="relative mx-auto max-w-6xl px-6 text-center">
          <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl text-center">
              About <span className="text-purple-500">Me</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-purple-200 md:text-base">
            I turn internet knowledge into real world systems.
          </p>

           <div className="mx-auto mt-10 max-w-5xl flex flex-col md:flex-row items-center md:items-start gap-8">
             {/* Image */}
             <div className="w-full md:w-1/2 rounded-3xl overflow-hidden border-4 border-purple-500/30 shadow-lg shadow-purple-500/20 transition-transform duration-300 hover:scale-105">
               <img
                 src={simon}
                 alt="simon"
                 className="w-full h-auto object-contain bg-black/5"
               />
             </div>

             {/* Text */}
             <div className="w-full md:w-1/2">
               <p className="mx-auto max-w-xl text-lg text-gray-300 leading-relaxed md:mx-0 text-left">
                  I'm Simon Emenike, also known as  <span className="bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent font-semibold">SEV</span>. 
                 I build digital systems that solve real-world problems.
              
                 <span>
                  <br />
                  <br />
                 I believe in self-education, leverage, and creating value from first principles.
                 <br />
                 <br />
                 Inspired by thinkers like <span className="bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent font-semibold">Leonardo da Vinci</span> and <span className="bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent font-semibold">Friedrich Nietzsche</span>,
                 I focus on mastering multiple disciplines and turning ideas into execution.
                 <br />
                 <br />
                 No traditional degree just the internet, relentless learning, and building.
                 <br />
                 <br />
                 <div className="text-lg font-semibold">Right now I focus on:</div>
                 <br />
                 <div className="bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent font-semibold">.Web3 Products</div>
                 <br />
                 <div className="bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent font-semibold">.AI Applications</div>
                 <br />
                 <div className="bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent font-semibold">.Growth systems</div>
                 <br />
                 <div className="bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent font-semibold">.Scalable digital solutions</div>
                 <br />
                 <br />
                 <span className="bg-gradient-to-r from-pink-400 to-indigo-500 bg-clip-text text-transparent font-semibold">If it solves a real problem, I'm interested in building it.</span>
                 </span>
               </p>
             </div>
           </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            <AboutCard
              icon={<Code2 className="h-6 w-6 text-purple-400" />}
              title="Self-Taught Engineer"
              description="Passionate about computer science and programming,
              constantly learning and building."
              delay="0"
            />

            <AboutCard
              icon={<Brain className="h-6 w-6 text-green-400" />}
              title="AI Enthusiast"
              description="Studying machine learning and AI when not coding,
              exploring the future of technology."
              delay="200"
            />

            <AboutCard
              icon={<Rocket className="h-6 w-6 text-purple-400" />}
              title="Web3 Builder"
              description="Active in the web3 space as a marketer, influencer,
              and community builder."
              delay="400"
            />
          </div>
          <div className="mt-10"></div>
          <div
            className="col-span-full rounded-2xl border border-white/10 bg-white/5 p-6
            col-span-full
            border border-white/10
            bg-white/5
            p-6
            text-left
            backdrop-blur
            transition-all
            duration-500
            hover:border-purple-500/40
            hover:bg-white/10
            hover:shadow-xl
            hover:shadow-purple-500/20
            animate-fade-in-up
            "
            style={{ animationDelay: '600ms', animationFillMode: 'both' }}
        >
      <p className="text-gray-300 leading-relaxed">
          When I’m not coding, you’ll find me studying and exploring technology,
          building my personal brand, and especially active on{" "}
      <a
         href="https://x.com/sevmetaX?s=20"
         target="_blank"
         rel="noopener noreferrer"
         className="group inline-flex items-center gap-1 text-primary font-medium"
      >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="w-5 h-5 fill-current transition
          group-hover:scale-110
          group-hover:drop-shadow-[0_0_8px_rgba(99,102,241,0.6)]"
      >
        <path d="M18.901 1.153h3.68l-8.04 9.19 9.46 12.504h-7.41l-5.8-7.584-6.64 7.584H.47l8.6-9.83L0 1.153h7.6l5.24 6.932z"/>
      </svg>
    </a>{" "}
    as a Web3 marketer, influencer, and contributor to amazing communities 
    hosting spaces, sharing ideas, and building in public.
  </p>
</div>

        </div>
    </section>
  );
}

function AboutCard({ icon, title, description, delay }) {
  return (
    <div
      className="rounded-2xl border border-white/10 bg-white/5 p-8 text-left backdrop-blur transition-all duration-500 hover:border-purple-500/40 hover:bg-white/10 hover:scale-95 hover:shadow-2xl hover:shadow-purple-500/30 hover:brightness-110 animate-fade-in-up"
      style={{
        animationDelay: `${delay}ms`,
        animationFillMode: 'both'
      }}
    >
      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 transition-transform duration-300 hover:scale-110 hover:rotate-12">
        {icon}
      </div>

      <h3 className="text-xl font-semibold text-white transition-colors duration-300 hover:text-purple-400">{title}</h3>
      <p className="mt-3 text-gray-400 transition-colors duration-300 hover:text-gray-300">{description}</p>
    </div>
  );
}