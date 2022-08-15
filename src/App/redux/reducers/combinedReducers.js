import { combineReducers } from 'redux';
import getWordsFromFirebaseReducer from './getWordsFromFirebaseReducer';
import logInUserWithGoogleAuthReducer from './logInUserWithGoogleAuthReducer';
import getTranslatesFromYandexDictionaryReducer from './getTranslatesFromYandexDictionaryReducer';
import changeSelectedLanguageReducer from './changeSelectedLanguageReducer';
import changeSearchedInputReducer from './changeSearchedInputReducer';

const combinedReducers = combineReducers({
  user: logInUserWithGoogleAuthReducer,
  selectedLanguage: changeSelectedLanguageReducer,
  yandexDictionaryTranslates: getTranslatesFromYandexDictionaryReducer,
  allWordsFromFirebase: getWordsFromFirebaseReducer,
  searchedInput: changeSearchedInputReducer
})

export default combinedReducers;