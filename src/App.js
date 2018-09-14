import React, { Component } from "react";
import "./App.css";
import { connect } from "react-redux";
import GameBoard from "./components/GameBoard/index";
import StartScreen from "./components/Levels/LevelIndex/StartScreen";
import CharacterCreation from "./components/Levels/LevelIndex/CharacterCreation";
import { Switch, Route, BrowserRouter } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div id="App">
          <Switch>
            <Route exact path="/" component={StartScreen} />
            <Route exact path="/game" component={GameBoard} />
            <Route exact path="/character" component={CharacterCreation} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  const { initialized, yMin } = state.initialReducer;
  return { initialized };
};
// const mapDispatchToProps = dispatch => {};

export default connect(mapStateToProps /*,mapDispatchToProps*/)(App);
