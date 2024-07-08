// src/components/SendMessage.js
import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const CREATE_MESSAGE = gql`
  mutation CreateMessage($username: String!, $roomName: String!, $content: String!) {
    createMessage(username: $username, roomName: $roomName, content: $content) {
      message {
        id
        user {
          username
        }
        content
        timestamp
      }
    }
  }
`;

const SendMessage = ({ roomName }) => {
  const [username, setUsername] = useState('');
  const [content, setContent] = useState('');
  const [createMessage] = useMutation(CREATE_MESSAGE);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createMessage({ variables: { username, roomName, content } });
    setContent('');  // Clear the input after sending
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Message"
        required
      ></textarea>
      <button type="submit">Send</button>
    </form>
  );
};

export default SendMessage;
