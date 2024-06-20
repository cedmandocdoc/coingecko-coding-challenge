import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import CoinsList from './components/CoinsList';
import CoinInfo from './components/CoinInfo';

const App = () => {
  return (
    <section className="w-full m-auto p-10 flex flex-col items-center gap-6">
      <h2 className="text-5xl text-center">Coingecko Coding Challenge</h2>

      <Switch>
        <Route exact path="/coins" component={CoinsList} />
        <Route path="/coins/:id" component={CoinInfo} />
        <Redirect from="*" to="/coins" />
      </Switch>
    </section>
  );
};

export default App;
