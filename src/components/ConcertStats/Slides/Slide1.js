import { motion } from 'framer-motion';
import CountingNumber from '../Animations/CountingNumber';
import { gradients } from '../styles/gradients';

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
        transition={{ duration: 2 }}
        className="text-white text-center mb-1"
      >
        <div className="font-bold">
          <div className="text-4xl flex items-center justify-center gap-3 mb-3">
            You spent
          </div>
          <div className="text-5xl text-sky-400 flex items-center justify-center gap-3 mb-3">
          <CountingNumber value={totalMinutes} /> minutes
          </div>
          <div className="text-4xl flex items-center justify-center gap-3 mb-3">
            at <CountingNumber value={totalConcerts} /> concerts
          </div>
        </div>
      </motion.div>

      {/* Percentage text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 2 }}
        className="text-gray-200 text-2xl text-center"
      >
        That puts you in the<br />
        top <CountingNumber 
          value={topPercentage} 
          formatFn={(val) => val.toFixed(1)}
        />% of users *
      </motion.div>
    </div>
  );
}

export default Slide1; 