import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'

const SideLink = ({ to, text, icon }) => {
  const IconProp = icon || null
  return (
    <ListItem button component={Link} to={to}>
      {icon && <ListItemIcon><IconProp /></ListItemIcon>}
      <ListItemText inset={!icon}>{text}</ListItemText>
    </ListItem>
  )
}

SideLink.propTypes = {
  to: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  icon: PropTypes.func
}

export default SideLink
