import { connect } from 'react-redux'
import values from 'lodash/values'

import StockTable from '../components/StockTable'
import actions from '../redux/actions'

const deleteItem = actions.items.delete

const mapStateToProps = state => ({
  items: values(state.items.entities),
  order: state.table.order,
  orderBy: state.table.orderBy,
  selected: state.table.selected,
  page: state.table.page,
  rowsPerPage: state.table.rowsPerPage
})

const mapDispatchToProps = dispatch => ({
  onDelete: ids => {
    if (typeof ids === 'string') {
      dispatch(deleteItem.request(ids))
    } else {
      ids.map(id => dispatch(deleteItem.request(id)))
    }
  },

  onChangePage: page => dispatch(actions.table.setPage(page)),

  onChangeRowsPerPage: rows => dispatch(actions.table.setRowsPerPage(rows)),

  onSortClick: property => dispatch(actions.table.sortBy(property)),

  toggleSelection: id => dispatch(actions.table.toggleItemSelection(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(StockTable)
