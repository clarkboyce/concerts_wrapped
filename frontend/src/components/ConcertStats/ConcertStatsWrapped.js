import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FooterSpacer from "../common/FooterSpacer";
import Slide1 from "./Slides/Slide1";
import Slide2 from "./Slides/Slide2";
import Slide3 from "./Slides/Slide3";
import Slide4 from "./Slides/Slide4";
import Slide5 from "./Slides/Slide5";
import Slide6 from "./Slides/Slide6";
import Slide7 from "./Slides/Slide7";
import Slide8 from "./Slides/Slide8";
import { useNavigate, useLocation } from "react-router-dom";
import { incrementStoriesGenerated } from "../../utils/statsManager";
import backgroundAudio from "../common/Heterotopia.mp3";

function ConcertStatsWrapped() {
  const location = useLocation();
  const concertData = location.state?.concertData;
  const navigate = useNavigate();
  const [hasStarted, setHasStarted] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const audioRef = useRef(null);
  const TOTAL_SLIDES = 8;
  const [isMuted, setIsMuted] = useState(false);

  // Add safety check
  if (!concertData) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-900">
        <div className="text-white">No concert data available</div>
      </div>
    );
  }

  // Define durations for each slide (in seconds)
  const slideDurations = [
    8, // Slide 1
    16, // Slide 2
    12, // Slide 3
    12, // Slide 4
    16, // Slide 5
    9, // Slide 6
    10, // Slide 7
    6, // Slide 8
  ];

  const slides = [
    Slide1,
    Slide2,
    Slide3,
    Slide4,
    Slide5,
    Slide6,
    Slide7,
    Slide8,
  ];

  const handleStart = () => {
    console.log("concertData:", concertData);
    incrementStoriesGenerated();
    setHasStarted(true);
    if (audioRef.current) {
      audioRef.current.src = backgroundAudio;
      audioRef.current.currentTime = 6;
      audioRef.current.volume = 0.2;
      audioRef.current.play();

    }
  };

  const handleNext = () => {
    if (currentSlide < TOTAL_SLIDES - 1) {
      setCurrentSlide((curr) => curr + 1);
    } else if (currentSlide === TOTAL_SLIDES - 1) {
      // When reaching the last slide, set a timeout to stop the audio after 30 seconds
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }
      }, 30000); // 30000 milliseconds = 30 seconds
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide((curr) => curr - 1);
    }
  };

  const handleExit = () => {
    navigate("/"); // Navigate back to home page
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const handleToggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = 0.2;
        audioRef.current.muted = false;
      } else {
        audioRef.current.volume = 0;
        audioRef.current.muted = true;
      }
      setIsMuted(!isMuted);
    }
  };

  const renderSlide = () => {
    const SlideComponent = slides[currentSlide];

    switch (currentSlide) {
      case 0:
        return (
          <SlideComponent
            totalMinutes={concertData.totalMinutes}
            totalConcerts={concertData.totalConcerts}
            tiers={concertData.tiers}
            topPercentage={10} // make this dynamic later
          />
        );

      case 1:
        return (
          <SlideComponent
            totalSpent={concertData.totalSpent}
            maxAvgPrice={concertData.maxAvgPrice}
            actualPrice={concertData.actualPrice}
          />
        );

      case 2: 
        return (
          <SlideComponent
            topGenre={
              Object.entries(concertData.genreCounts || {})
                .sort(([, a], [, b]) => b - a)[0]?.[0] || ""
            }
            genreCounts={concertData.genreCounts}
            artistGenres={concertData.artistGenres}
          />        
        );

      case 3:
        return <SlideComponent seasonalData={concertData.seasonalData} />;

      case 4:
        return (
          <SlideComponent
            concertAttendance={concertData.concertAttendance}
            topVenue={concertData.topVenue}
            topVenueCity={concertData.topVenueCity}
            topVenueState={concertData.topVenueState}
            topVenueCapacity={concertData.topVenueCapacity}
            totalVenueCount={concertData.uniqueVenueCount}

          />
        );

      case 5:
        return <SlideComponent artists={concertData.artistCounts} />;

      case 7:
        const topSeason = Object.entries(concertData.seasonalData).sort(
          ([, a], [, b]) => b - a
        )[0][0];

        return (
          <SlideComponent
            numConcerts={concertData.totalConcerts}
            totalSpent={concertData.totalSpent}
            topGenre={
              Object.entries(concertData.genreCounts).sort(
                ([, a], [, b]) => b - a
              )[0][0]
            }
            topSeason={topSeason.charAt(0).toUpperCase() + topSeason.slice(1)}
            topVenue={concertData.topVenue}
            topArtist={concertData.topArtist}
          />
        );

      default:
        return <SlideComponent />;
    }
  };

  return (
    <div className="h-[100dvh] w-full flex items-center justify-center bg-gray-900 p-0 md:p-4 fixed">
      <audio
        ref={audioRef}
        src={backgroundAudio}
        preload="auto"
        playsInline
        style={{ position: "absolute", top: 50, left: 50 }}
      />
      <div className="relative w-full h-[100dvh] md:w-[360px] md:h-[700px] bg-black md:rounded-xl">
        <div className="absolute inset-0 md:rounded-xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-black to-black" />
          <div className="absolute inset-0 flex flex-col">
            {/* Exit button - only show when story has started */}

            {hasStarted && (
              <div className="absolute top-6 right-4 z-20 flex gap-2">
                <button
                  onClick={handleToggleMute}
                  className="p-2 rounded-full hover:bg-white/10 transition-colors"
                >
                  {isMuted ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-white/70 hover:text-white transition-colors"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-white/70 hover:text-white transition-colors"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                      />
                    </svg>
                  )}
                </button>
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
                      initial={{ opacity: 0, y: 200, scale: 2 }}
                      animate={{ opacity: 1, y: 0, scale: 1, delay: 1 }}
                      transition={{ 
                        duration: 0.8,
                        type: "spring",
                        damping: 15,
                        stiffness: 100
                      }}
                      className="space-y-2 mb-10"
                    >
                      <div className="text-3xl font-semibold text-white">
                        Let's look back
                        <br />
                        at your
                        <br />
                        concerts in
                      </div>
                      <div className="text-6xl font-bold bg-gradient-to-r from-[#FF00DD] to-[#0040FF] text-transparent bg-clip-text">
                        2024
                      </div>
                    </motion.div>


                    <motion.button
                      key="intro-button"
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.6,
                        delay: 0.8,
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
                          ease: "linear",
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
            <FooterSpacer />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConcertStatsWrapped;
