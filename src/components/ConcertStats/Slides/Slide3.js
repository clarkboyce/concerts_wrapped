import { motion } from 'framer-motion';

function Slide3({ topGenre = "Rock" , genreFanCount = 1000}) {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center mt-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-white text-3xl text-center mb-10"
      >
        You really love going to {topGenre} concerts!
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 2 }}
        className="text-gray-400 text-lg text-center"
      >
        {genreFanCount} other fans feel the same way.
      </motion.div>
    </div>
  );
}

export default Slide3; 