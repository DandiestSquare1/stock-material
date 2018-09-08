import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core/styles'

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  hiddenSubmit: {
    display: 'none'
  }
}

class NewItem extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    open: PropTypes.bool,
    onClose: PropTypes.func,
    onSubmit: PropTypes.func.isRequired
  }

  state = {
    name: '',
    quantity: ''
  }

  clearState = () => {
    this.setState({
      name: '',
      quantity: ''
    })
  }

  close = () => {
    this.clearState()
    this.props.onClose()
  }

  createChangeHandler = property => (event) => {
    this.setState({ [property]: event.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    let newItem = {
      name: this.state.name,
      quantity: parseInt(this.state.quantity, 10)
    }
    console.log(newItem)// eslint-disable-line
    this.props.onSubmit(newItem)
    this.close()
  }

  render () {
    const { classes, open } = this.props
    const { name, quantity } = this.state
    return (
      <Dialog
        open={open}
        onClose={this.close}
      >
        <DialogTitle>New Item</DialogTitle>
        <DialogContent className={classes.root}>

          <DialogContentText>Fill the following form to create a new item.</DialogContentText>
          <form onSubmit={this.handleSubmit}>
            <TextField
              value={name}
              onChange={this.createChangeHandler('name')}
              required
              fype='text'
              label='Name'
              margin='dense'
              fullWidth
            />
            <TextField
              value={quantity}
              onChange={this.createChangeHandler('quantity')}
              required
              type='number'
              label='Quantity'
              margin='dense'
              fullWidth
            />
            {/* Needed to submit the form by pressing 'enter' */}
            <input type='submit' className={classes.hiddenSubmit}/>
          </form>

        </DialogContent>
        <DialogActions>
          <Button onClick={this.close}>Cancel</Button>
          <Button onClick={this.handleSubmit} variant='raised' color='primary'>Submit</Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default withStyles(styles)(NewItem)
