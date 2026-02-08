import Terminal from './Terminal';
import PaintApp from './apps/PaintApp'; // Using the iframe version
import Notepad from './apps/Notepad';
import Projects from './apps/Projects';
import About from './apps/About';
import Contact from './apps/Contact';
import RecycleBin from './apps/RecycleBin';
import UnderConstruction from './apps/UnderConstruction';

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
  contact: Contact,
  projects: UnderConstruction,
  
  // --- Register New Games ---
  minesweeper: Minesweeper,
  chess: Chess,
  ai: AiChat,
};