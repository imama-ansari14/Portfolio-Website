import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Tech from "./components/TechStack";
import work from "./components/Work";

export default function App() {
  return (
    <div className="bg-midnight text-white font-display">
      <Navbar />
      <Hero />
      <About />
      <Tech />
      <work />
    </div>
  );
}
