import React from 'react'
import PropTypes from 'prop-types'
import LinearProgress from '@material-ui/core/LinearProgress'
import { withStyles } from '@material-ui/core/styles'
import { lighten } from '@material-ui/core/styles/colorManipulator'

const highLevelColor = '#008000'
const lowLevelColor = '#ff0000'

const styles = {
  highRoot: { backgroundColor: lighten(highLevelColor, 0.85) },
  highBar: { backgroundColor: highLevelColor },
  lowRoot: { backgroundColor: lighten(lowLevelColor, 0.85) },
  lowBar: { backgroundColor: lowLevelColor }
}

const StockLevel = ({ level, classes }) => {
  let styleClasses = { }
  console.log(level) // eslint-disable-line
  if (level < 40) {
    styleClasses = { root: classes.lowRoot, bar: classes.lowBar }
  } else if (level >= 80) {
    styleClasses = { root: classes.highRoot, bar: classes.highBar }
  }
  return (
    <LinearProgress
      variant='determinate'
      value={level}
      classes={styleClasses}
    />
  )
}

StockLevel.propTypes = {
  level: PropTypes.number.isRequired,
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(StockLevel)
