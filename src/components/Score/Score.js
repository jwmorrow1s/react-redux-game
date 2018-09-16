import React, { Component } from "react";
import { connect } from "react-redux";

class Score extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    const { dispatch, score } = this.props;

    return (
      <div id="Score">
        <div id="score-container">
          <div id="score-heading">SCORE</div>
          <div id="score-count">{score}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { score } = state.initialReducer;
  return { score };
};
// const mapDispatchToProps = dispatch => {};

export default connect(mapStateToProps /* ,mapDispatchToProps*/)(Score);
