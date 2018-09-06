import { createActions } from 'redux-actions'

const actions =  createActions({
  ITEMS: {
    DELETE: {
      REQUEST: id => id,
      SUCCESS: id => id,
      FAILURE: (id, error) => ({ id, error: error.message })
    },
    ADD: {
      REQUEST: item => item,
      SUCCESS: item => item,
      FAILURE: (item, error) => ({ item, error: error.message })
    }
  }
})

export default actions
