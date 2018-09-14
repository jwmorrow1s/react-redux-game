import React, { Component } from "react";
import { connect } from "react-redux";
import enemyStyle from "./enemyStyle";

class Enemy extends Component {
  componentDidMount() {}

  render() {
    const { enemies } = this.props;
    return (
      <div
        id="Enemy"
        style={{
          ...enemyStyle,
          left: enemies[0].x + "px",
          top: enemies[0].y + "px",
          backgroundColor: enemies[0].color
        }}
      >
        <span style={{ opacity: "0" }}>.</span>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { initialized, xPos, yPos, ballColor } = state.initialReducer;
  const { enemies } = state.enemyReducer;
  return {
    playerInitialized: initialized,
    enemies
  };
};
// const mapDispatchToProps = dispatch => {};

export default connect(mapStateToProps /*, mapDispatchToProps*/)(Enemy);
