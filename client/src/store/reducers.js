// rootReducer.js
import { combineReducers } from 'redux';
import authReducer from './authReducer'; // Assuming you have an authReducer
import otherReducer from './otherReducer'; // Assuming you have other reducers

const rootReducer = combineReducers({
  auth: authReducer,
  other: otherReducer
});

export default rootReducer;
