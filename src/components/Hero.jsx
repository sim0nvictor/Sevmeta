import SV from "../assets/image/SV.png";
import emenike from "../assets/image/emenike.png";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section id="home" className="relative min-h-[calc(100vh-72px)] flex items-center overflow-hidden px-4 md:px-8 py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(139,92,246,0.22),transparent_36%)]" />
      <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center text-center ">
      

      <Link to="/sevlab" className="group">
      <div
       className="
       inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-200 shadow-sm shadow-violet-500/10 duration-300 hover:scale-95"
      >
      <img
      src={SV}
      alt="SV logo"
      className="w-5 h-8 object-contain transition duration-300 group-hover:drop-shadow-[0_0_8px_rgba(99,102,241,0.6)]"
      />
      <span className="bg-primary text-black text-xs px-2 py-1 rounded-full">
      lab
      </span>
      <span className="text-sm text-gray-300 transition duration-300 group-hover:text-white">
      View projects
      </span>
      <span>SEVLab</span>
      </div>
      </Link>

        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
          Turning Ideas into<br />
          <span className="block text-primary mt-2">
           Intelligent Systems
          </span>
        </h1>
               <p className="mt-6 text-gray-400 flex items-center justify-center gap-2">
         <span className="text-sm text-gray-300">Hello, I’m</span>
 
        <span className="bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent font-semibold">
           SEV
         </span>
 
          {/* Avatar */}
           <span className="relative inline-flex items-center justify-center">
           <span className="
           absolute inset-0 rounded-full blur-sm opacity-70
           bg-[conic-gradient(from_0deg,#8b5cf6,#6366f1,#8b5cf6)]
           transition-all duration-300
           group-hover:scale-125
           group-hover:opacity-105
           "></span>
           <div className="group">
           <img
             src={emenike}
             alt="Simon Emenike, SEV"
             className="
              relative w-8 h-8 sm:w-12 sm:h-12 rounded-full object-cover
              transition-transform duration-300
              group-hover:scale-150"
           />
           </div>
           </span>
 
        <span className="text-sm text-gray-300">
          Founder of Sevmeta
        </span>
        </p>
        <p>
          I design and build AI-powered products, Web3 experiences, and intelligent systems under the Sevmeta portfolio.
        </p>
        <div className="mt-10 flex w-full max-w-xl flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href="https://x.com/sevmetaX?s=20"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="follow me on X"
            className="inline-flex items-center justify-center rounded-full bg-violet-500 px-7 py-3 text-sm font-semibold text-black transition hover:bg-violet-400"
          >
            Follow me on X
          </a>

          <a
            href="https://sevlabx.xyz"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View SEVLab"
            className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-7 py-3 text-sm font-semibold text-white transition hover:border-violet-400 hover:bg-white/10"
          >
            Join SEVLab
          </a>

          <a
            href="https://kelucalls.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View Kelucalls"
            className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-7 py-3 text-sm font-semibold text-white transition hover:border-violet-400 hover:bg-white/10"
          >
            View Kelucalls
          </a>
        </div>
      </div>
    </section>
  );
}
