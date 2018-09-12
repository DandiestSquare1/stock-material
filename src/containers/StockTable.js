import { connect } from 'react-redux'
import values from 'lodash/values'

import StockTable from '../components/StockTable'
import actions from '../redux/actions'

const deleteItem = actions.items.delete
const deleteMultipleItems = actions.items.deleteMultiple

const mapStateToProps = state => ({
  items: values(state.items.entities).map(item => {
    if (!item.full) { return item }
    return Object.assign({}, item, {
      level: Math.min(item.quantity / item.full * 100, 100)
    })
  }),
  order: state.table.order,
  orderBy: state.table.orderBy,
  selected: state.table.selected,
  page: state.table.page,
  rowsPerPage: state.table.rowsPerPage
})

const mapDispatchToProps = dispatch => ({
  onDelete: id => {
    if (Array.isArray(id)) {
      dispatch(deleteMultipleItems.request(id))
    } else {
      dispatch(deleteItem.request(id))
    }
  },

  onChangePage: page => dispatch(actions.table.setPage(page)),

  onChangeRowsPerPage: rows => dispatch(actions.table.setRowsPerPage(rows)),

  onSortClick: property => dispatch(actions.table.sortBy(property)),

  toggleSelection: id => {
    if (id === 'all') {
      dispatch(actions.table.selectAll.request())
    } else if (id === 'none') {
      dispatch(actions.table.unselectAll())
    } else {
      dispatch(actions.table.toggleItemSelection(id))
    }
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(StockTable)
