import { 
  TerminalIcon, FolderIcon, NotepadIcon, PaintIcon, UserIcon, ContactIcon, TrashIcon 
} from '../components/Icons';

export const APPS = [
  // --- COLUMN 1 (Left Side) ---
  { 
    id: 'about', 
    title: 'About', 
    iconFile: 'bio.ico', 
    iconComponent: UserIcon, 
    type: 'app', 
    showInMenu: false,
    grid: { col: 1, row: 1 } // Top Left
  },
  { 
    id: 'projects', 
    title: 'Projects', 
    iconFile: 'folder.ico', 
    iconComponent: FolderIcon, 
    type: 'folder', 
    showInMenu: true,
    grid: { col: 1, row: 2 } 
  },
  { 
    id: 'contact', 
    title: 'Contact', 
    iconFile: 'mail.ico', 
    iconComponent: ContactIcon, 
    type: 'app', 
    showInMenu: true,
    grid: { col: 2, row: 1 } 
  },
  { 
    id: 'steam', 
    title: 'Steam', 
    iconFile: 'steam.png', 
    iconComponent: TerminalIcon, 
    type: 'link', 
    url: 'https://steamcommunity.com/id/psykiiib_/', 
    showInMenu: false,
    grid: { col: 2, row: 2 } 
  },
  { 
    id: 'terminal', 
    title: 'Terminal', 
    iconFile: 'terminal.ico', 
    iconComponent: TerminalIcon,     
    type: 'app', 
    showInMenu: false,
    grid: { col: 1, row: 3 } 
  },
  { 
    id: 'linkedin', 
    title: 'LinkedIn', 
    iconFile: 'linkedin.png', 
    iconComponent: ContactIcon, 
    type: 'link', 
    url: 'https://www.linkedin.com/in/khandaker-shahariar', 
    showInMenu: false,
    grid: { col: 2, row: 3 } 
  },
  { 
    id: 'notepad', 
    title: 'Notepad', 
    iconFile: 'txt.ico', 
    iconComponent: NotepadIcon, 
    type: 'app', 
    showInMenu: true,
    grid: { col: 1, row: 4 } 
  },
  { 
    id: 'discord', 
    title: 'Discord', 
    iconFile: 'discord.png', 
    iconComponent: TerminalIcon, 
    type: 'link', 
    url: 'https://discord.com/users/558609544729722880', 
    showInMenu: false,
    grid: { col: 2, row: 4 } 
  },
  
  { 
    id: 'minesweeper', 
    title: 'Minesweeper', 
    iconFile: 'minesweeper.ico', 
    iconComponent: TerminalIcon, 
    type: 'app', 
    showInMenu: false,
    grid: { col: 1, row: 7 } 
  },
  { 
    id: 'chess', 
    title: 'Chess', 
    iconFile: 'chess.png', 
    iconComponent: TerminalIcon, 
    type: 'app', 
    showInMenu: false,
    grid: { col: 1, row: 6 } 
  },
  { 
    id: 'paint', 
    title: 'Paint', 
    iconFile: 'paint.ico', 
    iconComponent: PaintIcon, 
    type: 'app', 
    showInMenu: true,
    grid: { col: 1, row: 5 } 
  },
  { 
    id: 'ai', 
    title: 'Albedo', 
    iconFile: 'albedo.png', 
    iconComponent: TerminalIcon, 
    type: 'app', 
    showInMenu: false,
    grid: { col: 2, row: 5 } 
  },
  { 
    id: 'recycle', 
    title: 'Trash', 
    iconFile: 'trash.ico', 
    iconComponent: TrashIcon, 
    type: 'folder', 
    showInMenu: false,
    grid: { col: 1, row: 9 } // Bottom Left (with gap above)
  },

  // --- COLUMN 2 (Right Side) ---
 
  
  
  
  
];