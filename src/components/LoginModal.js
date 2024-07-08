import React, { useState } from 'react';
import './LoginModal.css';

const LoginModal = ({ onLogin }) => {
  const [username, setUsername] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onLogin(username);
  };

  return (
    <div className="box">
      <form onSubmit={handleSubmit}>
        <h2>Login Here</h2>
        <div className="inputbox">
          <ion-icon name="person-outline"></ion-icon>
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label htmlFor="username">Username</label>
        </div>
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default LoginModal;
