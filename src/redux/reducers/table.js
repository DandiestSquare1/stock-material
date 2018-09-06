import { handleActions } from 'redux-actions'

import actions from '../actions'

export default handleActions({
  [actions.table.setOrder]: (state, action) => Object.assign({}, state, {
    order: action.payload
  }),
  [actions.table.setOrderBy]: (state, action) => Object.assign({}, state, {
    orderBy: action.payload
  }),
  [actions.table.setSelected]: (state, action) => Object.assign({}, state, {
    selected: action.payload
  }),
  [actions.table.setPage]: (state, action) => Object.assign({}, state, {
    page: action.payload
  }),
  [actions.table.setRowsPerPage]: (state, action) => Object.assign({}, state, {
    rowsPerPage: action.payload
  }),
}, {
  order: 'asc',
  orderBy: 'id',
  selected: [],
  page: 0,
  rowsPerPage: 5
})
