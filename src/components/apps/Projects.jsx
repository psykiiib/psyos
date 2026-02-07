import React from 'react';
import { FolderIcon } from '../Icons';

const Projects = () => (
  <div style={{ background: '#000', height: '100%', color: '#0f0', display: 'flex', flexWrap: 'wrap', gap: '20px', padding: '10px', alignContent: 'flex-start' }}>
    {['ESP32_Driver', 'PsyOS_Source', 'Godot_Game', 'Java_Sim'].map(name => (
      <div key={name} style={{ textAlign: 'center', width: '80px', cursor: 'pointer' }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <FolderIcon style={{ width: '40px', height: '40px' }} />
        </div>
        <div style={{ fontSize: '12px', marginTop: '5px' }}>{name}</div>
      </div>
    ))}
  </div>
);

export default Projects;