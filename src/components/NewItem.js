import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import './NewItem.css'

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  hiddenSubmit: {
    display: 'none'
  },
  optionnalContainer: {
    boxShadow: 'none',
    marginTop: theme.spacing.unit * 2
  },
  optionnalSummary: {
    margin: 0,
    padding: 0
  },
  optionnalDetails: {
    padding: 0
  },
  liner: {
    height: '0.8em',

    borderBottom: `1px solid ${theme.palette.text.secondary}`,
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 8,
    flex: 1
  }
})

class NewItem extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    open: PropTypes.bool,
    onClose: PropTypes.func,
    onSubmit: PropTypes.func.isRequired
  }

  state = {
    name: '',
    quantity: '',
    full: ''
  }

  clearState = () => {
    this.setState({
      name: '',
      quantity: '',
      full: ''
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
      name: this.state.name.trim(),
      quantity: parseInt(this.state.quantity, 10)
    }
    if (this.state.full) {
      newItem.full = parseInt(this.state.full, 10)
    }
    this.props.onSubmit(newItem)
    this.close()
  }

  render () {
    const { classes, open } = this.props
    const { name, quantity, full } = this.state
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
            <ExpansionPanel className={`${classes.optionnalContainer} NewItem OptionnalPanel`}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} className={classes.optionnalSummary}>
                <Typography color='textSecondary' variant='subheading'>Optionnal values :</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className={classes.optionnalDetails}>
                <TextField
                  value={full}
                  onChange={this.createChangeHandler('full')}
                  type='number'
                  label='Full quantity'
                  helperText='Quantity that is considered "full stock"'
                  fullWidth
                />
              </ExpansionPanelDetails>
            </ExpansionPanel>
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
