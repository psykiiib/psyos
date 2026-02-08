import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from 'react95';

// --- STYLES ---

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #333; 
  color: #fff;
  font-family: 'Fixedsys', 'Fixedsys Excelsior', 'VT323', monospace;
  font-size: 16px; /* [UPDATED] Reduced from 20px */
`;

const MenuBar = styled.div`
  display: flex;
  background: #444;
  border-bottom: 1px solid #666;
  padding: 4px 10px;
  gap: 20px;
  font-size: 16px; /* [UPDATED] Reduced from 18px */
  color: #ccc;
  align-items: center;
  user-select: none;
`;

const MenuOption = styled.span`
  cursor: pointer;
  &:hover { color: #fff; text-decoration: underline; }
  font-weight: bold;
`;

const ContentArea = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

// --- PROFILE STYLES ---

const HeaderRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 20px;
`;

const ProfileImage = styled.img`
  width: 100px; /* [UPDATED] Slightly smaller image */
  height: 100px;
  object-fit: cover;
  border: 2px solid #666;
  background: #000;
`;

const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  h1 {
    margin: 0;
    font-size: 24px; /* [UPDATED] Reduced from 32px */
    font-weight: bold;
    color: #fff;
    line-height: 1;
  }
  
  span {
    color: #aaa;
    font-size: 16px; /* [UPDATED] Reduced from 20px */
  }
`;

const FieldSet = styled.fieldset`
  border: 1px dashed #666;
  padding: 15px;
  margin: 0;
  
  legend {
    color: #aaa;
    padding: 0 10px;
    font-size: 14px; /* [UPDATED] Reduced from 18px */
  }

  p {
    margin: 8px 0;
    line-height: 1.4;
    color: #ddd;
    font-size: 16px; /* [UPDATED] Reduced from 20px */
  }
`;

const Footer = styled.p`
  margin-top: auto;
  color: #888;
  font-size: 14px; /* [UPDATED] Reduced from 16px */
  font-style: italic;
`;

// --- EDITOR STYLES ---

const StyledTextArea = styled.textarea`
  width: 100%;
  height: 100%;
  background: transparent;
  color: #fff;
  border: none;
  outline: none;
  resize: none;
  
  font-family: 'Fixedsys', 'Fixedsys Excelsior', 'VT323', monospace;
  font-size: 18px; /* [UPDATED] Reduced from 22px */
  line-height: 1.2;

  &::placeholder {
    color: #666;
  }
`;

const Notepad = () => {
  const [view, setView] = useState('profile'); 
  const [noteContent, setNoteContent] = useState('');

  const handleNewNote = () => {
    setNoteContent(''); 
    setView('editor');  
  };

  return (
    <Wrapper>
      <MenuBar>
        <MenuOption onClick={() => setView('profile')}>Profile</MenuOption>
        <MenuOption onClick={handleNewNote}>New Note</MenuOption>
        <MenuOption onClick={() => window.open('https://github.com/psykiiib', '_blank')}>GitHub</MenuOption>
      </MenuBar>

      <ContentArea>
        {view === 'profile' ? (
          <>
            <HeaderRow>
              <ProfileImage src="/me.jpg" alt="Profile" /> 
              <TitleSection>
                <h1>hi. I'm Shahariar</h1>
                <span>Developer(?)</span>
              </TitleSection>
            </HeaderRow>

            <FieldSet>
              <legend>Developer note</legend>
              <p>
                this is an old windows aesthetic webpage I made to display some
                info about me. i also added some random games.
              </p>
              <p>
                I may change/update them randomly. I am currently working on my projects list, so 
                check it out when its done and I am planning to crate a notes section so that you can leave a message or any suggestion!
              </p>
            </FieldSet>

            <Footer>
              if you're seeing this, thanks for checking my page out :)
            </Footer>
          </>
        ) : (
          <StyledTextArea 
            autoFocus
            placeholder="Start typing your new note..."
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
          />
        )}
      </ContentArea>
    </Wrapper>
  );
};

export default Notepad;