import React, { Component } from "react";
import { connect } from "react-redux";

class PowerUp extends Component {
  constructor(props) {
    super(props);
  }

  handlePowerUp = powerUpType => {
    const { dispatch } = this.props;
    powerUpType === "speed"
      ? this.props.dispatch({ type: "POWER_UP_SPEED" })
      : this.props.dispatch({ type: "POWER_UP_JUMP" });
  };

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    const { dispatch } = this.props;

    return (
      <div style={{ top: this.props.playerY - 200 + "px" }} id="PowerUp">
        <div id="power-up-container">
          <h4>Choose Power Up:</h4>
          <div id="power-up-options-container">
            <button onClick={() => this.handlePowerUp("speed")}>Speed</button>
            <button onClick={() => this.handlePowerUp("jump")}>Jump</button>
          </div>
        </div>
      </div>
    );
  }
}

// const mapStateToProps = state => {
//   return {};
// };
// const mapDispatchToProps = dispatch => {};

export default connect(/*mapStateToProps ,mapDispatchToProps*/)(PowerUp);
