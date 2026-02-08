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
  font-size: 14px; 
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 4px;
`;

// [UPDATED] Props include zIndex and onFocus
const WindowFrame = ({ app, onClose, onMinimize, children, isVisible, isMinimized, zIndex, onFocus }) => {
  let winWidth = 800; 
  let winHeight = 500;
  
  if (app.id === 'chess') { winWidth = 500; winHeight = 500; } 
  else if (app.id === 'notepad') { winWidth = 550; winHeight = 500; }
  else if (app.id === 'paint') { winWidth = 800; winHeight = 600; }
  else if (app.id === 'minesweeper') { winWidth = 400; winHeight = 500; }
  else if (app.id === 'contact') { winWidth = 480; winHeight = 425; }

  const xPos = Math.max(0, window.innerWidth * 0.25); 
  const yPos = Math.max(0, window.innerHeight * 0.175);

  return (
    <Rnd
      default={{ x: xPos, y: yPos, width: winWidth, height: winHeight }}
      minWidth={300}
      minHeight={200}
      bounds="parent"
      dragHandleClassName="window-header"
      
      onDragStart={onFocus} 
      
      style={{ 
        display: (isVisible && !isMinimized) ? 'block' : 'none', 
        zIndex: zIndex 
      }}
    >
      <div onMouseDown={onFocus} style={{ width: '100%', height: '100%' }}>
          <Window 
            className="window" 
            style={{ 
              width: '100%', 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column',
              borderRadius: '10px',      
              overflow: 'hidden',        
              boxShadow: '4px 4px 10px rgba(0,0,0,0.3)' 
            }}
          >
            
            <WindowHeader 
              className="window-header" 
              style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                height: '36px', /* [UPDATED] Taller header */
                padding: '0 6px',
                background: 'linear-gradient(90deg, #000080, #1084d0)', 
                color: 'white',
                borderTopLeftRadius: '8px',  
                borderTopRightRadius: '8px'
              }}
            >
              {/* [UPDATED] Larger Title Font & Retro Family */}
              <span style={{ 
                display: 'flex', 
                alignItems: 'center', 
                fontWeight: 'bold', 
                fontFamily: "'Fixedsys', 'Fixedsys Excelsior', 'VT323', monospace", 
                fontSize: '20px', /* [UPDATED] Bigger text */
                letterSpacing: '1px'
              }}>
                 <img 
                    src={`/icons/${app.iconFile}`} 
                    alt="" 
                    style={{ width: '24px', height: '24px', marginRight: '8px' }} /* [UPDATED] Bigger Icon */
                    onError={(e) => { e.currentTarget.style.display='none'; }}
                 />
                {app.title}
              </span>

              <div style={{ display: 'flex' }}>
                <HeaderBtn onClick={(e) => { e.stopPropagation(); onMinimize(); }} size="sm">
                    <span style={{ transform: 'translateY(-4px)' }}>_</span>
                </HeaderBtn>

                <HeaderBtn onClick={(e) => { e.stopPropagation(); onClose(); }} size="sm">
                    <span style={{ transform: 'translateY(-1px)' }}>X</span>
                </HeaderBtn>
              </div>

            </WindowHeader>

            <WindowContent style={{ flex: 1, overflow: 'auto', padding: 0, background: '#c0c0c0' }}>
              {children}
            </WindowContent>
          </Window>
      </div>
    </Rnd>
  );
};

// [UPDATED] Receive openApp and onShutdown
const WindowManager = ({ openWindows, minimizedWindows, closeWindow, minimizeWindow, activeWindowOrder, bringToFront, onSaveFile, openApp, onShutdown }) => {
  return (
    <>
      {Object.keys(AppRegistry).map((key) => {
        const isOpen = openWindows[key];
        const isMinimized = minimizedWindows[key]; 
        const appConfig = APPS.find(app => app.id === key);
        const AppComponent = AppRegistry[key];
        
        const isPersistent = key === 'paint' || key === 'ai';
        
        if (!isOpen && !isPersistent) return null;

        const zIndex = 500 + activeWindowOrder.indexOf(key);

        if (AppComponent && appConfig) {
          return (
            <WindowFrame 
              key={key} 
              app={appConfig} 
              isVisible={isOpen} 
              isMinimized={isMinimized} 
              zIndex={zIndex}
              onFocus={() => bringToFront(key)}
              onClose={() => closeWindow(key)}
              onMinimize={() => minimizeWindow(key)} 
            >
              {/* [UPDATED] Pass Props conditionally based on App ID */}
              <AppComponent 
                toggleWindow={closeWindow} 
                
                // Pass onSave only to Notepad
                onSave={key === 'notepad' ? onSaveFile : undefined}

                // Pass Terminal-specific props
                openApp={key === 'terminal' ? openApp : undefined}
                onShutdown={key === 'terminal' ? onShutdown : undefined}
                onClose={key === 'terminal' ? () => closeWindow('terminal') : undefined}
              />
            </WindowFrame>
          );
        }
        return null;
      })}
    </>
  );
};

export default WindowManager;