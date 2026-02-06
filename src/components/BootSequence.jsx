import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const BootScreen = styled.div`
  background: black;
  color: #33ff33;
  height: 100vh;
  width: 100vw;
  font-family: 'VT323', monospace; /* Ensure you use the pixel font */
  padding: 2rem;
  overflow: hidden;
  font-size: 1.2rem;
`;

const Line = styled.div`
  margin-bottom: 5px;
`;

const bootLines = [
  "BIOS Date 02/06/26 10:55:27 Ver: 1.0.0",
  "CPU: ESP32-S3 Dual Core 240MHz",
  "Checking RAM... 512KB OK",
  "Detecting psky.dev filesystem... MOUNTED",
  "Loading Repast Simphony models... DONE",
  "Initializing Psycho-Social Operating System (PsyOS)...",
  "Starting visual interface..."
];

const BootSequence = ({ onComplete }) => {
  const [lines, setLines] = useState([]);

  useEffect(() => {
    // We use a timeout ID to cleanup if the user leaves the page
    const timeouts = [];
    let cumulativeDelay = 0;

    bootLines.forEach((line, index) => {
      // 1. Calculate realistic delays
      const delay = Math.random() * 500 + 200; 
      cumulativeDelay += delay;

      const t = setTimeout(() => {
        setLines(prev => [...prev, line]);
        
        // 2. Only trigger completion after the LAST line
        if (index === bootLines.length - 1) {
          setTimeout(onComplete, 800); 
        }
      }, cumulativeDelay);
      
      timeouts.push(t);
    });

    // Cleanup function
    return () => timeouts.forEach(clearTimeout);
  }, []); // <--- Dependency array is empty to ensure it runs ONCE

  return (
    <BootScreen>
      {lines.map((l, i) => <Line key={i}>{l}</Line>)}
      <Line>_</Line>
    </BootScreen>
  );
};

export default BootSequence;