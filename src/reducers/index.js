import { combineReducers } from "redux";
import initialReducer from "./initialReducer";
import rootReducer from "./rootReducer";
import enemyReducer from "./enemyReducer";

const reducer = combineReducers({ initialReducer, rootReducer, enemyReducer });

export default reducer;
