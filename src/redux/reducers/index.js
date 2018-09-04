import { combineReducers } from 'redux'
import { PING } from '../actions'

const pingCount = (state = 0, action) => {
  switch(action.type) {
    case PING:
      return state + 1
    default:
      return state
  }
}

export default combineReducers({ pingCount })
