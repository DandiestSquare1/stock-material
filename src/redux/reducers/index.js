import { combineReducers } from 'redux'
import pickBy from 'lodash/pickBy'

import { PING } from '../actions'
import { DELETE_ITEM_REQUEST } from '../constants'

const pingCount = (state = 0, action) => {
  switch(action.type) {
    case PING:
      return state + 1
    default:
      return state
  }
}

const items = (state = {
  '001': { id: '001', name: 'Banana', quantity: 4 },
  '002': { id: '002', name: 'Rice', quantity: 228 },
  '003': { id: '003', name: 'Foo', quantity: 77 },
  '004': { id: '004', name: 'Bar', quantity: 39 },
  '005': { id: '005', name: 'Donut', quantity: 78 },
  '006': { id: '006', name: 'Chocolate', quantity: 1 },
  '007': { id: '007', name: 'Foobar', quantity: 3 },
  '008': { id: '008', name: 'Vanilla', quantity: 98 },
  '009': { id: '009', name: 'Steak', quantity: 3434 },
  '010': { id: '010', name: 'Fries', quantity: 34 },
  '028': { id: '028', name: 'Milk Chocolate', quantity: 98 },
  '029': { id: '029', name: 'Ice Tea', quantity: 3434 },
  '020': { id: '020', name: 'Water', quantity: 34 },
}, action) => {
  switch(action.type) {
    case DELETE_ITEM_REQUEST:
      console.log('deleting', action.id) // eslint-disable-line
      return pickBy(state, item => item.id !== action.id)
    default:
      return state
  }
}

export default combineReducers({ pingCount, items })
