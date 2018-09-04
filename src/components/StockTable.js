import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles'

class StockTable extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    classes: PropTypes.object.isRequired
  }

  static styles = {
    root: {
      width: '100%',
      overflowX: 'auto'
    }
  }

  render() {
    const { items, classes } = this.props

    return (
      <Paper className={classes.root}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Item</TableCell>
              <TableCell numeric>Quantity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map( item => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell numeric>{item.quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    )
  }
}

export default withStyles(StockTable.styles)(StockTable)
