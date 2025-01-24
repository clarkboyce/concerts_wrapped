import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { slides } from './slideData';

function ConcertStats() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentPart, setCurrentPart] = useState(0);
  const [isManualTransition, setIsManualTransition] = useState(false);

  const handleNext = () => {
    setIsManualTransition(true);
    setCurrentSlide(prev => prev + 1);
    setCurrentPart(0);
  };

  const handlePrevious = () => {
    setIsManualTransition(true);
    if (currentSlide === 0) {
      setCurrentPart(0);
    } else {
      setCurrentSlide(prev => prev - 1);
      setCurrentPart(0);
    }
  };

  useEffect(() => {
    const currentSlideData = slides[currentSlide];
    const parts = currentSlideData.parts;
    const currentPartData = parts[currentPart];

    const timer = setTimeout(() => {
      if (currentPart < parts.length - 1) {
        setCurrentPart(prev => prev + 1);
      } else if (currentSlide < slides.length - 1) {
        setCurrentSlide(prev => prev + 1);
        setCurrentPart(0);
      }
    }, currentPartData.duration);

    return () => clearTimeout(timer);
  }, [currentSlide, currentPart]);

  useEffect(() => {
    setIsManualTransition(false);
  }, [currentSlide]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-900 p-4">
      <div className="relative w-full h-screen md:w-[360px] md:h-[640px] bg-black md:rounded-xl">
        <button 
          className="md:hidden absolute top-4 right-4 z-20 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center"
          onClick={() => {/* Add your exit handler here */}}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 text-white" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="absolute inset-0 z-10 flex">
          <div 
            className="w-1/2 h-full cursor-pointer relative" 
            onClick={handlePrevious}
          >
            <button className="hidden md:flex absolute top-1/2 -translate-y-1/2 -left-16 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full items-center justify-center">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6 text-white" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </div>
          <div 
            className="w-1/2 h-full cursor-pointer relative" 
            onClick={handleNext}
          >
            <button className="hidden md:flex absolute top-1/2 -translate-y-1/2 -right-16 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full items-center justify-center">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6 text-white" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <div className="absolute inset-0 rounded-xl overflow-hidden">
          <motion.div 
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className={`absolute inset-0 bg-gradient-to-br ${slides[currentSlide].gradient} to-black`}
          />

          <div className="absolute inset-0 flex flex-col p-4">
            <div className="flex gap-1 mb-4">
              {slides.map((_, index) => (
                <div key={index} className="h-1 flex-1 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-white rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ 
                      width: index === currentSlide ? 
                        isManualTransition ? "0%" : "100%" : 
                        index <= currentSlide - 1 ? "100%" : "0%"
                    }}
                    transition={{ 
                      duration: index === currentSlide && !isManualTransition ? 10 : 0,
                      ease: "linear"
                    }}
                  />
                </div>
              ))}
            </div>

            <div className="flex-1 flex flex-col items-center justify-center">
              <AnimatePresence mode="wait">
                {currentSlide === 0 ? (
                  <div className="text-center px-4 flex flex-col items-center gap-8">
                    <AnimatePresence>
                      <motion.div
                        key="intro-text"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="space-y-2"
                      >
                        <div className="text-2xl font-medium text-white">
                          Let's look back<br />at your<br />concerts in
                        </div>
                        <div className="text-4xl font-bold text-blue-500">
                          2024
                        </div>
                      </motion.div>

                      <motion.button
                        key="intro-button"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ 
                          duration: 0.6,
                          delay: 0.8 // Delay the button animation
                        }}
                        onClick={handleNext}
                        className="px-4 py-2 text-sm text-white/80 hover:text-white border border-white/20 rounded-full transition-colors"
                      >
                        View your story →
                      </motion.button>
                    </AnimatePresence>
                  </div>
                ) : (
                  <motion.div
                    key={`${currentSlide}-${currentPart}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="text-center px-4"
                  >
                    {slides[currentSlide].parts[currentPart].preText && (
                      <div className="text-xl text-gray-400 mb-4">
                        {slides[currentSlide].parts[currentPart].preText}
                      </div>
                    )}
                    <div className="text-3xl font-bold text-white mb-4">
                      {slides[currentSlide].parts[currentPart].mainText}
                    </div>
                    {slides[currentSlide].parts[currentPart].subText && (
                      <div className="text-lg text-gray-400">
                        {slides[currentSlide].parts[currentPart].subText}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConcertStats; 