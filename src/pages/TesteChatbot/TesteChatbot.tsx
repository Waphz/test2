import React from 'react';
import './TesteChatbot.scss';

const TesteChatbot = () => {
  return (
    <div className="teste-chatbot-container">
      <h1 className="custom-page-title">Teste do Chatbot</h1>
      
      {/* Incorporando o Chatbot */}
      <iframe
        src="https://www.chatrealtor.ai/chatbot-iframe/3f236bbde1244c0197d7b554161fcab5"
        style={{ border: '1px solid #e5e7eb', width: '460px', height: '600px' }}
        frameBorder="0"
      ></iframe>
    </div>
  );
};

export default TesteChatbot;
