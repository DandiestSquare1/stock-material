import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions'
import pickBy from 'lodash/pickBy'
import forEach from 'lodash/forEach'

import Status from '../status'
import actions from '../actions'

const defaultEntities = {
  '001': { id: '001', name: 'Banana', quantity: 4, full: 10 },
  '002': { id: '002', name: 'Rice', quantity: 228, full: 300 },
  '003': { id: '003', name: 'Foo', quantity: 77 },
  '004': { id: '004', name: 'Bar', quantity: 39 },
  '005': { id: '005', name: 'Donut', quantity: 78, full: 200 },
  '006': { id: '006', name: 'Chocolate', quantity: 1 },
  '007': { id: '007', name: 'Foobar', quantity: 3 },
  '008': { id: '008', name: 'Vanilla', quantity: 98 },
  '009': { id: '009', name: 'Steak', quantity: 3434, full: 3000 },
  '010': { id: '010', name: 'Fries', quantity: 34 },
  '028': { id: '028', name: 'Milk Chocolate', quantity: 98 },
  '029': { id: '029', name: 'Ice Tea', quantity: 3434 },
  '020': { id: '020', name: 'Water', quantity: 34 }
}

const defaultStatuses = {
  '001': Status.Loaded,
  '002': Status.Loaded,
  '003': Status.Loaded,
  '004': Status.Loaded,
  '005': Status.Loaded,
  '006': Status.Loaded,
  '007': Status.Loaded,
  '008': Status.Loaded,
  '009': Status.Loaded,
  '010': Status.Loaded,
  '028': Status.Loaded,
  '029': Status.Loaded,
  '020': Status.Loaded
}

const entities = handleActions({
  [actions.items.add.success]: (state, action) => Object.assign({}, state, {
    [action.payload.id]: action.payload
  }),
  [actions.items.delete.success]: (state, action) => pickBy(state, item => action.payload !== item.id),
  [actions.items.deleteMultiple.success]: (state, action) => pickBy(state, item => !action.payload.includes(item.id))
}, defaultEntities)

const status = handleActions({
  [actions.items.add.success]: (state, action) => Object.assign({}, state, {
    [action.payload.id]: Status.Loaded
  }),
  [actions.items.delete.request]: (state, action) => Object.assign({}, state, {
    [action.payload]: Status.Deleting
  }),
  [actions.items.delete.success]: (state, action) => pickBy(state, (item, key) => key !== action.payload),
  [actions.items.deleteMultiple.request]: (state, action) => {
    let nextState = Object.assign({}, state)
    forEach(action.payload, itemId => {
      nextState[itemId] = Status.Deleting
    })
    return nextState
  },
  [actions.items.deleteMultiple.success]: (state, action) =>
    pickBy(state, (item, key) =>
      !action.payload.includes(key))
}, defaultStatuses)

const error = handleActions({
  [actions.items.delete.failure]: (state, { payload: { id, error } }) => ({
    ...state,
    [id]: error
  }),
  [actions.items.deleteMultiple]: (state, { payload: { ids, error } }) => {
    let nextState = Object.assign({}, state)
    forEach(ids, itemId => {
      nextState[itemId] = error
    })
    return nextState
  },
  [actions.items.add.failure]: (state, { payload: { item, error } }) => ({
    ...state,
    [item.id]: error
  })
}, {})

export default combineReducers({ entities, status, error })
