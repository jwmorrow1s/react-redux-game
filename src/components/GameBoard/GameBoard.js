import React, { Component } from "react";
import { connect } from "react-redux";
import Player from "../Player/index";

class GameBoard extends Component {
  render() {
    return (
      <div id="GameBoard">
        <Player />
      </div>
    );
  }
}

// const mapStateToProps = state => {};
// const mapDispatchToProps = dispatch => {};

export default connect(/*mapStateToProps ,mapDispatchToProps*/)(GameBoard);
