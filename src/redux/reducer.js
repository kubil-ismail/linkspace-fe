import { combineReducers } from "redux";

// Reducers
import authReducer from "store/auth/reducer";

const combinedReducer = combineReducers({
  auth: authReducer,
});

export default combinedReducer;
