import { connect } from 'react-redux'
import values from 'lodash/values'

import StockTable from '../components/StockTable'
import actions from '../redux/actions'

const deleteItem = actions.items.delete

const mapStateToProps = state => ({
  items: values(state.items.entities)
})

const mapDispatchToProps = dispatch => ({
  onDelete: ids => {
    if (typeof ids === 'string') {
      dispatch(deleteItem.request(ids))
    } else {
      ids.map(id => dispatch(deleteItem.request(id)))
    }
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(StockTable)
