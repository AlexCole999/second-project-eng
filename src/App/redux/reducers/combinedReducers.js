import { combineReducers } from 'redux';
import getWordsFromFirebaseReducer from './getWordsFromFirebaseReducer';
import logInUserWithGoogleAuthReducer from './logInUserWithGoogleAuthReducer';
import getTranslatesFromYandexDictionaryReducer from './getTranslatesFromYandexDictionaryReducer';
import changeSelectedLanguageReducer from './changeSelectedLanguageReducer';
import searchedInputReducer from './searchedInputReducer';

const combinedReducers = combineReducers({
  user: logInUserWithGoogleAuthReducer,
  selectedLanguage: changeSelectedLanguageReducer,
  yandexDictionaryTranslates: getTranslatesFromYandexDictionaryReducer,
  allWordsFromFirebase: getWordsFromFirebaseReducer,
  searchedInput: searchedInputReducer
})

export default combinedReducers;