import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Checkbox from '@material-ui/core/Checkbox'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import Tooltip from '@material-ui/core/Tooltip'

const columns = [
  { id: 'name', numeric: false, label: 'Name' },
  { id: 'quantity', numeric: true, label: 'Quantity' },
  { id: 'level', numeric: false, label: 'Level' }
]

class StockTableHead extends Component {
  static propTypes = {
    orderBy: PropTypes.string.isRequired,
    order: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
    selectedRowCount: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired
  }

  createSortHandler = property => event => {
    this.props.onRequestSort(event, property)
  }

  render () {
    const { onSelectAllClick, orderBy, order, rowCount, selectedRowCount } = this.props
    return (
      <TableHead>
        <TableRow>
          <TableCell padding='checkbox'>
            <Checkbox
              indeterminate={selectedRowCount > 0 && selectedRowCount < rowCount}
              checked={rowCount === selectedRowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
          {columns.map(column => (
            <TableCell
              key={column.id}
              numeric={column.numeric}
              sortDirection={orderBy === column.id ? order : false}
            >
              <Tooltip
                title='Sort'
                placement={column.numeric ? 'bottom-end' : 'bottom-start'}
              >
                <TableSortLabel
                  active={orderBy === column.id}
                  direction={order}
                  onClick={this.createSortHandler(column.id)}
                >
                  {column.label}
                </TableSortLabel>
              </Tooltip>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    )
  }
}

export default StockTableHead
