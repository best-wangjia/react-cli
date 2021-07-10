import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import reducer from './reducer'
import mySaga from './sagas'

const persistedReducer = persistReducer({
  key: 'MY_REDUX',
  storage,
  whitelist: ['list']
}, reducer)

const sagaMiddleware = createSagaMiddleware()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose

const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware))

let store = createStore(
  persistedReducer,
  enhancer
)

let persistor = persistStore(store)

sagaMiddleware.run(mySaga)

export {
  store, persistor
}
