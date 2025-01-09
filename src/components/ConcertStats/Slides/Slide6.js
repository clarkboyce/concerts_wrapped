import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

function Slide6() {
  const [showFirst, setShowFirst] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFirst(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <AnimatePresence mode="wait">
        {showFirst ? (
          <motion.div
            key="first"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="text-white text-3xl font-bold text-center w-[85%]"
          >
            Plan on making more music memories?
          </motion.div>
        ) : (
          <motion.div
            key="second"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center"
          >
            <div className="text-white text-2xl font-bold">
              Get your concert tickets for 2025 with 0 fees on
            </div>
            <div className="text-4xl font-bold">CampusTicket</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Slide6;
