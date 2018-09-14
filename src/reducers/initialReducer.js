const PLAYER_WIDTH = 20;
const PLAYER_HEIGHT = 20;
const MAX_SPD = 10;
//TODO: set up upward velocity and replace jump with that
const initialState = {
  initialized: false,
  falling: false,
  playerWidth: 20,
  playerHeight: 20,
  ballColor: "hsla(0, 0%, 0%, 1)",
  xPos: 20,
  yPos: 857 - 20,
  xMin: 4,
  jmp: 40,
  spd: 0,
  yMin: 857,
  lastXVector: null,
  xMotion: false,
  lastMovingVector: null
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
        jmp,
        spd,
        xMin,
        xMax,
        yMin,
        xPos,
        yPos,
        falling,
        lastXVector,
        xMotion,
        lastMovingVector
      } = state;
      const { keysDown } = action.payload;

      const xVector = keysDown["ArrowLeft"] ? -1 : 1;
      const yVector = keysDown[" "] ? -1 : 1;
      const runningJump = Math.pow(spd, 1.7) > jmp ? Math.pow(spd, 1.7) : jmp;
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
        // jmp: -40,
        yPos: falling
          ? yPos
          : yVector < 0
            ? yPos - runningJump
            : yPos + jmp <= yMin
              ? yPos + jmp
              : yPos + (yMin - yPos),
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
        jmp,
        spd,
        falling,
        xMotion,
        xPos,
        xMax,
        lastXVector,
        xMin,
        lastMovingVector,
        yPos,
        yMin
      } = state;

      return {
        ...state,

        xPos: falling
          ? lastMovingVector === "ArrowLeft"
            ? xPos - Math.pow(spd, 1.25) >= xMin
              ? xPos - Math.pow(spd, 1.25)
              : xPos - (xPos - xMin)
            : lastMovingVector === "ArrowRight"
              ? xPos + Math.pow(spd, 1.25) <= xMax
                ? xPos + Math.pow(spd, 1.25)
                : xPos + (xMax - xPos)
              : xPos
          : lastMovingVector === "ArrowLeft"
            ? xPos - spd >= xMin
              ? xPos - spd
              : xPos - (xPos - xMin)
            : lastMovingVector === "ArrowRight"
              ? xPos + spd <= xMax
                ? xPos + spd
                : xPos + (xMax - xPos)
              : xPos,

        yPos: falling ? (yPos * 1.008 <= yMin ? yPos * 1.008 : yMin) : yPos,
        spd: xMotion ? spd : spd - 1 >= 0 ? spd - 1 : spd,
        falling: yPos < yMin ? true : false
      };
    }

    case "CREATE_CHARACTER": {
      const { ballColor, size } = action.payload;
      console.log(action.payload);
      return {
        ...state,
        ballColor: ballColor,
        playerWidth: size,
        playerHeight: size
      };
    }

    default: {
      return state;
    }
  }
};

export default initalReducer;
