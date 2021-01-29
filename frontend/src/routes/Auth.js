import React, { useState } from 'react';
import axios from 'axios';

const Auth = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = (event) => {
    event.preventDefault();

    const loginAndSetJWT = async (username, password) => {
      const base_url = 'http://localhost:8000/';
      const jwt_token_url = 'api-token-auth/';

      await axios
        .post(
          base_url + jwt_token_url,
          JSON.stringify({ username, password }),
          {
            headers: { 'Content-Type': 'application/json' },
          },
        )
        .then((response) => {
          localStorage.setItem('jwt-token', response.data.token);
        })
        .catch((err) => {
          console.log(err);
        });

      console.log(localStorage.getItem('jwt-token'));
      if (localStorage.getItem('jwt-token')) {
        setIsLoggedIn(true);
      }
    };

    loginAndSetJWT(username, password);
  };

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === 'username') {
      setUsername(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        name="username"
        type="text"
        placeholder="Username"
        required
        value={username}
        onChange={onChange}
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        required
        value={password}
        onChange={onChange}
      />
      <input type="submit" placeholder="Log in" />
    </form>
  );
};

export default Auth;
