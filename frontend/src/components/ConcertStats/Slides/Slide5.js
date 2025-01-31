import { motion } from "framer-motion";
import { useState, useEffect } from "react";

function Slide5({
  venueCapacities = {},
  totalVenueCount = 0,
  topVenue = "",
  topVenueCity = "",
  topVenueState = ""
}) {
  const [showVenueDetails, setShowVenueDetails] = useState(true);
  const [showVenueLocation, setShowVenueLocation] = useState(false);
  const [hideVenueLocation, setHideVenueLocation] = useState(false);
  const [showCapacityBars, setShowCapacityBars] = useState(false);


  useEffect(() => {
    const timer1 = setTimeout(() => {
      setShowVenueDetails(false);
    }, 2500);

    const timer2 = setTimeout(() => {
      setShowVenueLocation(true);
    }, 3000);

    const timer3 = setTimeout(() => {
      setHideVenueLocation(true);
      setShowCapacityBars(true);
    }, 7000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  // Sort venues by capacity in descending order
  const sortedVenues = Object.entries(venueCapacities).sort(
    ([, a], [, b]) => b - a
  );

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showVenueDetails ? 1 : 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <div className="text-3xl font-bold mb-2 text-white">
          You joined{" "}
          <span className="bg-gradient-to-r from-blue-300 to-blue-500 text-transparent bg-clip-text">
            {Object.values(venueCapacities)
              .reduce((sum, capacity) => sum + capacity, 0)
              .toLocaleString()}
          </span>{" "}<br/>
          other fans
        </div>
        <div className="text-white text-4xl font-bold">@</div>
        <div className="text-white text-3xl font-bold">
          {totalVenueCount} venues this year.
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showVenueLocation ? (hideVenueLocation ? 0 : 1) : 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="text-center absolute"
      >
        <motion.div
          initial={{ x: 200, opacity: 0 }}
          animate={{
            x: showVenueLocation ? (hideVenueLocation ? -200 : 0) : 200,
            opacity: showVenueLocation ? (hideVenueLocation ? 0 : 1) : 0,
          }}
          transition={{
            duration: 1,
            type: "spring",
            stiffness: 25,
          }}
          className="text-6xl"
        >
          🏙️
        </motion.div>

        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{
            y: showVenueLocation ? 30 : -20,
            opacity: showVenueLocation ? (hideVenueLocation ? 0 : 1) : 0,
          }}
          transition={{
            duration: 0.6,
            delay: 1,
          }}
        >
          <div className="text-white text-2xl mb-4">
            Your most visited venue was
          </div>
          <div className="text-white text-3xl font-bold mb-2">{topVenue}</div>
          <div className="text-gray-400 text-xl">
            in {topVenueCity}, {topVenueState}
          </div>
        </motion.div>
      </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: showCapacityBars ? 1 : 0 }}
          transition={{ duration: 0.6, delay: 1.5 }}
          className="absolute items-center justify-center w-full max-w-2xl px-8"
        >
          <div className="space-y-2">
            {/* Column Headers */}
            <div className="flex items-center gap-2 mb-3 text-gray-400 text-sm">
              <div className="flex-1 relative">
                <div className="left-2 text-sm">Venue</div>
              </div>
              <div className="w-24 text-right">Capacity</div>
            </div>
            
            {/* Venue List */}
            {sortedVenues.map(([venue, capacity], index) => (
              <motion.div
                key={venue}
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{
                  duration: 0.5,
                  delay: 3 + index * 0.1,
                }}
                className="flex items-center gap-2"
              >
                <div className="flex-1 relative h-8">
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ 
                      width: `${(capacity / sortedVenues[0][1]) * 100}%`,
                      opacity: 1 
                    }}
                    transition={{ 
                      width: { duration: 0.8, delay: 8.5 + index * 0.2 },
                      opacity: { duration: 0.3, delay: 8.5 + index * 0.2 }
                    }}
                    className="absolute h-full bg-blue-500/30 rounded"
                  />
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 8.5 + index * 0.2 }}
                    className="text-white left-2 top-1 text-sm w-48 truncate relative z-10"
                  >
                    {venue}
                  </motion.div>
                </div>
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 8.5 + index * 0.2 }}
                  className="text-white text-sm w-24 text-right"
                >
                  {capacity.toLocaleString()}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
    </div>
  );
}

export default Slide5;
