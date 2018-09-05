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
    items: PropTypes.array.isRequired,
    classes: PropTypes.object.isRequired
  }

  static styles = {
    root: {
      width: '100%',
    },
    tableWrapper: {
      overflowX: 'auto'
    }
  }

  state = {
    order: 'asc',
    orderBy: 'id',
    selected: [],
    page: 0,
    rowsPerPage: 5
  }

  handleRequestSort = (even, property) => {
    const orderBy = property
    let order = 'desc'

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc'
    }

    this.setState({ order, orderBy })
  }

  handleSelectAllClick = event => {
    if (event.target.checked) {
      this.setState(state => ({ selected: this.props.items.map(n => n.id) }))
      return
    }
    this.setState({ selected: [] })
  }

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    this.setState({ selected: newSelected })
  }


  handleChangePage = (event, page) => {
    this.setState({ page })
  }

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value })
  }

  isSelected = id => this.state.selected.indexOf(id) !== -1

  render() {
    const { items, classes } = this.props
    const { orderBy, order, selected, page, rowsPerPage } = this.state
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, items.length - page * rowsPerPage)

    return (
      <Paper className={classes.root}>
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
