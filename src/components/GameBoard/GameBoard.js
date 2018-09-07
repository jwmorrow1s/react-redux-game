import React, { Component } from "react";
import { connect } from "react-redux";
import Player from "../Player/index";
import Floor from "../Floor/index";
import { gravity } from "./handleCollision";

class GameBoard extends Component {
  render() {
    const { dispatch, moving } = this.props;
    return (
      <div
        id="GameBoard"
        onLoad={(() => {
          window.onload = () => {
            setInterval(() => {
              gravity(dispatch, document.querySelector("#GameBoard").children);
              if (!moving) dispatch({ type: "DECEL" });
              dispatch({ type: "MOV_SKID" });
            }, 1000 / 16);
          };
        })()}
        onKeyUp={() => dispatch({ type: "KILL_MOVEMENT" })}
      >
        <Player />
        <Floor />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    moving: state.moving
  };
};
// const mapDispatchToProps = dispatch => {};

export default connect(mapStateToProps /* ,mapDispatchToProps*/)(GameBoard);
