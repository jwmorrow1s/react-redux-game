const PLAYER_WIDTH = 20;
const PLAYER_HEIGHT = 20;

//TODO: set up upward velocity and replace jump with that
const initialState = {
  initialized: false,
  falling: false,
  playerWidth: 20,
  playerHeight: 20,
  ballColor: "hsla(0, 0%, 0%, 1)",
  xPos: 20,
  yPos: 0,
  xMin: 4,
  yAccel: -50,
  MAX_SPD: 20,
  spd: 0,
  yMin: 0,
  lastXVector: null,
  xMotion: false,
  lastMovingVector: null,
  gameOver: false,
  upgradeAccepted: false,

  savedGame: {
    xPos: null,
    yPos: null,
    yMin: null,
    xMax: null,
    xMin: null,
    ballColor: null,
    enemies: null
  },
  score: 0,
  saveGamePresent: false,
  scoreRight: true
};

const initalReducer = (state = initialState, action) => {
  switch (action.type) {
    case "INIT_PLAYER": {
      const { xMax, yMin } = action.payload;
      const { playerWidth, playerHeight } = state;

      return {
        ...state,
        yPos: yMin - playerHeight,
        yMin: yMin - playerHeight,
        xMax: xMax - playerWidth,
        initialized: true
      };
    }

    case "MOVEMENT_UPDATE": {
      const {
        spd,
        xMin,
        xMax,
        yMin,
        xPos,
        yPos,
        falling,
        lastXVector,
        xMotion,
        lastMovingVector,
        gameOver,
        yAccel,
        MAX_SPD,
        upgradeAccepted
      } = state;

      //GAME OVER --- NO MOVEMENT POSSIBLE
      if (gameOver || !upgradeAccepted) return state;

      const { keysDown } = action.payload;
      const xVector = keysDown["ArrowLeft"] ? -1 : 1;
      const yVector = keysDown[" "] ? -1 : 1;

      const incomingXVector =
        Object.keys(keysDown).find(k => {
          return (
            (k === "ArrowLeft" || k === "ArrowRight") && keysDown[k] === true
          );
        }) || null;

      const isMotion = lastXVector
        ? lastXVector === incomingXVector
          ? true
          : false
        : incomingXVector
          ? true
          : false;

      return {
        ...state,
        xPos: !isMotion
          ? xPos
          : xVector < 0
            ? xPos - spd >= xMin
              ? xPos - spd
              : xPos - (xPos - xMin)
            : xPos + spd <= xMax
              ? xPos + spd
              : xPos + (xMax - xPos),

        yPos: falling ? yPos : yVector < 0 ? yPos + yAccel : yPos,

        spd: incomingXVector
          ? lastMovingVector
            ? incomingXVector === lastMovingVector
              ? spd + 1 <= MAX_SPD
                ? spd + 1
                : spd
              : 0
            : spd + 1 <= MAX_SPD
              ? spd + 1
              : spd
          : spd,
        lastXVector: incomingXVector || null,
        xMotion: isMotion,
        lastMovingVector: incomingXVector ? incomingXVector : lastMovingVector
      };
    }

    case "MOVEMENT_DECAY": {
      const {
        spd,
        falling,
        xMotion,
        xPos,
        xMax,
        xMin,
        lastMovingVector,
        yPos,
        yMin,
        gameOver,
        score,
        scoreRight
      } = state;

      if (gameOver) return state;

      const scored = scoreRight
        ? Math.abs(xPos - xMax) <= 10
          ? true
          : false
        : Math.abs(xPos - xMin) <= 10
          ? true
          : false;

      return {
        ...state,

        xPos: xMotion
          ? xPos
          : lastMovingVector === "ArrowRight"
            ? xPos + spd <= xMax
              ? xPos + spd
              : xPos + (xMax - xPos)
            : xPos - spd >= xMin
              ? xPos - spd
              : xPos - (xPos - xMin),

        yPos: falling ? (yPos * 1.008 <= yMin ? yPos * 1.008 : yMin) : yPos,
        spd: xMotion ? spd : spd - 1 >= 0 ? spd - 1 : spd,
        falling: yPos < yMin ? true : false,
        score: scored ? score + 100 : score,
        scoreRight: scored ? !scoreRight : scoreRight
      };
    }

    case "POWER_UP_JUMP": {
      console.log("power up jump");
      return { ...state, upgradeAccepted: true, yAccel: -70 };
    }

    case "POWER_UP_SPEED": {
      console.log("power up speed");
      return { ...state, upgradeAccepted: true, MAX_SPD: 40 };
    }

    case "CREATE_CHARACTER": {
      const { ballColor, size } = action.payload;
      return {
        ...state,
        ballColor: ballColor,
        playerWidth: size,
        playerHeight: size
      };
    }

    case "POINTS_SCORED": {
      const { score } = state;
      return { ...state, score: score + 100 };
    }
    case "GAME_SAVE": {
      const {
        xPos,
        yPos,
        xMax,
        xMin,
        yMin,
        ballColor,
        yAccel,
        MAX_SPD,
        score,
        scoreRight
      } = state;
      const { enemies } = action.payload;
      return {
        ...state,
        savedGame: {
          xPos,
          yPos,
          xMax,
          xMin,
          yMin,
          ballColor,
          yAccel,
          MAX_SPD,
          enemies: { ...enemies },
          score,
          scoreRight
        }
      };
    }

    /*TODO*/
    case "GAME_LOAD": {
      const { savedGame } = state;
      return {
        ...state,
        xPos: savedGame.xPos,
        yPos: savedGame.yPos,
        xMax: savedGame.xMax,
        xMin: savedGame.xMin,
        yMin: savedGame.yMin,
        ballColor: savedGame.ballColor,
        yAccel: savedGame.yAccel,
        MAX_SPD: savedGame.MAX_SPD,
        enemies: savedGame.enemies,
        score: savedGame.score,
        scoreRight: savedGame.scoreRight
      };
    }

    case "COLLISION_DEATH": {
      return { ...state, gameOver: true };
    }

    default: {
      return state;
    }
  }
};

export default initalReducer;
