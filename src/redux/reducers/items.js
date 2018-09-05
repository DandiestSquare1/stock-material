import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions'
import pickBy from 'lodash/pickBy'

import Status from '../status'

const defaultEntities = {
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
  '020': Status.Loaded,
}

const entities = handleActions({
  'ITEMS/ADD/SUCCESS': (state, action) => Object.assign({}, state, {
    [action.payload.id] : action.payload
  }),
  'ITEMS/DELETE/SUCCESS': (state, action) => pickBy(state, item => action.payload !== item.id)
}, defaultEntities)

const status = handleActions({
  'ITEMS/ADD/SUCCESS': (state, action) => Object.assign({}, state, {
    [action.payload.id]: Status.Loaded
  }),
  'ITEMS/DELETE/REQUEST': (state, action) => Object.assign({}, state, {
    [action.payload]: Status.Deleting
  }),
  'ITEMS/DELETE/SUCCESS': (state, action) => pickBy(state, (item, key) => key !== action.payload)
}, defaultStatuses)

const error = handleActions({

})

export default combineReducers({ entities, status })
