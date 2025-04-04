import { Button } from "../components/UI/button";
import { Link } from "react-router-dom";
import { Logo } from "../icons/Logo";
import { useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { RefType } from "mongoose";

export default function HomePage() {
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const testimonialsRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  function scrollToSection(ref:RefType) {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false); // Close menu when navigating
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-200 to-purple-300 flex flex-col">
      {/* Navbar */}
      <nav className="w-full fixed top-0 bg-gradient-to-r from-blue-200 to-purple-300 shadow-md py-3 px-6 flex justify-between items-center z-50">
        <div className="flex items-center space-x-3 text-blue-800 ml-4">
          <Logo />
          <span className="text-2xl font-bold text-blue-800">Brainly</span>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex space-x-10">
          <button onClick={() => scrollToSection(homeRef)} className="text-xl font-semibold text-gray-700 hover:text-gray-900">
            Home
          </button>
          <button onClick={() => scrollToSection(aboutRef)} className="text-xl font-semibold text-gray-700 hover:text-gray-900">
            About
          </button>
          <button onClick={() => scrollToSection(testimonialsRef)} className="text-xl font-semibold text-gray-700 hover:text-gray-900">
            Testimonials
          </button>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex space-x-4">
          <Link to="/signin">
            <Button variant="primary" size="md" text="Sign In" />
          </Link>
          <Link to="/signup">
            <Button variant="primary" size="md" text="Get Started" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-14 left-0 w-full bg-white shadow-md py-4 flex flex-col items-center space-y-4 z-40">
          <button onClick={() => scrollToSection(homeRef)} className="text-lg font-semibold text-gray-700 hover:text-gray-900">
            Home
          </button>
          <button onClick={() => scrollToSection(aboutRef)} className="text-lg font-semibold text-gray-700 hover:text-gray-900">
            About
          </button>
          <button onClick={() => scrollToSection(testimonialsRef)} className="text-lg font-semibold text-gray-700 hover:text-gray-900">
            Testimonials
          </button>
          <Link to="/signin">
            <Button variant="primary" size="md" text="Sign In" />
          </Link>
          <Link to="/signup">
            <Button variant="primary" size="md" text="Get Started" />
          </Link>
        </div>
      )}

      {/* Hero Section */}
      <div ref={homeRef} className="flex flex-col items-center justify-center px-6 text-center max-w-3xl mx-auto mt-24">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">Save & Organize Your Favorite Links</h1>
        <p className="text-lg text-gray-700 mb-6">Store, categorize, and access your important YouTube and Twitter links along with your notes – all in one place.</p>
        <div className="flex space-x-4 justify-center">
          <Link to="/signup">
            <Button variant="secondary" size="lg" text="Get Started" />
          </Link>
          <Link to="/signin">
            <Button variant="secondary" size="lg" text="Sign In" />
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto text-center">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Save Links</h3>
          <p className="text-gray-600">Easily store YouTube and Twitter links to revisit later.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Organize & Search</h3>
          <p className="text-gray-600">Categorize your saved links and find them instantly.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Add Notes</h3>
          <p className="text-gray-600">Attach text to your saved links for additional context.</p>
        </div>
      </div>

      {/* About Section */}
      <div ref={aboutRef} className="mt-16 max-w-4xl mx-auto text-center p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">About Brainly</h2>
        <p className="text-gray-700">Brainly helps you save, organize, and manage your favorite YouTube and Twitter links along with notes, so you never lose track of valuable content.</p>
      </div>

      {/* Testimonials Section */}
      <div ref={testimonialsRef} className="mt-16 max-w-5xl mx-auto text-center p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-gray-600 italic">"Brainly has made organizing my favorite links effortless! I love how easy it is to search and retrieve content."</p>
            <h4 className="mt-2 font-semibold text-gray-800">- User A</h4>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-gray-600 italic">"This platform is a game-changer for managing social media content. Highly recommended!"</p>
            <h4 className="mt-2 font-semibold text-gray-800">- User B</h4>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-16 bg-white py-4 text-center text-gray-600 shadow-md">
        © 2025 Brainly. All rights reserved.
      </footer>
    </div>
  );
}
