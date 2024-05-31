import React, { useState, useEffect, useRef } from 'react';
import chatImage from '../img/chat.png';
import '../chat.css';

const ChatSupport = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ text: "Hello, how can I assist you?", sender: "bot" }]);
  const [newMessage, setNewMessage] = useState('');
  const chatRef = useRef(null);

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      setMessages([...messages, { text: newMessage, sender: "user" }]);
      setNewMessage('');
    }
  };

  const handleClickOutside = (event) => {
    if (chatRef.current && !chatRef.current.contains(event.target) && isOpen) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  useEffect(() => {
    if (messages.length && messages[messages.length - 1].sender === "user") {
      setTimeout(() => {
        setMessages(msgs => [...msgs, { text: "Chat support development in progress.", sender: "bot" }]);
      }, 100);
    }
  }, [messages]);

  return (
    <div className="support-chat">
      <button className="chat-button" onClick={() => setIsOpen(!isOpen)}>
        <img src={chatImage} alt="chatImage" />
      </button>
      <div className="chat-panel" ref={chatRef} style={{ display: isOpen ? 'flex' : 'none' }}>
        <div className="chat-content">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender === "user" ? "user-message" : "bot-message"}`}>
              {msg.text}
            </div>
          ))}
        </div>
        <div className="chat-input">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Write your message..."
            onKeyPress={(event) => event.key === 'Enter' && handleSendMessage()}
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default ChatSupport;
