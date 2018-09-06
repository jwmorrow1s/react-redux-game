import React, { Component } from "react";
import "./App.css";
import { connect } from "react-redux";
import GameBoard from "./components/GameBoard/index";

class App extends Component {
  componentDidMount() {
    const { initialized, dispatch } = this.props;
    if (!initialized)
      dispatch({
        type: "INIT_PLAYER",
        payload: {
          xMax: document.body.getBoundingClientRect().width,
          yMin:
            document.querySelector("#Floor").getBoundingClientRect().top -
            document.querySelector("#Floor").getBoundingClientRect().height
        }
      });
  }
  render() {
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
