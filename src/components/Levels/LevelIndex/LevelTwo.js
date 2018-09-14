import React, { Component } from "react";
import { connect } from "react-redux";
import Player from "../Player/index";
import Floor from "../Floor/index";

class LevelOne extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    const { dispatch } = this.props;

    return (
      <div className="Level">
        <Player />
      </div>
    );
  }
}

// const mapStateToProps = state => {
//   return {};
// };
// const mapDispatchToProps = dispatch => {};

export default connect(/*mapStateToProps ,mapDispatchToProps*/)(LevelOne);
