import React from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './styles/GlobalStyles';
import Desktop from './components/Desktop';

// 1. CHANGE THIS IMPORT
import psyTheme from './styles/PsyTheme'; 
// (Remove 'import original from ...')

function App() {
  return (
    // 2. PASS THE CUSTOM THEME HERE
    <ThemeProvider theme={psyTheme}>
      <GlobalStyles />
      <div className="crt-overlay" />
      <Desktop />
    </ThemeProvider>
  );
}

export default App;