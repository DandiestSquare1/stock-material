export default {
  SET_PAGE: page => page,
  SORT_BY: property => property,
  TOGGLE_ITEM_SELECTION: id => id,
  SELECT_ALL: {
    REQUEST: undefined,
    SUCCESS: ids => ids
  },
  UNSELECT_ALL: undefined,
  SET_ROWS_PER_PAGE: undefined
}
