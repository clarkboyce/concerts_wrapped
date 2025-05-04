import { motion } from 'framer-motion';
import CountingNumber from '../Animations/CountingNumber';

function calculateTopPercentage(minutes) {
  // If no concert time, return 100%
  if (minutes <= 0) return 100;
  
  // If they've attended any concert at all, start at 80% and decay from there
  // Using exponential decay: p = (a * e^(-bx)) + 20
  const a = 80;  // Scale factor 
  const b = 0.0045;  // Decay rate
  
  const percentage = (a * Math.exp(-b * minutes));
  
  // Round to 1 decimal place
  return Math.max(0.1, Math.round(percentage * 10) / 10);
}

function Slide1({ 
  totalMinutes = 0, 
  totalConcerts = 0,
  tiers = {}
}) {
  const topPercentage = calculateTopPercentage(totalMinutes);
  
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center px-6 -mt-6">
      {/* Main stat */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.4 }}
        className="text-white text-center mb-4"
      >
        <div className="font-bold">
          <div className="text-4xl flex items-center justify-center gap-3 mb-3">
            You spent ~ 
          </div>
          <div className="text-5xl text-sky-400 flex items-center justify-center gap-3 mb-3">
          <CountingNumber value={totalMinutes} duration={2} from={Math.round(totalMinutes * 0.8)} /> minutes
          </div>
          <div className="text-4xl flex items-center justify-center gap-3 mb-3">
            at <CountingNumber value={totalConcerts} duration={2} /> concerts

          </div>
        </div>
      </motion.div>

      {/* Percentage text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 3 }}
        className="text-gray-200 text-xl text-center mt-8"
      >
        That puts you in the<br />
        top <span><CountingNumber
          value={topPercentage}
          formatFn={(val) => val.toFixed(1)
          }
        /></span>% of users *
      </motion.div>
    </div>
  );
}

export default Slide1; 