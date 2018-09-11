import React from 'react'
import PropTypes from 'prop-types'

import ItemDialog from './ItemDialog'

const NewItem = ({ open, onClose, onSubmit }) => (
  <ItemDialog
    open={open}
    onClose={onClose}
    onSubmit={onSubmit}
  />
)

NewItem.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
}

export default NewItem
