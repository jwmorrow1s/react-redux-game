const initialState = {
  initialized: false,
  falling: false,
  acceleration: 0,
  direction: null,
  jmp: 60,
  spd: 5,
  button_pressed: null
};
const PLAYER_WIDTH = 20;
const ACCEL_LIMIT = 20;

const initalReducer = (state = initialState, action) => {
  switch (action.type) {
    case "INIT_PLAYER": {
      const { xMax, yMin } = action.payload;
      return {
        ...state,
        xPos: PLAYER_WIDTH,
        yPos: yMin,
        yMin: yMin,
        xMin: 4,
        xMax: xMax - PLAYER_WIDTH,
        initialized: true,
        moving: false
      };
    }
    case "PRESS_UP": {
    }
    case "PRESS_DOWN": {
    }
    case "PRESS_RIGHT": {
    }
    case "PRESS_LEFT": {
    }
    case "MOV_U": {
      const { yPos, acceleration, jmp, direction, moving } = state;
      if (state.falling) return state;
      if (acceleration > 0 && moving)
        return {
          ...state,
          yPos: yPos - jmp,
          acceleration:
            acceleration * 2 <= ACCEL_LIMIT
              ? acceleration * 2
              : acceleration + (ACCEL_LIMIT - acceleration)
        };
      return {
        ...state,
        yPos: yPos - jmp
      };
    }
    case "MOV_D": {
      const { yPos, yMin, spd, falling } = state;
      return falling
        ? {
            ...state,
            yPos: yPos - spd * 2 < yMin ? yPos + spd * 10 : yMin - yPos
          }
        : { ...state, yPos: yPos < yMin ? yPos + spd : yPos };
    }
    case "MOV_L": {
      const { xPos, xMin, acceleration, spd } = state;
      return {
        ...state,
        xPos: xPos > xMin ? xPos - spd : xPos,
        moving: true,
        direction: "left",
        acceleration:
          acceleration <= ACCEL_LIMIT ? acceleration + 6 : acceleration
      };
    }
    case "MOV_R": {
      const { xPos, xMax, acceleration, spd } = state;
      return {
        ...state,
        xPos: xPos < xMax ? xPos + spd : xPos,
        moving: true,
        direction: "right",
        acceleration:
          acceleration <= ACCEL_LIMIT ? acceleration + 6 : acceleration
      };
    }
    case "MOV_FALL": {
      const { yPos, yMin, spd } = state;
      return {
        ...state,
        falling: true,
        yPos: yPos + spd <= yMin ? yPos + spd * 1.75 : yMin
      };
    }
    case "MOV_LAND": {
      return { ...state, falling: false };
    }
    case "MOV_SKID": {
      const { direction, acceleration, xMin, xMax, xPos } = state;
      if (direction === "left")
        return { ...state, xPos: xPos > xMin ? xPos - acceleration : xPos };
      else if (direction === "right")
        return { ...state, xPos: xPos < xMax ? xPos + acceleration : xPos };
      else return state;
    }
    case "DECEL": {
      const { acceleration } = state;
      return {
        ...state,
        acceleration: acceleration - 1 >= 0 ? acceleration - 1 : acceleration
      };
    }
    case "STOPPED": {
      return { ...state, moving: false, direction: null };
    }
    case "KILL_MOVEMENT": {
      const { acceleration } = state;
      return {
        ...state,
        moving: false,
        button_pressed: null,
        acceleration: acceleration - 5 >= 0 ? acceleration - 5 : 0
      };
    }
    default: {
      console.log("Unhandled Action ", action);
      return state;
    }
  }
};

export default initalReducer;
