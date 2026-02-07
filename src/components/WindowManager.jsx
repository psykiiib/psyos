import React from 'react';
import { Rnd } from 'react-rnd';
import { Window, WindowHeader, WindowContent, Button } from 'react95';
import styled from 'styled-components';
import { APPS } from '../utils/apps'; 
import { AppRegistry } from './AppRegistry';

// --- STYLES ---

const HeaderBtn = styled(Button)`
  width: 24px;
  height: 22px;
  padding: 0;
  font-weight: bold;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 2px;
`;

// [UPDATED] Added Rounded Corners to Wrapper
const WindowFrame = ({ app, onClose, onMinimize, children, isVisible, isMinimized }) => {
  let winWidth = 800; 
  let winHeight = 500;
  if (app.id === 'chess') { winWidth = 500; winHeight = 500; } 
  else if (app.id === 'paint') { winWidth = 800; winHeight = 600; }
  else if (app.id === 'minesweeper') { winWidth = 400; winHeight = 500; }

  const xPos = Math.max(0, window.innerWidth * 0.25); 
  const yPos = Math.max(0, window.innerHeight * 0.175);

  return (
    <Rnd
      default={{ x: xPos, y: yPos, width: winWidth, height: winHeight }}
      minWidth={300}
      minHeight={200}
      bounds="parent"
      dragHandleClassName="window-header"
      // [UPDATED] Hide if minimized or not visible
      style={{ 
        display: (isVisible && !isMinimized) ? 'block' : 'none', 
        zIndex: 500 
      }}
    >
      {/* [UPDATED] Added border-radius and overflow hidden */}
      <Window 
        className="window" 
        style={{ 
          width: '100%', 
          height: '100%', 
          display: 'flex', 
          flexDirection: 'column',
          borderRadius: '10px',      /* CURVED CORNERS */
          overflow: 'hidden',        /* KEEPS CONTENT INSIDE CURVES */
          boxShadow: '4px 4px 10px rgba(0,0,0,0.3)' 
        }}
      >
        
        <WindowHeader 
          className="window-header" 
          style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            height: '28px',
            padding: '0 4px',
            background: 'linear-gradient(90deg, #000080, #1084d0)', 
            color: 'white',
            // [UPDATED] Top rounded corners only
            borderTopLeftRadius: '8px',  
            borderTopRightRadius: '8px'
          }}
        >
          <span style={{ display: 'flex', alignItems: 'center', fontWeight: 'bold', fontFamily: "'MS Sans Serif', sans-serif", fontSize: '13px' }}>
             <img 
                src={`/icons/${app.iconFile}`} 
                alt="" 
                style={{ width: '16px', height: '16px', marginRight: '6px' }} 
                onError={(e) => { e.currentTarget.style.display='none'; }}
             />
            {app.title}
          </span>

          <div style={{ display: 'flex' }}>
            {/* [UPDATED] Minimize Button Action */}
            <HeaderBtn onClick={onMinimize} size="sm">
               <span style={{ transform: 'translateY(-3px)' }}>_</span>
            </HeaderBtn>

            <HeaderBtn onClick={onClose} size="sm">
               <span style={{ transform: 'translateY(-1px)' }}>X</span>
            </HeaderBtn>
          </div>

        </WindowHeader>

        <WindowContent style={{ flex: 1, overflow: 'auto', padding: 0, background: '#c0c0c0' }}>
          {children}
        </WindowContent>
      </Window>
    </Rnd>
  );
};

const WindowManager = ({ openWindows, minimizedWindows, closeWindow, minimizeWindow }) => {
  return (
    <>
      {Object.keys(AppRegistry).map((key) => {
        const isOpen = openWindows[key];
        const isMinimized = minimizedWindows[key]; // Get minimized state
        const appConfig = APPS.find(app => app.id === key);
        const AppComponent = AppRegistry[key];
        
        const isPersistent = key === 'paint' || key === 'ai';
        
        if (!isOpen && !isPersistent) return null;

        if (AppComponent && appConfig) {
          return (
            <WindowFrame 
              key={key} 
              app={appConfig} 
              isVisible={isOpen} 
              isMinimized={isMinimized} // Pass down
              onClose={() => closeWindow(key)}
              onMinimize={() => minimizeWindow(key)} // Pass down
            >
              <AppComponent toggleWindow={closeWindow} />
            </WindowFrame>
          );
        }
        return null;
      })}
    </>
  );
};

export default WindowManager;