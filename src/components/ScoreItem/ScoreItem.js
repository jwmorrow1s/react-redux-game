import React, { Component } from "react";
import { connect } from "react-redux";
import scoreItemStyle from "./scoreItemStyle";

class ScoreItem extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    const { dispatch, xMin, xMax, scoreRight, yMin } = this.props;

    return (
      <div
        style={{
          ...scoreItemStyle,
          top: `${yMin - 40}px`,
          left: scoreRight ? `${xMax - 20}px` : `${xMin + 20}px`
        }}
        id="ScoreItem"
      >
        +
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { xMin, xMax, scoreRight, yMin } = state.initialReducer;
  return { xMin, xMax, yMin, scoreRight };
};
// const mapDispatchToProps = dispatch => {};

export default connect(mapStateToProps /* ,mapDispatchToProps*/)(ScoreItem);
