import React, { useEffect, useState } from 'react';
import AppRouter from 'components/Router';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    if (localStorage.getItem('jwt-token')) setIsLoggedIn(true);
  }, []);
  return <AppRouter isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />;
}

export default App;
