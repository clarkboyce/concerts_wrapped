import { motion } from "framer-motion";
import { useState, useEffect } from "react";

function Slide5({
  venueName = "Madison Square Garden",
  cityName = "New York City",
  totalVenueCount = 5,
}) {
  const [showVenueDetails, setShowVenueDetails] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowVenueDetails(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showVenueDetails ? 0 : 1 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <div className="text-white text-3xl font-bold mb-2">
          You visited
        </div>
        <div className="text-white text-5xl font-bold">
          {totalVenueCount}
        </div>
        <div className="text-white text-3xl font-bold">
          different venues
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showVenueDetails ? 1 : 0 }}
        transition={{ duration: 0.6 }}
        className="text-center absolute"
      >
        <motion.div
          initial={{ x: 200, opacity: 0 }}
          animate={{ 
            x: showVenueDetails ? 0 : 200,
            opacity: showVenueDetails ? 1 : 0
          }}
          transition={{ 
            duration: 1,
            type: "spring",
            stiffness: 25
          }}
          className="text-6xl"
        >
          🏙️
        </motion.div>

        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ 
            y: showVenueDetails ? 30 : -20,
            opacity: showVenueDetails ? 1 : 0
          }}
          transition={{ 
            duration: 0.6,
            delay: 1
          }}
        >
          <div className="text-white text-2xl mb-4">
            Your most visited venue was
          </div>
          <div className="text-white text-3xl font-bold mb-2">
            {venueName}
          </div>
          <div className="text-gray-400 text-xl">
            in {cityName}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Slide5;
