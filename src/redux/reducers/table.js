import { handleActions } from 'redux-actions'

import actions from '../actions'

const table = actions.table

export default handleActions({
  [table.setPage]: (state, { payload }) => Object.assign({}, state, {
    page: payload
  }),
  
  [table.sortBy]: (state, action) => {
    const orderBy = action.payload
    let order = 'desc'
    if(state.orderBy === action.payload && state.order === 'desc'){
      order = 'asc'
    }
    return Object.assign({}, state, { order, orderBy })
  },

  [table.toggleItemSelection]: (state, action) => {
    const { selected } = state
    const selectedIndex = state.selected.indexOf(action.payload)
    let newSelected = []
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, action.payload);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    return Object.assign({}, state, {
      selected: newSelected
    })
  },

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
