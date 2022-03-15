import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Conva from "pages/conva/conva";
import Game from "pages/game/game";
import GameStore from "stores/gameStore";

import "./app.less";

const gameStore = new GameStore;

export function useGameStore(): GameStore {
  return gameStore;
}

export default function App(): React.ReactElement {
  return (
    <Router>
      <Switch>
        <Route path="/conva">
          <Conva />
        </Route>
        <Route path="/">
          <Game />
        </Route>
      </Switch>
    </Router>

  );
}
