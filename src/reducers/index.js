import { combineReducers } from "redux";
import initialReducer from "./initialReducer";
import rootReducer from "./rootReducer";

const reducer = combineReducers({ initialReducer, rootReducer });

export default reducer;
