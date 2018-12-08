import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Dashboard from '../../containers/DashboardContainer';

class App extends Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <div id="App" className="App container-fluid">
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={ Dashboard } />
            </Switch>
          </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, {
})(App);
