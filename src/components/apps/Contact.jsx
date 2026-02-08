import React from 'react';
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
  font-size: 22px; 
`;

// Decorative Menu Bar to match the reference image
const MenuBar = styled.div`
  display: flex;
  background: #444;
  border-bottom: 1px solid #666;
  padding: 4px 10px;
  gap: 15px;
  font-size: 18px; 
  color: #ccc;
  align-items: center;
  user-select: none;
`;

const MenuOption = styled.span`
  cursor: default;
  &:hover { color: #fff; }
`;

const Content = styled.div`
  flex: 1;
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 25px;
  overflow-y: auto;
`;

const TextBlock = styled.div`
  line-height: 1.4;
`;

const LinkText = styled.span`
  color: #55ffff; /* Cyan color for retro links */
  text-decoration: underline;
  cursor: pointer;
  
  &:hover {
    color: #fff;
    background: #000080;
  }
`;

const SocialRow = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 10px;
  align-items: center;
`;

const SocialIcon = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  border-radius: 10px;
  background: #222;
  border: 2px solid #555;
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
    border-color: #fff;
    background: #444;
    box-shadow: 4px 4px 0px rgba(0,0,0,0.5);
  }

  img {
    width: 40px;
    height: 40px;
    object-fit: contain;
  }
`;

const Contact = () => {
  return (
    <Wrapper>
      {/* Decorative Menu Bar */}
      <MenuBar>
        <MenuOption>File</MenuOption>
        <MenuOption>Edit</MenuOption>
        <MenuOption>Help</MenuOption>
      </MenuBar>

      <Content>
        <TextBlock>
            If you want to get in contact with me message me on discord at <LinkText onClick={() => window.open('https://discord.com/users/558609544729722880')}>psy</LinkText> or on my <LinkText onClick={() => window.open('https://instagram.com/psykiiib_')}>Instagram</LinkText>.
        </TextBlock>

        <TextBlock>
          If you want contact specifically for commission contact me through my discord.
        </TextBlock>

        <SocialRow>
          {/* GitHub */}
          <SocialIcon href="https://github.com/psykiiib" target="_blank" title="GitHub">
            <img 
                src="/icons/github.ico" 
                alt="GitHub"
                onError={(e) => e.target.src="https://img.icons8.com/ios-filled/50/ffffff/github.png"} 
            />
          </SocialIcon>

          {/* Discord */}
          <SocialIcon href="https://discord.com/users/558609544729722880" target="_blank" title="Discord">
            <img 
                src="/icons/discord.ico" 
                alt="Discord"
                onError={(e) => e.target.src="https://img.icons8.com/ios-filled/50/ffffff/discord-logo.png"} 
            />
          </SocialIcon>

          {/* Instagram */}
          <SocialIcon href="https://instagram.com/psykiiib_" target="_blank" title="Instagram">
            <img 
                src="/icons/instagram.ico" 
                alt="Instagram"
                onError={(e) => e.target.src="https://img.icons8.com/ios-filled/50/ffffff/instagram-new.png"} 
            />
          </SocialIcon>
        </SocialRow>

      </Content>
    </Wrapper>
  );
};

export default Contact;