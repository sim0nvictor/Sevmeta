import { Routes, Route, Navigate } from 'react-router-dom';

import StarField from "./components/StarField";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Sevlab from "./components/Sevlab";
import Communities from "./components/Communities";
import Spaces from "./components/Spaces";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

import Blog from "./components/Blog";
import { FullPost } from "./components/BlogFullPost";
import CreatePost from "./components/CreatePost";
import Profile from "./components/Profile";

export default function App() {
  return (
    <>
      <StarField />
      <Navigation />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <section id="shipping" className="bg-[#0B0E14] py-20">
                <div className="mx-auto max-w-7xl px-4 md:px-8">
                  <div className="text-center">
                    <p className="text-sm uppercase tracking-[0.32em] text-violet-300">
                      Sevmeta Portfolio
                    </p>
                    <h2 className="mt-4 text-3xl md:text-4xl font-semibold text-gray-100">
                      Products, products and growth systems built by SEV.
                    </h2>
                    <p className="mt-4 max-w-2xl mx-auto text-gray-300">
                      Explore the Sevmeta portfolio: Web3 products, AI tools, and communities shaping tomorrow.
                    </p>
                  </div>
                  <div className="mt-12 grid gap-6 grid-cols-1 md:grid-cols-2">
                    <a
                      href="https://sevlabx.xyz"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Explore SEVLab"
                      className="group rounded-3xl border border-white/10 bg-white/5 p-8 transition hover:border-violet-400/50 hover:bg-white/10"
                    >
                      <p className="text-sm uppercase tracking-[0.32em] text-violet-300">
                        SEVLab
                      </p>
                      <h3 className="mt-4 text-2xl font-semibold text-gray-100">
                        SEV Lab is one of Sevmeta’s flagship product communities.
                      </h3>
                      <p className="mt-4 text-gray-300">
                        A portfolio product for builders, growth operators, and Web3 founders.
                      </p>
                      <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white">
                        Explore the SEV Lab portfolio →
                      </span>
                    </a>

                    <a
                      href="https://kelucalls.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Explore Kelucalls"
                      className="group rounded-3xl border border-white/10 bg-white/5 p-8 transition hover:border-violet-400/50 hover:bg-white/10"
                    >
                      <p className="text-sm uppercase tracking-[0.32em] text-violet-300">
                        Kelucalls
                      </p>
                      <h3 className="mt-4 text-2xl font-semibold text-gray-100">
                        Kelucalls is Sevmeta’s flagship crypto intelligence product.
                      </h3>
                      <p className="mt-4 text-gray-300">
                        Track signal, rank channels, and discover high-conviction crypto calls.
                      </p>
                      <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white">
                        Explore Kelucalls →
                      </span>
                    </a>
                    
                  </div>
                </div>
              </section>
              <About />
              <Skills />
              <Blog />
              <Projects />
              <Sevlab />
              <Communities />
              <Spaces />
              <Contact />
              <Footer />
            </>
          }
        />

        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<FullPost />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        
        <Route path="/hero" element={<Hero />} />
        <Route path="/sevlab" element={<Sevlab />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  );
}