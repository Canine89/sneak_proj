import React, { useEffect, useState } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import AppRouter from 'components/Router';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    if (localStorage.getItem('jwt-token')) setIsLoggedIn(true);
  }, []);
  return (
    <ChakraProvider>
      <Router>
        <AppRouter isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      </Router>
    </ChakraProvider>
  );
}

export default App;
