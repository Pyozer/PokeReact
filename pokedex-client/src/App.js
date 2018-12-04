import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from './pages/Home'
import Pokemon from './pages/Pokemon'
import PageNotFound from './pages/PageNotFound'

const App = () => (
  <Router>
    <div className="container mt-3 mb-3">
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/:pokemonId" exact component={Pokemon} />
        <Route component={PageNotFound} />
      </Switch>
    </div>
  </Router>
)

export default App;
