import { combineReducers } from 'redux';
import getWordsFromFirebaseReducer from './getWordsFromFirebaseReducer';
import logInUserWithGoogleAuthReducer from './logInUserWithGoogleAuthReducer';
import getTranslatesFromYandexDictionaryReducer from './getTranslatesFromYandexDictionaryReducer';
import changeSelectedLanguageReducer from './changeSelectedLanguageReducer';
import getBasesList from './getBasesList';

const combinedReducers = combineReducers({
  user: logInUserWithGoogleAuthReducer,
  selectedLanguage: changeSelectedLanguageReducer,
  yandexDictionaryTranslates: getTranslatesFromYandexDictionaryReducer,
  wordsFromFirebase: getWordsFromFirebaseReducer,
  basesList: getBasesList
})

export default combinedReducers;