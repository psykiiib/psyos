import React, { useState } from 'react';
import { Button } from 'react95';
import { FolderIcon, NotepadIcon } from '../Icons';

// --- 🛠️ EDIT YOUR FILES HERE ---
const HOMEWORK_FILES = [
  "77987",
"193759",  
"165962",  
"292889",     
"131295",  
"287158",  
"101597",  
"124625",  
"290245",  
"241651",     
"184186",  
"292932",     
"284286",  
"76161",   
"290913",  
"195747",  
"172138",  
"258965"
];

const RecycleBin = () => {
  const [path, setPath] = useState('/'); // '/' or '/homework'

  // Root View (The Trash Folder)
  if (path === '/') {
    return (
      <div style={{ background: '#000', height: '100%', color: '#0f0', padding: '20px' }}>
        <div 
          onClick={() => setPath('/homework')}
          style={{ cursor: 'pointer', width: '80px', textAlign: 'center' }}
        >
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <FolderIcon style={{ width: '50px', height: '50px', color: '#ff4444' }} />
          </div>
          <div style={{ marginTop: '5px' }}>homework</div>
        </div>
      </div>
    );
  }

  // Inside "Homework" (List View)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#000', color: '#0f0' }}>
      {/* Navigation Bar */}
      <div style={{ padding: '5px 10px', borderBottom: '1px solid #333', display: 'flex', alignItems: 'center' }}>
        <Button size="sm" onClick={() => setPath('/')} style={{ background: '#0f0', color: '#000', fontWeight: 'bold' }}>⬅ Back</Button>
        <span style={{ marginLeft: '10px', fontFamily: 'monospace' }}>trash://homework/</span>
      </div>

      {/* File List (Vertical View) */}
      <div style={{ flex: 1, padding: '10px', overflowY: 'auto' }}>
        {HOMEWORK_FILES.map((fileName, index) => (
          <div 
            key={index} 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              padding: '4px 8px', 
              cursor: 'pointer',
              borderBottom: '1px solid #111' 
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#111'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
          >
             {/* Small Icon */}
             <div style={{ marginRight: '10px', display: 'flex', alignItems: 'center' }}>
               <NotepadIcon style={{ width: '16px', height: '16px', opacity: 0.8 }} />
             </div>
             {/* Filename */}
             <div style={{ fontSize: '1rem', fontFamily: 'monospace' }}>
               {fileName}
             </div>
          </div>
        ))}
      </div>
      
      {/* Status Bar */}
      <div style={{ padding: '2px 10px', background: '#111', fontSize: '0.8rem', borderTop: '1px solid #333' }}>
        {HOMEWORK_FILES.length} object(s)
      </div>
    </div>
  );
};

export default RecycleBin;