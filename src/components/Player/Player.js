import React, { Component } from "react";
import { connect } from "react-redux";
import playerStyle from "./playerStyle";

class Player extends Component {
  render() {
    const { xPos, yPos } = this.props;
    return (
      <div
        id="Player"
        style={{
          ...playerStyle,
          left: xPos + "px",
          top: yPos + "px"
        }}
      >
        x
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { xPos, yPos } = state;
  return { xPos, yPos };
};
// const mapDispatchToProps = dispatch => {};

export default connect(mapStateToProps /*, mapDispatchToProps*/)(Player);
