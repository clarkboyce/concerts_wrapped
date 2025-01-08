import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

function Slide2({ totalSpent = 300 }) {
  const [isFlashing, setIsFlashing] = useState(true);
  const [showSecondPart, setShowSecondPart] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [showFinalPart, setShowFinalPart] = useState(false);

  // Calculate what they could have bought
  const calculateComparison = () => {
    if (totalSpent < 250) {
      const count = Math.floor(totalSpent / 5);
      return { emoji: '🧋', count, text: `${count} bubble teas!` };
    } else if (totalSpent < 500) {
      const count = Math.floor(totalSpent / 12);
      return { emoji: '🌯', count, text: `${count} Chipotle burritos!` };
    } else {
      const count = (totalSpent / 40).toFixed(1);
      return { emoji: '🐰', count, text: `${count} pet rabbits!` };
    }
  };

  const comparison = calculateComparison();

  useEffect(() => {
    // Stop flashing after 2 seconds
    const flashTimer = setTimeout(() => {
      setIsFlashing(false);
    }, 2000);

    // Show second part after 2.5 seconds
    const secondPartTimer = setTimeout(() => {
      setShowSecondPart(true);
    }, 2500);

    // Show comparison after 5 seconds
    const comparisonTimer = setTimeout(() => {
      setShowComparison(true);
    }, 5000);

    // Add timer for final part
    const finalPartTimer = setTimeout(() => {
      setShowFinalPart(true);
    }, 7000);

    return () => {
      clearTimeout(flashTimer);
      clearTimeout(secondPartTimer);
      clearTimeout(comparisonTimer);
      clearTimeout(finalPartTimer);
    };
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* First part - Major bag alert */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ 
          opacity: showSecondPart ? 0 : 1, 
          scale: 1,
          color: isFlashing ? ['#FFFFFF', '#FF0000', '#FFFFFF', '#FF0000'] : '#FFFFFF'
        }}
        transition={{ 
          duration: isFlashing ? 0.5 : 0.6,
          repeat: isFlashing ? Infinity : 0,
          repeatType: "reverse"
        }}
        className="text-center absolute"
      >
        <div className="text-5xl font-bold">
          Major
        </div>
        <div className="text-5xl font-bold">
          bag
        </div>
        <div className="text-5xl font-bold">
          alert!!!
        </div>
      </motion.div>

      {/* Second part - Spending text and comparison */}
      {showSecondPart && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-white text-center"
        >
          <div className="text-3xl font-bold mb-12">
            You spent ${totalSpent}<br/>
            on tickets this year
          </div>

          {showComparison && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <div className="text-gray-400 text-xl">
                That's enough to buy:
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, staggerChildren: 0.1 }}
                className="text-2xl mb-2"
              >
                {Array.from({ length: comparison.count }).map((_, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    {comparison.emoji}
                  </motion.span>
                ))}
              </motion.div>
              <div className="text-xl">
                {comparison.text}
              </div>
            </motion.div>
          )}

          {showFinalPart && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mt-12"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-white text-center text-3xl font-bold mb-4"
              >
                I bet 20% of it was from fees 😭😭😭
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-gray-400 text-center text-xl"
              >
                Skip the fees and buy with<br />
                CampusTicket next time.
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  );
}

export default Slide2; 