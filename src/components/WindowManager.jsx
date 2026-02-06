import React, { useState } from 'react';
import { Rnd } from 'react-rnd'; // The new resizing library
import { 
  Window, 
  WindowHeader, 
  WindowContent, 
  Button, 
  Table, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableHeadCell, 
  TableDataCell, 
  Cutout 
} from 'react95';
import Terminal from './Terminal';

// --- File Data ---
const PROJECT_FILES = [
  { 
    id: 'esp32', 
    name: 'boot_manager.py', 
    type: 'PYTHON', 
    date: '02/05/2026',
    content: `import machine\nimport ssd1306\nfrom time import sleep\n\n# Initializing I2C\ni2c = machine.I2C(scl=machine.Pin(22), sda=machine.Pin(21))`
  },
  { 
    id: 'godot', 
    name: 'dokidoki_web.exe', 
    type: 'GAME', 
    date: '02/04/2026', 
    src: '/godot_export/index.html'
  },
  { 
    id: 'repast', 
    name: 'JZombies.java', 
    type: 'JAVA', 
    date: '02/05/2026',
    content: `public class ZombieBuilder {\n    // Simulation Logic\n    public Context build(Context context) {\n        return context;\n    }\n}`
  }
];

// --- RESIZABLE Window Wrapper ---
const WindowFrame = ({ title, onClose, children, defaultSize = { width: 400, height: 300 }, defaultPos = { x: 50, y: 50 } }) => {
  return (
    <Rnd
      default={{
        x: defaultPos.x,
        y: defaultPos.y,
        width: defaultSize.width,
        height: defaultSize.height,
      }}
      minWidth={300}
      minHeight={200}
      bounds="parent" // Keeps window inside desktop
      dragHandleClassName="window-header" // ONLY drag from the header
      style={{ zIndex: 10 }} // Ensure windows float above desktop
    >
      <Window style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', background: '#111', border: '1px solid #333', boxShadow: '5px 5px 0px 0px rgba(0,0,0,0.5)' }}>
        
        {/* Header - The "Handle" for dragging */}
        <WindowHeader 
          className="window-header" 
          style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            background: '#000', 
            color: '#0f0', 
            borderBottom: '1px solid #333', 
            cursor: 'grab',
            flexShrink: 0 // Prevent header from shrinking
          }}
        >
          <span style={{ fontFamily: 'VT323', fontSize: '1.2rem', paddingLeft: '5px' }}>{title}</span>
          <Button 
            onClick={onClose} 
            size="sm" 
            style={{ marginTop: -3, background: '#333', color: '#fff', fontWeight: 'bold' }}
            onMouseDown={(e) => e.stopPropagation()} // Prevent dragging when clicking close
          >
            X
          </Button>
        </WindowHeader>

        {/* Content - Stretches to fill the resized window */}
        <WindowContent style={{ color: '#0f0', flex: 1, display: 'flex', flexDirection: 'column', padding: '0.5rem', overflow: 'hidden' }}>
          {children}
        </WindowContent>
      </Window>
    </Rnd>
  );
};

const WindowManager = ({ openWindows, closeWindow }) => {
  const [openFile, setOpenFile] = useState(null);

  return (
    <>
      {/* 1. Projects Window */}
      {openWindows.projects && (
        <WindowFrame 
          title="C:\User\Projects" 
          onClose={() => closeWindow('projects')} 
          defaultSize={{ width: 500, height: 350 }}
          defaultPos={{ x: 100, y: 100 }}
        >
           <p style={{marginBottom: '10px', flexShrink: 0}}>3 object(s) found</p>
           {/* Cutout set to flex: 1 so it grows with the window */}
           <Cutout style={{ background: '#000', flex: 1, overflow: 'auto' }}>
             <Table>
               <TableHead>
                 <TableRow>
                   <TableHeadCell style={{color: '#0f0'}}>Name</TableHeadCell>
                   <TableHeadCell style={{color: '#0f0'}}>Type</TableHeadCell>
                 </TableRow>
               </TableHead>
               <TableBody>
                 {PROJECT_FILES.map((file) => (
                   <TableRow key={file.id} onClick={() => setOpenFile(file)} style={{ cursor: 'pointer', '&:hover': { background: '#333' } }}>
                     <TableDataCell style={{color: '#0f0', fontWeight: 'bold'}}>📄 {file.name}</TableDataCell>
                     <TableDataCell style={{color: '#888'}}>{file.type}</TableDataCell>
                   </TableRow>
                 ))}
               </TableBody>
             </Table>
           </Cutout>
        </WindowFrame>
      )}

      {/* 2. Terminal Window */}
      {openWindows.terminal && (
        <WindowFrame 
          title="CMD.EXE" 
          onClose={() => closeWindow('terminal')} 
          defaultSize={{ width: 600, height: 400 }}
          defaultPos={{ x: 200, y: 150 }}
        >
          {/* Terminal container grows with window */}
          <div style={{ flex: 1, width: '100%', height: '100%', overflow: 'hidden' }}>
             <Terminal toggleWindow={closeWindow} />
          </div>
        </WindowFrame>
      )}

      {/* 3. File Viewer Window */}
      {openFile && (
        <WindowFrame 
          title={openFile.name} 
          onClose={() => setOpenFile(null)} 
          defaultSize={{ width: 700, height: 500 }}
          defaultPos={{ x: 150, y: 50 }}
        >
          {openFile.type === 'GAME' ? (
            <div style={{ width: '100%', height: '100%', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #333' }}>
              <span>[GAME LOADING...]</span>
            </div>
          ) : (
            <Cutout style={{ background: '#111', color: '#33ff33', padding: '1rem', flex: 1, overflow: 'auto' }}>
              <pre style={{ margin: 0, fontFamily: 'VT323, monospace', fontSize: '1.2rem' }}>
                {openFile.content}
              </pre>
            </Cutout>
          )}
        </WindowFrame>
      )}
    </>
  );
};

export default WindowManager;