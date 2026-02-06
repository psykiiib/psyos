import React, { useState } from 'react';
import styled from 'styled-components';
import { AppBar, Toolbar, Button, List, ListItem, Divider } from 'react95';
import BootSequence from './BootSequence';
import WindowManager from './WindowManager';

const Wrapper = styled.div`
  background: #000;
  height: 100vh;
  width: 100vw;
  position: relative;
  overflow: hidden;
  /* Grid pattern for cyber-vibe */
  background-image: 
    linear-gradient(rgba(0, 255, 0, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 255, 0, 0.1) 1px, transparent 1px);
  background-size: 20px 20px;
`;

const Desktop = () => {
  // 1. Default to FALSE so boot sequence runs
  const [booted, setBooted] = useState(false); 
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  
  // 2. Ensure 'terminal' is TRUE by default so you see something
  const [openWindows, setOpenWindows] = useState({
    terminal: true, 
    projects: false,
    about: false,
  });

  const toggleWindow = (key) => {
    setOpenWindows(prev => ({ ...prev, [key]: !prev[key] }));
    setStartMenuOpen(false);
  };

  // 3. Boot Logic
  if (!booted) {
    return <BootSequence onComplete={() => setBooted(true)} />;
  }

  return (
    <Wrapper>
      {/* 4. Pass state and toggle function strictly */}
      <WindowManager openWindows={openWindows} closeWindow={toggleWindow} />
      
      {/* Taskbar */}
      <AppBar style={{ top: 'auto', bottom: 0, background: '#111', borderTop: '2px solid #333', zIndex: 9999 }}>
        <Toolbar>
          <div style={{ position: 'relative', display: 'inline-block' }}>
            {startMenuOpen && (
              <List style={{ position: 'absolute', bottom: '100%', left: 0, background: '#111', border: '1px solid #333' }}>
                <ListItem onClick={() => toggleWindow('projects')}>📂 Projects</ListItem>
                <ListItem onClick={() => toggleWindow('terminal')}>💻 Terminal</ListItem>
                <Divider />
                <ListItem disabled>🛑 Shut Down</ListItem>
              </List>
            )}
            <Button onClick={() => setStartMenuOpen(!startMenuOpen)} active={startMenuOpen} style={{ fontWeight: 'bold', color: '#0f0', background: '#333' }}>
              Start
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    </Wrapper>
  );
};

export default Desktop;