export const processCommand = (input, setHistory, toggleWindow) => {
  const [cmd, ...args] = input.trim().split(' ');
  const command = cmd.toLowerCase();

  let response = '';

  switch (command) {
    case 'help':
      response = [
        "AVAILABLE COMMANDS:",
        "------------------",
        "help        - Show this message",
        "clear       - Clear terminal history",
        "about       - Who am I?",
        "projects    - List current projects",
        "open [app]  - Open a window (e.g., 'open projects')",
        "monika      - [SYSTEM_ERROR: DATA CORRUPTED]", 
        "reboot      - Restart the system"
      ];
      break;

    case 'clear':
      setHistory([]);
      return;

    case 'about':
      response = "I am Khandaker Shahariar. Developer. Hardware Enthusiast. I build things that live on the edge of software and reality.";
      break;
      
    case 'projects':
      response = "Projects: JZombies (Repast Simphony), ESP32 Context Header Compression, Doki-Doki Web Port.";
      break;

    case 'open':
      if (args[0] === 'projects') {
        toggleWindow('projects');
        response = "Opening Project Database...";
      } else if (args[0] === 'about') {
        toggleWindow('about');
        response = "Opening User Profile...";
      } else {
        response = `Error: Object '${args[0]}' not found in filesystem.`;
      }
      break;

    case 'monika':
      // The DDLC easter egg/glitch
      response = "Just Monika. Just Monika. Just Monika.";
      break;

    case 'reboot':
      window.location.reload();
      return;

    default:
      response = `'${command}' is not recognized as an internal or external command.`;
  }

  // If response is an array, map it to lines, otherwise just push the string
  const outputLines = Array.isArray(response) ? response : [response];
  
  setHistory(prev => [
    ...prev, 
    { type: 'input', text: `C:\\Users\\Admin> ${input}` }, 
    ...outputLines.map(line => ({ type: 'output', text: line }))
  ]);
};