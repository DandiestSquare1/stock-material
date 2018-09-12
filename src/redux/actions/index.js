import { createActions } from 'redux-actions'

import table from './table'

const actions = createActions({
  ITEMS: {
    DELETE: {
      REQUEST: id => id,
      SUCCESS: id => id,
      FAILURE: (id, error) => ({ id, error: error.message })
    },
    DELETE_MULTIPLE: {
      REQUEST: ids => ids,
      SUCCESS: ids => ids,
      FAILURE: (ids, error) => ({ ids, error: error.message })
    },
    ADD: {
      REQUEST: item => item,
      SUCCESS: item => item,
      FAILURE: (item, error) => ({ item, error: error.message })
    }
  },
  TABLE: table
})

export default actions
