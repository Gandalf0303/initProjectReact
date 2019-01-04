import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducers from './reducers';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();
const enhancer = [applyMiddleware(sagaMiddleware)];
window.devToolsExtension && enhancer.push(window.devToolsExtension()); // eslint-disable-line

const initialState = {};

export default createStore(reducers, initialState, compose(...enhancer));

sagaMiddleware.run(rootSaga);
