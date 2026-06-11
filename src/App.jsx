import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Work from "./components/Work";
import Tech from "./components/TechStack";
import CertificatesSection from "./components/Certificates";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="bg-midnight text-white font-display">
      <Navbar />
      <Hero />
      <About />
      <Work />
      <Tech />
      <CertificatesSection />
      <Contact />
      <Footer />
    </div>
  );
}
