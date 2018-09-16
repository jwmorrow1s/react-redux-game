import React, { Component } from "react";
import { connect } from "react-redux";
import Player from "../../Player/index";
import Floor from "../../Floor/index";
import Enemy from "../../Enemy/index";
import PowerUp from "../../PowerUp/index";
import Score from "../../Score/index";
import ScoreItem from "../../ScoreItem/index";
import SaveUtility from "../../SaveUtility/index";
import collisionDetection from "./collisionDetection";

class LevelOne extends Component {
  constructor(props) {
    super(props);
    this.additionalEnemiesArray = [];
  }

  handleEnemyAddition = numEnemiesToAdd => {
    this.props.dispatch({ type: "ADD_ENEMIES", payload: { numEnemiesToAdd } });
  };

  componentDidMount() {
    this.interval = collisionDetection(this.props.dispatch);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const {
      dispatch,
      additionalEnemies,
      initialized,
      enemiesPosArray,
      upgradeAccepted
    } = this.props;

    return (
      <div className="Level">
        <SaveUtility />
        <Score />
        <ScoreItem />
        {upgradeAccepted ? null : <PowerUp playerY={this.props.playerY} />}
        <Player />
        <Enemy iden={0} />
        {this.additionalEnemiesArray.length === 0 && initialized
          ? (() => {
              for (let i = 1; i <= additionalEnemies; i++) {
                this.additionalEnemiesArray.push(
                  <Enemy
                    key={i}
                    iden={i}
                    x={enemiesPosArray[0].x}
                    y={enemiesPosArray[0].y}
                  />
                );
              }
              this.handleEnemyAddition(additionalEnemies);
            })()
          : this.additionalEnemiesArray}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { enemies, additionalEnemies } = state.enemyReducer;
  const { xPos, yPos, initialized, upgradeAccepted } = state.initialReducer;

  return {
    enemiesPosArray: enemies,
    playerX: xPos,
    playerY: yPos,
    additionalEnemies,
    initialized,
    upgradeAccepted
  };
};
// const mapDispatchToProps = dispatch => {};

export default connect(mapStateToProps /* ,mapDispatchToProps*/)(LevelOne);
