import { applyMiddleware, createStore, compose } from 'redux'
import createLogger from 'redux-logger'
import { persistState } from 'redux-devtools'
import thunkMiddleware from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'

import rootReducer from './rootReducer'
import DevTools from './tools/DevTools'

import rootSaga from './rootSaga'

const initialState = {}
// eslint-disable-next-line
const loggerMiddleware = createLogger()
const sagaMiddleware = createSagaMiddleware()
const middleware = applyMiddleware(thunkMiddleware, sagaMiddleware/*, loggerMiddleware*/)
const enhancer = compose(middleware, DevTools.instrument(), persistState(getDebugSessionKey()))

const store = createStore(rootReducer, initialState, enhancer)

sagaMiddleware.run(rootSaga)

function getDebugSessionKey() {
  // By default we try to read the key from ?debug_session=<key> in the address bar
  const matches = window.location.href.match(/[?&]debug_session=([^&#]+)\b/);
  return (matches && matches.length > 0)? matches[1] : null;
}

export default store
