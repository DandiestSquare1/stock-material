import { createActions } from 'redux-actions'

const actions =  createActions({
  ITEMS: {
    DELETE: {
      REQUEST: id => id,
      SUCCESS: id => id,
      FAILURE: (id, error) => ({ id, error })
    },
    ADD: {
      REQUEST: item => item,
      SUCCESS: item => item,
      FAILURE: (item, error) => ({ item, error })
    }
  }
})

export default actions
