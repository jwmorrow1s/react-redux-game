import React, { Component } from "react";
import { connect } from "react-redux";
import Player from "../Player/index";
import Floor from "../Floor/index";

class MakeCharacter extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    const { dispatch } = this.props;

    return (
      <div id="MakeCharacter">
        <Player />
        <Floor />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ...state //remove once working
  };
};
// const mapDispatchToProps = dispatch => {};

export default connect(mapStateToProps /* ,mapDispatchToProps*/)(MakeCharacter);
