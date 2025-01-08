import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Slide1 from './Slides/Slide1';
import Slide2 from './Slides/Slide2';
import Slide3 from './Slides/Slide3';
import Slide4 from './Slides/Slide4';
import Slide5 from './Slides/Slide5';
import Slide6 from './Slides/Slide6';
import Slide7 from './Slides/Slide7';

function ConcertStatsTest() {
  const [hasStarted, setHasStarted] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const TOTAL_SLIDES = 7;

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

  const renderSlide = () => {
    const SlideComponent = slides[currentSlide];
    return <SlideComponent />;
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-900 p-4">
      <div className="relative w-full h-screen md:w-[360px] md:h-[640px] bg-black md:rounded-xl">
        <div className="absolute inset-0 rounded-xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-black to-black" />

          <div className="absolute inset-0 flex flex-col p-4">
            {/* Progress bar */}
            {hasStarted && (
              <div className="flex gap-1 mb-4">
                {[...Array(TOTAL_SLIDES)].map((_, index) => (
                  <div key={index} className="h-1 flex-1 relative">
                    <div className="absolute inset-0 bg-gray-800 rounded-full" />
                    {index === currentSlide && (
                      <motion.div
                        className="absolute inset-0 bg-white rounded-full origin-left"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 8, ease: "linear" }}
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

            {/* Content Section */}
            <div className="flex-1 flex flex-col items-center justify-center">
              {!hasStarted ? (
                // Intro slide content (existing)
                <div className="text-center px-4 flex flex-col items-center gap-12">
                  <AnimatePresence>
                    <motion.div
                      key="intro-text"
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                      className="space-y-2"
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
                    className="w-full h-full"
                  >
                    {renderSlide()}
                  </motion.div>
                </AnimatePresence>
              )}
            </div>

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
            <div className="absolute bottom-4 left-0 right-0 text-center">
              <p className="text-sm text-white/50">concertswrapped.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConcertStatsTest;
