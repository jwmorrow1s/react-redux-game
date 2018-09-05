import React, { Component } from "react";
import { connect } from "react-redux";
import playerStyle from "./playerStyle";
import handleMovement from "./handleMovement";

class Player extends Component {
  componentDidMount() {
    //Make player always in focus, so that keydown event always works.
    document.querySelector("#Player").focus();
    document.querySelector("#Player").onblur = () =>
      document.querySelector("#Player").focus();
  }

  render() {
    const { xPos, yPos, dispatch } = this.props;
    return (
      <div
        id="Player"
        tabIndex="0"
        onKeyDown={e => handleMovement(dispatch, e)}
        style={{
          ...playerStyle,
          left: xPos + "px",
          top: yPos + "px"
        }}
      >
        {"\u2022"}
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
