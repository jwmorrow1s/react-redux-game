const initialState = {
  initialized: false,
  falling: false,
  rMovTimeStampArr: [],
  lMovTimeStampArr: []
};
const PLAYER_WIDTH = 20;

//consider removing timestamping and instead just leaving last direction pressed as jump direction
const enoughMomentum = latMovTimeStampArr => {
  if (latMovTimeStampArr.length < 2) return false;
  const momentum =
    Math.abs(
      latMovTimeStampArr[0] - latMovTimeStampArr[latMovTimeStampArr.length - 1]
    ) <= 2;
  if (momentum) return true;
};

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
        initialized: true
      };
    }
    case "MOV_U": {
      const {
        xPos,
        yPos,
        lMovTimeStampArr,
        rMovTimeStampArr,
        xMin,
        xMax
      } = state;
      if (state.falling) return state;
      if (enoughMomentum(lMovTimeStampArr)) {
        return {
          ...state,
          lMovTimeStampArr: [],
          rMovTimeStampArr: [],
          yPos: yPos - 40,
          xPos: xPos - 40 > xMin ? xPos - 40 : xPos - (xPos - xMin)
        };
      } else if (enoughMomentum(rMovTimeStampArr)) {
        return {
          ...state,
          lMovTimeStampArr: [],
          rMovTimeStampArr: [],
          yPos: yPos - 40,
          xPos: xPos + 40 <= xMax ? xPos + 40 : xPos + (xMax - xPos)
        };
      } else
        return {
          ...state,
          yPos: yPos - 40
        };
    }
    case "MOV_D": {
      const { xPos, yPos, yMin } = state;
      return { ...state, yPos: yPos < yMin ? yPos + 10 : yPos };
    }
    case "MOV_L": {
      const { xPos, yPos, xMin, lMovTimeStampArr, rMovTimeStampArr } = state;
      const { secs } = action.payload;
      return {
        ...state,
        rMovTimeStampArr: [],
        lMovTimeStampArr:
          lMovTimeStampArr.length < 5 ? lMovTimeStampArr.concat(secs) : [secs],
        xPos: xPos > xMin ? xPos - 10 : xPos
      };
    }
    case "MOV_R": {
      const { xPos, yPos, xMax, rMovTimeStampArr, lMovTimeStampArr } = state;
      const { secs } = action.payload;
      return {
        ...state,
        lMovTimeStampArr: [],
        rMovTimeStampArr:
          rMovTimeStampArr.length < 5 ? rMovTimeStampArr.concat(secs) : [secs],
        xPos: xPos < xMax ? xPos + 10 : xPos
      };
    }
    case "MOV_FALL": {
      const { xPos, yPos, yMin } = state;
      return { ...state, falling: true, yPos: yPos < yMin ? yPos + 10 : yPos };
    }
    case "MOV_LAND": {
      console.log("MOV_LAND");
      return { ...state, falling: false };
    }
    default: {
      console.log("Unhandled Action ", action);
      return state;
    }
  }
};

export default initalReducer;
