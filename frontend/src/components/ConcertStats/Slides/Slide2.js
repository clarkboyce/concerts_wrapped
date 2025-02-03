import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import CountingNumber from "../Animations/CountingNumber";
import transferTicketIcon from "../styles/transfer-ticket-icon.png";

function Slide2({ totalSpent = 0, maxAvgPrice = 0, actualPrice = 0 }) {
  const [isFlashing, setIsFlashing] = useState(true);
  const [showSecondPart, setShowSecondPart] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [showFinalPart, setShowFinalPart] = useState(false);
  // find what to do with maxAvgPrice and actualPrice @clark

  // Calculate what they could have bought
  const calculateComparison = () => {
    if (totalSpent < 250) {
      const count = Math.floor(totalSpent / 5);
      return { emoji: "🧋", count, text: `${count} bubble teas!` };
    } else if (totalSpent < 500) {
      const count = Math.floor(totalSpent / 12);
      return { emoji: "🌯", count, text: `${count} Chipotle burritos!` };
    } else {
      const count = (totalSpent / 250).toFixed(1);
      return { emoji: "💰", count, text: `${count} bitcoins in 2015!` };
    }
  };


  const comparison = calculateComparison();

  useEffect(() => {
    const flashTimer = setTimeout(() => {
      setIsFlashing(false);
    }, 2000);

    const secondPartTimer = setTimeout(() => {
      setShowSecondPart(true);
    }, 2000);

    const comparisonTimer = setTimeout(() => {
      setShowComparison(true);
    }, 4500);

    const finalPartTimer = setTimeout(() => {
      setShowSecondPart(false);
      setShowFinalPart(true);
    }, 4500 + comparison.count * 100 + 2000);

    return () => {
      clearTimeout(flashTimer);
      clearTimeout(secondPartTimer);
      clearTimeout(comparisonTimer);
      clearTimeout(finalPartTimer);
    };
  }, [comparison.count]);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* First part - Major bag alert */}
      {!showFinalPart && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: showSecondPart ? 0 : 1,
            scale: 1,
            color: isFlashing
              ? ["#FFFFFF", "#FF0000", "#FFFFFF", "#FF0000"]
              : "#FFFFFF",
          }}
          transition={{
            duration: isFlashing ? 0.5 : 0.6,
            repeat: isFlashing ? Infinity : 0,
            repeatType: "reverse",
          }}
          className="text-center absolute"
        >
          <div className="text-6xl font-bold">Major</div>
          <div className="text-6xl font-bold">bag</div>
          <div className="text-6xl font-bold">alert!!!</div>
        </motion.div>
      )}

      {/* Second part - Spending text and comparison */}
      {showSecondPart && (
        <motion.div
          initial={{ opacity: 0, y: 70 }}
          animate={{ opacity: 1, y: 20 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.8 }}
          className="text-white text-center mb-24 px-8 w-full justify-center items-center"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
            }}
            transition={{
              opacity: { duration: 0.6 },
              marginBottom: { duration: 0.8, delay: 1.5 },
            }}
            className="text-4xl font-bold"
          >
            You spent <span className="bg-gradient-to-r from-green-400 to-green-600 text-transparent bg-clip-text">${totalSpent}</span>
            <br />
            on tickets this year
          </motion.div>

          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: 1,
              height: "auto",
            }}
            transition={{
              delay: 1.5,
              duration: 0.6,
            }}
            className="space-y-4 w-[100%] mx-auto mt-8"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              className="text-gray-300 text-xl w-[100%]"
            >
              That's enough to buy:
            </motion.div>
            <div className="text-2xl w-[100%] mb-2">
              {Array.from({ length: comparison.count }).map((_, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 2.2 + i * 0.1 }}
                >
                  {comparison.emoji}
                </motion.span>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.2 + 0.1 * comparison.count }}
              className="text-2xl w-[100%]"
            >
              {comparison.text}
            </motion.div>
          </motion.div>
        </motion.div>
      )}

      {/* Final part */}
      {showFinalPart && (
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-white text-center px-8 w-[85%] mx-auto"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-3xl font-bold mb-20"
          >
            I bet 20% of that
            <br />
            was on fees!!
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="text-gray-200 text-2xl font-semibold"
          >
            Skip the fees and save <span className="text-[#00AB66]">$</span>
            <CountingNumber 
              className="text-[#00AB66]" 
              value={totalSpent * 0.2} 
              delay={1.5} 

            /> <br />
            by buying with CampusTicket.
            {/* New App Tile */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2 }}
              className="flex justify-center mt-6 mb-4"
            >
              <motion.div
                animate={{
                  y: [0, -4, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                whileHover={{ scale: 1.05 }}
                className="p-[0px] relative z-50 bg-black"
              >
                <a
                  href="https://campus-ticket.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <div className="p-1">
                    <img
                      src={transferTicketIcon}
                      alt="Transfer Ticket"
                      className="w-16 h-16 rounded-2xl"
                    />
                  </div>
                </a>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

export default Slide2;
