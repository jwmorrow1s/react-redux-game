const initialState = {};

const collisionReducer = (state = initialState, action) => {
  switch (action.type) {
    case "MOVEMENT_UPDATE": {
      return state;
    }
    default: {
      return state;
    }
  }
};

export default collisionReducer;
