import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { APPS } from '../utils/apps'; // Import APPS to list programs

// --- STYLES ---

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  background: #000; /* Pure Black for Retro Terminal */
  color: #c0c0c0;   /* Classic Terminal Gray/White */
  
  /* [UPDATED] Retro Font & Bigger Size */
  font-family: 'Fixedsys', 'Fixedsys Excelsior', 'VT323', monospace;
  font-size: 20px;
  line-height: 1.2;
  padding: 10px;
  
  overflow-y: auto;
  box-sizing: border-box;
  
  /* Retro Scrollbar */
  &::-webkit-scrollbar { width: 14px; }
  &::-webkit-scrollbar-track { background: #000; }
  &::-webkit-scrollbar-thumb { 
    background: #c0c0c0; 
    border: 2px solid #000;
  }
`;

const OutputLine = styled.div`
  margin-bottom: 4px;
  white-space: pre-wrap;
  word-wrap: break-word;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap; 
`;

const PromptLabel = styled.span`
  color: #fff; 
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
  caret-color: #fff; 
  min-width: 50%;
`;

const Terminal = ({ openApp, onClose, onShutdown }) => {
  const [history, setHistory] = useState([
    { text: "PsyOS (C) 2026", type: 'info' },
    { text: "Type 'help' for commands.", type: 'info' },
    { text: "", type: '' } // spacer
  ]);
  const [input, setInput] = useState("");
  const endRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleWrapperClick = () => {
    inputRef.current?.focus();
  };

  const handleCommand = (cmd) => {
    const trimmed = cmd.trim(); // Keep case for arguments, but lowercase command
    const args = trimmed.split(' ');
    const command = args[0].toLowerCase();
    
    let response = [];

    switch (command) {
      case 'help':
        response = [
          { text: "COMMANDS LIST:", type: 'header' },
          { text: "  about      Open About Me", type: '' },
          { text: "  projects   Open Projects", type: '' },
          { text: "  socials    Open Contact Info", type: '' },
          { text: "  programs   List all installed apps", type: '' },
          { text: "  run [id]   Run a specific program", type: '' },
          { text: "  clear      Clear screen", type: '' },
          { text: "  shutdown   Power off system", type: '' },
          { text: "  exit       Close terminal", type: '' },
        ];
        break;

      case 'about':
        response = [{ text: "Launching Profile...", type: 'success' }];
        openApp('notepad'); // Assuming Notepad is your "About" app based on previous setup
        break;

      case 'projects':
        // If you have a specific projects app, change 'notepad' to 'projects'
        // For now, I'll assume we open a folder or text file
        response = [{ text: "Accessing Projects Database...", type: 'success' }];
        openApp('minesweeper'); // Placeholder: Replace with actual projects app ID
        break;

      case 'socials':
        response = [{ text: "Opening Contact Channels...", type: 'success' }];
        openApp('contact');
        break;

      case 'programs':
        const appList = APPS.map(a => `  ${a.id.padEnd(15)} - ${a.title}`).join('\n');
        response = [
          { text: "INSTALLED PROGRAMS:", type: 'header' },
          { text: appList, type: '' }
        ];
        break;

      case 'run':
        if (args[1]) {
           const appId = args[1].toLowerCase();
           const appExists = APPS.find(a => a.id === appId);
           if (appExists) {
               response = [{ text: `Starting ${appExists.title}...`, type: 'success' }];
               openApp(appId);
           } else {
               response = [{ text: `Error: Program '${appId}' not found.`, type: 'error' }];
           }
        } else {
            response = [{ text: "Usage: run [program_id]", type: 'error' }];
        }
        break;

      case 'shutdown':
        onShutdown(); // Trigger system shutdown
        break;

      case 'exit':
        onClose(); // Close terminal window
        break;

      case 'clear':
        setHistory([]);
        return; 

      case '':
        break;

      default:
        response = [{ text: `Bad command or file name: ${command}`, type: 'error' }];
    }

    setHistory(prev => [
      ...prev, 
      { text: `visitor@psyos.terminal:~$ ${cmd}`, type: 'prompt' }, // Maintain prompt style
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
        <OutputLine key={i} style={{ color: line.type === 'error' ? '#ff5555' : '#c0c0c0' }}>
          {/* If it's a prompt line, we could colorize the user part differently if we parsed it, 
              but for now keeping it white/gray is authentic to DOS/Unix */}
          {line.text}
        </OutputLine>
      ))}
      
      <InputWrapper>
        <PromptLabel>visitor@psyos.terminal:~$</PromptLabel>
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