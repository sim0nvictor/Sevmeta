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
        
        <Route path="/sevlab" element={<Sevlab />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  );
}