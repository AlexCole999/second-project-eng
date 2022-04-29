import { combineReducers } from 'redux';
import getWordsFromFirebaseReducer from './getWordsFromFirebaseReducer';
import logInUserWithGoogleAuthReducer from './logInUserWithGoogleAuthReducer';
import getTranslatesFromYandexDictionaryReducer from './getTranslatesFromYandexDictionaryReducer';

const combinedReducers = combineReducers({
  user: logInUserWithGoogleAuthReducer,
  yandexDictionaryTranslates: getTranslatesFromYandexDictionaryReducer,
  wordsFromFirebase: getWordsFromFirebaseReducer
})

export default combinedReducers;