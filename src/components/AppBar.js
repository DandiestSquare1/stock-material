import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

// material imports
import Bar from '@material-ui/core/AppBar'
import Drawer from '@material-ui/core/Drawer'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Typography from '@material-ui/core/Typography'
import MenuIcon from '@material-ui/icons/Menu'
import HomeIcon from '@material-ui/icons/Home'
import { withStyles } from '@material-ui/core/styles'

class AppBar extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired
  }

  static styles = {
    appTitle: {
      marginLeft: 24
    }
  }

  state = {
    isOpen: false
  }

  open = () => this.setState({ isOpen: true })
  close = () => this.setState({ isOpen: false })

  render() {
    const { classes } = this.props
    const { isOpen } = this.state
    return (
      <React.Fragment>
        <Bar position='static'>
          <Toolbar>
            <IconButton color='inherit' onClick={this.open}>
              <MenuIcon />
            </IconButton>
            <Typography variant='title' color='inherit' className={classes.appTitle}>
              Material Base
            </Typography>
          </Toolbar>
        </Bar>
        <Drawer open={isOpen} onClose={this.close}>
          <List
            tabIndex={0}
            onClick={this.close}
            onKeyDown={this.close}
          >
            <ListItem button={true} component={Link} to='/'>
              <ListItemIcon><HomeIcon /></ListItemIcon>
              <ListItemText>Home</ListItemText>
            </ListItem>
          </List>
        </Drawer>
      </React.Fragment>
    )
  }
}

export default withStyles(AppBar.styles)(AppBar)
