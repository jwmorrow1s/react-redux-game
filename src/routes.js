import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import GameBoard from "./components/GameBoard/index";
import StartScreen from "./components/Levels/LevelIndex/StartScreen";
import App from "./App";

const Routes = () => {
  return (
    <BrowserRouter>
      <div id="App">
        <Switch>
          <Route exact path="/" component={App} />
          <Route exact path="/start" component={StartScreen} />
          <Route exact path="/game" component={GameBoard} />
        </Switch>
        {/*<GameBoard />*/}
      </div>
    </BrowserRouter>
  );
};

export default Routes;
