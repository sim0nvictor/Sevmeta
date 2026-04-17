import Sevlab from "../assets/image/Sevlab.png";
import emenike from "../assets/image/emenike.png";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center text-center px-6 pt-24" id="home">

      {/* Glow background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(139,92,246,0.25),transparent_60%)]"/>

      <div className="relative max-w-4xl">

        {/* Badge / Link */}
        <a
          href="https://sevlab.dev"
          className="group inline-flex justify-center mb-8 transition-transform duration-300 hover:scale-95"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10">
            <img
              src={Sevlab}
              alt="Sevlab logo"
              className="w-5 h-8 object-contain transition duration-300 group-hover:drop-shadow-[0_0_8px_rgba(99,102,241,0.6)]"/>
            <span className="bg-primary text-black text-xs px-2 py-1 rounded-full">
              lab
            </span>
            <span className="text-sm text-gray-300 transition duration-300 group-hover:text-white">
              View projects
            </span>
          </div>
        </a>

        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
          Turning Ideas into<br />
          <span className="block text-primary mt-2">
           Intellegent Systems
          </span>
        </h1>

       <p className="mt-6 text-gray-400 flex items-center justify-center gap-2">
         <span>Hello, I’m</span>

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
             alt="Emenike"
             className="
              relative w-8 h-8 sm:w-12 sm:h-12 rounded-full object-cover
              transition-transform duration-300
              group-hover:scale-150"
           />
           </div>
           </span>

        <span>A Full Stack Developer</span>
        </p>

        <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
          I design and build AI powerd products, web3 experiences, and intelligent systems that solve real world problems.
        </p>

       <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
       <a
         href="https://x.com/sevmetaX?s=20"
         className="border border-primary text-primary px-4 py-2 rounded-full
         transition-all duration-300
         hover:scale-95
         hover:bg-primary hover:text-purple-800
         hover:shadow-[0_0_12px_rgba(99,102,241,0.6)]
         flex items-center gap-2
        ">
            <svg
               xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 24 24"
               className="w-5 h-5 fill-current transition
               group-hover:scale-110
               group-hover:drop-shadow-[0_0_8px_rgba(99,102,241,0.6)]"
            >
            <path d="M18.901 1.153h3.68l-8.04 9.19 9.46 12.504h-7.41l-5.8-7.584-6.64 7.584H.47l8.6-9.83L0 1.153h7.6l5.24 6.932z"/>
            </svg>

         {'Let\'s connect →'}
        </a>
        </div>
      </div>
    </section>
  );
}
