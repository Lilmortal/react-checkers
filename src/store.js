import { applyMiddleware, createStore, compose } from 'redux'
import rootReducer from './rootReducer'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import DevTools from './containers/DevTools'
import { persistState } from 'redux-devtools'

const initialState = {}
const loggerMiddleware = createLogger()
const middleware = applyMiddleware(thunkMiddleware, loggerMiddleware)
const enhancer = compose(middleware, DevTools.instrument(), persistState(getDebugSessionKey()))

export const store = createStore(rootReducer, initialState, enhancer)

function getDebugSessionKey() {
  // By default we try to read the key from ?debug_session=<key> in the address bar
  const matches = window.location.href.match(/[?&]debug_session=([^&#]+)\b/);
  return (matches && matches.length > 0)? matches[1] : null;
}