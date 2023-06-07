import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Game from './Components/Game';


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Game />
        </Route>

        

      </Switch>
    </Router>
  );
}

export default App;