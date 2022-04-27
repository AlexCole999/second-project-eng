import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';
import combinedReducers from './reducers/combinedReducers';
import thunk from 'redux-thunk';

const reduxStore = createStore(combinedReducers, composeWithDevTools(applyMiddleware(thunk)))

export default reduxStore