import { motion } from 'framer-motion';

function Slide3() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-white text-3xl"
      >
        3
      </motion.div>
    </div>
  );
}

export default Slide3; 