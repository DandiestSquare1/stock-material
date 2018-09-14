import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  root: {
    color: theme.palette.primary.light,
    fontWeight: theme.typography.fontWeightMedium,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline'
    },
    '&:visited': {
      color: theme.palette.primary.dark
    }
  }
})

const ExternalLink = ({ to, children, classes }) => (
  <a href={to} className={classes.root}>{children}</a>
)

ExternalLink.propTypes = {
  classes: PropTypes.object.isRequired,
  to: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired
}

export default withStyles(styles)(ExternalLink)
