import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { Chat } from './Chat'
import { Messages } from './Messages'
import { Profile } from './Profile'
import '../styles/MainPage.css'

export const history = createBrowserHistory()
class MainPage extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route path="/profile" component={Profile} />
          <Route path="/chats/:id" component={Messages} />
          <Route path="/" component={Chat} />
        </Switch>
      </Router>
    )
  }
}

export default MainPage
