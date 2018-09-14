import React, { Component } from "react";
import { connect } from "react-redux";
import playerStyle from "./playerStyle";

class Player extends Component {
  render() {
    const { xPos, yPos, playerWidth, playerHeight, ballColor } = this.props;
    return (
      <div
        id="Player"
        style={{
          ...playerStyle,
          left: xPos + "px",
          top: yPos + "px",
          backgroundColor: ballColor,
          color: ballColor,
          width: playerWidth,
          height: playerHeight
        }}
      >
        <span style={{ opacity: "0" }}>.</span>
      </div>
    );
  }
}

const mapStateToProps = state => {
  // console.log(state.initialReducer);
  const {
    xPos,
    yPos,
    playerHeight,
    playerWidth,
    ballColor
  } = state.initialReducer;
  return { xPos, yPos, playerHeight, playerWidth, ballColor };
};
// const mapDispatchToProps = dispatch => {};

export default connect(mapStateToProps /*, mapDispatchToProps*/)(Player);
