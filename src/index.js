import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
// import { createStore } from 'redux';
// import MainReducers from './redux/redux-reducers/main_reducer';
// import thunk from 'redux-thunk';
import {store} from './redux/index';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// import {applyMiddleware, createStore} from 'redux';
// import reducer from '../redux/reducers/index';
// import rootSaga from '../redux/sagas/index';
// import createSagaMiddleware from 'redux-saga';
// import {composeWithDevTools} from 'redux-devtools-extension';

// const sagaMiddleware = createSagaMiddleware();

// const enhancers = [applyMiddleware(sagaMiddleware)];

// const enhancer = composeWithDevTools(...enhancers);

// export const store = createStore(reducer, {}, enhancer);

// sagaMiddleware.run(rootSaga);