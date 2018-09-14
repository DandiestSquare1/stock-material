import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

import Link from './ExternalLink'

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 2
  }
})

const About = ({ classes }) => (
  <Fragment>
    <div className={classes.root}>
      <Typography gutterBottom variant='title'>About</Typography>
      <Typography paragraph>
        {'The sources are are available '}
        <Link to='http://github.com/hissalht/stock-material'>on GitHub</Link>
        {'.'}
      </Typography>
    </div>
  </Fragment>
)

About.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(About)
