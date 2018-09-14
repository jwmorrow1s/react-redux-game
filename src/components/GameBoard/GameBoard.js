import React, { Component } from "react";
import { connect } from "react-redux";
import Player from "../Player/index";
import Floor from "../Floor/index";
import LevelOne from "../Levels/index";
import { gravity, handleMovement, updateKeysDown } from "./handlers";

class GameBoard extends Component {
  constructor(props) {
    super(props);
    this.actionQueue = [];
    this.keysDown = {
      ArrowLeft: false,
      ArrowRight: false,
      " ": false,
      ArrowDown: false
    };
  }

  componentDidMount() {
    document.querySelector("#GameBoard").focus();
    document.querySelector("#GameBoard").onblur = () =>
      document.querySelector("#GameBoard").focus();
    //Initialize Game, if not already
    const { initialized, dispatch } = this.props;
    if (!initialized) {
      document.body.style.maxWidth = 800;
      dispatch({
        type: "INIT_PLAYER",
        payload: {
          xMax: document.body.getBoundingClientRect().width,
          yMin: document.querySelector("#Floor").getBoundingClientRect().top
        }
      });
    }

    //Game Loop
    this.interval = setInterval(() => {
      const { keysDown } = this;
      const { dispatch, falling } = this.props;
      const dispatchedKeys = handleMovement(keysDown);
      if (falling) {
        dispatchedKeys["ArrowLeft"] = false;
        dispatchedKeys["ArrowRight"] = false;
      }

      dispatch({
        type: "MOVEMENT_UPDATE",
        payload: { keysDown: dispatchedKeys }
      });
      dispatch({ type: "MOVEMENT_DECAY" });
    }, 1000 / 16);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { dispatch } = this.props;
    const { keysDown } = this;

    return (
      <div
        id="GameBoard"
        tabIndex="0"
        onKeyDown={e => {
          const newKeysDown = {};
          newKeysDown[e.key] = true;
          const updatedKeysDown = updateKeysDown(keysDown, newKeysDown);
          Object.keys(updatedKeysDown).forEach(
            k => (keysDown[k] = updatedKeysDown[k])
          );
        }}
        onKeyUp={e => {
          keysDown[e.key] = false;
        }}
      >
        <LevelOne />
        <Floor />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    initialized: state.initialReducer
  };
};
// const mapDispatchToProps = dispatch => {};

export default connect(/*mapStateToProps ,mapDispatchToProps*/)(GameBoard);
