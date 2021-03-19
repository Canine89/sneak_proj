import React, { useEffect, useState } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import AppRouter from 'components/AppRouter';
import axios from 'axios';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('jwt-token')) setIsLoggedIn(true);
    setInterval(checkJWT, 1000 * 60);
  }, []);

  // jwt token 만료 검사?
  const checkJWT = async () => {
    await axios
      .post(
        'http://192.168.0.81:8000/api-token-auth/verify/',
        JSON.stringify({ token: localStorage.getItem('jwt-token') }),
        {
          headers: { 'Content-Type': 'application/json' },
        },
      )
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
        localStorage.removeItem('jwt-token');
        setIsLoggedIn(false);
      });
    console.log('called checkJWT');
  };

  return (
    <ChakraProvider>
      <Router>
        <AppRouter isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      </Router>
    </ChakraProvider>
  );
}

export default App;
