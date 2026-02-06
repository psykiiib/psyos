import React from 'react';
import styled, { keyframes } from 'styled-components';

const flicker = keyframes`
  0% { opacity: 0.97; }
  5% { opacity: 0.95; }
  10% { opacity: 0.9; }
  15% { opacity: 0.95; }
  20% { opacity: 0.99; }
  50% { opacity: 0.95; }
  80% { opacity: 0.9; }
  100% { opacity: 0.97; }
`;

const scanline = keyframes`
  0% { transform: translateY(0); }
  100% { transform: translateY(100vh); }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none; /* Allows clicks to pass through to windows! */
  z-index: 9999;
  background: linear-gradient(
    rgba(18, 16, 16, 0) 50%, 
    rgba(0, 0, 0, 0.25) 50%
  ), linear-gradient(
    90deg, 
    rgba(255, 0, 0, 0.06), 
    rgba(0, 255, 0, 0.02), 
    rgba(0, 0, 255, 0.06)
  );
  background-size: 100% 2px, 3px 100%;
  animation: ${flicker} 0.15s infinite;
  
  &::after {
    content: " ";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(18, 16, 16, 0.1);
    opacity: 0;
    z-index: 2;
    pointer-events: none;
    animation: ${flicker} 0.15s infinite;
  }
`;

const ScanLine = styled.div`
  width: 100%;
  height: 100px;
  z-index: 10;
  background: linear-gradient(0deg, rgba(0,0,0,0) 0%, rgba(51, 255, 51, 0.03) 50%, rgba(0,0,0,0) 100%);
  opacity: 0.1;
  position: absolute;
  bottom: 100%;
  animation: ${scanline} 10s linear infinite;
  pointer-events: none;
`;

const CRTOverlay = () => {
  return (
    <Overlay>
      <ScanLine />
    </Overlay>
  );
};

export default CRTOverlay;