import React from 'react';
import { motion } from 'framer-motion';

const QUOTES = [
  { text: "The night is still young.", top: 15, right: 10, align: 'right' },
  { text: "Good vibes only.", top: 35, right: 40, align: 'left' },
  { text: "Dance like nobody's watching.", top: 55, right: 15, align: 'right' },
  { text: "Memories are made after midnight.", top: 75, right: 35, align: 'left' },
  { text: "Sleep is for the weak.", top: 25, right: 20, align: 'center' },
  { text: "Dress loud, party louder.", top: 85, right: 10, align: 'right' },
  { text: "Keep calm and party on.", top: 5, right: 30, align: 'left' },
  { text: "Eat, sleep, rave, repeat.", top: 45, right: 5, align: 'right' },
  { text: "Cheers to the nights we won't remember.", top: 65, right: 25, align: 'center' },
];

export const RightSidebarQuotes: React.FC = () => {
  return (
    <div className="hidden md:block w-56 lg:w-72 shrink-0 pointer-events-none relative z-0">
      <div className="absolute inset-0 overflow-hidden">
        {QUOTES.map((quote, i) => {
          // Add some varied floating physics based on index
          const duration = 15 + (i % 4) * 8; // 15 to 39 seconds
          const yOffset = 20 + (i % 3) * 15; // 20 to 50 px movement
          const delay = i * 1.5;

          return (
            <motion.div
              key={i}
              className="absolute w-[80%] font-black uppercase text-[10px] lg:text-xs leading-relaxed tracking-[0.2em] mix-blend-overlay"
              style={{
                top: `${quote.top}%`,
                right: `${quote.right}%`,
                textAlign: quote.align as 'left' | 'center' | 'right',
                // Create a beautiful subtle purple/white gradient text
                background: 'linear-gradient(135deg, rgba(255,255,255,0.4), rgba(217,70,239,0.3))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
              animate={{
                y: [0, -yOffset, 0],
                opacity: [0.1, 0.4, 0.1],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: delay
              }}
            >
              {quote.text}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
