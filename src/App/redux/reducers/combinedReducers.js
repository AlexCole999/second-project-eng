import { combineReducers } from 'redux';
import getWordsFromFirebaseReducer from './getWordsFromFirebaseReducer';
import logInUserWithGoogleAuthReducer from './logInUserWithGoogleAuthReducer';

const combinedReducers = combineReducers({
  wordsFromFirebase: getWordsFromFirebaseReducer,
  user: logInUserWithGoogleAuthReducer
})

export default combinedReducers;