import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

class Alert extends Component {
  static propTypes = {
    open: PropTypes.bool,
    /** Called for any action closing the dialog (cancelling and confirming). */
    onClose: PropTypes.func.isRequired,
    /** Called when the dialog is closed without confirming (cancel button or
        'outside click') in addition to the onClose function. */
    onCancel: PropTypes.func,
    /** Called when the confirm button is clicked in addition to the onClose
        function. */
    onConfirm: PropTypes.func,

    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,

    /** Text for the cancel button. */
    cancel: PropTypes.string,
    /** Text for the confirm button. */
    confirm: PropTypes.string
  }

  confirm = () => {
    this.props.onClose()
    if (this.props.onConfirm) {
      this.props.onConfirm()
    }
  }

  cancel = () => {
    this.props.onClose()
    if (this.props.onCancel) {
      this.props.onCancel()
    }
  }

  render () {
    const { title, description, cancel, confirm, open } = this.props
    return (
      <Dialog
        open={open}
        onClose={this.cancel}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            {description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.cancel} color='primary'>
            {cancel || 'Cancel'}
          </Button>
          <Button onClick={this.confirm} color='primary'>
            {confirm || 'Confirm'}
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default Alert
