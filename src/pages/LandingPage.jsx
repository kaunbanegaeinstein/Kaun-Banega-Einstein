import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Organizers from '../components/Organizers';
import About from '../components/About';
import KBESyllabus from '../components/KBESyllabus';
import ISROPrize from '../components/ISROPrize';
import Contact from '../components/Contact';
import Footer from '../components/Footer'; 
import PosterModal from '../components/PosterModal';
import svicsmPoster from '../assets/svicsm-poster.webp';

const LandingPage = () => {
  useEffect(() => {
    if (window.location.hash) {
      const element = document.querySelector(window.location.hash);
      if (element) {
        setTimeout(() => element.scrollIntoView({ behavior: 'smooth' }), 100);
      }
    }
  }, []);

  return (
    <>
      <PosterModal image={svicsmPoster} alt="SVICSM announcement poster" />
      <Navbar />
      <Hero />
      <Organizers />
      <About />
      <KBESyllabus />
      <ISROPrize />
      <Contact />
   
      <Footer />
    </>
  );
};

export default LandingPage;