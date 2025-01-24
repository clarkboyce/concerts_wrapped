import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

function Slide4({ seasonalData = {} }) {
  const [showGrid, setShowGrid] = useState(false);

  // Calculate top season and active seasons count
  const getTopSeason = () => {
    const seasons = [
      { name: "Spring", count: seasonalData.spring, title: "Spring Sensation 🌷" },
      { name: "Summer", count: seasonalData.summer, title: "Summer Star ☀️" },
      { name: "Fall", count: seasonalData.fall, title: "Fall Fanatic 🍂" },
      { name: "Winter", count: seasonalData.winter, title: "Winter Warrior ❄️" },
    ];
    return seasons.reduce((max, season) =>
      max.count > season.count ? max : season
    );
  };

  const getActiveSeasonsCount = () => {
    return [
      seasonalData.spring,
      seasonalData.summer,
      seasonalData.fall,
      seasonalData.winter,
    ].filter((count) => count > 0).length;
  };

  const getSeasonMessage = (activeSeasons) => {
    if (activeSeasons === 4) {
      return "You were partying year round! 🎉";
    }

    return `You attended the most concerts in ${topSeason.name} this year!`;
  };

  const topSeason = getTopSeason();
  const activeSeasons = getActiveSeasonsCount();
  const seasonMessage = getSeasonMessage(activeSeasons);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowGrid(true);
    }, 3000); // Show grid after 3 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-full">
      <AnimatePresence mode="wait">
        {!showGrid ? (
          // Initial title and message
          <motion.div
            key="title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="h-full flex flex-col items-center justify-center px-6"
          >
            <motion.div className="text-white text-4xl font-bold text-center mb-8">
              {topSeason.title}
            </motion.div>
            <motion.div className="text-gray-400 text-xl text-center">
              {seasonMessage}
            </motion.div>
          </motion.div>
        ) : (
          // Seasonal grid (existing code)
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full h-full grid grid-cols-2 grid-rows-2"
          >
            {/* Spring - Top Left */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="relative flex items-center justify-center bg-gradient-to-br from-pink-500/20 to-transparent"
            >
              <div className="text-center text-white">
                <div className="text-4xl mb-2">🌷</div>
                <div className="text-2xl font-bold">{seasonalData.spring}</div>
                <div className="text-lg">concerts</div>
              </div>
            </motion.div>

            {/* Summer - Top Right */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative flex items-center justify-center bg-gradient-to-bl from-yellow-500/20 to-transparent"
            >
              <div className="text-center text-white">
                <div className="text-4xl mb-2">☀️</div>
                <div className="text-2xl font-bold">{seasonalData.summer}</div>
                <div className="text-lg">concerts</div>
              </div>
            </motion.div>

            {/* Fall - Bottom Left */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="relative flex items-center justify-center bg-gradient-to-tr from-orange-500/20 to-transparent"
            >
              <div className="text-center text-white">
                <div className="text-4xl mb-2">🍂</div>
                <div className="text-2xl font-bold">{seasonalData.fall}</div>
                <div className="text-lg">concerts</div>
              </div>
            </motion.div>

            {/* Winter - Bottom Right */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="relative flex items-center justify-center bg-gradient-to-tl from-blue-500/20 to-transparent"
            >
              <div className="text-center text-white">
                <div className="text-4xl mb-2">❄️</div>
                <div className="text-2xl font-bold">{seasonalData.winter}</div>
                <div className="text-lg">concerts</div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Slide4;
