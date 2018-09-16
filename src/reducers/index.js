import { combineReducers } from "redux";
import initialReducer from "./initialReducer";
import rootReducer from "./rootReducer";
import enemyReducer from "./enemyReducer";
import collisionReducer from "./collisionReducer";

const reducer = combineReducers({
  initialReducer,
  rootReducer,
  enemyReducer,
  collisionReducer
});

export default reducer;
