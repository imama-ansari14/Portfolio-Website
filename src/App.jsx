import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Work from "./components/Work";
import Tech from "./components/TechStack";
import Footer from "./components/Footer";


export default function App() {
  return (
    <div className="bg-midnight text-white font-display">
      <Navbar />
      <Hero />
      <About />
      <Work />
      <Tech />
      <Footer />
    </div>
  );
}

// navbar
// hero
// about me
// tech stack
// projects
// certificates
// contact form
// footer
