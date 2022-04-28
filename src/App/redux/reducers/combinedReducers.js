import { combineReducers } from 'redux';
import getWordsFromFirebaseReducer from './getWordsFromFirebaseReducer';
import logInUserWithGoogleAuthReducer from './logInUserWithGoogleAuthReducer';

const combinedReducers = combineReducers({
  user: logInUserWithGoogleAuthReducer,
  wordsFromFirebase: getWordsFromFirebaseReducer
})

export default combinedReducers;