import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { createEpicMiddleware } from 'redux-observable'

import history from './history'
import rootReducer from './reducers'
import rootEpic from './epics'

const epicMiddleware = createEpicMiddleware()

function configureStore(initialState) {
  const middlewares = [
    routerMiddleware(history),
    epicMiddleware
  ]
  const enhancer = composeWithDevTools(applyMiddleware(...middlewares))
  const reducers = connectRouter(history)(rootReducer)
  return createStore(
    reducers,
    initialState,
    enhancer
  )
}

const store = configureStore()
epicMiddleware.run(rootEpic)

export default store
