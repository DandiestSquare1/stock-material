import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CssBaseline from '@material-ui/core/CssBaseline'
import Paper from '@material-ui/core/Paper'
import { Switch, Route, Redirect } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'

import AppBar from './AppBar'
import StockTable from '../containers/StockTable'
import About from './About'

class App extends Component {
  static propTypes = { classes: PropTypes.object.isRequired }

  static styles = theme => ({
    mainContent: {
      margin: theme.spacing.unit
    },
    paperRoot: {
      maxWidth: 800,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  })

  render () {
    const { classes } = this.props
    return (
      <React.Fragment>
        <CssBaseline />
        <AppBar />
        <div className={classes.mainContent}>
          <Paper className={classes.paperRoot}>
            <Switch>
              <Route exact path='/items' component={StockTable} />
              <Route exact path='/reports'><div>reports</div></Route>
              <Route exact path='/labels'><div>labels</div></Route>
              <Route exact path='/scanner'><div>scanner</div></Route>
              <Route exact path='/about' component={About} />
              <Redirect to='/items' />
            </Switch>
          </Paper>
        </div>
      </React.Fragment>
    )
  }
}

export default withStyles(App.styles)(App)
