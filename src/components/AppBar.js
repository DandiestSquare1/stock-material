import React from 'react'
import PropTypes from 'prop-types'

// material imports
import Bar from '@material-ui/core/AppBar'
import Drawer from '@material-ui/core/Drawer'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'
import MenuIcon from '@material-ui/icons/Menu'
import LabelIcon from '@material-ui/icons/Label'
import BarChartIcon from '@material-ui/icons/BarChart'
import ViewListIcon from '@material-ui/icons/ViewList'
import AddIcon from '@material-ui/icons/Add'
import { withStyles } from '@material-ui/core/styles'

import SideLink from './SideLink'

class AppBar extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired
  }

  static styles = {
    appTitle: {
      marginLeft: 24,
      flex: '0 0 auto'
    },
    spacer: {
      flex: '1 1 100%'
    }
  }

  state = {
    isOpen: false
  }

  open = () => this.setState({ isOpen: true })
  close = () => this.setState({ isOpen: false })

  render () {
    const { classes } = this.props
    const { isOpen } = this.state
    return (
      <React.Fragment>
        <Bar position='static'>
          <Toolbar>
            <IconButton
              color='inherit'
              onClick={this.open}
              aria-label='Open navigation bar'
            >
              <MenuIcon />
            </IconButton>
            <Typography variant='title' color='inherit' className={classes.appTitle}>
              Stock Manager
            </Typography>
            <div className={classes.spacer} />
            <Tooltip title='Create a new item'>
              <IconButton color='inherit' aria-label='Create a new item'>
                <AddIcon />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </Bar>
        <Drawer open={isOpen} onClose={this.close}>
          <List
            tabIndex={0}
            onClick={this.close}
            onKeyDown={this.close}
          >
            <SideLink to='/items' text='Stocks' icon={ViewListIcon}/>
            <SideLink to='/reports' text='Reports' icon={BarChartIcon}/>
            <SideLink to='/labels' text='Labels' icon={LabelIcon}/>
            <SideLink to='/scanner' text='Scanner' />
          </List>
        </Drawer>
      </React.Fragment>
    )
  }
}

export default withStyles(AppBar.styles)(AppBar)
