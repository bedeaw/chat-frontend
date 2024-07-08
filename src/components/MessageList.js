// src/components/MessageList.js
import React from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_CHAT_ROOM_MESSAGES = gql`
  query GetChatRoomMessages($roomName: String!) {
    chatRoomMessages(roomName: $roomName) {
      id
      user {
        username
      }
      content
      timestamp
    }
  }
`;

const MessageList = ({ roomName }) => {
  const { loading, error, data } = useQuery(GET_CHAT_ROOM_MESSAGES, {
    variables: { roomName },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ul>
      {data.chatRoomMessages.map(({ id, user, content, timestamp }) => (
        <li key={id}>
          <strong>{user.username}</strong>: {content} <em>({new Date(timestamp).toLocaleString()})</em>
        </li>
      ))}
    </ul>
  );
};

export default MessageList;
