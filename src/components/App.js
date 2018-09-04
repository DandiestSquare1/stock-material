import React, { Component } from 'react';
import PropTypes from 'prop-types'
import CssBaseline from '@material-ui/core/CssBaseline'
import { Switch, Route } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'

import AppBar from './AppBar'
import StockTable from '../containers/StockTable'

class App extends Component {

  static propTypes = { classes: PropTypes.object.isRequired }

  static styles = theme => ({
    mainContent: {
      margin: theme.spacing.unit
    }
  })

  render() {
    const { classes } = this.props
    return (
      <React.Fragment>
        <CssBaseline />
        <AppBar />
        <div className={classes.mainContent}>
          <Switch>
            <Route exact path='/items' component={StockTable} />
          </Switch>
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(App.styles)(App)
