import {applyMiddleware, createStore} from 'redux';
import rootReducer from './redux-reducers/main_reducer';
import rootSaga from './redux-saga/index';
import createSagaMiddleware from 'redux-saga';
import {composeWithDevTools} from 'redux-devtools-extension';

const sagaMiddleware = createSagaMiddleware();

const enhancers = [applyMiddleware(sagaMiddleware)];

const enhancer = composeWithDevTools(...enhancers);

export const store = createStore(rootReducer, {}, enhancer);

sagaMiddleware.run(rootSaga);