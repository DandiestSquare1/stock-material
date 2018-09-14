import React from 'react'
import PropTypes from 'prop-types'

// material imports
import Bar from '@material-ui/core/AppBar'
import Drawer from '@material-ui/core/Drawer'
import Divider from '@material-ui/core/Divider'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import MenuIcon from '@material-ui/icons/Menu'
import LabelIcon from '@material-ui/icons/Label'
import HelpIcon from '@material-ui/icons/Help'
import BarChartIcon from '@material-ui/icons/BarChart'
import ViewListIcon from '@material-ui/icons/ViewList'
import AddIcon from '@material-ui/icons/Add'
import { withStyles } from '@material-ui/core/styles'

import SideLink from './SideLink'
import NewItem from '../containers/NewItem'

class AppBar extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired
  }

  static styles = theme => ({
    appTitle: {
      marginLeft: 24,
      flex: '0 0 auto'
    },
    spacer: {
      flex: '1 1 100%'
    },
    drawerTitle: {
      margin: theme.spacing.unit * 2,
      fontSize: 21,
      fontWeight: 500
    }
  })

  state = {
    isOpen: false,
    isNewItemOpen: false
  }

  open = () => this.setState({ isOpen: true })
  close = () => this.setState({ isOpen: false })

  openNewItem = () => this.setState({ isNewItemOpen: true })
  closeNewItem = () => this.setState({ isNewItemOpen: false })

  render () {
    const { classes } = this.props
    const { isOpen, isNewItemOpen } = this.state
    return (
      <React.Fragment>
        <NewItem open={isNewItemOpen} onClose={this.closeNewItem} />
        <Bar position='sticky'>
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
            <IconButton color='inherit' aria-label='Create a new item' onClick={this.openNewItem}>
              <AddIcon />
            </IconButton>
          </Toolbar>
        </Bar>
        <Drawer open={isOpen} onClose={this.close}>
          <Typography
            variant='headline'
            color='textSecondary'
            gutterBottom
            className={classes.drawerTitle}
          >
            Stock Material
          </Typography>
          <Divider />
          <List
            tabIndex={0}
            onClick={this.close}
            onKeyDown={this.close}
          >
            <SideLink to='/items' text='Stocks' icon={ViewListIcon} />
            <SideLink to='/reports' text='Reports' icon={BarChartIcon} />
            <SideLink to='/labels' text='Labels' icon={LabelIcon} />
            <SideLink to='/scanner' text='Scanner' />
            <SideLink to='/about' text='About' icon={HelpIcon} />
          </List>
        </Drawer>
      </React.Fragment>
    )
  }
}

export default withStyles(AppBar.styles)(AppBar)
