import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  /* Reset and base font settings */
  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'VT323', 'Courier New', monospace; /* The retro font */
    background-color: #000;
    color: #0f0; /* Default Green text */
    overflow: hidden; /* Prevents browser scrollbars, since the OS handles scrolling */
    -webkit-font-smoothing: none; /* Keeps fonts pixelated/sharp */
  }

  /* Custom "Hacker" Scrollbars for Webkit browsers (Chrome/Edge) */
  ::-webkit-scrollbar {
    width: 12px;
  }
  
  ::-webkit-scrollbar-track {
    background: #000;
    border-left: 1px solid #333;
  }
  
  ::-webkit-scrollbar-thumb {
    background: #10a95a; /* Matrix Green */
    border: 1px solid #000;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #0f0;
  }

  /* Text Selection Style */
  ::selection {
    background: #0f0;
    color: #000;
  }
`;