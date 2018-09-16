import React, { Component } from "react";
import { connect } from "react-redux";
import enemyStyle from "./enemyStyle";

class Enemy extends Component {
  componentDidMount() {}

  render() {
    const { enemies, iden } = this.props;
    // console.log(this.props);
    return (
      <div
        className="Enemy"
        style={{
          ...enemyStyle,
          left: enemies[iden].x + "px",
          top: enemies[iden].y + "px",
          backgroundColor: enemies[iden].color
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
