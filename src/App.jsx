import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Work from "./components/Work";
import Tech from "./components/TechStack";
import CertificatesSection from "./components/Certificates";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";

export default function App() {
  return (
    <div className="bg-midnight text-white font-display">
      <CustomCursor />
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
