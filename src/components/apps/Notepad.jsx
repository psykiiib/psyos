import React from 'react';
import styled from 'styled-components';
import { Button } from 'react95';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #333; /* Dark background from reference */
  color: #fff;
  font-family: 'Tahoma', sans-serif;
  font-size: 13px;
`;

const MenuBar = styled.div`
  display: flex;
  background: #444;
  border-bottom: 1px solid #666;
  padding: 2px 5px;
  gap: 15px;
  font-size: 11px;
  color: #ccc;
`;

const ContentArea = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 20px;
`;

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border: 2px solid #666;
  background: #000;
`;

const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  h1 {
    margin: 0;
    font-size: 1.4rem;
    font-weight: bold;
    color: #fff;
  }
  
  span {
    color: #aaa;
    font-size: 0.9rem;
  }
`;

const FieldSet = styled.fieldset`
  border: 1px dashed #666;
  padding: 10px;
  margin: 0;
  
  legend {
    color: #aaa;
    padding: 0 5px;
    font-size: 0.8rem;
  }

  p {
    margin: 5px 0;
    line-height: 1.4;
    color: #ddd;
  }
`;

const Footer = styled.p`
  margin-top: auto;
  color: #888;
  font-size: 0.8rem;
  font-style: italic;
`;

const Notepad = () => {
  return (
    <Wrapper>
      {/* Fake Menu Bar */}
      <MenuBar>
        <span>Home</span>
        <span>About</span>
        <span>Format</span>
      </MenuBar>

      <ContentArea>
        {/* Profile Section */}
        <HeaderRow>
          {/* Make sure to put a 'me.jpg' in your public folder! */}
          <ProfileImage src="/me.jpg" alt="Profile" /> 
          <TitleSection>
            <h1>hi. I'm Khandaker</h1>
            <span>Developer(?)</span>
            {/* <div style={{ marginTop: '5px', display: 'flex', gap: '5px' }}>
                <Button size="sm" style={{ background: '#555', color: 'white', border: 'none' }}>GitHub</Button>
                <Button size="sm" style={{ background: '#007acc', color: 'white', border: 'none' }}>LinkedIn</Button>
            </div> */}
          </TitleSection>
        </HeaderRow>

        {/* The "Developer Note" Box */}
        <FieldSet>
          <legend>Developer note</legend>
          <p>
            this is an old windows aesthetic webpage I made to display some
            info about me. i also added some random projects, music, and games.
          </p>
          <p>
            I may change/update them randomly. I just added my projects list, so 
            check it out and leave a message before you leave my page!
          </p>
        </FieldSet>

        <Footer>
          if you're seeing this, thanks for checking my page out :)
        </Footer>

      </ContentArea>
    </Wrapper>
  );
};

export default Notepad;