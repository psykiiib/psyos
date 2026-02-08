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

// [UPDATED] Use Fixedsys Stack
const Container = styled.div`
  background-color: #000;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  padding: 40px;
  box-sizing: border-box;
  
  /* Font Stack: Fixedsys -> VT323 -> Monospace */
  font-family: 'Fixedsys', 'Fixedsys Excelsior', 'VT323', monospace; 
  
  font-size: 20px; /* Adjusted for Fixedsys readability */
  color: #bfbfbf;
  overflow: hidden;
  user-select: none;
  line-height: 1.2; 
`;

const LoadingWrapper = styled.div`
  background-color: #000;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9999;
`;

const FadeContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: ${props => props.fading ? 0 : 1};
  transition: opacity 500ms ease-out;
`;

const LoadingText = styled.div`
  font-size: 20px;
  margin-bottom: 15px;
  color: #bfbfbf;
`;

const RetroProgressBar = styled.div`
  font-family: 'Fixedsys', 'Fixedsys Excelsior', 'VT323', monospace; 
  font-size: 20px;
  color: #bfbfbf;
  white-space: pre; 
`;

const Cursor = styled.span`
  display: inline-block;
  width: 10px;
  height: 18px; /* Adjusted height for Fixedsys */
  background-color: #bfbfbf;
  animation: ${blink} 1s step-end infinite;
  vertical-align: middle;
  margin-left: 5px;
`;

const Header = styled.div`
  margin-bottom: 20px;
  color: #bfbfbf;
`;

const LogContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px; 
  margin-bottom: 20px;
  color: #fff;
  min-height: 200px; 
`;

const MenuContainer = styled.div`
  opacity: ${props => props.visible ? 1 : 0};
  transition: opacity 0.5s ease-in;
`;

const Instructions = styled.div`
  margin-bottom: 15px;
  font-size: 18px;
  color: #bfbfbf;
`;

const SectionTitle = styled.div`
  color: #fff;
  margin-bottom: 5px;
  text-transform: uppercase;
`;

const MenuList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0px; 
  margin-bottom: 20px;
`;

const Option = styled.div`
  padding: 2px 5px; 
  width: fit-content;
  min-width: 250px;
  cursor: pointer;
  
  background-color: ${props => props.active ? '#fff' : 'transparent'};
  color: ${props => props.active ? '#000' : '#bfbfbf'};
  opacity: ${props => (props.disabled ? 0.5 : 1)}; 
  
  &:hover {
    background-color: ${props => props.disabled ? 'transparent' : '#fff'};
    color: ${props => props.disabled ? '#bfbfbf' : '#000'};
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  }
`;

const FooterLogo = styled.pre`
  margin-top: auto;
  /* Fixedsys is not monospace in the strict grid sense sometimes, so we stick to Courier for the ASCII art to prevent breaking */
  font-family: 'Courier New', monospace; 
  font-size: 16px; 
  line-height: 14px; 
  font-weight: bold;
  white-space: pre;  
  background: linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${rainbow} 2s linear infinite; 
`;

const BootSequence = ({ onComplete }) => {
  const [step, setStep] = useState('bios'); 
  const [selected, setSelected] = useState(0);
  const [logLines, setLogLines] = useState([]);
  const [menuVisible, setMenuVisible] = useState(false);
  const [dots, setDots] = useState("");
  
  const [isFading, setIsFading] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const hasStarted = useRef(false);

  // Set Black BG
  useEffect(() => {
    document.body.style.backgroundColor = '#000';
    return () => {
      document.body.style.backgroundColor = ''; 
    };
  }, []);

  const menuOptions = [
    { label: "Start PsyOS Normally", action: 'boot' },
    { label: "Safe Mode", action: 'none' },
    { label: "Safe Mode with Networking", action: 'none' },
    { label: "Last Known Good Configuration", action: 'none' }
  ];

  const otherOptions = ["BIOS Setup", "Device Configuration", "Boot Menu"];

  // Dots
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length < 3 ? prev + "." : "");
    }, 200); 
    return () => clearInterval(interval);
  }, []);

  // 1. BIOS
  useEffect(() => {
    if (step !== 'bios') return;
    if (hasStarted.current) return;
    hasStarted.current = true;

    const runSequence = async () => {
      const wait = (ms) => new Promise(res => setTimeout(res, ms));

      await wait(200); 
      setLogLines(prev => [...prev, "ATAPI CD-ROM: PsyOS Virtual IDE CDROM Drive"]);

      await wait(300);
      setLogLines(prev => [...prev, "Initializing"]); 
      
      await wait(800); 
      setLogLines(prev => [...prev, "User: k_shahariar"]);
      await wait(100); 
      setLogLines(prev => [...prev, "System: PsyOS v2.0"]);
      await wait(100);
      setLogLines(prev => [...prev, "Memory: 64512K OK"]);
      await wait(300); 

      setMenuVisible(true);
      setStep('menu');
    };

    runSequence();
  }, [step]);

  // 2. LOADING
  useEffect(() => {
    if (step === 'loading') {
      const progressInterval = setInterval(() => {
        setProgress(old => {
          if (old >= 100) {
            clearInterval(progressInterval);
            return 100;
          }
          return old + 4; 
        });
      }, 100);

      const fadeTimer = setTimeout(() => {
        setIsFading(true);
      }, 2500);

      const finishTimer = setTimeout(() => {
        onComplete();
      }, 3000); 

      return () => {
        clearInterval(progressInterval);
        clearTimeout(fadeTimer);
        clearTimeout(finishTimer);
      };
    }
  }, [step]); 

  // Keyboard
  useEffect(() => {
    if (step !== 'menu') return;

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowUp') {
        setSelected(prev => (prev > 0 ? prev - 1 : menuOptions.length - 1));
      } else if (e.key === 'ArrowDown') {
        setSelected(prev => (prev < menuOptions.length - 1 ? prev + 1 : 0));
      } else if (e.key === 'Enter') {
        if (menuOptions[selected].action === 'boot') {
          setStep('loading');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [menuOptions, step, selected]);

  const handleOptionClick = (index) => {
    if (step !== 'menu') return;
    setSelected(index);
    if (menuOptions[index].action === 'boot') {
      setStep('loading');
    }
  };

  const renderProgressBar = () => {
    const totalBars = 20;
    const filledBars = Math.floor((progress / 100) * totalBars);
    const emptyBars = totalBars - filledBars;
    return `[${'#'.repeat(filledBars)}${'.'.repeat(emptyBars)}]`;
  };

  if (step === 'loading') {
    return (
      <LoadingWrapper>
        <FadeContent fading={isFading ? 1 : 0}>
          <LoadingText>Loading System Files...</LoadingText>
          <RetroProgressBar>
            {renderProgressBar()} {progress}% <Cursor />
          </RetroProgressBar>
        </FadeContent>
      </LoadingWrapper>
    );
  }

  return (
    <Container>
      <Header>
        PhoenixBIOS 4.0 Release 6.1<br/>
        Copyright 1985-2026 Phoenix Technologies Ltd.<br/>
        All Rights Reserved<br/>
      </Header>

      <LogContainer>
        {logLines.map((line, i) => (
          <div key={i}>
            {line}
            {line === "Initializing" && <span>{dots}</span>}
          </div>
        ))}
      </LogContainer>

      <MenuContainer visible={menuVisible}>
        <Instructions>
          Use the ↑(Up) and ↓(Down) key to move the pointer.<br/>
          Press [Enter] to select.
        </Instructions>

        <SectionTitle>BOOT OPTIONS:</SectionTitle>
        <MenuList>
          {menuOptions.map((opt, index) => (
            <Option 
              key={index} 
              active={selected === index}
              disabled={opt.action !== 'boot'} 
              onClick={() => handleOptionClick(index)}
            >
              {opt.label}
            </Option>
          ))}
        </MenuList>

        <SectionTitle>OTHER OPTIONS:</SectionTitle>
        <MenuList>
          {otherOptions.map((opt, index) => (
            <Option key={index} active={false} style={{ color: '#666' }}>
              {opt}
            </Option>
          ))}
        </MenuList>

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
      </MenuContainer>

    </Container>
  );
};

export default BootSequence;