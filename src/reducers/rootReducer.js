const initialState = {
  levelsComplete: {
    main: false,
    makeCharacter: false,
    level1: false,
    level2: false
  },

  saveProgress: {
    xPos: null,
    yPos: null,
    yMin: null,
    xMax: null,
    xMin: null
  }
};

const rootReducer = (state = initialState, action) => {
  return state;
};

export default rootReducer;
