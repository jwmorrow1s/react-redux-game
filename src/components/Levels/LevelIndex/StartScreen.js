import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import GameBoard from "../../GameBoard/index";
import { Redirect } from "react-router-dom";
class StartScreen extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    const { dispatch } = this.props;

    return (
      <div id="StartScreen">
        <div id="game-title-container">
          <div id="game-title">GeoMatar</div>
        </div>
        <div id="game-title-menu-container">
          <div className="game-title-menu-item">
            <Link className="link" to="/character">
              Start Game
            </Link>
          </div>
        </div>
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

export default connect(mapStateToProps /* ,mapDispatchToProps*/)(StartScreen);
