import { motion } from "framer-motion";
import { useState, useEffect } from "react";

function Slide6({ artists = {} }) {
  const [showMessage, setShowMessage] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(false);
    }, 3000); // Show message for 3 seconds

    return () => clearTimeout(timer);
  }, []);

  // Array of colors to cycle through
  const colors = [
    "text-red-500",
    "text-blue-500",
    "text-green-500",
    "text-purple-500",
    "text-yellow-500",
    "text-pink-500",
    "text-cyan-500",
    "text-orange-500"
  ];

  // Convert artists object to array of [name, count] pairs and sort by count descending
  const sortedArtists = Object.entries(artists)
    .sort(([, countA], [, countB]) => countB - countA);
  
  // Get the maximum count to calculate relative sizes
  const maxCount = sortedArtists.length > 0 ? sortedArtists[0][1] : 1;

  // Find most popular artist(s)
  const mostPopularArtists = sortedArtists.filter(([_, count]) => count === maxCount);
  let popularArtistMessage;
  
  // Get random color for artist name highlighting
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  
  if (sortedArtists.length < 4) {
    const artistNames = mostPopularArtists
      .map(([artist]) => `<span class="${randomColor}">${artist}</span>`)
      .join(', ');
    popularArtistMessage = `You saw ${artistNames} ${mostPopularArtists.length > 1 ? 'each ' : ''}${maxCount} time${maxCount > 1 ? 's' : ''}! ${sortedArtists.length} artist${sortedArtists.length === 1 ? '' : 's'} is a great start. Let's get some more exposure next year!`;
  } else if (mostPopularArtists.length === sortedArtists.length) {
    popularArtistMessage = ` You had a lot of variety in your lineup this year!`;
  } else {
    const artistNames = mostPopularArtists
      .map(([artist]) => `<span class="${randomColor}">${artist}</span>`)
      .join(', ');
    popularArtistMessage = `Your most played artist${mostPopularArtists.length > 1 ? 's were' : ' was'} ${artistNames} with ${maxCount} concert${maxCount > 1 ? 's' : ''}!`;
  }

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-8">
      {showMessage ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          <div 
            className="text-white font-bold text-3xl"
            dangerouslySetInnerHTML={{ __html: popularArtistMessage }}
          />
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2 }}
          className="text-center"
        >
          <div className="text-white font-bold text-center">
            {sortedArtists.map(([artist, count], index) => {
              // Calculate relative size (1-2.5x base size)
              // If all artists appear once, use fixed 2x scale, otherwise calculate relative scale
              const allArtistsAppearOnce = sortedArtists.every(([_, count]) => count === 1);
              const scale = allArtistsAppearOnce ? 2 : 1 + (count / maxCount) * 1.5;
              const fontSize = `${scale}rem`;
              
              // Get color from array, cycling through if we have more artists than colors
              const colorClass = colors[index % colors.length];

              return (
                <motion.span
                  key={artist}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  style={{ display: 'inline-block' }}
                >
                  <span 
                    className={`${colorClass}`}
                    style={{ fontSize, whiteSpace: 'nowrap' }}
                  >
                    {artist}
                  </span>
                  {index < sortedArtists.length - 1 && (
                    <span 
                      className="text-gray-500 mx-2" 
                      style={{ fontSize }}
                    >•</span>
                  )}
                </motion.span>
              );
            })}
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default Slide6;
