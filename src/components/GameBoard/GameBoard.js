import React, { Component } from "react";
import { connect } from "react-redux";
import Player from "../Player/index";
import Floor from "../Floor/index";
import { gravity } from "./handleCollision";

class GameBoard extends Component {
  render() {
    const { dispatch } = this.props;
    return (
      <div
        id="GameBoard"
        onLoad={(() => {
          setInterval(
            () =>
              gravity(dispatch, document.querySelector("#GameBoard").children),
            1000 / 16
          );
        })()}
      >
        <Player />
        <Floor />
      </div>
    );
  }
}

// const mapStateToProps = state => {};
// const mapDispatchToProps = dispatch => {};

export default connect(/*mapStateToProps ,mapDispatchToProps*/)(GameBoard);
