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
import withMobileDialog from '@material-ui/core/withMobileDialog'

import './ItemDialog.css'

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

class ItemDialog extends Component {
  static propTypes = {
    /* Provided by the withStyles wrapper. */
    classes: PropTypes.object.isRequired,
    /* Provided by the withMobileDialog wrapper. */
    fullScreen: PropTypes.bool,

    open: PropTypes.bool,
    onClose: PropTypes.func,
    onSubmit: PropTypes.func.isRequired,
    item: PropTypes.object
  }

  constructor (props) {
    super(props)
    const { item } = props
    if (item) {
      this.state = {
        name: item.name,
        quantity: item.quantity,
        full: item.full
      }
    } else {
      this.state = {
        name: '',
        quantity: '',
        full: ''
      }
    }
  }

  clearState = () => {
    const { item } = this.props
    if (item) {
      this.setState({
        name: item.name,
        quantity: item.quantity,
        full: item.full
      })
    } else {
      this.setState({
        name: '',
        quantity: '',
        full: ''
      })
    }
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
    if (this.props.item) {
      newItem.id = this.props.item.id
    }
    this.props.onSubmit(newItem)
    this.props.onClose()
  }

  render () {
    const { classes, open, fullScreen } = this.props
    const { name, quantity, full } = this.state
    const editing = !!this.props.item
    return (
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={this.close}
      >
        <DialogTitle>{editing ? 'Edit Item' : 'New Item'}</DialogTitle>
        <DialogContent className={classes.root}>

          <DialogContentText>
            {editing
              ? 'Modify the following form to edit an existing item.'
              : 'Fill the following form to create a new item.'
            }
          </DialogContentText>
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
            <input type='submit' className={classes.hiddenSubmit} />
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

export default withMobileDialog()(
  withStyles(styles)(ItemDialog)
)
