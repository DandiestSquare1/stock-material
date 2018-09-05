import { connect } from 'react-redux'
import values from 'lodash/values'

import StockTable from '../components/StockTable'
import { deleteItem } from '../redux/actions'

const mapStateToProps = state => ({
  items: values(state.items)
})

const mapDispatchToProps = dispatch => ({
  onDelete: ids => {
    if (typeof ids === 'string') {
      dispatch(deleteItem(ids))
    } else {
      ids.map(id => dispatch(deleteItem(id)))
    }
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(StockTable)
