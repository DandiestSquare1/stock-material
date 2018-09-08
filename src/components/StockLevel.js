import React from 'react'
import PropTypes from 'prop-types'
import LinearProgress from '@material-ui/core/LinearProgress'
import { withStyles } from '@material-ui/core/styles'
// import { lighten } from '@material-ui/core/styles/colorManipulator'

const highLevelColor = '#00ff00'
const mediumLevelColor = '#ffff00'
const lowLevelColor = '#ff0000'

const StockLevel = ({ level }) => {
  const CustomLinearProgress = withStyles({
    // root: { background: `linear-gradient(to right, ${lighten(lowLevelColor, 0.85)}, ${lighten(mediumLevelColor, 0.85)}, ${lighten(highLevelColor, 0.85)})` },
    bar: { background: `linear-gradient(to right, ${lowLevelColor}, ${mediumLevelColor}, ${highLevelColor} ${Math.max(100, 100 / level * 100)}%)` }
  })(LinearProgress)

  return (
    <CustomLinearProgress
      variant='determinate'
      value={level}
    />
  )
}

StockLevel.propTypes = {
  level: PropTypes.number.isRequired
}

export default StockLevel
