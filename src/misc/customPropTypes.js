import PropTypes from 'prop-types'

export const itemType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  full: PropTypes.number
})
