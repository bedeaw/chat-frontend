// src/components/ChatRoomList.js
import React from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_CHAT_ROOMS = gql`
  query GetChatRooms {
    allChatRooms {
      id
      name
    }
  }
`;

const ChatRoomList = ({ setCurrentRoom }) => {
  const { loading, error, data } = useQuery(GET_CHAT_ROOMS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ul>
      {data.allChatRooms.map(({ id, name }) => (
        <li key={id} onClick={() => setCurrentRoom(name)}>
          {name}
        </li>
      ))}
    </ul>
  );
};

export default ChatRoomList;
