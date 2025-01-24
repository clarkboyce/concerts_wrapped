import { motion } from 'framer-motion';
import { useState, useEffect, useMemo } from 'react';


function Slide3({ topGenre = "", artistGenres = {}, genreCounts = {} }) {
  const [showSecondPart, setShowSecondPart] = useState(false);

  useEffect(() => {
    // Start transition to second part after 4 seconds
    const timer = setTimeout(() => {
      setShowSecondPart(true);
    }, 4500);

    return () => clearTimeout(timer);
  }, []);

  // Create a reverse mapping of genres to artists using useMemo
  const genreToArtists = useMemo(() => {
    const mapping = {};
    Object.entries(artistGenres).forEach(([artist, genre]) => {
      if (!mapping[genre]) {
        mapping[genre] = [];
      }
      mapping[genre].push(artist);
    });
    return mapping;
  }, [artistGenres]);

  // Simply look up the artists for the top genre
  const topGenreArtists = genreToArtists[topGenre] || [];

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center mt-6">
      {!showSecondPart ? (
        // First part
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="text-white text-3xl font-semibold text-center mb-10"
          >
            You saw concerts <br/> from <span className="font-bold bg-gradient-to-r from-purple-400 to-purple-600 inline-block text-transparent bg-clip-text">
              {Object.keys(genreCounts).length}
            </span> different <br/> genre{Object.keys(genreCounts).length === 1 ? '' : 's'} this year!
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="text-gray-400 text-lg text-center"
          >
            But what was your<br/>favorite?
          </motion.div>
        </>
      ) : (
        // Second part
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`rounded-3xl p-8 bg-radial-at-t from-purple-500/30 to-transparent absolute inset-0 flex flex-col items-center justify-center`}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white text-3xl font-semibold text-center mb-4"
          >
            You really seemed to enjoy <span className="text-purple-500 font-bold">{topGenre}</span>!
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-gray-400 text-lg text-center"
          >
            from artists like...
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-white text-lg text-center mt-2"
          >
            {topGenreArtists.join(', ')}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 2 }}
            className="text-gray-400 text-sm text-center mt-4"
          >
            **if you got a weird one,<br/>blame Spotify, we used<br/>their genre list 😂😂
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

export default Slide3; 