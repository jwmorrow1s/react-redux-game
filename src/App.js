import React, { Component } from "react";
import "./App.css";
import { connect } from "react-redux";
import GameBoard from "./components/GameBoard/index";

class App extends Component {
  render() {
    const { initialized, dispatch } = this.props;
    if (!initialized)
      dispatch({
        type: "INIT_PLAYER",
        payload: { xPos: window.innerWidth / 2, yPos: window.innerHeight / 2 }
      });
    return (
      <div id="App">
        <GameBoard />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { initialized } = state;
  return { initialized };
};
// const mapDispatchToProps = dispatch => {};

export default connect(mapStateToProps /*,mapDispatchToProps*/)(App);
