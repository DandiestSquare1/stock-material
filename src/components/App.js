import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline'

import AppBar from './AppBar'

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <AppBar />
      </React.Fragment>
    );
  }
}

export default App;
