"use client";
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface CoolTextProps {
  text: string;
}

const CoolText: React.FC<CoolTextProps> = ({ text }) => {
  const textRef = useRef<HTMLHeadingElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (textRef.current) {
        const { left, top, width, height } = textRef.current.getBoundingClientRect();
        const x = (e.clientX - left) / width;
        const y = (e.clientY - top) / height;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const colors = ['#ff0000', '#ff7f00', '#ffff00', '#00ff00', '#0000ff', '#8b00ff'];

  return (
    <motion.h1
      ref={textRef}
      className="cool-text"
      style={{
        position: 'relative',
        height: '200px',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        perspective: '1000px',
      }}
    >
      {colors.map((color, index) => (
        <span
          key={color}
          style={{
            color: color,
            position: 'absolute',
            fontSize: '5vw',
            fontWeight: 'bold',
            textShadow: '2px 2px 5px rgba(0, 0, 0, 0.5)',
            borderRadius: '20px', // Rounded edges for bubble effect
            padding: '10px', // Padding to create a bubble look
            backgroundColor: 'rgba(255, 255, 255, 0.3)', // Light background for contrast
            transform: `
              translateX(${mousePosition.x * 30 * (index + 1)}px) // Adjusted for more movement
              translateY(${mousePosition.y * 30 * (index + 1)}px) // Adjusted for more movement
              translateZ(${index * -10}px)
              scale(${1 + index * 0.1}) // Scale up each layer slightly
              translateY(-${index * 15}px) // Move each layer up slightly
            `,
            transition: 'transform 0.1s ease',
            opacity: 1 - index * 0.15,
          }}
        >
          {text}
        </span>
      ))}
    </motion.h1>
  );
};

export default CoolText;