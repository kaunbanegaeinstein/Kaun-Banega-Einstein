import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiImage, 
  FiMaximize2, 
  FiX, 
  FiChevronLeft, 
  FiChevronRight, 
  FiCalendar, 
  FiAward, 
  FiCompass,
  FiArrowRight,
  FiHome
} from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Image assets
import isroTourImg from '../assets/isro.png';
import iroImg from '../assets/iro.png';
import flightImg from '../assets/flight.png';
import examHallImg from '../assets/morn.png';
import studentsExamImg from '../assets/stud.webp';
import eventStageImg from '../assets/hero.webp';
import kbePosterImg from '../assets/kbe-poster-1.webp';
import svicsmPosterImg from '../assets/svicsm-poster.webp';
import veerRatnaPosterImg from '../assets/poster.webp';

const galleryItems = [
  {
    id: 1,
    title: 'ISRO Space Centre Educational Tour',
    category: 'ISRO Tour',
    image: isroTourImg,
    tag: 'National Pride',
    year: 'ISRO Bengaluru & Sriharikota',
    description: 'Top KBE merit rankers visiting the Indian Space Research Organisation (ISRO) satellite facilities, learning directly from aerospace scientists.',
  },
  {
    id: 2,
    title: 'All-Expenses-Paid Flight Journey',
    category: 'ISRO Tour',
    image: flightImg,
    tag: 'Student Experience',
    year: 'Bengaluru Flight',
    description: 'First-time flight experience for brilliant government and zilla parishad school winners travelling to ISRO headquarters for scientific exploration.',
  },
  {
    id: 3,
    title: 'ISRO Satellite & Rocket Exhibit',
    category: 'ISRO Tour',
    image: iroImg,
    tag: 'Space Exploration',
    year: 'Heritage Tour',
    description: 'Curious young minds observing real scale rocket models, propulsion systems, and historic satellite launch vehicles.',
  },
  {
    id: 4,
    title: 'School-Level Written Examination Session',
    category: 'Examination',
    image: examHallImg,
    tag: 'Round 1 Exam',
    year: 'Competition Day',
    description: 'Simultaneous morning examination conducted across participating secondary schools with strict academic standards.',
  },
  {
    id: 5,
    title: 'Students Appearing for KBE Merit Test',
    category: 'Examination',
    image: studentsExamImg,
    tag: 'Academic Drive',
    year: 'State Evaluation',
    description: 'Class 10th science aspirants writing the comprehensive State Board and NCERT mapped Einstein Aptitude Test.',
  },
  {
    id: 6,
    title: 'Grand Felicitation & Science Stage',
    category: 'Ceremony',
    image: eventStageImg,
    tag: 'Award Ceremony',
    year: 'Grand Finale',
    description: 'Distinguished guests, organizers, and educators honoring top school scorers and scientific innovators on the grand stage.',
  },
  {
    id: 7,
    title: 'Official KBE State Competition Announcement',
    category: 'Bulletins',
    image: kbePosterImg,
    tag: 'State Blueprint',
    year: 'KBE 2026',
    description: 'Official statewide competition launch bulletin with examination guidelines, syllabus structure, and award announcements.',
  },
  {
    id: 8,
    title: 'Swami Vivekananda Institute Science Initiative',
    category: 'Bulletins',
    image: svicsmPosterImg,
    tag: 'Institution Launch',
    year: 'SVICSM Campus',
    description: 'Joint educational initiative by Swami Vivekananda Jr. College and B. K. Kawale College for nurturing rural scientific talent.',
  },
  {
    id: 9,
    title: 'Vigyan Ratna Puraskar Teacher Recognition',
    category: 'Ceremony',
    image: veerRatnaPosterImg,
    tag: 'Teacher Honors',
    year: 'Puraskar 2026',
    description: 'Special felicitation program dedicated to recognizing exceptional science coordinators and dedicated school teachers.',
  },
];

const categories = ['All', 'ISRO Tour', 'Examination', 'Ceremony', 'Bulletins'];

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  // Filter items
  const filteredItems = activeCategory === 'All' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeCategory);

  // Modal navigation helpers
  const handlePrev = (e) => {
    e?.stopPropagation();
    if (selectedImageIndex === null) return;
    setSelectedImageIndex((prev) => (prev > 0 ? prev - 1 : filteredItems.length - 1));
  };

  const handleNext = (e) => {
    e?.stopPropagation();
    if (selectedImageIndex === null) return;
    setSelectedImageIndex((prev) => (prev < filteredItems.length - 1 ? prev + 1 : 0));
  };

  // Keyboard navigation & body scroll locking for lightbox modal
  useEffect(() => {
    if (selectedImageIndex === null) return undefined;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedImageIndex(null);
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedImageIndex, filteredItems.length]);

  return (
    <div className="min-h-screen bg-slate-50 font-manrope text-slate-800 flex flex-col justify-between overflow-x-hidden">
      {/* Top Navigation */}
      <Navbar forceDarkText={true} />

      <main className="flex-1 relative pt-28 sm:pt-36 pb-20 sm:pb-28 px-4 sm:px-6 lg:px-12 z-0">
        {/* Ambient Decorative Blurs */}
        <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
          <div className="absolute top-10 right-5 sm:right-20 w-72 sm:w-[36rem] h-72 sm:h-[36rem] bg-blue-400/15 rounded-full blur-[100px]" />
          <div className="absolute top-1/2 left-5 sm:left-20 w-72 sm:w-[36rem] h-72 sm:h-[36rem] bg-amber-400/10 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 border border-blue-200/80 text-blue-800 font-bold text-xs uppercase tracking-wider mb-4 shadow-xs">
              <FiImage className="w-3.5 h-3.5" />
              <span>Memories & Milestones</span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-4 sm:mb-6">
              Photo Gallery
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-slate-600 font-medium leading-relaxed">
              Explore unforgettable moments from previous editions of Kaun Banega Einstein — from rigorous examination halls to the inspiring national ISRO space study tour and stage felicitations.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap mb-10 sm:mb-14">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              const count = cat === 'All' 
                ? galleryItems.length 
                : galleryItems.filter(i => i.category === cat).length;

              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-xs ${
                    isActive 
                      ? 'bg-blue-700 text-white shadow-md shadow-blue-700/20 scale-105' 
                      : 'bg-white/80 hover:bg-white text-slate-700 border border-slate-200/80 hover:border-blue-300'
                  }`}
                >
                  <span>{cat}</span>
                  <span className={`text-[10px] sm:text-xs px-1.5 py-0.5 rounded-full font-bold ${
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Gallery Grid */}
          <motion.div 
            layout 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            <AnimatePresence>
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, delay: index * 0.05 }}
                  onClick={() => setSelectedImageIndex(index)}
                  className="group relative rounded-3xl bg-white/80 border border-white shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer flex flex-col justify-between hover:-translate-y-1.5"
                >
                  {/* Image Container */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                    
                    {/* Dark gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                      <div className="text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-amber-300 mb-1">
                          {item.year}
                        </span>
                        <p className="text-xs line-clamp-2 text-slate-200">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    {/* Tag badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className="bg-white/90 backdrop-blur-md text-slate-900 font-extrabold text-[11px] px-3 py-1 rounded-full shadow-xs border border-white/60">
                        {item.tag}
                      </span>
                    </div>

                    {/* Zoom Icon Button */}
                    <div className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-slate-900/60 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md">
                      <FiMaximize2 className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Card Content Footer */}
                  <div className="p-5 sm:p-6 bg-white/60 backdrop-blur-xs flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 block mb-1">
                        {item.category}
                      </span>
                      <h3 className="text-base sm:text-lg font-extrabold text-slate-900 group-hover:text-blue-700 transition-colors leading-snug">
                        {item.title}
                      </h3>
                    </div>
                    
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-semibold">
                      <span>Click to enlarge</span>
                      <FiArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-700 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Interactive Lightbox Modal */}
          {selectedImageIndex !== null && filteredItems[selectedImageIndex] && (
            <div 
              className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/90 backdrop-blur-md p-4 sm:p-6 md:p-10 select-none animate-in fade-in duration-200"
              onClick={() => setSelectedImageIndex(null)}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedImageIndex(null)}
                aria-label="Close modal"
                className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer border border-white/20 shadow-lg"
              >
                <FiX className="w-6 h-6" />
              </button>

              {/* Prev Button */}
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous image"
                className="absolute left-3 sm:left-6 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-all cursor-pointer border border-white/20 shadow-lg hover:scale-105"
              >
                <FiChevronLeft className="w-6 h-6" />
              </button>

              {/* Next Button */}
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next image"
                className="absolute right-3 sm:right-6 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-all cursor-pointer border border-white/20 shadow-lg hover:scale-105"
              >
                <FiChevronRight className="w-6 h-6" />
              </button>

              {/* Modal Card Content */}
              <div 
                className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center justify-center bg-slate-900/90 rounded-3xl overflow-hidden border border-white/15 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Full-view Image */}
                <div className="relative w-full max-h-[65vh] sm:max-h-[70vh] flex items-center justify-center bg-black/40 overflow-hidden">
                  <img
                    src={filteredItems[selectedImageIndex].image}
                    alt={filteredItems[selectedImageIndex].title}
                    className="max-h-[65vh] sm:max-h-[70vh] w-auto max-w-full object-contain mx-auto"
                  />
                </div>

                {/* Caption Bar */}
                <div className="w-full p-4 sm:p-6 bg-slate-900 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-white">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="bg-blue-600 text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                        {filteredItems[selectedImageIndex].category}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">
                        {filteredItems[selectedImageIndex].year}
                      </span>
                    </div>
                    <h4 className="text-base sm:text-lg font-bold text-white">
                      {filteredItems[selectedImageIndex].title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mt-1 leading-relaxed">
                      {filteredItems[selectedImageIndex].description}
                    </p>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-xs sm:text-sm font-mono text-slate-400 bg-white/10 px-3 py-1 rounded-full border border-white/10">
                      {selectedImageIndex + 1} / {filteredItems.length}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Bottom Callout Banner */}
          <div className="mt-16 sm:mt-24 relative rounded-3xl sm:rounded-[2.5rem] bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 p-8 sm:p-12 text-white text-center sm:text-left overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl -z-0" />
            
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="max-w-2xl">
                <span className="inline-block px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-amber-300 font-bold text-xs uppercase tracking-wider mb-3">
                  Be In Our Next Gallery
                </span>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mb-3">
                  Ready to make history in KBE 2026?
                </h3>
                <p className="text-blue-100 text-sm sm:text-base leading-relaxed font-medium">
                  Enroll your school or register as an individual student to compete for the prestigious state trophy, certificates, and the life-changing ISRO study tour.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto shrink-0">
                <Link
                  to="/auth"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-950 px-7 py-3.5 rounded-full font-extrabold text-sm transition-all shadow-md hover:scale-105"
                >
                  <span>Register Now</span>
                  <FiArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-3.5 rounded-full font-bold text-sm transition-colors"
                >
                  <FiHome className="w-4 h-4" />
                  <span>Home</span>
                </Link>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Gallery;
