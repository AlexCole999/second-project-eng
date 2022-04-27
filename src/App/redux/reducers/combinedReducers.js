
import { createStore, applyMiddleware, combineReducers } from 'redux';
import getWordsFromFirebaseReducer from './getWordsFromFirebaseReducer';


const combinedReducers = combineReducers({
  wordsFromFirebase: getWordsFromFirebaseReducer
})

export default combinedReducers;