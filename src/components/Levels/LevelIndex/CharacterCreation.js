import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
class CharacterCreation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ballColor: "hsla(0, 0%, 0%, 1)",
      ballSize: { type: "medium", size: "20px" }
    };
  }

  handleStartGame = () => {
    this.props.dispatch({
      type: "CREATE_CHARACTER",
      payload: {
        ballColor: this.state.ballColor,
        size: parseInt(this.state.ballSize.size.slice(0, 2))
      }
    });
  };

  handleColorClick = color => {
    switch (color) {
      case "red": {
        this.setState({ ballColor: "hsla(0, 100%, 50%, 1)" });
        return;
      }
      case "orange": {
        this.setState({ ballColor: "hsla(30, 100%, 50%, 1)" });
        return;
      }
      case "yellow": {
        this.setState({ ballColor: "hsla(60, 100%, 50%, 1)" });
        return;
      }
      case "green": {
        this.setState({ ballColor: "hsla(90, 100%, 50%, 1)" });
        return;
      }
      case "blue": {
        this.setState({ ballColor: "hsla(240, 100%, 50%, 1)" });
        return;
      }
      case "indigo": {
        this.setState({ ballColor: "hsla(270, 100%, 50%, 1)" });
        return;
      }
      case "violet": {
        this.setState({ ballColor: "hsla(300, 100%, 50%, 1)" });
        return;
      }
      default: {
        this.setState({ ballColor: "hsla(0, 0%, 0%, 1)" });
        return;
      }
    }
  };

  handleSizeClick = size => {
    switch (size) {
      case "small": {
        this.setState({ ballSize: { type: "small", size: "10px" } });
        return;
      }
      case "medium": {
        this.setState({ ballSize: { type: "medium", size: "20px" } });
        return;
      }
      case "large": {
        this.setState({ ballSize: { type: "large", size: "30px" } });
        return;
      }
      default:
        return;
    }
  };

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    const { dispatch } = this.props;
    const { ballColor, ballSize } = this.state;
    return (
      <div id="CharacterCreation">
        <div id="character-creation-section">
          <div id="character-creation-header">Select your character:</div>
          <div id="character-select">
            <div
              className="character-select-item"
              id="character-select-color-dropdown"
            >
              <div className="character-heading">color {"\u2304"}</div>
              <div className="list-container">
                <div
                  onClick={() => this.handleColorClick("red")}
                  className="character-selection first-color red-color-select"
                >
                  red
                  <div className="ball color-ball" id="red-ball">
                    .
                  </div>
                </div>
                <div
                  onClick={() => this.handleColorClick("orange")}
                  className="character-selection orange-color-select"
                >
                  orange
                  <div className="ball color-ball" id="orange-ball">
                    .
                  </div>
                </div>
                <div
                  onClick={() => this.handleColorClick("yellow")}
                  className="character-selection yellow-color-select"
                >
                  yellow
                  <div className="ball color-ball" id="yellow-ball">
                    .
                  </div>
                </div>
                <div
                  onClick={() => this.handleColorClick("green")}
                  className="character-selection green-color-select"
                >
                  green
                  <div className="ball color-ball" id="green-ball">
                    .
                  </div>
                </div>
                <div
                  onClick={() => this.handleColorClick("blue")}
                  className="character-selection blue-color-select"
                >
                  blue
                  <div className="ball color-ball" id="blue-ball">
                    .
                  </div>
                </div>

                <div
                  onClick={() => this.handleColorClick("indigo")}
                  className="character-selection indigo-color-select"
                >
                  indigo
                  <div className="ball color-ball" id="indigo-ball">
                    .
                  </div>
                </div>
                <div
                  onClick={() => this.handleColorClick("violet")}
                  className="character-selection violet-color-select"
                >
                  violet
                  <div className="ball color-ball" id="violet-ball">
                    .
                  </div>
                </div>
              </div>
            </div>
            <div
              className="character-select-item"
              id="character-select-size-dropdown"
            >
              <div className="character-heading">size {"\u2304"}</div>
              <div className="list-container">
                <div
                  onClick={() => this.handleSizeClick("small")}
                  className="character-selection character-selection-size"
                >
                  small
                  <div className="ball-wrapper">
                    <div className="ball small-ball">.</div>
                  </div>
                </div>
                <div
                  onClick={() => this.handleSizeClick("medium")}
                  className="character-selection character-selection-size"
                >
                  medium
                  <div className="ball-wrapper">
                    <div className="ball color-ball medium-ball">.</div>
                  </div>
                </div>
                <div
                  onClick={() => this.handleSizeClick("large")}
                  className="character-selection character-selection-size"
                >
                  large
                  <div className="ball-wrapper">
                    <div className="ball large-ball">.</div>
                  </div>
                </div>
              </div>
              <div id="character-preview">
                <div
                  style={{ backgroundColor: ballColor }}
                  className={"ball " + ballSize.type + "-ball"}
                >
                  .
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*/character-creation-section*/}
        <button onClick={() => this.handleStartGame()} id="game-start-btn">
          <Link to="/game">Start Game</Link>
        </button>
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

export default connect(mapStateToProps /* ,mapDispatchToProps*/)(
  CharacterCreation
);
