import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

//Redux
import {Provider} from 'react-redux'
import generateStore from './redux/store'

//Inicializacion de store
const store = generateStore()

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
