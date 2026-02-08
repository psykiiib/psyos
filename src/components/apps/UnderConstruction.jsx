import React from 'react';
import styled from 'styled-components';
import { Button } from 'react95';

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #000;
  text-align: center;
  padding: 20px;
  border: 4px solid #000;
  position: relative;
  overflow: hidden;
`;

// The Hazard Stripes Background
const HazardStripes = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.1; /* Subtle texture behind the text */
  background: repeating-linear-gradient(
    45deg,
    #ffe600,
    #ffe600 20px,
    #000 20px,
    #000 40px
  );
  z-index: 0;
`;

const Content = styled.div`
  z-index: 1;
  background: #c0c0c0; /* Standard Windows Gray box */
  padding: 30px;
  border: 2px solid #fff;
  box-shadow: 4px 4px 0px #000; /* sharp retro shadow */
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 80%;
`;

const Icon = styled.div`
  font-size: 48px;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-family: 'ms_sans_serif', monospace;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #ff0000;
  text-transform: uppercase;
  text-shadow: 2px 2px 0px #000; /* Retro shadow */
`;

const Message = styled.p`
  font-family: 'ms_sans_serif';
  font-size: 16px;
  margin-bottom: 25px;
  line-height: 1.5;
`;

const UnderConstruction = ({ toggleWindow }) => {
  return (
    <Wrapper>
      <HazardStripes />
      <Content>
        <Icon>🚧 ⚠️ 🚧</Icon>
        <Title>Restricted Area</Title>
        <Message>
          This directory is currently under development. <br/>
          Authorized personnel only. <br/><br/>
          <strong>Please check back later!</strong>
        </Message>
        <Button onClick={() => toggleWindow('projects')} size="lg" active>
          Go Back
        </Button>
      </Content>
    </Wrapper>
  );
};

export default UnderConstruction;