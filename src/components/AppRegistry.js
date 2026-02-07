import Terminal from './Terminal';
import PaintApp from './apps/PaintApp'; // Using the iframe version
import Notepad from './apps/Notepad';
import Projects from './apps/Projects';
import About from './apps/About';
import RecycleBin from './apps/RecycleBin';

// --- Import New Games ---
import Minesweeper from './apps/Minesweeper';
import Chess from './apps/Chess';
import AiChat from './apps/AiChat';

export const AppRegistry = {
  terminal: Terminal,
  notepad: Notepad,
  paint: PaintApp,
  projects: Projects,
  about: About,
  recycle: RecycleBin,
  contact: About,
  
  // --- Register New Games ---
  minesweeper: Minesweeper,
  chess: Chess,
  ai: AiChat,
};