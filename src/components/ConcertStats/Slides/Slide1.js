import { motion } from 'framer-motion';

function Slide1({ 
  totalMinutes = 0, 
  totalConcerts = 0,
  topPercentage = 0 
}) {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center px-6 -mt-6">
      {/* Main stat */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-white text-center mb-12"
      >
        <div className="text-3xl font-bold mb-1">
          You spent
        </div>
        <div className="text-3xl font-bold">
          {totalMinutes} minutes at
        </div>
        <div className="text-3xl font-bold">
          {totalConcerts} concerts
        </div>
      </motion.div>

      {/* Percentage text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 2 }}
        className="text-gray-400 text-lg text-center"
      >
        That puts you in the<br />
        top {topPercentage}% of users *
      </motion.div>
    </div>
  );
}

export default Slide1; 