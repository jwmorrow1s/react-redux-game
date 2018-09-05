const initialState = {
  initialized: false,
  xPos: 0,
  yPos: 0
};

const initalReducer = (state = initialState, action) => {
  switch (action.type) {
    case "INIT_PLAYER": {
      const { xPos, yPos } = action.payload;
      return {
        ...state,
        xPos: xPos,
        yPos: yPos,
        yMax: yPos * 2 - 104,
        xMax: xPos * 2 - 50,
        initialized: true
      };
    }
    case "MOV_U": {
      const { xPos, yPos } = state;
      return {
        ...state,
        yPos: yPos > -38.6 ? yPos - 10 : yPos
      };
    }
    case "MOV_D": {
      const { xPos, yPos, yMax } = state;
      return { ...state, yPos: yPos < yMax ? yPos + 10 : yPos };
    }
    case "MOV_L": {
      const { xPos, yPos } = state;
      return { ...state, xPos: xPos > 4 ? xPos - 10 : xPos };
    }
    case "MOV_R": {
      const { xPos, yPos, xMax } = state;
      console.log(xPos, xMax);
      return { ...state, xPos: xPos < xMax ? xPos + 10 : xPos };
    }
    default: {
      console.log("Unhandled Action ", action);
      return state;
    }
  }
};

export default initalReducer;
