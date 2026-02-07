import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

// --- MODERN STYLES ---

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  
  /* Modern Acrylic / Glassmorphism Effect */
  background: rgba(20, 20, 20, 0.85); /* Dark semi-transparent */
  backdrop-filter: blur(12px);         /* Blurs what's behind it */
  -webkit-backdrop-filter: blur(12px);
  
  color: #f0f0f0; /* Soft White text */
  font-family: 'Consolas', 'Monaco', 'Andale Mono', monospace; /* Modern Monospace */
  font-size: 14px;
  line-height: 1.5;
  padding: 15px;
  
  overflow-y: auto;
  box-sizing: border-box;

  /* Custom Scrollbar */
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 5px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.4);
  }
`;

const OutputLine = styled.div`
  margin-bottom: 2px;
  white-space: pre-wrap;
  word-wrap: break-word;
  
  /* Color coding for specific keywords if you want */
  &.error { color: #ff5555; }
  &.success { color: #50fa7b; }
  &.info { color: #8be9fd; }
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 5px;
`;

// Modern Prompt Style (Ubuntu/Mac style)
const PromptLabel = styled.span`
  color: #50fa7b; /* Neon Green */
  font-weight: bold;
  margin-right: 8px;
  text-shadow: 0 0 5px rgba(80, 250, 123, 0.4); /* Subtle glow */
`;

const Directory = styled.span`
  color: #bd93f9; /* Purple */
  font-weight: bold;
  margin-right: 8px;
`;

const StyledInput = styled.input`
  background: transparent;
  border: none;
  color: #fff;
  font-family: inherit;
  font-size: inherit;
  flex: 1;
  outline: none;
  caret-color: #50fa7b; /* Blinking green cursor */
`;

const Terminal = () => {
  const [history, setHistory] = useState([
    { text: "Welcome to Portfolio OS v2.0", type: 'info' },
    { text: "Type 'help' to see available commands.", type: 'info' },
    { text: "-------------------------------------", type: '' }
  ]);
  const [input, setInput] = useState("");
  const endRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  // Focus input on click
  const handleWrapperClick = () => {
    inputRef.current?.focus();
  };

  const handleCommand = (cmd) => {
    const trimmed = cmd.trim().toLowerCase();
    let response = [];

    switch (trimmed) {
      case 'help':
        response = [
          { text: "Available Commands:", type: 'success' },
          { text: "  about    - Who am I?", type: '' },
          { text: "  projects - View my work", type: '' },
          { text: "  socials  - Contact info", type: '' },
          { text: "  clear    - Clear terminal", type: '' },
          { text: "  exit     - Close terminal", type: '' },
        ];
        break;
      case 'about':
        response = [{ text: "I am a Fullstack Developer proficient in React, Node.js, and creating cool retro OS websites!", type: '' }];
        break;
      case 'projects':
        response = [
          { text: "1. Portfolio OS (React)", type: '' },
          { text: "2. E-Commerce Platform (Node/Mongo)", type: '' },
          { text: "Type 'open [number]' to view (simulated)", type: 'info' }
        ];
        break;
      case 'socials':
        response = [
          { text: "GitHub: github.com/khandaker", type: '' },
          { text: "LinkedIn: linkedin.com/in/khandaker", type: '' }
        ];
        break;
      case 'clear':
        setHistory([]);
        return; // Early return to avoid adding the 'clear' command to history
      case 'exit':
        // logic to close window could go here if passed via props
        response = [{ text: "Session terminated.", type: 'error' }];
        break;
      case '':
        break;
      default:
        response = [{ text: `Command not found: ${trimmed}`, type: 'error' }];
    }

    setHistory(prev => [
      ...prev, 
      { text: `visitor@portfolio:~$ ${cmd}`, type: 'prompt' }, // The command you typed
      ...response
    ]);
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
    }
  };

  return (
    <Wrapper onClick={handleWrapperClick}>
      {history.map((line, i) => (
        <OutputLine key={i} className={line.type === 'prompt' ? '' : line.type}>
          {line.text}
        </OutputLine>
      ))}
      
      <InputWrapper>
        <PromptLabel>visitor@portfolio</PromptLabel>
        <Directory>:~$</Directory>
        <StyledInput 
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          autoFocus
          spellCheck="false"
          autoComplete="off"
        />
      </InputWrapper>
      <div ref={endRef} />
    </Wrapper>
  );
};

export default Terminal;