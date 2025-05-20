import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { db } from './firebase';
import {
  collection,
  addDoc,
  onSnapshot,
  orderBy,
  query
} from "firebase/firestore";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesRef = collection(db, "messages");
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const q = query(messagesRef, orderBy("timestamp"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => doc.data()));
    });

    return () => unsubscribe();
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = {
      sender: 'user',
      text: input,
      timestamp: new Date()
    };

    await addDoc(messagesRef, userMessage);

    try {
      const response = await axios.post('http://localhost:3000/api/chat', {
        message: input
      });

      const botMessage = {
        sender: 'bot',
        text: JSON.stringify(response.data.result || response.data, null, 2),
        timestamp: new Date()
      };

      await addDoc(messagesRef, botMessage);
    } catch (err) {
      await addDoc(messagesRef, {
        sender: 'bot',
        text: 'Error: ' + err.message,
        timestamp: new Date()
      });
    }

    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <div style={styles.container}>
      <div style={styles.chatBox}>
        {messages.map((msg, index) => (
            <div
                key={index}
                style={{
                ...styles.message,
                alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                backgroundColor: msg.sender === 'user' ? '#DCF8C6' : '#E6E6E6'
                }}
            >
                <strong>{msg.sender === 'user' ? 'You' : 'AI'}:</strong><br />
                {msg.text}
            </div>
            ))}

      </div>
      <div style={styles.inputArea}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          style={styles.input}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage} style={styles.button}>Send</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: 20,
    fontFamily: 'Arial',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column'
  },
  chatBox: {
    flex: 1,
    padding: 10,
    border: '1px solid #ccc',
    borderRadius: 10,
    overflowY: 'auto',
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'column',
    gap: 10
  },
  inputArea: {
    display: 'flex',
    gap: 10
  },
  input: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    border: '1px solid #ccc'
  },
  button: {
    padding: '10px 20px',
    borderRadius: 5,
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none'
  },
  message: {
    padding: 10,
    borderRadius: 10,
    maxWidth: '80%',
    whiteSpace: 'pre-wrap'
  }
};

export default Chat;
