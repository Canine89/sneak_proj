import React, { useState } from 'react';
import axios from 'axios';
import { Input, Button, Grid, Heading } from '@chakra-ui/react';

const Auth = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = (event) => {
    event.preventDefault();

    const loginAndSetJWT = async (username, password) => {
      const base_url = 'http://localhost:8000/';
      const jwt_token_url = 'api-token-auth/';

      console.log(base_url)

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
    <>
      <Heading pb={4} pt={4}>
        로그인하세요
      </Heading>
      <form onSubmit={onSubmit}>
        <Grid
          templateRows="repeat(3, 1fr)"
          templateColumns="repeat(1, 1fr)"
          gap={4}
        >
          <Input
            name="username"
            type="text"
            variant="outline"
            placeholder="아이디를 입력하세요"
            required
            value={username}
            onChange={onChange}
          />
          <Input
            name="password"
            type="password"
            variant="outline"
            placeholder="비밀번호를 입력하세요"
            required
            value={password}
            onChange={onChange}
          />
          <Button type="submit">로그인</Button>
        </Grid>
      </form>
    </>
  );
};

export default Auth;
