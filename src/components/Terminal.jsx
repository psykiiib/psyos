import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { processCommand } from '../utils/commandParser';

const TerminalWrapper = styled.div`
  height: 100%;
  background: #000;
  color: #0f0;
  font-family: 'VT323', monospace;
  padding: 10px;
  overflow-y: auto;
  font-size: 1.1rem;
`;

const Line = styled.div`
  margin-bottom: 4px;
  color: ${props => props.type === 'input' ? '#fff' : '#0f0'};
  text-shadow: ${props => props.isGlitch ? '2px 0 red, -2px 0 blue' : 'none'};
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const StyledInput = styled.input`
  background: transparent;
  border: none;
  color: #0f0;
  font-family: 'VT323', monospace;
  font-size: 1.1rem;
  flex: 1;
  outline: none;
  margin-left: 8px;
  caret-color: #0f0; 
`;

const Terminal = ({ toggleWindow }) => {
  const [history, setHistory] = useState([
    { type: 'output', text: "PsyOS v1.0.0 [Snapshot 2026]" },
    { type: 'output', text: "(c) 2026 Khandaker Corp. All rights reserved." },
    { type: 'output', text: "Type 'help' for a list of commands." },
    { type: 'output', text: "" }
  ]);
  const [inputVal, setInputVal] = useState("");
  const endRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom whenever history changes
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  // Focus input when clicking anywhere in terminal
  const handleWrapperClick = () => {
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (!inputVal.trim()) return;
      processCommand(inputVal, setHistory, toggleWindow);
      setInputVal("");
    }
  };

  return (
    <TerminalWrapper onClick={handleWrapperClick}>
      {history.map((line, i) => (
        <Line key={i} type={line.type} isGlitch={line.text.includes("Just Monika")}>
          {line.text}
        </Line>
      ))}
      
      <InputWrapper>
        <span>C:\Users\Admin&gt;</span>
        <StyledInput 
          ref={inputRef}
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          spellCheck={false}
          autoComplete="off"
        />
      </InputWrapper>
      <div ref={endRef} />
    </TerminalWrapper>
  );
};

export default Terminal;