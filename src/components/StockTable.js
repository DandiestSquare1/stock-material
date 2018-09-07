import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Checkbox from '@material-ui/core/Checkbox'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination'
import { withStyles } from '@material-ui/core/styles'

import StockTableHead from './StockTableHead'
import StockTableToolbar from './StockTableToolbar'

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}



class StockTable extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    items: PropTypes.array.isRequired,
    // (id | [id]) => void
    onDelete: PropTypes.func.isRequired,

    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.oneOf(['id', 'name', 'quantity']).isRequired,
    selected: PropTypes.arrayOf(PropTypes.string).isRequired,

    // (page) => void
    onChangePage: PropTypes.func.isRequired,
    // (property) => void
    onSortClick: PropTypes.func.isRequired,
    // (itemId | 'all' | 'none') => void
    toggleSelection: PropTypes.func.isRequired,
    // (rows) => void
    onChangeRowsPerPage: PropTypes.func.isRequired,
  }

  static styles = {
    root: {
      width: '100%',
    },
    tableWrapper: {
      overflowX: 'auto'
    }
  }

  handleRequestSort = (even, property) => this.props.onSortClick(property)


  handleSelectAllClick = event => {
    if (event.target.checked) {
      return
    }
    this.setState({ selected: [] })
  }

  handleClick = (event, id) => this.props.toggleSelection(id)

  handleChangePage = (event, page) => this.props.onChangePage(page)

  handleChangeRowsPerPage = event => this.props.onChangeRowsPerPage(event.target.value)

  handleDelete = event => this.props.onDelete(this.props.selected)

  isSelected = id => this.props.selected.indexOf(id) !== -1

  render() {
    const { items, classes, orderBy, order, selected, page, rowsPerPage } = this.props
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, items.length - page * rowsPerPage)

    return (
      <Paper className={classes.root}>
        <StockTableToolbar selectedCount={selected.length} onDeleteClick={this.handleDelete}/>
        <div className={classes.tableWrapper}>
          <Table>
            <StockTableHead
              rowCount={items.length}
              selectedRowCount={selected.length}
              orderBy={orderBy}
              order={order}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
            />
            <TableBody>
              {stableSort(items, getSorting(order, orderBy))
                .slice(page * rowsPerPage, (page+1) * rowsPerPage)
                .map(item => {
                  const isSelected = this.isSelected(item.id)
                  return (
                    <TableRow key={item.id}
                      hover
                      onClick={event => this.handleClick(event, item.id)}
                      role='checkbox'
                      aria-checked={isSelected}
                      tabIndex={-1}
                      selected={isSelected}
                    >
                      <TableCell padding='checkbox'>
                        <Checkbox checked={isSelected} />
                      </TableCell>
                      <TableCell>{item.id}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell numeric>{item.quantity}</TableCell>
                    </TableRow>
                  )
                })
              }
              { emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          component='div'
          count={items.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    )
  }
}

export default withStyles(StockTable.styles)(StockTable)
