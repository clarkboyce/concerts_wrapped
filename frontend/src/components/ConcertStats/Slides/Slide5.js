import { motion } from "framer-motion";
import { useState, useEffect } from "react";

function Slide5({
  venues = [],
  totalVenueCount = 0,
  topVenue = "",
  topVenueCity = "",
  topVenueState = "",
  topVenueCapacity = 0, // @clark need to decide what I want to display exacty.
}) {
  const [showVenueDetails, setShowVenueDetails] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowVenueDetails(true);
    }, 1000);

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
        <div className="text-3xl font-bold mb-2 text-white">
          You joined{' '}
          <span className="bg-gradient-to-r from-blue-300 to-blue-500 text-transparent bg-clip-text">
            {topVenueCapacity}
          </span>
          {' '}other fans
        </div>
        <div className="text-white text-4xl font-bold">
          @
        </div>
        <div className="text-white text-3xl font-bold">
          {totalVenueCount} venues this year.
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showVenueDetails ? 1 : 0 }}
        transition={{ duration: 0.6, delay: 1 }}
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
            {topVenue}
          </div>
          <div className="text-gray-400 text-xl">
            in {topVenueCity}, {topVenueState}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Slide5;
