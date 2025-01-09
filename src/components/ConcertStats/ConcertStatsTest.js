import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Slide1 from './Slides/Slide1';
import Slide2 from './Slides/Slide2';
import Slide3 from './Slides/Slide3';
import Slide4 from './Slides/Slide4';
import Slide5 from './Slides/Slide5';
import Slide6 from './Slides/Slide6';
import Slide7 from './Slides/Slide7';
import { useNavigate } from 'react-router-dom';

function ConcertStatsTest() {
  const navigate = useNavigate();
  const [hasStarted, setHasStarted] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const TOTAL_SLIDES = 7;

  // Define durations for each slide (in seconds)
  const slideDurations = [
    8,  // Slide 1
    17,  // Slide 2 - longer for the animations
    8,  // Slide 3
    10,  // Slide 4
    10,  // Slide 5
    8,  // Slide 6
    6   // Slide 7
  ];

  const slides = [
    Slide1,
    Slide2,
    Slide3,
    Slide4,
    Slide5,
    Slide6,
    Slide7
  ];

  const handleStart = () => {
    setHasStarted(true);
  };

  const handleNext = () => {
    if (currentSlide < TOTAL_SLIDES - 1) {
      setCurrentSlide(curr => curr + 1);
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(curr => curr - 1);
    }
  };

  const handleExit = () => {
    navigate('/');  // Navigate back to home page
  };

  const renderSlide = () => {
    const SlideComponent = slides[currentSlide];
    
    switch (currentSlide) {
      case 0:
        return <SlideComponent 
          totalMinutes={420}      // Replace with actual data
          totalConcerts={12}      // Replace with actual data
          topPercentage={5}       // Replace with actual data
        />;
      
      case 1:
        return <SlideComponent 
          totalSpent={350}        // Replace with actual data
        />;
      
      case 2:
        return <SlideComponent 
          topGenre="Rock"         // Replace with actual data
          genreFanCount={10000}   // Replace with actual data
        />;
      
      case 3:
        return <SlideComponent 
          springConcerts={3}    // Replace with actual data
          summerConcerts={5}    // Replace with actual data
          fallConcerts={4}      // Replace with actual data
          winterConcerts={2}    // Replace with actual data
        />;

        case 4: 
        return <SlideComponent 
          venueName="Madison Square Garden"
          cityName="New York City"
          totalVenueCount={5}
        />;
      default:
        return <SlideComponent />;
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gray-900 p-0 md:p-4">
      <div className="relative w-full h-screen md:w-[360px] md:h-[640px] bg-black md:rounded-xl">
        <div className="absolute inset-0 md:rounded-xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-black to-black" />

          <div className="absolute inset-0 flex flex-col">
            {/* Exit button - only show when story has started */}
            {hasStarted && (
              <div className="absolute top-6 right-4 z-20">
                <button 
                  onClick={handleExit}
                  className="p-2 rounded-full hover:bg-white/10 transition-colors"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-6 w-6 text-white/70 hover:text-white" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M6 18L18 6M6 6l12 12" 
                    />
                  </svg>
                </button>
              </div>
            )}

            {/* Content Section */}
            <div className="absolute inset-0">
              {!hasStarted ? (
                // Intro slide content (existing)
                <div className="text-center px-4 h-full flex flex-col items-center justify-center">
                  <AnimatePresence>
                    <motion.div
                      key="intro-text"
                      initial={{ opacity: 0, y: 60 }}
                      animate={{ opacity: 1, y: '-10px' }}
                      transition={{ duration: 0.6 }}
                      className="space-y-2 mb-10"
                    >
                      <div className="text-3xl font-semibold text-white">
                        Let's look back<br />at your<br />concerts in
                      </div>
                      <div className="text-5xl font-bold text-blue-500">
                        2024
                      </div>
                    </motion.div>

                    <motion.button
                      key="intro-button"
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ 
                        duration: 0.6,
                        delay: 0.8
                      }}
                      onClick={handleStart}
                      className="px-4 py-2 text-sm text-white/80 hover:text-white border border-white/20 rounded-full transition-colors"
                    >
                      View your story →
                    </motion.button>
                  </AnimatePresence>
                </div>
              ) : (
                // Slides content
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0"
                  >
                    {renderSlide()}
                  </motion.div>
                </AnimatePresence>
              )}
            </div>

            {/* Move progress bar after content section to ensure it's always on top */}
            {hasStarted && (
              <div className="relative z-10 flex gap-1 mb-4 px-4 pt-4 md:p-4">
                {[...Array(TOTAL_SLIDES)].map((_, index) => (
                  <div key={index} className="h-1 flex-1 relative">
                    <div className="absolute inset-0 bg-gray-800 rounded-full" />
                    {index === currentSlide && (
                      <motion.div
                        className="absolute inset-0 bg-white rounded-full origin-left"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ 
                          duration: slideDurations[currentSlide], 
                          ease: "linear" 
                        }}
                        onAnimationComplete={handleNext}
                      />
                    )}
                    {index < currentSlide && (
                      <div className="absolute inset-0 bg-white rounded-full" />
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Navigation overlay */}
            {hasStarted && (
              <>
                <div
                  className="absolute left-0 top-0 w-1/2 h-full z-10"
                  onClick={handlePrev}
                />
                <div
                  className="absolute right-0 top-0 w-1/2 h-full z-10"
                  onClick={handleNext}
                />
              </>
            )}

            {/* Website URL at bottom */}
            <div className="absolute bottom-6 left-0 right-0 text-center">
              <p className="text-sm text-white/50">concertswrapped.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConcertStatsTest;
