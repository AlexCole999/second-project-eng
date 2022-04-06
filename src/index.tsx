import App from './App/App';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root'));