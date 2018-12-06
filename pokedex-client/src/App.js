import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from './pages/Home'
import Pokemon from './pages/Pokemon'
import PageNotFound from './pages/PageNotFound'
import SearchPokemons from './pages/SearchPokemon';

/* The regex on route allow only parameter that verify:
- Is an integer
- Match with 00[1-9] : 001 to 009
- Or match with 0[1-9][0-9] : 010 to 099
- Or match with [1-7][0-9][0-9] : 100 to 799
- Or match with 80[0-7] : 800 to 807
*/

const App = () => (
  <Router>
    <div className="container pt-3 pb-4 mh100">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route
          exact
          path="/:pokemonId(00[1-9]|0[1-9][0-9]|[1-7][0-9][0-9]|80[0-7])"
          component={Pokemon} />
        <Route exact path="/search" component={SearchPokemons} />
        <Route component={PageNotFound} />
      </Switch>
    </div>
  </Router>
)

export default App;
