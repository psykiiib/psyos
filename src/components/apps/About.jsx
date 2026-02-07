import React from 'react';

const About = () => (
  <div style={{ background: '#000', color: '#0f0', height: '100%', fontFamily: 'monospace', padding: '10px', overflow: 'auto' }}>
    <p>root@psyos:~# cat /etc/socials</p>
    <br/>
    <p>GITHUB:   <a href="https://github.com" target="_blank" rel="noopener noreferrer" style={{color: '#fff', textDecoration: 'underline'}}>github.com/psky</a></p>
    <p>LINKEDIN: <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={{color: '#fff', textDecoration: 'underline'}}>linkedin.com/in/khandaker</a></p>
    <p>EMAIL:    <a href="mailto:me@psky.dev" style={{color: '#fff', textDecoration: 'underline'}}>me@psky.dev</a></p>
    <br/>
    <p>root@psyos:~# _</p>
  </div>
);

export default About;