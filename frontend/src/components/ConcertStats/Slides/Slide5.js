import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import CountingNumber from "../Animations/CountingNumber";

function Slide5({
  concertAttendance = [],
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
    }, 3000);

    const timer2 = setTimeout(() => {
      setShowVenueLocation(true);
    }, 3500);

    const timer3 = setTimeout(() => {
      setHideVenueLocation(true);
      setShowCapacityBars(true);
    }, 7500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  // Modified to work with array of objects instead of object
  const sortedVenues = concertAttendance.map(concert => [
    concert.venue,
    concert.capacity
  ]);


  const totalFans = concertAttendance.reduce((sum, concert) => sum + concert.capacity, 0);

  return (
    <motion.div 
      className="relative w-full h-full flex flex-col items-center justify-center"
      animate={{
        background: showCapacityBars 
          ? "radial-gradient(circle at top left, #ff512f 0%, transparent 80%)" 
          : "none"
      }}
      transition={{ duration: 0.8, delay: 1 }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showVenueDetails ? 1 : 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <div className="text-4xl font-bold mb-2 text-white">
          You joined{" "}<br/>
          <CountingNumber
            className="bg-gradient-to-r from-blue-300 to-blue-500 text-transparent bg-clip-text"
            value={totalFans}
            from={Math.round(totalFans * 0.8)}
            formatFn={(val) => Math.round(val).toLocaleString()}
          />{" "}fans
        </div>
        <div className="text-white text-3xl font-bold">@</div>
        <div className="text-white text-4xl font-bold">
          {totalVenueCount} venues

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
          className="absolute items-center justify-center w-full max-w-2xl px-8 "
        >
          <div className="space-y-1 w-full">
            {/* Column Headers */}
            <div className="flex items-center gap-2 mb-3">
              <span className="flex-1 text-center text-white font-semibold text-xl">Your largest concerts of 2024</span>
            </div>
            
            <div className="rounded-[15px] w-full bg-[rgba(109,109,109,0.10)] backdrop-blur-[2px] inline-flex p-[20px_15px] flex-col justify-center items-center gap-3">
              {/* Venue List */}
              {sortedVenues.slice(0, 5).map(([venue, capacity], index) => (
                <motion.div
                  key={venue}
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: 3 + index * 0.1,
                  }}
                  className="flex gap-1 w-full"
                >
                  {/* Number Container */}
                  <div className="flex items-center justify-center">
                    <span className="text-white text-xl font-semibold min-w-6">
                      {index + 1}
                    </span>
                  </div>


                  {/* Content Container */}
                  <div className="flex flex-col flex-1">
                    <div className="text-white text-sm mb-1 truncate">
                      {concertAttendance[index].artist} - {venue}
                    </div>
                    <div className="flex items-center gap-1">

                      <div className="flex-1 relative h-1">
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
                          className="absolute h-full bg-[#dd2476] rounded"
                        />
                        {index === 0 && (
                          <motion.span 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 8.9 + index * 0.2 }}
                            className="absolute left-[92%] -top-4 text-lg"
                          >
                            🏟️
                          </motion.span>
                        )}
                      </div>
                    </div>
                    <div className="text-white text-xs mt-1">
                      {capacity.toLocaleString()} fans
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
    </motion.div>
  );
}

export default Slide5;
