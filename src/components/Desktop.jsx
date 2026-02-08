import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { AppBar, Toolbar, Button, List, ListItem, Divider } from 'react95';
import Draggable from 'react-draggable';
import BootSequence from './BootSequence';
import WindowManager from './WindowManager';
import { APPS } from '../utils/apps'; 

// --- STYLES ---

// Rainbow Animation for Logo (Same as BootSequence)
const rainbow = keyframes`
  0% { filter: hue-rotate(0deg); }
  100% { filter: hue-rotate(360deg); }
`;

const Wrapper = styled.div`
  background-color: #008080; 
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const ShutdownWrapper = styled.div`
  background-color: #000;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  padding: 40px;
  box-sizing: border-box;
  z-index: 99999;
  
  font-family: 'Fixedsys', 'Fixedsys Excelsior', 'VT323', monospace; 
  font-size: 26px; 
  color: #bfbfbf;
  line-height: 1.2;
`;

const FooterLogo = styled.pre`
  margin-top: auto;
  font-family: 'Courier New', monospace; 
  font-size: 20px; 
  line-height: 16px; 
  font-weight: bold;
  white-space: pre;  
  background: linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${rainbow} 2s linear infinite; 
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
  width: 70px; 
  padding: 2px;
  cursor: pointer;
  text-align: center;
  color: white; 
  position: absolute; 
  
  &:hover {
    background: rgba(0, 0, 128, 0.5); 
    border: 1px dotted #fff;
    border-radius: 2px;
  }

  img {
    width: 40px;
    height: 40px;
    margin-bottom: 0px; 
    object-fit: contain;
    pointer-events: none; 
    user-select: none;
    -webkit-user-drag: none;
    image-rendering: pixelated;
  }
  
  div {
    font-family: 'Fixedsys', 'Fixedsys Excelsior', 'VT323', monospace;
    font-size: 14px; 
    line-height: 0.9; 
    text-shadow: 1px 1px 1px #000;
    padding: 0px;
    word-break: break-word; 
    margin-top: 2px;
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

// --- SHUTDOWN COMPONENT ---
const ShutdownSequence = ({ onComplete }) => {
  const [lines, setLines] = useState([]);

  useEffect(() => {
    const runShutdown = async () => {
      const wait = (ms) => new Promise(res => setTimeout(res, ms));
      
      setLines(["Initiating Shutdown Sequence..."]);
      await wait(800);
      setLines(prev => [...prev, "Stopping Services... [OK]"]);
      await wait(600);
      setLines(prev => [...prev, "Saving User Configuration... [OK]"]);
      await wait(500);
      setLines(prev => [...prev, "Unmounting Volumes..."]);
      await wait(1000);
      setLines(prev => [...prev, "Parking Heads..."]);
      await wait(800);
      setLines(prev => [...prev, "Power Down."]);
      await wait(1500); 
      
      onComplete(); 
    };

    runShutdown();
  }, [onComplete]);

  return (
    <ShutdownWrapper>
      <div style={{ marginBottom: '20px' }}>
        PhoenixBIOS 4.0 Release 6.1<br/>
        Copyright 1985-2026 Phoenix Technologies Ltd.<br/>
        All Rights Reserved
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
        {lines.map((line, i) => (
           <div key={i}>{line}</div>
        ))}
      </div>

      <FooterLogo>
{`
██████╗ ███████╗██╗   ██╗ ██████╗ ███████╗
██╔══██╗██╔════╝╚██╗ ██╔╝██╔═══██╗██╔════╝
██████╔╝███████╗ ╚████╔╝ ██║   ██║███████╗
██╔═══╝ ╚════██║  ╚██╔╝  ██║   ██║╚════██║
██║     ███████║   ██║   ╚██████╔╝███████║
╚═╝     ╚══════╝   ╚═╝    ╚═════╝ ╚══════╝
`}
      </FooterLogo>
    </ShutdownWrapper>
  );
};

const Desktop = () => {
  const [booted, setBooted] = useState(false);
  const [isShuttingDown, setIsShuttingDown] = useState(false); 
  const [menuOpen, setMenuOpen] = useState(false);
  const [showPrograms, setShowPrograms] = useState(false); 
  const [currentTime, setCurrentTime] = useState(new Date());
  
  const iconRefs = useRef({});
  const [iconPositions, setIconPositions] = useState({});

  const [openWindows, setOpenWindows] = useState({ notepad: true });      
  const [minimizedWindows, setMinimizedWindows] = useState({}); 

  const [activeWindowOrder, setActiveWindowOrder] = useState(['notepad']); 

  useEffect(() => {
    const initialPos = {};
    APPS.forEach((app) => {
      const col = app.grid ? app.grid.col : 1; 
      const row = app.grid ? app.grid.row : 1;
      initialPos[app.id] = {
        x: 10 + ((col - 1) * 70), 
        y: 10 + ((row - 1) * 70)
      };
    });
    setIconPositions(initialPos);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const titles = [
      "PsyOS", "psyk.dev", "dev??", "psyO$", "psy0s",
      "qsyOS", "psy", "psykiiib", "psyOS", "?shy",
      "psy+os", "psyk-", "kib?", "psyOS", "Sh4har!ar", 
      "Sha..", "mai?", "psSsSsSs", "psyOS", "psyOS.exe",
      "spyOS", "psy4O4!", "++SOS",
    ];
    let index = 0;
    const intervalId = setInterval(() => {
      document.title = titles[index];
      index = (index + 1) % titles.length; 
    }, 1000); 
    return () => clearInterval(intervalId);
  }, []);

  const handleShutdown = () => {
    setMenuOpen(false);
    setIsShuttingDown(true); 
  };

  const handleReboot = () => {
    setBooted(false);      
    setIsShuttingDown(false); 
    setOpenWindows({ notepad: true });
    setActiveWindowOrder(['notepad']);
  };

  const bringToFront = (key) => {
    setActiveWindowOrder(prev => {
        const newOrder = prev.filter(id => id !== key);
        return [...newOrder, key];
    });
  };

  const openApp = (key) => {
    const app = APPS.find(a => a.id === key);
    if (app && app.type === 'link') {
      window.open(app.url, '_blank');
      setMenuOpen(false);
      return;
    }
    
    setOpenWindows(prev => ({ ...prev, [key]: true }));
    setMinimizedWindows(prev => ({ ...prev, [key]: false }));
    setMenuOpen(false);
    
    bringToFront(key);
  };

  const closeApp = (key) => {
    setOpenWindows(prev => ({ ...prev, [key]: false }));
    setMinimizedWindows(prev => ({ ...prev, [key]: false }));
    setActiveWindowOrder(prev => prev.filter(id => id !== key));
  };

  const minimizeApp = (key) => {
    setMinimizedWindows(prev => ({ ...prev, [key]: true }));
  };

  const toggleMinimize = (key) => {
    if (minimizedWindows[key]) {
      setMinimizedWindows(prev => ({ ...prev, [key]: false }));
      bringToFront(key);
    } else {
      setMinimizedWindows(prev => ({ ...prev, [key]: true }));
    }
  };

  const handleDragStop = (id, e, data) => {
    setIconPositions(prev => ({
      ...prev,
      [id]: { x: data.x, y: data.y }
    }));
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();
    return false;
  };

  if (isShuttingDown) {
    return <ShutdownSequence onComplete={handleReboot} />;
  }

  if (!booted) {
      return <BootSequence onComplete={() => setBooted(true)} />;
  }

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
                onContextMenu={handleContextMenu}
              >
                 <img 
                   src={`/icons/${app.iconFile}`} 
                   alt="?"
                   draggable="false" 
                   onError={(e) => {
                     e.target.src = "https://win98icons.alexmeub.com/icons/png/file_lines-0.png"; 
                   }}
                 />
                <div>{app.title}</div>
              </IconWrapper>
            </Draggable>
          );
        })}
      </DesktopArea>

      {/* [UPDATED] Pass functions to WindowManager */}
      <WindowManager 
        openWindows={openWindows} 
        minimizedWindows={minimizedWindows}
        closeWindow={closeApp} 
        minimizeWindow={minimizeApp}
        
        activeWindowOrder={activeWindowOrder}
        bringToFront={bringToFront}
        
        // Pass these so Terminal can use them
        openApp={openApp}
        onShutdown={handleShutdown}
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
                  
                  <MenuItem onClick={handleShutdown}>
                      <img src="/icons/shutdown.ico" alt="" onError={(e) => e.target.style.display='none'}/>
                      Shut Down...
                  </MenuItem>
                </MenuList>
              </StartMenuWrapper>
            )}
          </div>
          
          <div style={{ marginLeft: '5px', display: 'flex', gap: '2px', flex: 1, overflowX: 'auto' }}>
             {Object.keys(openWindows).map(key => openWindows[key] && (
               <Button 
                 key={key} 
                 active={!minimizedWindows[key] && activeWindowOrder[activeWindowOrder.length - 1] === key} 
                 variant={activeWindowOrder[activeWindowOrder.length - 1] === key ? "default" : "flat"} 
                 size="sm" 
                 onClick={() => toggleMinimize(key)} 
                 style={{ 
                   fontWeight: 'bold', 
                   minWidth: '100px', 
                   textAlign: 'left', 
                   justifyContent: 'flex-start', 
                   display: 'flex', 
                   alignItems: 'center', 
                   gap: '5px',
                   border: activeWindowOrder[activeWindowOrder.length - 1] === key ? '2px inset #fff' : '2px outset #fff',
                   background: activeWindowOrder[activeWindowOrder.length - 1] === key ? '#e0e0e0' : '#c0c0c0'
                 }}
               >
                 <img 
                   src={`/icons/${APPS.find(a => a.id === key)?.iconFile || 'notepad.ico'}`} 
                   alt="" 
                   style={{height: '16px'}}
                   onError={(e) => e.target.style.display='none'}
                 />
                 {APPS.find(a => a.id === key)?.title || 'Notepad'}
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