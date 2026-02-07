import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { AppBar, Toolbar, Button, List, ListItem, Divider } from 'react95';
import Draggable from 'react-draggable';
import BootSequence from './BootSequence';
import WindowManager from './WindowManager';
import { APPS } from '../utils/apps'; 

// --- STYLES ---

const Wrapper = styled.div`
  /* background-image: url('/wallpaper.jpg'); */ 
  background-color: #008080; 
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const DesktopArea = styled.div`
  flex: 1;
  position: relative; 
  padding: 0;
  overflow: hidden;
  user-select: none; 
`;

const IconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 74px; 
  padding: 2px;
  cursor: pointer;
  text-align: center;
  color: white; 
  position: absolute; 
  
  /* [COMMENTED OUT AS REQUESTED]
  &:hover {
    background: rgba(0, 0, 128, 0.5); 
    border: 1px dotted #fff;
    border-radius: 2px;
  }
  */

  img {
    width: 32px;
    height: 32px;
    margin-bottom: 2px;
    object-fit: contain;
    pointer-events: none; 
  }
  
  div {
    font-size: 12px;
    line-height: 1.1;
    text-shadow: 1px 1px 1px #000;
  }
`;

const StartMenuWrapper = styled.div`
  position: absolute;
  bottom: 28px;
  left: 0;
  z-index: 10000;
  display: flex;
  background: #c0c0c0;
  border: 2px outset #fff;
  box-shadow: 2px 2px 5px rgba(0,0,0,0.5);
`;

const MenuList = styled(List)`
  min-width: 180px;
  padding: 2px;
  background: #c0c0c0;
`;

const SubMenu = styled(List)`
  position: absolute;
  left: 100%;
  top: 0;
  min-width: 200px;
  background: #c0c0c0;
  border: 2px outset #fff;
  z-index: 10001;
  margin-left: -4px;
`;

const MenuItem = styled(ListItem)`
  display: flex;
  justify-content: flex-start !important;
  align-items: center;
  gap: 10px;
  padding: 4px 8px;
  
  &:hover {
    background: #000080;
    color: #fff;
  }

  img {
    width: 20px;
    height: 20px;
  }
`;

const StyledAppBar = styled(AppBar)`
  position: relative !important;
  top: auto !important;
  bottom: 0 !important;
  z-index: 9999;
  padding: 2px;
`;

const Desktop = () => {
  const [booted, setBooted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showPrograms, setShowPrograms] = useState(false); 
  const [currentTime, setCurrentTime] = useState(new Date());
  
  const iconRefs = useRef({});
  const [iconPositions, setIconPositions] = useState({});

  // [UPDATED] Separated states for Open (in taskbar) and Minimized (hidden view)
  const [openWindows, setOpenWindows] = useState({ notepad: true });      // { id: true }
  const [minimizedWindows, setMinimizedWindows] = useState({}); // { id: true }

  // Calculate Initial Positions
  useEffect(() => {
    const initialPos = {};
    APPS.forEach((app) => {
      const col = app.grid ? app.grid.col : 1; 
      const row = app.grid ? app.grid.row : 1;
      initialPos[app.id] = {
        x: 20 + ((col - 1) * 70), 
        y: 20 + ((row - 1) * 70)
      };
    });
    setIconPositions(initialPos);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // ... inside the Desktop component ...

  useEffect(() => {
    const titles = [
      "PsyOS",
      "psyk.dev",
      "dev??", 
      "psyO$",
      "psy0s",
      "qsyOS", 
      "psy", 
      "psykiiib", 
      "psyOS", 
      "?shy",
      "psy+os", 
      "psyk-", 
      "kib?",
      "psyOS", 
      "Sh4har!ar", 
      "Sha..",
      "Sha...",
      "Sha....",
      "ma!sha?", 
      "psSsSsSs", 
      "psyOS",
      "psyOS.exe",
      "spyOS",
      "psy4O4!",
      "++SOS",
    ];
    
    let index = 0;
    
    const intervalId = setInterval(() => {
      document.title = titles[index];
      // Move to next title, loop back to 0 if at the end
      index = (index + 1) % titles.length; 
    }, 1000); // Change every 1000ms (1 second)

    // Cleanup when component unmounts
    return () => clearInterval(intervalId);
  }, []);

  // [NEW] Logic: Open App
  const openApp = (key) => {
    const app = APPS.find(a => a.id === key);
    if (app && app.type === 'link') {
      window.open(app.url, '_blank');
      setMenuOpen(false);
      return;
    }
    
    setOpenWindows(prev => ({ ...prev, [key]: true }));
    setMinimizedWindows(prev => ({ ...prev, [key]: false })); // Ensure it pops up
    setMenuOpen(false);
  };

  // [NEW] Logic: Close App (Remove from Taskbar)
  const closeApp = (key) => {
    setOpenWindows(prev => ({ ...prev, [key]: false }));
    setMinimizedWindows(prev => ({ ...prev, [key]: false }));
  };

  // [NEW] Logic: Minimize App (Hide Window, Keep in Taskbar)
  const minimizeApp = (key) => {
    setMinimizedWindows(prev => ({ ...prev, [key]: true }));
  };

  // [NEW] Logic: Toggle (Taskbar Click)
  const toggleMinimize = (key) => {
    if (minimizedWindows[key]) {
      // If hidden, show it
      setMinimizedWindows(prev => ({ ...prev, [key]: false }));
    } else {
      // If showing, hide it
      setMinimizedWindows(prev => ({ ...prev, [key]: true }));
    }
  };

  const handleDragStop = (id, e, data) => {
    setIconPositions(prev => ({
      ...prev,
      [id]: { x: data.x, y: data.y }
    }));
  };

  if (!booted) return <BootSequence onComplete={() => setBooted(true)} />;

  return (
    <Wrapper onClick={() => setMenuOpen(false)}> 
      <DesktopArea onClick={(e) => e.stopPropagation()}>
        {APPS.map((app) => {
          if (!iconRefs.current[app.id]) {
             iconRefs.current[app.id] = React.createRef();
          }

          return (
            <Draggable
              key={app.id}
              nodeRef={iconRefs.current[app.id]} 
              bounds="parent" 
              position={iconPositions[app.id] || {x: 0, y: 0}} 
              onStop={(e, data) => handleDragStop(app.id, e, data)}
            >
              <IconWrapper 
                ref={iconRefs.current[app.id]} 
                onDoubleClick={() => openApp(app.id)} 
              >
                 <img 
                   src={`/icons/${app.iconFile}`} 
                   alt="?"
                   onError={(e) => {
                     e.target.src = "https://win98icons.alexmeub.com/icons/png/file_lines-0.png"; 
                   }}
                 />
                <div style={{ fontFamily: 'Tahoma, sans-serif' }}>{app.title}</div>
              </IconWrapper>
            </Draggable>
          );
        })}
      </DesktopArea>

      {/* [UPDATED] Pass all state handlers to WindowManager */}
      <WindowManager 
        openWindows={openWindows} 
        minimizedWindows={minimizedWindows}
        closeWindow={closeApp} 
        minimizeWindow={minimizeApp}
      />

      <StyledAppBar>
        <Toolbar style={{ justifyContent: 'space-between', padding: 0, minHeight: '28px' }}>
          
          <div style={{ position: 'relative', display: 'inline-block' }} onClick={(e) => e.stopPropagation()}>
            <Button 
                onClick={() => setMenuOpen(!menuOpen)} 
                active={menuOpen}
                style={{ fontWeight: 'bold', padding: '2px 6px', display: 'flex', alignItems: 'center', gap: '5px' }}
            >
              <img 
                src="/icons/windows.ico" 
                alt="" 
                style={{ height: '18px' }}
                onError={(e) => e.target.style.display='none'}
              />
              Start
            </Button>

            {menuOpen && (
              <StartMenuWrapper>
                <MenuList>
                  <MenuItem 
                    onMouseEnter={() => setShowPrograms(true)}
                    onMouseLeave={() => setShowPrograms(false)}
                    style={{ position: 'relative' }}
                  >
                    <img src="/icons/programs.ico" alt="" onError={(e) => e.target.style.display='none'}/>
                    <span style={{flex: 1}}>Programs</span>
                    <span style={{ fontSize: '10px' }}>▶</span>

                    {showPrograms && (
                      <SubMenu>
                         {APPS.filter(app => app.showInMenu).map(app => (
                          <MenuItem key={app.id} onClick={() => openApp(app.id)}>
                            <img src={`/icons/${app.iconFile}`} alt="" onError={(e) => e.target.src="https://win98icons.alexmeub.com/icons/png/file_lines-0.png"}/>
                            {app.title}
                          </MenuItem>
                        ))}
                      </SubMenu>
                    )}
                  </MenuItem>

                  <MenuItem onClick={() => openApp('terminal')}>
                    <img src="/icons/terminal.ico" alt="" onError={(e) => e.target.style.display='none'}/>
                    Terminal
                  </MenuItem>

                  <MenuItem>
                    <img src="/icons/help.ico" alt="" onError={(e) => e.target.style.display='none'}/>
                    Help
                  </MenuItem>
                  
                  <Divider />
                  
                  <MenuItem>
                     <img src="/icons/shutdown.ico" alt="" onError={(e) => e.target.style.display='none'}/>
                     Shut Down...
                  </MenuItem>
                </MenuList>
              </StartMenuWrapper>
            )}
          </div>
          
          {/* [UPDATED] Taskbar Area */}
          <div style={{ marginLeft: '5px', display: 'flex', gap: '2px', flex: 1, overflowX: 'auto' }}>
             {Object.keys(openWindows).map(key => openWindows[key] && (
               <Button 
                 key={key} 
                 // If NOT minimized, button looks 'pressed' (active)
                 active={!minimizedWindows[key]} 
                 variant="default" 
                 size="sm" 
                 onClick={() => toggleMinimize(key)} // Clicking toggles visibility
                 style={{ 
                    fontWeight: 'bold', 
                    minWidth: '100px', 
                    textAlign: 'left', 
                    justifyContent: 'flex-start', 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '5px' 
                 }}
               >
                 <img 
                   src={`/icons/${APPS.find(a => a.id === key)?.iconFile}`} 
                   alt="" 
                   style={{height: '16px'}}
                   onError={(e) => e.target.style.display='none'}
                 />
                 {APPS.find(a => a.id === key)?.title}
               </Button>
             ))}
          </div>

          <div style={{ margin: '0 5px', padding: '0 10px', background: '#fff', color: '#000', border: '2px inset #fff', height: '22px', display: 'flex', alignItems: 'center' }}>
            {currentTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12: false})}
          </div>

        </Toolbar>
      </StyledAppBar>
    </Wrapper>
  );
};

export default Desktop;