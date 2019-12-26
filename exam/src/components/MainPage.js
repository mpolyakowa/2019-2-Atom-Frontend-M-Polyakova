import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { Cities } from './Cities'
import { City } from './City'
import '../styles/MainPage.css'

export const history = createBrowserHistory()
class MainPage extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route path="/city:id" component={City} />
          <Route path="/" component={Cities} />
        </Switch>
      </Router>
    )
  }
}

export default MainPage
