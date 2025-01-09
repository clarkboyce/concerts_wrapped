import { useEffect, useState } from 'react';
import { animate } from 'framer-motion';

function CountingNumber({ 
  value, 
  duration = 1, 
  formatFn = (val) => Math.round(val),
  delay = 0 
}) {
  const [displayValue, setDisplayValue] = useState(0);
  
  useEffect(() => {
    const controls = animate(0, value, {
      duration: duration,
      delay: delay,
      ease: "easeOut",
      onUpdate: (latest) => {
        setDisplayValue(formatFn(latest));
      },
      onComplete: () => {
        // Ensure we end exactly on the target value
        setDisplayValue(formatFn(value));
      }
    });

    // Cleanup function
    return () => controls.stop();
  }, [value]); // Only re-run if value changes

  return <span>{displayValue}</span>;
}

export default CountingNumber; 