import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import limeTicket from '../styles/Lime_Small_Ticket.png';
import greenTicket from '../styles/Green_Small_Ticket.png';
import bluePurpleTicket from '../styles/Blue-Purple_Small_Ticket.png';
import blueTicket from '../styles/Blue_Small_Ticket.png';
import redYellowTicket from '../styles/Red_Yellow_Small_Ticket.png';
import purplePinkTicket from '../styles/Purple-Pink_Small_Ticket.png';
import redTicket from '../styles/Red_Small_Ticket.png';
import yellowTicket from '../styles/Yellow_Small_Ticket.png';

function Slide7() {
  const [stage, setStage] = useState(1);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setStage(2);
    }, 2500);

    const timer2 = setTimeout(() => {
      setStage(3);
    }, 5000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const generateDots = (count) => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      size: Math.random() * 2 + 2, // 2-4px
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      isGrey: Math.random() > 0.5
    }));
  };

  const [dots] = useState(() => generateDots(30));

  const tickets = [
    { img: purplePinkTicket, x: -250, y: -300, angle: -20, finalX: -74, finalY: -244 },  // Top left
    { img: greenTicket, x: 250, y: -300, angle: 20, finalX: 44.5, finalY: -215 },          // Top right
    { img: redTicket, x: -300, y: 0, angle: 5, finalX: -104.5, finalY: -123 },               // Middle left
    { img: blueTicket, x: 300, y: 0, angle: -30, finalX: 99.5, finalY: -102 },                 // Middle right
    { img: bluePurpleTicket, x: -250, y: 300, angle: -15, finalX: -112.5, finalY: 124 },     // Bottom left
    { img: limeTicket, x: 250, y: 300, angle: -25, finalX: 77.5, finalY: 174 },            // Bottom right
    { img: redYellowTicket, x: -200, y: 200, angle: 15, finalX: -45.5, finalY: 231 },        // Lower left
  ];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <AnimatePresence mode="wait">
        {stage === 1 ? (
          <motion.div
            key="first"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="text-white text-3xl font-medium text-center w-[85%]"
          >
            Plan on making more music memories?
          </motion.div>
        ) : stage === 2 ? (
          <motion.div
            key="second"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="text-white text-3xl font-medium text-center w-[85%]"
          >
            Get your concert<br/>tickets for 2025<br/>with no fees!
          </motion.div>
        ) : (
          <motion.div
            key="third"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center relative w-full h-full flex items-center justify-center"
          >
            <motion.img
              src={yellowTicket}
              alt="ticket"
              className="absolute h-10 object-contain z-0"
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: 50 }}
              transition={{ duration: 0.4 }}
            />

            <div className="text-white text-2xl font-bold z-10" style={{transform: 'translateY(-30px)'}}>
              Visit CampusTicket for<br/>deals in SF, LA, and DFW
            </div>
            
            {tickets.map((ticket, index) => (
              <motion.img
                key={index}
                src={ticket.img}
                alt="ticket"
                className="absolute h-8 object-contain"
                initial={{
                  opacity: 0,
                  x: ticket.x,
                  y: ticket.y,
                  rotate: ticket.angle
                }}
                animate={{ 
                  opacity: 0.8,
                  x: ticket.finalX,
                  y: ticket.finalY,
                  rotate: ticket.angle
                }}
                transition={{
                  duration: 2,
                  delay: 0.3 + (index * 0.1),
                  type: "spring",
                  damping: 12
                }}
              />
            ))}

            {dots.map((dot) => (
              <motion.div
                key={dot.id}
                className={`absolute rounded-full ${dot.isGrey ? 'bg-gray-300' : 'bg-white'}`}
                style={{
                  width: dot.size,
                  height: dot.size,
                  left: dot.left,
                  top: dot.top,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ duration: 0.4, delay: Math.random() * 0.3 }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Slide7;
