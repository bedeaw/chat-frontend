import React, { useEffect, useState } from 'react';
import { gql, useQuery } from '@apollo/client';

const GET_CHAT_ROOMS = gql`
  query GetChatRooms {
    allChatRooms {
      id
      name
    }
  }
`;

const ChatRoomDropdown = () => {
  const { loading, error, data } = useQuery(GET_CHAT_ROOMS);
  const [chatRooms, setChatRooms] = useState([]);

  useEffect(() => {
    if (data && data.allChatRooms) {
      setChatRooms(data.allChatRooms);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div className="nav-dropdown w-dropdown">
      <div className="nav-dropdown-toggle w-dropdown-toggle">
        <div className="nav-dropdown-icon w-icon-dropdown-toggle"></div>
        <div className="text-block">Chat Rooms</div>
      </div>
      <nav className="nav-dropdown-list shadow-three mobile-shadow-hide w-dropdown-list">
        {chatRooms.map((room) => (
          <a key={room.id} href="#" className="nav-dropdown-link w-dropdown-link">
            {room.name}
          </a>
        ))}
      </nav>
    </div>
  );
};

export default ChatRoomDropdown;
