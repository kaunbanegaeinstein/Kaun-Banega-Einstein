import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FiImage, 
  FiMaximize2, 
  FiX, 
  FiChevronLeft, 
  FiChevronRight, 
  FiArrowRight,
  FiHome
} from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Image assets
import galleryImage1 from '../assets/gallery/1.webp';
import galleryImage2 from '../assets/gallery/2.webp';
import galleryImage3 from '../assets/gallery/3.webp';
import galleryImage4 from '../assets/gallery/4.webp';
import galleryImage5 from '../assets/gallery/5.webp';
import galleryImage6 from '../assets/gallery/6.webp';
import galleryImage7 from '../assets/gallery/7.webp';
import galleryImage8 from '../assets/gallery/8.webp';
import galleryImage9 from '../assets/gallery/9.webp';
import kbePoster from '../assets/kbe-poster-1.webp';
import veerRatnaPoster from '../assets/poster.webp';

const galleryItems = [
  {
    id: 1,
    caption: 'KBE Students at the Airport Departure Terminal',
    image: galleryImage1,
    defaultRatio: 1.4,
  },
  {
    id: 2,
    caption: 'KBE Team Boarding the Educational Flight',
    image: galleryImage2,
    defaultRatio: 1.35,
  },
  {
    id: 3,
    caption: 'Students and Mentors Beside the Aircraft',
    image: galleryImage3,
    defaultRatio: 1.35,
  },
  {
    id: 4,
    caption: 'KBE Educational Tour Group',
    image: galleryImage4,
    defaultRatio: 1.35,
  },
  {
    id: 5,
    caption: 'Inside the Bengaluru Airport Terminal',
    image: galleryImage5,
    defaultRatio: 0.85,
  },
  {
    id: 6,
    caption: 'Boarding for the Next KBE Journey',
    image: galleryImage6,
    defaultRatio: 1.35,
  },
  {
    id: 7,
    caption: 'KBE Group at the RLV-LEX Centre',
    image: galleryImage7,
    defaultRatio: 0.72,
  },
  {
    id: 8,
    caption: 'Exploring the Nature Park at Science City',
    image: galleryImage8,
    defaultRatio: 1.35,
  },
  {
    id: 9,
    caption: 'Learning at the Science Museum',
    image: galleryImage9,
    defaultRatio: 1.35,
  },
  {
    id: 10,
    caption: 'Official KBE 2026 Competition Poster',
    image: kbePoster,
    defaultRatio: 0.89,
  },
  {
    id: 11,
    caption: 'Vigyan Ratna Puraskar 2026 Poster',
    image: veerRatnaPoster,
    defaultRatio: 0.89,
  },
];

const Gallery = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [ratios, setRatios] = useState({});

  // Dynamically capture each image's real aspect ratio on load
  const handleImageLoad = (id, e) => {
    const { naturalWidth, naturalHeight } = e.target;
    if (naturalWidth && naturalHeight) {
      setRatios((prev) => ({
        ...prev,
        [id]: naturalWidth / naturalHeight,
      }));
    }
  };

  // Modal navigation helpers
  const handlePrev = (e) => {
    e?.stopPropagation();
    if (selectedImageIndex === null) return;
    setSelectedImageIndex((prev) => (prev > 0 ? prev - 1 : galleryItems.length - 1));
  };

  const handleNext = (e) => {
    e?.stopPropagation();
    if (selectedImageIndex === null) return;
    setSelectedImageIndex((prev) => (prev < galleryItems.length - 1 ? prev + 1 : 0));
  };

  // Keyboard navigation & body scroll lock
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
  }, [selectedImageIndex]);

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
          {/* Minimal Header */}
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
            {/* <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 border border-blue-200/80 text-blue-800 font-bold text-xs uppercase tracking-wider mb-4 shadow-xs">
              <FiImage className="w-3.5 h-3.5" />
              <span>Memories & Milestones</span>
            </div> */}
            
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
              Photo Gallery
            </h1>
          </div>

          {/* Justified Mosaic Flex Gallery */}
          <div className="flex flex-wrap gap-3 sm:gap-4 after:content-[''] after:flex-grow-[99999]">
            {galleryItems.map((item, index) => {
              const aspectRatio = ratios[item.id] || item.defaultRatio;
              const baseHeight = 250;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35, delay: index * 0.04 }}
                  onClick={() => setSelectedImageIndex(index)}
                  style={{
                    flexGrow: aspectRatio * 100,
                    flexBasis: `${aspectRatio * baseHeight}px`,
                  }}
                  className="group relative h-56 sm:h-64 md:h-72 rounded-2xl overflow-hidden bg-slate-200/70 shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer border border-white/80"
                >
                  <img
                    src={item.image}
                    alt={item.caption}
                    loading="lazy"
                    onLoad={(e) => handleImageLoad(item.id, e)}
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Subtle Zoom Icon on Hover */}
                  <div className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-slate-950/50 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <FiMaximize2 className="w-3.5 h-3.5" />
                  </div>

                  {/* Single Caption Inside Image Container */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/85 via-slate-950/40 to-transparent p-4 pt-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <p className="text-white text-xs sm:text-sm font-semibold leading-snug line-clamp-1 transform translate-y-1.5 group-hover:translate-y-0 transition-transform duration-300">
                      {item.caption}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Interactive Lightbox Modal */}
          {selectedImageIndex !== null && galleryItems[selectedImageIndex] && (
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

              {/* Lightbox Image + Single Caption */}
              <div 
                className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center justify-center rounded-2xl overflow-hidden shadow-2xl bg-slate-950 border border-white/10"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={galleryItems[selectedImageIndex].image}
                  alt={galleryItems[selectedImageIndex].caption}
                  className="max-h-[78vh] w-auto max-w-full object-contain mx-auto"
                />

                <div className="w-full px-5 py-3.5 bg-slate-900/95 border-t border-white/10 flex items-center justify-between gap-4 text-white">
                  <p className="text-xs sm:text-sm font-semibold text-slate-100">
                    {galleryItems[selectedImageIndex].caption}
                  </p>
                  <span className="text-xs font-mono text-slate-400 bg-white/10 px-2.5 py-1 rounded-full shrink-0">
                    {selectedImageIndex + 1} / {galleryItems.length}
                  </span>
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