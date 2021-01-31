import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Auth from 'routes/Auth';
import Main from 'routes/Main';
import EveryMarket from 'routes/EveryMarket';
import Easyspub from 'routes/Easyspub';
import Yes24 from 'routes/Yes24';
import Kyobo from 'routes/Kyobo';
import Aladin from 'routes/Aladin';
import Navitaion from 'components/Navigation';
import { Container } from 'react-bootstrap';

const AppRouter = ({ isLoggedIn, setIsLoggedIn }) => {
  return (
    <Container fluid>
      <Router>
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
          <Route exact path="/everymarket">
            <EveryMarket />
          </Route>
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
      </Router>
    </Container>
  );
};

export default AppRouter;
