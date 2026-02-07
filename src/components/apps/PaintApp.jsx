import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100%;
  background: #c0c0c0;
  display: flex;
  flex-direction: column;
`;

// An iframe acts like a "browser within a browser"
const StyledIframe = styled.iframe`
  flex: 1;
  border: none;
  width: 100%;
  height: 100%;
  display: block;
  background: #c0c0c0;
`;

const PaintApp = () => {
  return (
    <Container>
      {/* We are embedding 'jspaint', a pixel-perfect web clone of MS Paint.
        This provides all features (saving, opening, tools) without needing an .exe 
      */}
      <StyledIframe 
        src="https://jspaint.app?no-welcome=true" 
        title="MS Paint"
      />
    </Container>
  );
};

export default PaintApp;