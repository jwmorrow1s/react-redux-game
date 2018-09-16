import React, { Component } from "react";
import { connect } from "react-redux";
import saveUtilityStyle, { saveBtnStyle } from "./saveUtilityStyle";

class SaveUtility extends Component {
  constructor(props) {
    super(props);
  }

  handleSave = () => {
    const { dispatch, enemies } = this.props;
    dispatch({ type: "GAME_SAVE", payload: { enemies } });
  };

  handleLoad = () => {
    const { dispatch } = this.props;
    dispatch({ type: "GAME_LOAD" });
  };

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    const { dispatch, xMax } = this.props;

    return (
      <div
        style={{ ...saveUtilityStyle, left: `${xMax - 190}px` }}
        id="SaveUtility"
      >
        <button onClick={() => this.handleSave()} style={saveBtnStyle}>
          Save
        </button>
        <button onClick={() => this.handleLoad()} style={saveBtnStyle}>
          Load
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { xMax } = state.initialReducer;
  const { enemies } = state.enemyReducer;
  return { xMax, enemies };
};
// const mapDispatchToProps = dispatch => {};

export default connect(mapStateToProps /* ,mapDispatchToProps*/)(SaveUtility);
