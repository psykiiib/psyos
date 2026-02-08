import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Button, TextInput } from 'react95';
import ElizaBot from '../../utils/elizabot';

const ChatWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #c0c0c0;
  padding: 10px;
  font-family: 'MS Sans Serif', sans-serif;
`;

const MessageArea = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 10px;
  background: #fff;
  border: 2px inset #fff;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

// FIXED: Using Transient Prop $isUser
const Message = styled.div`
  color: ${props => props.$isUser ? '#000080' : '#000'};
  font-weight: ${props => props.$isUser ? 'bold' : 'normal'};
  
  span.name {
    margin-right: 5px;
    font-weight: bold;
    color: ${props => props.$isUser ? '#000080' : '#ff0080'};
  }
`;

const InputArea = styled.div`
  display: flex;
  gap: 8px;
`;

const AiChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const botRef = useRef(null);
  const endRef = useRef(null);

  useEffect(() => {
    botRef.current = new ElizaBot();
    const initialMsg = botRef.current.getInitial();
    setMessages([{ text: initialMsg, isUser: false }]);
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { text: input, isUser: true };
    setMessages(prev => [...prev, userMsg]);
    
    const reply = botRef.current.transform(input);
    
    setTimeout(() => {
        setMessages(prev => [...prev, { text: reply, isUser: false }]);
    }, 500 + Math.random() * 500);

    setInput('');
  };

  return (
    <ChatWrapper>
      <MessageArea>
        {messages.map((msg, i) => (
          <Message key={i} $isUser={msg.isUser}> {/* <--- FIXED HERE with $ */ }
            <span className="name">{msg.isUser ? 'YOU:' : 'Albedo:'}</span>
            {msg.text}
          </Message>
        ))}
        <div ref={endRef} />
      </MessageArea>
      
      <InputArea>
        <TextInput 
          value={input} 
          placeholder="Say something..." 
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          style={{ flex: 1 }}
        />
        <Button onClick={handleSend} style={{ width: '80px' }}>Send</Button>
      </InputArea>
    </ChatWrapper>
  );
};

export default AiChat;