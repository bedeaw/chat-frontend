import React, { useEffect, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import LoginModal from '../components/LoginModal'; // Make sure this path is correct

const GET_CHAT_ROOMS = gql`
  query GetChatRooms {
    allChatRooms {
      id
      name
    }
  }
`;

const Home = () => {
  const { loading, error, data } = useQuery(GET_CHAT_ROOMS);
  const [chatRooms, setChatRooms] = useState([]);
  const [user, setUser] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    if (data && data.allChatRooms) {
      setChatRooms(data.allChatRooms);
    }
  }, [data]);

  const handleLogin = (username) => {
    setUser(username);
    setShowLoginModal(false);
    // Here you would also handle saving the user to the backend
    // For now, we just set the user in state
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div className="body">
      {showLoginModal && <LoginModal onLogin={handleLogin} />}
      <div className="navbar-logo-center">
        <div
          data-animation="default"
          data-collapse="medium"
          data-duration="400"
          data-easing="ease"
          data-easing2="ease"
          role="banner"
          className="navbar-logo-center-container shadow-three w-nav"
        >
          <div className="container">
            <div className="navbar-wrapper-three">
              <nav role="navigation" className="primary-navigation">
                <ul>
                  <li><a href="#">Client</a></li>
                  <li><a href="#">Server</a></li>
                  <li>
                    <a href="#">Chat Rooms</a>
                    <ul className="dropdown">
                      {chatRooms.length > 0 ? (
                        chatRooms.map(room => (
                          <li key={room.id}><a href="#">{room.name}</a></li>
                        ))
                      ) : (
                        <li><a href="#">No chat rooms available</a></li>
                      )}
                    </ul>
                  </li>
                  <li className="mobile-margin-top-10">
                    <button
                      onClick={() => setShowLoginModal(true)}
                      className="button-primary w-button"
                    >
                      JOIN
                    </button>
                  </li>
                </ul>
              </nav>
              <div className="menu-button w-nav-button">
                <div className="w-icon-nav-mennu"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="section">
        <h1 className="heading">Welcome to the Chat-Room</h1>
        <button type='submit' className='btn btn-primary btn-ghost'>Create Room</button>
      </section>
    </div>
  );
};

export default Home;
