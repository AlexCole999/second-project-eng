import './index.scss';
import App from './App/comps/App';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter } from "react-router-dom";
import reduxStore from './App/redux/reduxStore';

ReactDOM.render(
  <Provider store={reduxStore}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>,
  document.getElementById('root'));