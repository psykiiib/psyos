import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';

// --- STYLES ---

const rainbow = keyframes`
  0% { filter: hue-rotate(0deg); }
  100% { filter: hue-rotate(360deg); }
`;

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;

const TerminalWrapper = styled.div`
  background-color: #000;
  height: 100%;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  overflow-y: auto;
  
  color: #0f0; 
  font-family: 'Fixedsys', 'Fixedsys Excelsior', 'VT323', monospace;
  font-size: 18px;
  line-height: 1.3;
  
  &::-webkit-scrollbar { width: 12px; }
  &::-webkit-scrollbar-track { background: #000; }
  &::-webkit-scrollbar-thumb { background: #008000; border: 1px solid #0f0; }
`;

const Logo = styled.pre`
  font-family: 'Courier New', monospace;
  font-weight: bold;
  margin-bottom: 20px;
  white-space: pre;
  line-height: 14px;
  font-size: 14px;
  
  background: linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${rainbow} 2s linear infinite; 
`;

const Link = styled.a`
  color: #fff;
  text-decoration: underline;
  cursor: pointer;
  &:hover {
    background-color: #0f0;
    color: #000;
    text-decoration: none;
  }
`;

const Cursor = styled.span`
  display: inline-block;
  width: 10px;
  height: 18px;
  background-color: #0f0;
  animation: ${blink} 1s step-end infinite;
  vertical-align: sub;
  margin-left: 5px;
`;

const About = () => {
  const [lines, setLines] = useState([]);
  const [isDone, setIsDone] = useState(false);
  
  const endRef = useRef(null);
  const hasRun = useRef(false); // [FIX] Prevention Ref

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  useEffect(() => {
    // [FIX] If already run, stop here.
    if (hasRun.current) return;
    hasRun.current = true;

    const runSequence = async () => {
      const wait = (ms) => new Promise(res => setTimeout(res, ms));

      setLines([]);
      await wait(500);

      const logoArt = `
██████╗ ███████╗██╗   ██╗ ██████╗ ███████╗
██╔══██╗██╔════╝╚██╗ ██╔╝██╔═══██╗██╔════╝
██████╔╝███████╗ ╚████╔╝ ██║   ██║███████╗
██╔═══╝ ╚════██║  ╚██╔╝  ██║   ██║╚════██║
██║     ███████║   ██║   ╚██████╔╝███████║
╚═╝     ╚══════╝   ╚═╝    ╚═════╝ ╚══════╝
      `;
      setLines(prev => [...prev, { type: 'logo', content: logoArt }]);
      await wait(800);

      setLines(prev => [...prev, { type: 'text', content: "PsyOS Admin Console v2.0" }]);
      await wait(200);
      setLines(prev => [...prev, { type: 'text', content: "Copyright (C) 2026 PsyOS Systems." }]);
      await wait(600);
      
      setLines(prev => [...prev, { type: 'text', content: "Initializing User Profile..." }]);
      await wait(800);
      setLines(prev => [...prev, { type: 'text', content: "Loading /etc/about config..." }]);
      await wait(600);
      setLines(prev => [...prev, { type: 'text', content: "Fetching remote data..." }]);
      await wait(1000);

      setLines(prev => [...prev, { type: 'br' }]);
      
      setLines(prev => [...prev, { 
        type: 'link', 
        label: "GITHUB:    ", 
        url: "https://github.com/psykiiib", 
        text: "github.com/psykiiib" 
      }]);
      await wait(400);

      setLines(prev => [...prev, { 
        type: 'link', 
        label: "LINKEDIN:  ", 
        url: "https://linkedin.com/in/khandaker-shahariar", 
        text: "linkedin.com/in/khandaker-shahariar" 
      }]);
      await wait(400);

      setLines(prev => [...prev, { 
        type: 'link', 
        label: "PORTFOLIO: ", 
        url: "https://www.psyk.dev", 
        text: "psyk.dev" 
      }]);
      await wait(400);

      setLines(prev => [...prev, { type: 'br' }]);
      
      setIsDone(true);
    };

    runSequence();
  }, []);

  return (
    <TerminalWrapper>
      {lines.map((line, index) => {
        if (line.type === 'logo') {
          return <Logo key={index}>{line.content}</Logo>;
        }
        if (line.type === 'br') {
          return <br key={index} />;
        }
        if (line.type === 'link') {
          return (
            <div key={index}>
              {line.label} 
              <Link href={line.url} target="_blank" rel="noopener noreferrer">
                {line.text}
              </Link>
            </div>
          );
        }
        return <div key={index}>{line.content}</div>;
      })}

      {isDone && (
        <div style={{ marginTop: '10px' }}>
          root@psyos.terminal: ~ # <Cursor />
        </div>
      )}
      
      <div ref={endRef} />
    </TerminalWrapper>
  );
};

export default About;