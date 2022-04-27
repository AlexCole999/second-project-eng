import App from './App/App';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import './index.scss';
import { BrowserRouter } from "react-router-dom";

let defaultstate = { data: [] }
const getWordsFromFirebaseReducer = (state = defaultstate, action) => {
  switch (action.type) {
    case "ADD_DATA_FROM_FIREBASE":
      return { ...state, data: action.someproperty }
    default: return state
  }
}

const combinedReducers = combineReducers({
  wordsFromFirebase: getWordsFromFirebaseReducer
})
export default combinedReducers

const store = createStore(combinedReducers, composeWithDevTools(applyMiddleware(thunk)))

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'));