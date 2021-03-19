import React from 'react';
import Auth from 'routes/Auth';
import Main from 'routes/Main';
import EveryMarket from 'routes/EveryMarket';
import Easyspub from 'routes/Easyspub';
import Yes24 from 'routes/Yes24';
import Kyobo from 'routes/Kyobo';
import Aladin from 'routes/Aladin';
import Navitaion from 'components/Navigation';
import { Container } from '@chakra-ui/react';
import { HashRouter as Route, Switch } from 'react-router-dom';

const AppRouter = ({ isLoggedIn, setIsLoggedIn }) => {
  return (
    <Container maxW="12xl">
      <Navitaion isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Switch>
        {isLoggedIn ? (
          <Route exact path="/">
            <Main />
          </Route>
        ) : (
          <Route exact path="/">
            <Auth setIsLoggedIn={setIsLoggedIn} />
          </Route>
        )}
        {isLoggedIn ? (
          <Route exact path="/everymarket">
            <EveryMarket />
          </Route>
        ) : (
          <Route>
            <Auth setIsLoggedIn={setIsLoggedIn} />
          </Route>
        )}

        <Route exact path="/yes24">
          <Yes24 />
        </Route>
        <Route exact path="/kyobo">
          <Kyobo />
        </Route>
        <Route exact path="/aladin">
          <Aladin />
        </Route>
        <Route exact path="/easyspub">
          <Easyspub />
        </Route>
      </Switch>
    </Container>
  );
};

export default AppRouter;
